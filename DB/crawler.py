from pathlib import Path
from collections import deque
from datetime import datetime
import time

from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait

from parser import get_list
from path import PATH_USERLIST, PATH_BASE

START_PAGE = 1
END_PAGE = 2003

EXPECTED_TITLE_KEYWORD = "랭킹"
EXPECTED_PROFILE_MARKER = "/profile/"

def log_current_page_success(page_num, total_count, first_item, last_item):
    print("\n" + "=" * 70, flush=True)
    print(f"✅✅✅ CURRENT PAGE SUCCESS : page={page_num} ✅✅✅", flush=True)
    print(f"   저장 개수   : {total_count}", flush=True)
    print(f"   첫 데이터   : {first_item}", flush=True)
    print(f"   마지막 데이터: {last_item}", flush=True)
    print("=" * 70 + "\n", flush=True)

def log(level, msg):
    now = datetime.now().strftime("%H:%M:%S")
    print(f"[{now}] [{level}] {msg}", flush=True)

def append_to_txt(data_list, output_file):
    """
    data_list: [(rank, nickname), ...]
    return: 실제 쓴 문자열 리스트
    """
    lines = [f"{rank} {nickname}" for rank, nickname in data_list]

    with open(output_file, "a", encoding="utf-8") as f:
        for line in lines:
            f.write(line + "\n")
        f.flush()

    return lines

def get_tail_lines(file_path, n):
    """
    파일 마지막 n줄만 확인
    """
    dq = deque(maxlen=n)
    with open(file_path, "r", encoding="utf-8") as f:
        for line in f:
            dq.append(line.rstrip("\n"))
    return list(dq)

def inspect_html(html_path):
    """
    저장된 html이 실제 랭킹 페이지인지 1차 검사
    return: dict
    """
    with open(html_path, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f, "html.parser")

    title = soup.title.get_text(strip=True) if soup.title else ""
    rows = soup.select("table tbody tr")
    profile_links = soup.select('a[href^="/profile/"]')

    return {
        "title": title,
        "row_count": len(rows),
        "profile_link_count": len(profile_links),
        "has_table": len(rows) > 0,
    }

def verify_parsed_data(html_path, parsed_list):
    """
    html의 실제 row 수와 parsed_list 길이 비교
    첫 행/마지막 행 샘플도 비교
    """
    with open(html_path, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f, "html.parser")

    rows = soup.select("table tbody tr")

    if not rows:
        return False, "HTML 안에 table tbody tr 이 없음"

    if not parsed_list:
        return False, "parsed_list 가 비어 있음"

    if len(rows) != len(parsed_list):
        return False, f"HTML row 수({len(rows)}) != parsed 수({len(parsed_list)})"

    def extract_from_row(row):
        cols = row.find_all("td")
        if len(cols) < 2:
            return None

        rank = cols[0].get_text(" ", strip=True)
        nickname_tag = cols[1].select_one("a b")
        nickname = nickname_tag.get_text(strip=True) if nickname_tag else cols[1].get_text(" ", strip=True)
        return (rank, nickname)

    first_expected = extract_from_row(rows[0])
    last_expected = extract_from_row(rows[-1])

    if first_expected != parsed_list[0]:
        return False, f"첫 행 불일치: html={first_expected}, parsed={parsed_list[0]}"

    if last_expected != parsed_list[-1]:
        return False, f"마지막 행 불일치: html={last_expected}, parsed={parsed_list[-1]}"

    return True, f"검증 성공: row={len(rows)}, first={parsed_list[0]}, last={parsed_list[-1]}"

def verify_append(output_file, just_written_lines):
    """
    방금 쓴 마지막 n줄이 실제로 동일한지 확인
    """
    if not just_written_lines:
        return False, "방금 쓴 줄이 없음"

    tail = get_tail_lines(output_file, len(just_written_lines))
    if tail != just_written_lines:
        return False, "파일 마지막 구간이 방금 append한 내용과 다름"

    return True, f"append 검증 성공: {len(just_written_lines)}줄 일치"

def make_driver():
    options = Options()
    return webdriver.Chrome(options=options)

def main():
    base_dir = Path(PATH_BASE)
    base_dir.mkdir(parents=True, exist_ok=True)

    output_path = Path(PATH_USERLIST)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    total_pages = END_PAGE - START_PAGE + 1
    total_written = 0
    success_pages = 0
    failed_pages = []

    log("INFO", f"작업 시작 | START_PAGE={START_PAGE}, END_PAGE={END_PAGE}, total_pages={total_pages}")
    log("INFO", f"HTML 임시 폴더: {base_dir}")
    log("INFO", f"출력 파일: {output_path}")

    for idx, page_num in enumerate(range(START_PAGE, END_PAGE + 1), start=1):
        page_start = time.time()

        url = f"https://solved.ac/ranking/tier?page={page_num}"
        html_path = base_dir / f"page_{page_num}.html"

        log("INFO", f"----- [{idx}/{total_pages}] page={page_num} 시작 -----")
        log("INFO", f"이동 URL: {url}")

        driver = make_driver()
        save_ok = False
        parse_ok = False

        try:
            log("INFO", f"page={page_num} 브라우저 실행")
            driver.get(url)

            WebDriverWait(driver, 20).until(
                lambda d: d.execute_script("return document.readyState") == "complete"
            )

            title = driver.title
            current_url = driver.current_url
            page_source = driver.page_source

            log("INFO", f"page={page_num} title = {title}")
            log("INFO", f"page={page_num} url   = {current_url}")
            log("INFO", f"page={page_num} html 길이 = {len(page_source):,} chars")

            html_path.write_text(page_source, encoding="utf-8")
            log("INFO", f"page={page_num} HTML 저장 완료 -> {html_path}")

            inspect_result = inspect_html(html_path)
            log(
                "INFO",
                f"page={page_num} HTML 검사 | title='{inspect_result['title']}' | "
                f"rows={inspect_result['row_count']} | profile_links={inspect_result['profile_link_count']}"
            )

            # 최소한의 정상성 검사
            if EXPECTED_TITLE_KEYWORD not in inspect_result["title"]:
                raise RuntimeError(f"제목이 예상과 다름: {inspect_result['title']}")

            if not inspect_result["has_table"]:
                raise RuntimeError("랭킹 표 row가 없음")

            if inspect_result["profile_link_count"] == 0:
                raise RuntimeError("프로필 링크가 없음")

            save_ok = True

        except Exception as e:
            log("ERROR", f"page={page_num} 저장/검사 실패 / {e}")

        finally:
            try:
                driver.quit()
                log("INFO", f"page={page_num} 브라우저 종료")
            except Exception as e:
                log("ERROR", f"page={page_num} 브라우저 종료 실패 / {e}")

        if not save_ok:
            failed_pages.append(page_num)
            elapsed = time.time() - page_start
            log("WARN", f"page={page_num} 실패 -> HTML 보존: {html_path}")
            log("INFO", f"----- [{idx}/{total_pages}] page={page_num} 종료 | elapsed={elapsed:.2f}s -----")
            continue

        try:
            parsed_list = get_list(html_path)
            log("INFO", f"page={page_num} 파싱 완료 | parsed_count={len(parsed_list)}")

            if parsed_list:
                preview_count = min(3, len(parsed_list))
                log("INFO", f"page={page_num} 앞 {preview_count}개: {parsed_list[:preview_count]}")
                log("INFO", f"page={page_num} 마지막 1개: {parsed_list[-1]}")

            verified, verify_msg = verify_parsed_data(html_path, parsed_list)
            if not verified:
                raise RuntimeError(f"파싱 검증 실패 / {verify_msg}")
            log("INFO", f"page={page_num} 파싱 검증 성공 | {verify_msg}")

            written_lines = append_to_txt(parsed_list, output_path)
            log("INFO", f"page={page_num} TXT append 완료 | lines={len(written_lines)}")

            append_verified, append_msg = verify_append(output_path, written_lines)
            if not append_verified:
                raise RuntimeError(f"append 검증 실패 / {append_msg}")
            log("INFO", f"page={page_num} append 검증 성공 | {append_msg}")

            parse_ok = True
            success_pages += 1
            total_written += len(parsed_list)
            if parsed_list:
                log_current_page_success(
                    page_num=page_num,
                    total_count=len(parsed_list),
                    first_item=parsed_list[0],
                    last_item=parsed_list[-1]
                )

        except Exception as e:
            log("ERROR", f"page={page_num} 파싱/기록 실패 / {e}")
            failed_pages.append(page_num)

        finally:
            # 성공했을 때만 삭제, 실패했으면 디버깅용으로 남김
            if parse_ok:
                try:
                    if html_path.exists():
                        html_path.unlink()
                        log("INFO", f"page={page_num} HTML 삭제 완료 -> {html_path}")
                except Exception as e:
                    log("ERROR", f"page={page_num} HTML 삭제 실패 / {e}")
            else:
                log("WARN", f"page={page_num} 실패했으므로 HTML 보존 -> {html_path}")

        elapsed = time.time() - page_start
        done_ratio = idx / total_pages * 100
        log(
            "INFO",
            f"진행률 {idx}/{total_pages} ({done_ratio:.1f}%) | "
            f"성공 페이지={success_pages} | 누적 저장 줄수={total_written} | elapsed={elapsed:.2f}s"
        )
        log("INFO", f"----- [{idx}/{total_pages}] page={page_num} 종료 -----")

    log("INFO", "전체 작업 종료")
    log("INFO", f"최종 성공 페이지 수: {success_pages}/{total_pages}")
    log("INFO", f"최종 누적 저장 줄수: {total_written}")
    if failed_pages:
        log("WARN", f"실패 페이지 목록: {failed_pages}")
    else:
        log("INFO", "실패 페이지 없음")

if __name__ == "__main__":
    main()
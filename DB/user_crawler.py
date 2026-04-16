from playwright.sync_api import sync_playwright
from playwright.sync_api import TimeoutError as PlaywrightTimeoutError

START_PAGE = 1
END_PAGE = 2
OUTPUT_FILE = "solved_ranking.txt"

def log(msg):
    print(msg, flush=True)

def save_debug(page, page_num):
    try:
        with open(f"debug_page_{page_num}.html", "w", encoding="utf-8") as ef:
            ef.write(page.content())
        page.screenshot(path=f"debug_page_{page_num}.png", full_page=True)
        log(f"[DEBUG] debug_page_{page_num}.html / png 저장 완료")
    except Exception as e:
        log(f"[DEBUG] 디버그 저장 실패: {e}")

def crawl():
    total = 0
    log("[INFO] 크롤링 시작")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
            for page_num in range(START_PAGE, END_PAGE + 1):
                url = f"https://solved.ac/ranking/tier?page={page_num}"
                log(f"\n[INFO] page={page_num} 이동 시작 -> {url}")

                try:
                    response = page.goto(url, wait_until="domcontentloaded", timeout=30000)

                    status = response.status if response else None
                    log(f"[INFO] page={page_num} 응답 코드: {status}")

                    # 여기서 바로 차단
                    if status != 200:
                        log(f"[ERROR] page={page_num} / HTTP {status} -> selector 대기 건너뜀")
                        save_debug(page, page_num)
                        continue

                    log(f"[INFO] page={page_num} 테이블 대기 시작")
                    page.wait_for_selector("table tbody tr", timeout=15000)
                    log(f"[INFO] page={page_num} 테이블 감지 성공")

                    rows = page.locator("table tbody tr")
                    row_count = rows.count()
                    log(f"[INFO] page={page_num} row_count={row_count}")

                    if row_count == 0:
                        log(f"[WARN] page={page_num} / 데이터 없음")
                        save_debug(page, page_num)
                        continue

                    for i in range(row_count):
                        try:
                            row = rows.nth(i)
                            cols = row.locator("td")
                            col_count = cols.count()

                            if col_count < 2:
                                log(f"[WARN] page={page_num} row={i+1} / 컬럼 부족")
                                continue

                            rank = cols.nth(0).inner_text().strip()

                            link = cols.nth(1).locator("a")
                            if link.count() > 0:
                                nickname = link.first.inner_text().strip()
                            else:
                                nickname = cols.nth(1).inner_text().strip()

                            log(f"[DEBUG] page={page_num} row={i+1} rank='{rank}' nickname='{nickname}'")

                            if rank and nickname:
                                f.write(f"{rank} {nickname}\n")
                                total += 1

                        except Exception as row_error:
                            log(f"[ERROR] page={page_num} row={i+1} 파싱 실패 / {row_error}")

                    log(f"[OK] page={page_num} 완료 / rows={row_count} / total={total}")
                    page.wait_for_timeout(200)

                except PlaywrightTimeoutError as e:
                    log(f"[ERROR] page={page_num} 타임아웃 / {e}")
                    save_debug(page, page_num)

                except Exception as e:
                    log(f"[ERROR] page={page_num} / {e}")
                    save_debug(page, page_num)

        browser.close()

    log(f"\n[INFO] 크롤링 종료")
    log(f"완료: 총 {total}개 저장됨 -> {OUTPUT_FILE}")

if __name__ == "__main__":
    crawl()
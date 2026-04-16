from bs4 import BeautifulSoup

def get_list(file):
    result = []

    with open(file, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f, "html.parser")

    rows = soup.select("table tbody tr")

    for row in rows:
        cols = row.find_all("td")
        if len(cols) < 2:
            continue

        rank = cols[0].get_text(" ", strip=True)
        nickname_tag = cols[1].select_one("a b")
        nickname = nickname_tag.get_text(strip=True) if nickname_tag else cols[1].get_text(" ", strip=True)

        result.append((rank, nickname))

    return result
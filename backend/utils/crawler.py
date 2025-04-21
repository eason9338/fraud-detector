import requests
from bs4 import BeautifulSoup

def fetch_url_content(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    paragraphs = soup.find_all("p")
    return "\n".join(p.text for p in paragraphs)


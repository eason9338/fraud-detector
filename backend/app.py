from flask import Flask, request, jsonify
from utils.chat_analyzer import analyze_chat         
from utils.news_analyzer import analyze_news         
from utils.crawler import fetch_url_content
from utils.whisper_util import transcribe_audio

app = Flask(__name__)

@app.route("/analyze-chat", methods=["POST"])
def analyze_chat_api():
    data = request.get_json()
    text = data.get("text", "")
    result = analyze_chat(text)
    return jsonify(result)

@app.route("/analyze-news", methods=["POST"])
def analyze_text_api():
    data = request.get_json()
    text = data.get("text", "")
    result = analyze_news(text)
    return jsonify(result)

@app.route("/analyze-url", methods=["POST"])
def analyze_url_api():
    data = request.get_json()
    url = data.get("url", "")
    content = fetch_url_content(url)
    result = analyze_news(content)  # ✅ 用 analyze_news
    return jsonify(result)

@app.route("/analyze-audio", methods=["POST"])
def analyze_audio_api():
    file = request.files['file']
    text = transcribe_audio(file)
    result = analyze_chat(text)  # ✅ 音檔 → 詐騙聊天，所以用 analyze_chat
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)


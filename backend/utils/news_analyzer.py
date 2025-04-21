import re
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline

# ✅ 假新聞關鍵字庫（可擴充）
fake_news_keywords = [
    "驚爆", "震撼", "網瘋傳", "不轉不是人", "真相曝光", "絕對真實", "限時分享",
    "官方證實", "來源可靠", "驚人內幕", "千萬別忽略", "你不能不知道"
]

# ✅ 載入中文 RoBERTa 分類模型
tokenizer = AutoTokenizer.from_pretrained("uer/roberta-base-finetuned-jd-binary-chinese")
model = AutoModelForSequenceClassification.from_pretrained("uer/roberta-base-finetuned-jd-binary-chinese")
classifier = pipeline("text-classification", model=model, tokenizer=tokenizer)

def analyze_news(text):
    text = re.sub(r'\s+', ' ', text)

    # 1️⃣ 關鍵字分析
    matched_keywords = [kw for kw in fake_news_keywords if kw in text]
    keyword_score = len(matched_keywords) / len(fake_news_keywords)

    # 2️⃣ 模型推論
    try:
        result = classifier(text[:512])[0]  # 截斷過長輸入
        model_label = result["label"]       # LABEL_0 or LABEL_1
        model_confidence = round(result["score"], 2)
    except:
        model_label = "UNKNOWN"
        model_confidence = 0.0

    print("🧪 raw model result:", result)
    print("🔍 你目前載入的模型是：", model.config._name_or_path)

    model_score = model_confidence

    # 4️⃣ 綜合評分（模型 70%，關鍵字 30%）
    final_score = round(0.7 * model_score + 0.3 * keyword_score, 2)

    return {
        "type": "新聞偵測",
        "input_text": text[:300] + ("..." if len(text) > 300 else ""),
        "keyword_matches": matched_keywords,
        "keyword_score": round(keyword_score, 2),
        "model_confidence": model_confidence,
        "final_score": final_score,
        "risk_level": (
            "高風險" if final_score > 0.7 else
            "中風險" if final_score > 0.4 else
            "低風險"
        ),
        "suggestion": (
            "⚠️ 這篇新聞可能是假訊息，請勿任意轉傳。" if final_score > 0.7 else
            "此新聞內容有可疑成分，建議查證來源。" if final_score > 0.4 else
            "該新聞目前風險低，仍建議保留懷疑精神。"
        )
    }

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import yfinance as yf
import random
import os
import pandas as pd
import requests

app = Flask(__name__)
CORS(app)

# ✅ DATABASE CONFIG
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# 👤 USER MODEL
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

# ✅ CREATE DATABASE
with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return "NiveshAI Backend is Running 🚀"

# ================= 🔐 AUTH =================

@app.route("/signup", methods=["POST"])
def signup():
    try:
        data = request.json
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"error": "Email & Password required"})

        if User.query.filter_by(email=email).first():
            return jsonify({"error": "User already exists"})

        new_user = User(email=email, password=password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "Signup successful 🚀"})
    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.json
        email = data.get("email")
        password = data.get("password")

        user = User.query.filter_by(email=email, password=password).first()

        if not user:
            return jsonify({"error": "Invalid credentials"})

        return jsonify({"message": "Login successful 🚀"})
    except Exception as e:
        return jsonify({"error": str(e)})

# ================= 📰 NEWS =================

NEWS_API_KEY = "38facb2ab7a145cabf4581f1d54aa874"  

def get_stock_news(symbol):
    try:
        clean_symbol = symbol.replace(".NS", "")
        url = f"https://newsapi.org/v2/everything?q={clean_symbol}&apiKey={NEWS_API_KEY}&pageSize=3"
        response = requests.get(url)
        data = response.json()

        articles = data.get("articles", [])

        news_list = []
        sentiment = 0

        for article in articles:
            title = article.get("title", "")

            if "rise" in title.lower() or "gain" in title.lower():
                sentiment += 1
            elif "fall" in title.lower() or "loss" in title.lower():
                sentiment -= 1

            news_list.append({
                "title": title,
                "url": article.get("url")
            })

        return news_list, sentiment
    except:
        return [], 0

# ================= 🧠 EXPLANATION =================

def generate_explanation(decision, sentiment):
    if decision == "BUY":
        if sentiment > 0:
            return "Stock rising with positive news support."
        else:
            return "Trend is positive but news is mixed."
    elif decision == "SELL":
        if sentiment < 0:
            return "Stock falling with negative news."
        else:
            return "Weak signals, caution advised."
    else:
        return "Market stable, better to hold."

# ================= 📊 STOCK =================

@app.route("/stock/<symbol>")
def get_stock(symbol):
    try:
        stock = yf.Ticker(symbol)
        hist = stock.history(period="1mo")

        if hist is None or hist.empty:
            return jsonify({"error": "No data found"})

        close = hist["Close"]

        if isinstance(close, pd.DataFrame):
            close = close.iloc[:, 0]

        prices = close.dropna().values.flatten().tolist()

        if len(prices) < 3:
            return jsonify({"error": "Not enough data"})

        latest = prices[-1]
        prev = prices[-2]
        first = prices[0]

        change_percent = ((latest - first) / first) * 100
        day_change = ((latest - prev) / prev) * 100

        score = 50
        reasons = []

        if change_percent > 2:
            score += 20
            reasons.append(f"Uptrend +{round(change_percent,2)}%")
        elif change_percent < -2:
            score -= 20
            reasons.append(f"Downtrend {round(change_percent,2)}%")

        if day_change > 1:
            score += 10
            reasons.append("Strong buying today")
        elif day_change < -1:
            score -= 10
            reasons.append("Selling pressure today")

        volatility = max(prices) - min(prices)
        if volatility > (0.03 * latest):
            reasons.append("High volatility")

        score = int(max(10, min(score, 95)))

        decision = "BUY" if score >= 70 else "SELL" if score <= 40 else "HOLD"

        emotion = "GREED 🤑" if score > 70 else "FEAR 😨" if score < 40 else "NEUTRAL 😐"
        advice = "Avoid overbuying" if score > 70 else "Avoid panic selling" if score < 40 else "Wait"

        panic_sell = random.randint(-10, -3)
        hold_gain = random.randint(5, 20)

        risk = "Low Risk 🟢" if score >= 70 else "Moderate Risk 🟡" if score >= 40 else "High Risk 🔴"

        why_not = random.choice([
            "Market uncertainty",
            "Volatility risk",
            "No strong confirmation"
        ])

        news, sentiment = get_stock_news(symbol)
        explanation = generate_explanation(decision, sentiment)

        return jsonify({
            "prices": prices,
            "decision": decision,
            "score": score,
            "reasons": reasons,
            "emotion": emotion,
            "advice": advice,
            "panic_sell": panic_sell,
            "hold_gain": hold_gain,
            "risk": risk,
            "why_not": why_not,
            "news": news,
            "explanation": explanation
        })

    except Exception as e:
        return jsonify({"error": str(e)})

# ================= 📊 MARKET SUMMARY =================

@app.route("/market-summary")
def market_summary():
    try:
        stocks = ["RELIANCE.NS","TCS.NS","INFY.NS","HDFCBANK.NS","SBIN.NS"]

        result = []

        for s in stocks:
            data = yf.Ticker(s)
            hist = data.history(period="2d")
            prices = hist['Close'].dropna().tolist()

            if len(prices) >= 2:
                change = ((prices[-1] - prices[-2]) / prices[-2]) * 100
                result.append({"stock": s, "change": change})

        gainers = sorted(result, key=lambda x: x["change"], reverse=True)[:3]
        losers = sorted(result, key=lambda x: x["change"])[:3]

        return jsonify({"gainers": gainers, "losers": losers})

    except Exception as e:
        return jsonify({"error": str(e)})

# ================= 🚀 RUN =================

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
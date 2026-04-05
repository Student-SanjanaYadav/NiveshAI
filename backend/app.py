<<<<<<< HEAD
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import yfinance as yf
import random
import os
import pandas as pd

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

# ================= 🔐 AUTH ROUTES =================

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

# ================= 📊 STOCK API (FIXED) =================

@app.route("/stock/<symbol>")
def get_stock(symbol):
    try:
        # ✅ FIXED DATA FETCH (IMPORTANT CHANGE)
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

        # 🔥 AI LOGIC
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

        # 🎯 DECISION
        if score >= 70:
            decision = "BUY"
        elif score <= 40:
            decision = "SELL"
        else:
            decision = "HOLD"

        # 🧠 EMOTION
        if score > 70:
            emotion = "GREED 🤑"
            advice = "Market is strong but avoid overbuying"
        elif score < 40:
            emotion = "FEAR 😨"
            advice = "Avoid panic selling"
        else:
            emotion = "NEUTRAL 😐"
            advice = "Wait for clear signals"

        # 💀 PANIC SIMULATOR
        panic_sell = random.randint(-10, -3)
        hold_gain = random.randint(5, 20)

        # 🎯 RISK
        if score >= 70:
            risk = "Low Risk 🟢"
        elif score >= 40:
            risk = "Moderate Risk 🟡"
        else:
            risk = "High Risk 🔴"

        # ❌ WHY NOT
        if score >= 70:
            why_not = random.choice([
                "Stock already near peak",
                "Risk of profit booking",
                "Overbought conditions"
            ])
        elif score >= 40:
            why_not = random.choice([
                "No strong breakout yet",
                "Sideways movement",
                "Low volume confirmation"
            ])
        else:
            why_not = random.choice([
                "Downtrend ongoing",
                "Weak momentum",
                "Selling pressure high"
            ])

        if not reasons:
            reasons.append("Market is sideways")

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
            "why_not": why_not
        })

    except Exception as e:
        return jsonify({"error": str(e)})

# ================= 🚀 RUN =================

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        debug=True
=======
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import yfinance as yf
import random
import os
import pandas as pd
import requests   # ✅ NEW

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

# ================= 🔐 AUTH ROUTES =================

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

# ================= 🧠 NEW: NEWS FUNCTION =================

def get_stock_news(symbol):
    try:
        url = f"https://newsapi.org/v2/everything?q={symbol}&apiKey=38facb2ab7a145cabf4581f1d54aa874&pageSize=3"
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


# ================= 🧠 NEW: EXPLANATION =================

def generate_explanation(decision, sentiment):
    if decision == "BUY":
        if sentiment > 0:
            return "The stock is rising with positive news support, indicating growth potential."
        else:
            return "Stock trend is positive but news is mixed, invest cautiously."

    elif decision == "SELL":
        if sentiment < 0:
            return "Stock is declining and negative news suggests further downside."
        else:
            return "Stock is weak but some positive signals exist."

    else:
        return "Stock is stable with no strong signals. Holding is safer."

# ================= 📊 STOCK API (YOUR ORIGINAL + ADDITIONS) =================

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

        if score >= 70:
            decision = "BUY"
        elif score <= 40:
            decision = "SELL"
        else:
            decision = "HOLD"

        if score > 70:
            emotion = "GREED 🤑"
            advice = "Market is strong but avoid overbuying"
        elif score < 40:
            emotion = "FEAR 😨"
            advice = "Avoid panic selling"
        else:
            emotion = "NEUTRAL 😐"
            advice = "Wait for clear signals"

        panic_sell = random.randint(-10, -3)
        hold_gain = random.randint(5, 20)

        if score >= 70:
            risk = "Low Risk 🟢"
        elif score >= 40:
            risk = "Moderate Risk 🟡"
        else:
            risk = "High Risk 🔴"

        if score >= 70:
            why_not = random.choice([
                "Stock already near peak",
                "Risk of profit booking",
                "Overbought conditions"
            ])
        elif score >= 40:
            why_not = random.choice([
                "No strong breakout yet",
                "Sideways movement",
                "Low volume confirmation"
            ])
        else:
            why_not = random.choice([
                "Downtrend ongoing",
                "Weak momentum",
                "Selling pressure high"
            ])

        if not reasons:
            reasons.append("Market is sideways")

        # ✅ NEW: NEWS + SENTIMENT
        news, sentiment = get_stock_news(symbol)

        # ✅ NEW: EXPLANATION
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
            "news": news,              # ✅ NEW
            "explanation": explanation # ✅ NEW
        })

    except Exception as e:
        return jsonify({"error": str(e)})

# ================= 📊 NEW: MARKET SUMMARY =================

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
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        debug=True
>>>>>>> 9936c0e (final update with newa)
    )
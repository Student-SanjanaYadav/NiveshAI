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
    )
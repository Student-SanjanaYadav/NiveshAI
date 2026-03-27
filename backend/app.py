from flask import Flask, jsonify
from flask_cors import CORS
import yfinance as yf

print("SERVER STARTING...")



app = Flask(__name__)
CORS(app)

@app.route("/stock/<symbol>")
def get_stock(symbol):
    stock = yf.Ticker(symbol)
    hist = stock.history(period="5d")

    prices = hist["Close"].tolist()

    # Simple AI logic
    if prices[-1] > prices[0]:
        decision = "BUY"
    else:
        decision = "SELL"

    return jsonify({
        "prices": prices,
        "decision": decision
    })

import os

if __name__ == "__main__":
    print("SERVER STARTING...")
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        debug=False
    )
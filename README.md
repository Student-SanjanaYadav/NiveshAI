 NiveshAI – AI-Based Stock Decision Platform

##Overview

NiveshAI is a smart stock analysis platform that helps users make better investment decisions using real market data and AI-based scoring logic.
It simplifies complex stock data into clear insights like **Buy, Sell, or Hold**, along with risk analysis and emotional indicators.

---

##  Problem Statement

Many beginner investors struggle with:

* Understanding stock market data
* Making informed decisions
* Controlling emotional trading

This often leads to poor investment choices and financial losses.

---

##  Solution

NiveshAI solves this by:

* Fetching real stock data from Yahoo Finance
* Analyzing trends, volatility, and price movement
* Generating a smart decision (Buy/Sell/Hold)
* Providing risk level and emotional insights

---

##  Tech Stack

### 🔹 Frontend

* React.js
* Tailwind CSS
* Chart.js

### 🔹 Backend

* Flask (Python)
* SQLAlchemy (Database ORM)
* SQLite (Database)

### 🔹 APIs

* Yahoo Finance (via yfinance library)

### 🔹 Deployment

* Frontend: Vercel
* Backend: Render

---

## Features

* 📊 Real-time stock data analysis
* 🤖 AI-based scoring system
* 📈 Interactive stock charts
* 💼 Portfolio simulation
* 🧠 Market emotion indicator (Fear / Greed)
* 🔐 User authentication (Login/Signup)

---

##  Screenshots

### Dashboard
<img width="1920" height="1080" alt="Dashboard" src="https://github.com/user-attachments/assets/c4ecc081-3390-4062-8914-3c48c33c11eb" />



### Portfolio
<img width="1920" height="1080" alt="portfolio" src="https://github.com/user-attachments/assets/ee5bfb41-9420-4156-9669-6853cd84c7a4" />



### Radar

<img width="1920" height="1080" alt="Radar" src="https://github.com/user-attachments/assets/de9e63c8-2d7b-4376-994a-b12017b8f5a2" />


---

##  How It Works

1. User enters a stock symbol
2. Backend fetches data using yfinance
3. AI logic analyzes:

   * Trend
   * Daily movement
   * Volatility
4. System generates:

   * Decision (Buy/Sell/Hold)
   * Score
   * Risk level
   * Insights

---

##  API Example

### Endpoint:

GET /stock/{symbol}

### Response:

```json
{
  "decision": "BUY",
  "score": 78,
  "risk": "Low Risk 🟢",
  "emotion": "GREED 🤑",
  "prices": [...]
}
```

---

##  Limitations

* Uses delayed market data
* AI is rule-based (not ML yet)
* Not financial advice

---

##  Future Improvements

* Real-time streaming data
* Machine learning predictions
* Personalized recommendations
* Mobile app version

---

##  Impact

* Helps beginners understand stock market
* Reduces emotional trading
* Improves decision-making

---

##  Conclusion

NiveshAI makes stock investing simple, accessible, and data-driven for everyone.

---

##  Author

Developed by Sanjana Yadav

---

## ⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!

# 🌍 BHARAT CLIMATEX

### *AI-Powered Digital Twin of India's Climate using National Data*

<p align="center">
  <b>🚀 Predict • Simulate • Adapt 🚀</b>
</p>

<p align="center">
Built for <b>Bharatiya Antariksh Hackathon 2026 (ISRO)</b>
</p>

---

## 📖 Overview

**BHARAT CLIMATEX** is an AI-powered **Digital Twin of India's Climate** designed to transform fragmented climate datasets into an intelligent, interactive decision-support platform.

By integrating **IMD meteorological datasets**, **ISRO satellite observations**, and **Artificial Intelligence**, the platform enables users to visualize current climate conditions, predict future weather patterns, simulate climate scenarios, and assess environmental risks.

The project aims to support policymakers, researchers, disaster management agencies, urban planners, and climate scientists in making informed, data-driven decisions for a climate-resilient Bharat.

---

## 🚀 Key Features

### 🌍 Interactive Climate Dashboard

* Live climate overview *(mock data)*
* Temperature & rainfall monitoring
* Interactive India map
* Pilot region visualization (Rajasthan)
* Weekly climate trends

---

### 🛰️ Digital Twin Visualization

* Current Climate State
* Historical Climate Trends
* Future Climate Predictions
* Timeline-based climate visualization

---

### 🤖 AI Climate Prediction *(Planned)*

Future AI integration includes:

* **LSTM** → Rainfall Forecasting
* **XGBoost** → Temperature Prediction
* **Random Forest** → Climate Risk Assessment

---

### 🔄 Scenario Simulator

Perform **"What-if" climate simulations** by modifying:

* 🌡 Temperature
* 🌧 Rainfall

Simulation Outputs:

* 🔥 Heatwave Risk
* 🌊 Flood Risk
* 💧 Water Stress
* 🌾 Agricultural Impact

---

### 📈 Climate Risk Analysis

Analyze district-level risks including:

* Heat Risk
* Drought Vulnerability
* Flood Probability
* Climate Stability Indicators

---

## 🏗 System Architecture

```text
                 IMD + INSAT Climate Data
                           │
                           ▼
              Data Cleaning & Integration
                           │
                           ▼
                 AI Prediction Engine
                           │
                           ▼
                Digital Twin Simulator
                           │
                           ▼
              Scenario Simulation Engine
                           │
                           ▼
             Interactive Climate Dashboard
                           │
                           ▼
               Climate Decision Support
```

---

## 🧠 AI Models *(Future Integration)*

| Model            | Purpose                 |
| ---------------- | ----------------------- |
| 🧠 LSTM          | Rainfall Forecasting    |
| ⚡ XGBoost        | Temperature Prediction  |
| 🌍 Random Forest | Climate Risk Assessment |

> **Note:**
> The current prototype uses realistic mock climate data. The architecture is designed to seamlessly integrate trained AI models in future versions.

---

## 🛰 Data Sources

The project is designed to integrate official Indian climate datasets.

| Dataset                                 | Source                          |
| --------------------------------------- | ------------------------------- |
| 🌧 IMD Gridded Rainfall                 | India Meteorological Department |
| 🌡 IMD Maximum Temperature              | India Meteorological Department |
| 🌡 IMD Minimum Temperature              | India Meteorological Department |
| 🛰 INSAT Land Surface Temperature (LST) | MOSDAC                          |
| 🌊 INSAT Sea Surface Temperature (SST)  | MOSDAC                          |
| ☁ INSAT Rainfall Products               | MOSDAC                          |
| 🌍 Earth Observation Data               | MOSDAC / ISRO                   |

---

## 🛠 Tech Stack

### 🎨 Frontend

* React.js
* JavaScript
* Vite
* Tailwind CSS
* React Router

### 📊 Visualization

* React Leaflet
* OpenStreetMap
* Recharts
* Framer Motion
* Lucide React

### 🤖 Future Integrations

* FastAPI
* TensorFlow
* PostgreSQL
* Gemini API
* Real-time IMD & ISRO datasets

---

## 📂 Project Structure

```bash
BHARAT-CLIMATEX/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── pages/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/bharat-climatex.git
```

### 2️⃣ Navigate to the Project

```bash
cd bharat-climatex
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Start Development Server

```bash
npm run dev
```

The application will run at:

```text
http://localhost:5173
```

---

## 🌟 Future Roadmap

* ✅ Integrate real IMD datasets
* ✅ Integrate INSAT satellite products
* ✅ AI-powered rainfall forecasting
* ✅ Temperature prediction engine
* ✅ Digital Twin live synchronization
* ✅ Climate Risk Index
* ✅ AI Climate Advisor
* ✅ District-level forecasting
* ✅ Nationwide deployment
* ✅ Progressive Web App (PWA)
* ✅ API integration with ISRO platforms

---

## 🎯 Hackathon Alignment

This project directly addresses **Problem Statement 5**:

> **AI-Powered Digital Twin of India's Climate using India's National Data**

### ✔ Objectives Covered

* AI-based rainfall prediction
* AI-based temperature prediction
* Digital Twin implementation
* Interactive geospatial visualization
* Scenario-based climate simulation
* Scalable framework for national deployment

---

## 🌍 Vision

**BHARAT CLIMATEX** aims to become India's intelligent climate intelligence platform by transforming satellite observations and meteorological data into actionable insights.

Our vision is to empower governments, researchers, disaster management authorities, and communities with AI-driven climate predictions and scenario simulations that support sustainable development and climate resilience.

---

## 👥 Team

**Team Name:** BrainBytes

**Project:** BHARAT CLIMATEX

**Hackathon:** Bharatiya Antariksh Hackathon 2026 (ISRO)

---

## 📜 License

This project is developed for educational, research, and hackathon purposes.

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub!

---

<p align="center">
<b>🌍 Built with ❤️ for the Bharatiya Antariksh Hackathon 2026 🚀</b>
</p>


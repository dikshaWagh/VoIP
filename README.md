<div align="center">
  <h1>📞 VoIP Call Tracker 📡</h1>
  <p>
    <strong>A powerful tool to monitor and analyze your VoIP calls in real-time. No more guessing games, just pure data. 📊</strong>
  </p>
</div>

<br />

## ✨ Features

-   **Live Call Monitoring:** See active calls as they happen. 🔴
-   **Detailed Call Logs:** Search and filter through a complete history of calls. 📚
-   **SIP Flow Diagrams:** Visualize the entire lifecycle of a call from start to finish. 🌊
-   **Real-time Quality Metrics:** Track jitter, packet loss, and other RTP statistics to ensure call quality. 📈
-   **Modern Web UI:** A sleek and responsive interface built with React and Vite. 💻

## 🛠️ Methodology

This project uses a client-server architecture to provide real-time VoIP monitoring and analysis.

### 🐍 Backend (The Brains)

1.  **Packet Sniffing:** A high-performance Python sniffer, built with Scapy, continuously captures network traffic. It's laser-focused on VoIP protocols, primarily **SIP** (for call signaling) and **RTP** (for the actual voice data).
2.  **Data Extraction & Analysis:** As packets are captured, the backend service intelligently parses them:
    -   **SIP packets** are decoded to understand the call flow: who is calling whom, when the call is ringing, when it's answered, and when it ends.
    -   **RTP packets** are analyzed to calculate critical Quality of Service (QoS) metrics like jitter and packet loss, which are essential for diagnosing call quality issues.
3.  **Data Storage:** All this valuable information is persisted in a database, creating a historical log of every call for later analysis and review.
4.  **API Layer:** A robust **FastAPI** server exposes the data through a RESTful API, making it available for the frontend to consume.

### ⚛️ Frontend (The Beauty)

1.  **Data Visualization:** A modern single-page application (SPA) built with **React** serves as the user's dashboard.
2.  **Real-time Updates:** The frontend communicates with the backend API to fetch and display data, providing:
    -   A live feed of ongoing calls.
    -   Searchable and filterable call logs.
    -   Interactive diagrams that visualize the SIP message flow for each call.
    -   Clean charts and graphs to represent call quality metrics over time.

## 🚀 Tech Stack

| Component | Technology                                       |
| :-------- | :----------------------------------------------- |
| **Backend** | 🐍 Python, FastAPI, Scapy, SQLAlchemy            |
| **Frontend**| ⚛️ React, Vite, Chart.js, Axios                  |
| **Database**| 🗄️ SQLite (or your favorite relational database) |

## 🏁 Getting Started

### Prerequisites

-   Python 3.8+
-   Node.js 14+

### Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn main:app --reload
```

### Frontend Setup

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

<div align="center">
  <p>
    <strong>Happy Tracking! 🎉</strong>
  </p>
</div>

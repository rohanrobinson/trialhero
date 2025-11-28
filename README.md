# Trial Hero

A full-stack application for searching clinical trials from ClinicalTrials.gov.

## Architecture

- **Frontend**: React + TypeScript + Vite
- **Backend**: Python + FastAPI
- **API Source**: ClinicalTrials.gov Public API

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the backend server:
```bash
python main.py
```

Or using uvicorn directly:
```bash
uvicorn main:app --reload --port 8000
```

The backend API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd trial-forge
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (or the port Vite assigns)

## Development

### Running Both Servers

You'll need to run both the backend and frontend servers:

**Terminal 1 - Backend:**
```bash
cd backend
python main.py
```

**Terminal 2 - Frontend:**
```bash
cd trial-forge
npm run dev
```

### API Documentation

Once the backend is running, you can access:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Features

- Search clinical trials by condition, keyword, or other criteria
- View trial details including:
  - NCT ID
  - Title
  - Status
  - Summary
- Pagination support for large result sets

## API Endpoints

### POST /api/search
Search for clinical trials.

Request:
```json
{
  "query": "cancer",
  "page_size": 10,
  "page_token": null
}
```

### GET /api/trial/{nct_id}
Get detailed information about a specific trial by NCT ID.

## Environment Variables

### Frontend
- `VITE_API_URL`: Backend API URL (defaults to using Vite proxy in development)

### Backend
No environment variables required. The ClinicalTrials.gov API is public and doesn't require authentication.

## Project Structure

```
Trial-Hero/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   └── README.md           # Backend documentation
├── trial-forge/
│   ├── src/
│   │   ├── api/
│   │   │   └── getClinicalTrial.ts  # API client
│   │   ├── App.tsx         # Main React component
│   │   └── ...
│   └── ...
└── README.md               # This file
```



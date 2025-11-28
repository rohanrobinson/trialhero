# Trial Hero Backend

Python backend API for fetching clinical trial data from ClinicalTrials.gov.

## Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
python main.py
```

Or using uvicorn directly:
```bash
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

## API Endpoints

### Health Check
- `GET /health` - Check if the API is running

### Search Trials
- `POST /api/search` - Search for clinical trials
  - Request body:
    ```json
    {
      "query": "cancer",
      "page_size": 10,
      "page_token": null
    }
    ```
  - Response:
    ```json
    {
      "studies": [...],
      "next_page_token": "...",
      "total_count": 100
    }
    ```

### Get Trial Details
- `GET /api/trial/{nct_id}` - Get detailed information about a specific trial by NCT ID

## API Documentation

FastAPI automatically generates interactive API documentation:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## ClinicalTrials.gov API

This backend uses the public ClinicalTrials.gov API v2:
- Documentation: https://clinicaltrials.gov/api/v2/docs
- No API key required



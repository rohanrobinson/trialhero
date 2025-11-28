from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
from typing import Optional, List, Dict, Any

app = FastAPI(title="Trial Hero API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ClinicalTrials.gov API base URL
CLINICAL_TRIALS_API = "https://clinicaltrials.gov/api/v2/studies"


class SearchRequest(BaseModel):
    query: str
    page_size: Optional[int] = 10
    page_token: Optional[str] = None


class SearchResponse(BaseModel):
    studies: List[Dict[str, Any]]
    next_page_token: Optional[str] = None
    total_count: Optional[int] = None


@app.get("/")
async def root():
    return {"message": "Trial Hero API is running"}


@app.get("/health")
async def health():
    return {"status": "healthy"}


@app.post("/api/search", response_model=SearchResponse)
async def search_trials(request: SearchRequest):
    """
    Search for clinical trials using the ClinicalTrials.gov API.
    
    Args:
        request: SearchRequest containing query string and pagination options
    
    Returns:
        SearchResponse with list of studies and pagination info
    """
    try:
        # Build query parameters for ClinicalTrials.gov API v2
        # Using query.term for general text search across all fields
        params = {
            "query.term": request.query,
            "pageSize": request.page_size or 10,
            "format": "json"
        }
        
        if request.page_token:
            params["pageToken"] = request.page_token
        
        # Make request to ClinicalTrials.gov API
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.get(CLINICAL_TRIALS_API, params=params)
            response.raise_for_status()
            data = response.json()
        
        # Extract studies from the response
        studies = data.get("studies", [])
        next_page_token = data.get("nextPageToken")
        total_count = data.get("totalCount")
        
        return SearchResponse(
            studies=studies,
            next_page_token=next_page_token,
            total_count=total_count
        )
    
    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=e.response.status_code,
            detail=f"ClinicalTrials.gov API error: {e.response.text}"
        )
    except httpx.RequestError as e:
        raise HTTPException(
            status_code=503,
            detail=f"Failed to connect to ClinicalTrials.gov API: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )


@app.get("/api/trial/{nct_id}")
async def get_trial_details(nct_id: str):
    """
    Get detailed information about a specific clinical trial by NCT ID.
    
    Args:
        nct_id: The NCT (National Clinical Trial) identifier
    
    Returns:
        Detailed trial information
    """
    try:
        params = {
            "filter.ids": nct_id,
            "format": "json"
        }
        
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.get(CLINICAL_TRIALS_API, params=params)
            response.raise_for_status()
            data = response.json()
        
        studies = data.get("studies", [])
        if not studies:
            raise HTTPException(status_code=404, detail=f"Trial {nct_id} not found")
        
        return studies[0]
    
    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=e.response.status_code,
            detail=f"ClinicalTrials.gov API error: {e.response.text}"
        )
    except httpx.RequestError as e:
        raise HTTPException(
            status_code=503,
            detail=f"Failed to connect to ClinicalTrials.gov API: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


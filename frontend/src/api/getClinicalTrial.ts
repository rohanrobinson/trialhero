// In development, Vite proxy will handle /api requests
// In production, set VITE_API_URL environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export interface SearchRequest {
  query: string;
  page_size?: number;
  page_token?: string | null;
}

export interface Study {
  protocolSection: {
    identificationModule: {
      nctId: string;
      briefTitle: string;
      officialTitle: string;
    };
    statusModule: {
      overallStatus: string;
      startDateStruct: {
        date: string;
      };
    };
    descriptionModule: {
      briefSummary: string;
    };
  };
  [key: string]: unknown;
}

export interface SearchResponse {
  studies: Study[];
  next_page_token?: string | null;
  total_count?: number | null;
}

export async function searchClinicalTrials(
  query: string,
  pageSize: number = 10,
  pageToken?: string | null
): Promise<SearchResponse> {
  const response = await fetch(`${API_BASE_URL}/api/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      page_size: pageSize,
      page_token: pageToken,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(error.detail || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function getTrialDetails(nctId: string): Promise<Study> {
  const response = await fetch(`${API_BASE_URL}/api/trial/${nctId}`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(error.detail || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}


export interface TextExtractResponse {
    text: string;
  }
  
  export interface FactCheckResponse {
    fact_check_result: string;
    claim: string;
    explanation: string;
    label: string;
  }
  
  export interface FactCheckRequest {
    content: string;
  }
  
  export interface FactCheckState {
    isLoading: boolean;
    error: string | null;
    extractedText: string | null;
    factCheckResult: string | null;
  }
import React from 'react';

interface FactCheckResult {
  claim?: string;
  explanation?: string;
  label?: string;
}

interface ResultDisplayProps {
  extractedText: string;
  factCheckResult: string | FactCheckResult;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  extractedText,
  factCheckResult,
}) => {
  const parsedResult = typeof factCheckResult === 'string' 
    ? JSON.parse(factCheckResult) 
    : factCheckResult;

  const getBadgeColor = (label?: string) => {
    switch (label?.toLowerCase()) {
      case 'true':
        return 'bg-success';
      case 'false':
        return 'bg-danger';
      case 'unverifiable':
        return 'bg-warning text-dark';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="mt-4">
      <div className="card mb-3">
        <div className="card-header bg-light">
          <h3 className="h5 mb-0">Extracted Text</h3>
        </div>
        <div className="card-body">
          <p className="card-text">{extractedText}</p>
        </div>
      </div>

      <div className="card">
        <div className="card-header bg-light">
          <h3 className="h5 mb-0">Fact Check Result</h3>
        </div>
        <div className="card-body">
          {parsedResult ? (
            <div className="fact-check-result">
              {parsedResult.label && (
                <div className="verification-badge mb-3">
                  <span className={`badge ${getBadgeColor(parsedResult.label)} p-2 fs-5`}>
                    {parsedResult.label.toUpperCase()}!
                  </span>
                </div>
              )}
              
              <div className="claim-section mb-3 p-3 bg-light rounded">
                <h4 className="h6">Claim:</h4>
                <p className="mb-0 fw-bold">"{parsedResult.claim}"</p>
              </div>

              {parsedResult.explanation && (
                <div className="explanation-section mb-3">
                  <h4 className="h6">Explanation:</h4>
                  <p>{parsedResult.explanation}</p>
                </div>
              )}

              <div className="verification-footer mt-4 pt-3 border-top">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted small">Verified on Blockchain: #abc123</span>
                  <div>
                    <button className="btn btn-outline-primary btn-sm me-2">
                      Check Another
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>No fact check results available.</p>
          )}
        </div>
      </div>

      <style>{`
        .fact-check-result {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .verification-badge {
          text-align: center;
        }
        .verification-badge .badge {
          font-size: 1.2rem;
          padding: 0.5rem 1.5rem;
          border-radius: 2rem;
        }
        .claim-section {
          background-color: #f8f9fa;
          border-left: 4px solid #0d6efd;
        }
        .explanation-section {
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
};

export default ResultDisplay;
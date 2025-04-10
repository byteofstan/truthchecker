import React from 'react';

interface ResultDisplayProps {
  extractedText: string;
  factCheckResult: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  extractedText,
  factCheckResult,
}) => {
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
          <div
            className="card-text"
            dangerouslySetInnerHTML={{ __html: factCheckResult }}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
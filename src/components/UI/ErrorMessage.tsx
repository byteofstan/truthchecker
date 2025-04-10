import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="alert alert-danger" role="alert">
      <p>{message}</p>
      {onRetry && (
        <button className="btn btn-danger" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
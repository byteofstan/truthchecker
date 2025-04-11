import React, { useState } from 'react';
import { extractTextFromTweet, factCheckText } from './lib/api';
import URLInputForm from './components/Form/URLInputForm';
import ResultDisplay from './components/Display/ResultDisplay';
import LoadingSpinner from './components/UI/LoadingSpinner';
import ErrorMessage from './components/UI/ErrorMessage';
import Container from './components/Layout/Container';
import { FactCheckState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<FactCheckState>({
    isLoading: false,
    error: null,
    extractedText: null,
    factCheckResult: null,
    transactionHash: null,
  });

  const handleSubmit = async (url: string) => {
    setState({
      isLoading: true,
      error: null,
      extractedText: null,
      factCheckResult: null,
      transactionHash: null,
    });

    try {
      const extractedText = await extractTextFromTweet(url);
      const { fact_check_result, transaction_hash } = await factCheckText(extractedText);

      setState({
        isLoading: false,
        error: null,
        extractedText,
        factCheckResult: fact_check_result,
        transactionHash: transaction_hash,
      });
    } catch (error) {
      setState({
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        extractedText: null,
        factCheckResult: null,
        transactionHash: null,
      });
    }
  };

  const handleRetry = () => {
    setState({
      isLoading: false,
      error: null,
      extractedText: null,
      factCheckResult: null,
      transactionHash: null,
    });
  };

  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark mb-4">
        <div className="container">
          <span className="navbar-brand">Fact Checker</span>
        </div>
      </nav>

      <Container>
        <h1 className="h2 mb-4 text-center">TruthCheck</h1>
        
        <div className="card mb-4">
          <div className="card-body">
            <URLInputForm
              onSubmit={handleSubmit}
              isLoading={state.isLoading}
            />
          </div>
        </div>

        {state.isLoading && <LoadingSpinner />}

        {state.error && (
          <ErrorMessage message={state.error} onRetry={handleRetry} />
        )}

        {state.extractedText && state.factCheckResult && (
          <ResultDisplay
            extractedText={state.extractedText}
            factCheckResult={state.factCheckResult}
            transactionHash={state.transactionHash || ''}
          />
        )}
      </Container>
    </div>
  );
};

export default App;
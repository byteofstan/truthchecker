import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface FormInputs {
  url: string;
}

interface URLInputFormProps {
  onSubmit: (url: string) => Promise<void>;
  isLoading: boolean;
}

const schema = yup.object().shape({
  url: yup
    .string()
    .required('Twitter URL is required')
    .matches(
      /^https?:\/\/(www\.)?x\.com\/.+/i,
      'Please enter a valid Twitter URL'
    ),
});

const URLInputForm: React.FC<URLInputFormProps> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit: SubmitHandler<FormInputs> = (data) => {
    onSubmit(data.url);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="form-group">
        <label htmlFor="url">Twitter URL</label>
        <input
          type="text"
          id="url"
          className={`form-control ${errors.url ? 'is-invalid' : ''}`}
          placeholder="https://x.com/username/status/1234567890"
          {...register('url')}
          disabled={isLoading}
          aria-describedby="urlHelp"
        />
        {errors.url && (
          <div className="invalid-feedback">
            {errors.url.message as React.ReactNode}
          </div>
        )}
        <small id="urlHelp" className="form-text text-muted">
          Enter the full URL of the Twitter post you want to fact-check
        </small>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
            <span className="sr-only">Loading...</span>
            {' Processing...'}
          </>
        ) : (
          'Fact Check'
        )}
      </button>
    </form>
  );
};

export default URLInputForm;
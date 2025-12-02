'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Upload, CheckCircle, X, Info } from 'lucide-react';
import { ColumnBuilder, type ColumnDefinition } from '@/components/column-builder';

interface FormData {
  name: string;
  email: string;
  company: string;
  videoUrl: string;
  textPrompt: string;
}

export function UploadForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      company: '',
      videoUrl: '',
      textPrompt: '',
    },
  });

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [columns, setColumns] = useState<ColumnDefinition[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inputMethod, setInputMethod] = useState<'video' | 'text'>('video');
  const [showHelp, setShowHelp] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const removeFile = () => {
    setVideoFile(null);
  };

  const onSubmit = async (data: FormData) => {
    // Validate columns
    if (columns.length === 0) {
      alert('Please add at least one output column');
      return;
    }

    if (columns.some((col) => !col.name.trim())) {
      alert('Please fill in all column names');
      return;
    }

    // Validate input method
    if (inputMethod === 'video' && !data.videoUrl && !videoFile) {
      alert('Please provide a video URL or upload a video file');
      return;
    }

    if (inputMethod === 'text' && !data.textPrompt.trim()) {
      alert('Please describe your research process');
      return;
    }

    // Prepare FormData for API submission
    const apiFormData = new FormData();
    apiFormData.append('name', data.name);
    apiFormData.append('email', data.email);
    apiFormData.append('company', data.company);
    apiFormData.append('videoUrl', data.videoUrl || '');
    apiFormData.append('textPrompt', data.textPrompt || '');
    apiFormData.append('inputMethod', inputMethod);
    apiFormData.append('columns', JSON.stringify(columns));

    try {
      // Call the API
      const response = await fetch('/api/submit-quote', {
        method: 'POST',
        body: apiFormData,
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to submit quote request');
      }

      // Success - show confirmation
      console.log('Quote request submitted:', result.submissionId);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      alert(
        error instanceof Error
          ? error.message
          : 'Failed to submit quote request. Please try again.'
      );
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center p-12 bg-surface border border-border rounded-lg">
        <div className="w-16 h-16 bg-background border-2 border-accent rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-accent" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Quote Request Submitted!
        </h2>
        <p className="text-lg text-text-secondary mb-6">
          You'll receive a detailed quote with credits-per-lead estimate and sample output within 2 hours.
        </p>
        <Button
          onClick={() => (window.location.href = '/')}
          variant="secondary"
        >
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto space-y-8">
      {/* Contact Information */}
      <div className="p-8 bg-surface border border-border rounded-lg">
        <h3 className="text-xl font-semibold text-text-primary mb-6">
          Your Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-text-primary mb-2"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              {...register('name', { required: 'Full name is required' })}
              className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text-primary ${
                errors.name ? 'border-red-500' : 'border-border'
              }`}
              placeholder="John Smith"
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text-primary mb-2"
            >
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text-primary ${
                errors.email ? 'border-red-500' : 'border-border'
              }`}
              placeholder="john@agency.com"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-text-primary mb-2"
            >
              Company Website *
            </label>
            <input
              type="url"
              id="company"
              {...register('company', { required: 'Company website is required' })}
              className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text-primary ${
                errors.company ? 'border-red-500' : 'border-border'
              }`}
              placeholder="https://acmeagency.com"
            />
            {errors.company && (
              <p className="text-xs text-red-500 mt-1">{errors.company.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Define Output Columns */}
      <ColumnBuilder
        columns={columns}
        onChange={setColumns}
        showValidation={columns.length === 0}
      />

      {/* Research Process Input */}
      <div className="p-8 bg-surface border border-border rounded-lg">
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Share Your Research Process *
        </h3>
        <p className="text-sm text-text-secondary mb-6">
          Show us how you'd find these leads manually.
        </p>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border">
          <button
            type="button"
            onClick={() => setInputMethod('video')}
            className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 -mb-px flex items-center gap-1 ${
              inputMethod === 'video'
                ? 'border-accent text-text-primary'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            Video (Preferred)
            <span className="relative">
              <span
                onMouseEnter={() => setShowHelp(true)}
                onMouseLeave={() => setShowHelp(false)}
                className="p-0.5 text-text-muted hover:text-text-secondary transition-colors inline-block cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                <Info className="w-3.5 h-3.5" />
              </span>
              {showHelp && (
                <div className="absolute left-0 top-6 z-10 w-80 p-4 bg-background border border-border rounded-lg shadow-lg text-left">
                  <p className="text-sm font-semibold text-text-primary mb-3">
                    What to include in your video:
                  </p>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li className="flex items-start gap-2">
                      <span className="text-text-primary mt-0.5">•</span>
                      <span>Show your typical research process step-by-step</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-text-primary mt-0.5">•</span>
                      <span>Explain the criteria for leads you're looking for</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-text-primary mt-0.5">•</span>
                      <span>Share 2-3 examples of perfect leads</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-text-primary mt-0.5">•</span>
                      <span>Mention any specific data points you need</span>
                    </li>
                  </ul>
                </div>
              )}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setInputMethod('text')}
            className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 -mb-px ${
              inputMethod === 'text'
                ? 'border-accent text-text-primary'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            Text
          </button>
        </div>

        {/* Video Tab Content */}
        {inputMethod === 'video' && (
          <>
            {/* Loom URL Option */}
            <div className="mb-6">
              <label
                htmlFor="videoUrl"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Loom/Vidyard/Other Video Sharing URL
              </label>
              <input
                type="url"
                id="videoUrl"
                {...register('videoUrl')}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text-primary"
                placeholder="https://loom.com/share/... or https://share.vidyard.com/..."
              />
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-border"></div>
              <span className="text-sm text-text-muted">OR</span>
              <div className="flex-1 h-px bg-border"></div>
            </div>

            {/* File Upload */}
            {!videoFile ? (
              <label className="block cursor-pointer">
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-accent hover:bg-background transition-colors">
                  <Upload className="w-8 h-8 text-text-muted mx-auto mb-2" />
                  <p className="text-text-primary font-medium mb-1">
                    Upload Video File
                  </p>
                  <p className="text-sm text-text-secondary mb-2">
                    Click to browse or drag and drop
                  </p>
                  <p className="text-xs text-text-muted">MP4, MOV, or WebM (max 500MB)</p>
                </div>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-surface border border-border rounded-lg flex items-center justify-center">
                    <Upload className="w-5 h-5 text-text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {videoFile.name}
                    </p>
                    <p className="text-xs text-text-muted">
                      {(videoFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="p-2 hover:bg-surface rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-text-muted" />
                </button>
              </div>
            )}
          </>
        )}

        {/* Text Tab Content */}
        {inputMethod === 'text' && (
          <div>
            <label
              htmlFor="textPrompt"
              className="block text-sm font-medium text-text-primary mb-2"
            >
              Describe Your Research Process
            </label>
            <textarea
              id="textPrompt"
              {...register('textPrompt')}
              rows={12}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text-primary resize-none"
              placeholder={`Describe the leads you want to find. For example:

"Find VP of Sales in B2B SaaS companies with recent news stating 'expansion' with minimum fundraise of $10M"

or

"Find Marketing Directors at e-commerce companies with 50-200 employees, using Shopify, located in the US, and have raised Series A funding in the last 18 months"

Be specific about:
- Job titles and seniority levels
- Company size, industry, and location
- Technologies or tools they use
- Recent activities (funding, hiring, news, etc.)
- Any other qualification criteria`}
            />
            <p className="text-xs text-text-muted mt-2">
              The more detailed you are, the better we can match your exact requirements.
            </p>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-center">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full md:w-auto min-w-[300px]"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
        </Button>
      </div>

      <p className="text-center text-sm text-text-muted">
        By submitting, you agree to receive a quote via email. No commitment
        required.
      </p>
    </form>
  );
}

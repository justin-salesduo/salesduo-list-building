import { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { UploadForm } from "@/components/upload-form";

export const metadata: Metadata = {
  title: "Get Your Quote | List Building for Agencies",
  description:
    "Share your list building process and our AI agent will analyze your requirements to deliver a detailed quote with sample leads within 2 hours.",
};

export default function UploadPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Page Content */}
        <div className="section-padding">
          <div className="container-custom">
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
                Get Your Custom Quote
              </h1>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                Share your list building process and our AI agent will analyze
                your requirements to prepare a detailed quote with sample leads
                within 2 hours.
              </p>
            </div>

            {/* Progress Steps */}
            <div className="max-w-3xl mx-auto mb-12">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-semibold">
                    1
                  </div>
                  <span className="text-sm font-medium text-text-primary">
                    Upload Video
                  </span>
                </div>
                <div className="flex-1 h-px bg-border mx-4"></div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface border-2 border-border flex items-center justify-center font-semibold text-text-muted">
                    2
                  </div>
                  <span className="text-sm text-text-muted">Receive Quote</span>
                </div>
                <div className="flex-1 h-px bg-border mx-4"></div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface border-2 border-border flex items-center justify-center font-semibold text-text-muted">
                    3
                  </div>
                  <span className="text-sm text-text-muted">Get Data</span>
                </div>
              </div>
            </div>

            {/* Upload Form */}
            <UploadForm />
          </div>
        </div>
      </main>
    </>
  );
}

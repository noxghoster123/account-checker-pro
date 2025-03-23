
import React from "react";
import { FileUpload } from "@/components/FileUpload";
import { ResultsTable } from "@/components/ResultsTable";
import { SampleDataGenerator } from "@/components/SampleDataGenerator";
import { CheckingProgress } from "@/components/CheckingProgress";
import { StatsSummary } from "@/components/StatsSummary";
import { AboutTool } from "@/components/AboutTool";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAccountChecking } from "@/hooks/useAccountChecking";

const Index = () => {
  const {
    fileContent,
    isChecking,
    checkingProgress,
    results,
    isCheckingComplete,
    handleFileAccepted,
    startChecking
  } = useAccountChecking();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/50">
      <div className="max-w-4xl w-full space-y-8 mx-auto">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-lg border overflow-hidden shadow-sm">
              <div className="p-5 border-b">
                <h2 className="text-xl font-medium">Upload Account List</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Upload a text file (.txt) with email:password format, one account per line
                </p>
              </div>
              <div className="p-5">
                <FileUpload onFileAccepted={handleFileAccepted} />
              </div>
            </div>

            {fileContent && (
              <CheckingProgress
                isChecking={isChecking}
                checkingProgress={checkingProgress}
                fileContent={fileContent}
                startChecking={startChecking}
              />
            )}

            {(results.length > 0 || isCheckingComplete) && (
              <div className="animate-slide-up">
                <ResultsTable 
                  accounts={results} 
                  isCheckingComplete={isCheckingComplete} 
                />
              </div>
            )}
          </div>

          <div className="space-y-6">
            <SampleDataGenerator />
            <AboutTool />
            <StatsSummary 
              results={results}
              isCheckingComplete={isCheckingComplete}
            />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Index;

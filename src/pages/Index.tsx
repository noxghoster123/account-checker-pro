
import React, { useState, useEffect } from "react";
import { FileUpload } from "@/components/FileUpload";
import { ResultsTable } from "@/components/ResultsTable";
import { SampleDataGenerator } from "@/components/SampleDataGenerator";
import { checkAccounts, AccountCheckResult } from "@/utils/accountChecker";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [checkingProgress, setCheckingProgress] = useState(0);
  const [results, setResults] = useState<AccountCheckResult[]>([]);
  const [isCheckingComplete, setIsCheckingComplete] = useState(false);
  const { toast } = useToast();
  
  const handleFileAccepted = (content: string) => {
    setFileContent(content);
    // Reset states when new file is uploaded
    setResults([]);
    setCheckingProgress(0);
    setIsCheckingComplete(false);
  };

  const startChecking = async () => {
    if (!fileContent) {
      toast({
        title: "No file uploaded",
        description: "Please upload a file with accounts first",
        variant: "destructive",
      });
      return;
    }

    setIsChecking(true);
    setResults([]);
    setCheckingProgress(0);
    setIsCheckingComplete(false);

    try {
      await checkAccounts(
        fileContent,
        (progress) => {
          setCheckingProgress(progress);
        },
        (result) => {
          setResults((prev) => [...prev, result]);
        }
      );
      
      setIsCheckingComplete(true);
      toast({
        title: "Checking complete",
        description: "All accounts have been checked successfully",
      });
    } catch (error) {
      console.error("Error checking accounts:", error);
      toast({
        title: "Error",
        description: "An error occurred while checking accounts",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/50">
      <div className="max-w-4xl w-full space-y-8 mx-auto">
        <div className="text-center space-y-2 animate-fade-in">
          <div className="flex items-center justify-center">
            <div className="px-3 py-1 text-xs font-medium border rounded-full text-primary bg-primary/5 select-none">
              Account Checker Pro
            </div>
          </div>
          <h1 className="text-4xl font-bold mt-2">Netflix Account Validator</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload a list of Netflix accounts to check their validity. The application will verify which accounts are working and allow you to download the results.
          </p>
        </div>

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
              <div className="bg-card rounded-lg border overflow-hidden shadow-sm animate-slide-up">
                <div className="p-5 border-b flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-medium">Verification Status</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {isChecking 
                        ? "Checking accounts... Please wait"
                        : isCheckingComplete
                          ? "Account verification complete"
                          : "Ready to start verification"}
                    </p>
                  </div>
                  <Button 
                    onClick={startChecking} 
                    disabled={isChecking || !fileContent}
                    className="w-[120px]"
                  >
                    {isChecking ? (
                      <>
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                        Checking
                      </>
                    ) : (
                      "Start Check"
                    )}
                  </Button>
                </div>
                <div className="p-5">
                  <div className="mb-2 flex justify-between items-center">
                    <span className="text-sm font-medium">
                      {checkingProgress === 100 
                        ? "Complete"
                        : isChecking 
                          ? "Checking accounts..."
                          : "Progress"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {checkingProgress}%
                    </span>
                  </div>
                  <Progress 
                    value={checkingProgress} 
                    className={cn(
                      "h-2",
                      checkingProgress === 100 && "bg-primary/20"
                    )}
                  />
                  
                  {isChecking && (
                    <div className="mt-4 p-3 bg-muted/50 rounded text-sm text-muted-foreground flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Please wait while accounts are being checked. This may take a few minutes...</span>
                    </div>
                  )}
                </div>
              </div>
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

            <div className="rounded-lg border bg-card p-5 space-y-4">
              <h3 className="font-medium">About This Tool</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  This application helps you identify which Netflix accounts are valid and working.
                </p>
                <p>
                  Upload a list of accounts in email:password format to begin checking. The tool will verify each account and sort them into working and non-working categories.
                </p>
                <p>
                  Once the verification process is complete, you can download a text file containing only the working accounts.
                </p>
                <div className="pt-2 text-xs border-t text-muted-foreground/70">
                  <p>
                    <strong>Note:</strong> This tool is for educational purposes only. Use only with accounts you own or have permission to check.
                  </p>
                </div>
              </div>
            </div>

            {results.length > 0 && isCheckingComplete && (
              <div className="rounded-lg border bg-primary/5 p-5 space-y-2 animate-fade-in">
                <h3 className="font-medium text-primary">Verification Complete</h3>
                <p className="text-sm text-muted-foreground">
                  All accounts have been verified. You can now view and download the working accounts.
                </p>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="rounded bg-card p-3 text-center border">
                    <div className="text-2xl font-bold">
                      {results.filter(r => r.isWorking).length}
                    </div>
                    <div className="text-xs text-muted-foreground">Working</div>
                  </div>
                  <div className="rounded bg-card p-3 text-center border">
                    <div className="text-2xl font-bold">
                      {results.filter(r => !r.isWorking).length}
                    </div>
                    <div className="text-xs text-muted-foreground">Not Working</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground/60 pt-8">
          <p>© {new Date().getFullYear()} Account Checker Pro. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;

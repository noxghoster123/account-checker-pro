
import { useState, useCallback } from "react";
import { checkAccounts, AccountCheckResult } from "@/utils/accountChecker";
import { useToast } from "@/hooks/use-toast";

export function useAccountChecking() {
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [checkingProgress, setCheckingProgress] = useState(0);
  const [results, setResults] = useState<AccountCheckResult[]>([]);
  const [isCheckingComplete, setIsCheckingComplete] = useState(false);
  const { toast } = useToast();
  
  const handleFileAccepted = useCallback((content: string) => {
    setFileContent(content);
    // Reset states when new file is uploaded
    setResults([]);
    setCheckingProgress(0);
    setIsCheckingComplete(false);
  }, []);

  const handleProgress = useCallback((progress: number) => {
    setCheckingProgress(progress);
  }, []);

  const handleResult = useCallback((result: AccountCheckResult) => {
    setResults(prev => [...prev, result]);
  }, []);

  const startChecking = useCallback(async () => {
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
        handleProgress,
        handleResult
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
  }, [fileContent, toast, handleProgress, handleResult]);

  return {
    fileContent,
    isChecking,
    checkingProgress,
    results,
    isCheckingComplete,
    handleFileAccepted,
    startChecking
  };
}

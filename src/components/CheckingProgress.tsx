
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { LoaderCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckingProgressProps {
  isChecking: boolean;
  checkingProgress: number;
  fileContent: string | null;
  startChecking: () => void;
}

export function CheckingProgress({
  isChecking,
  checkingProgress,
  fileContent,
  startChecking
}: CheckingProgressProps) {
  return (
    <div className="bg-card rounded-lg border overflow-hidden shadow-sm animate-slide-up">
      <div className="p-5 border-b flex justify-between items-center">
        <div>
          <h2 className="text-xl font-medium">Verification Status</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {isChecking 
              ? "Checking accounts... Please wait"
              : checkingProgress === 100
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
  );
}

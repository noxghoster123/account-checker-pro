
import React from "react";
import { AccountCheckResult } from "@/utils/accountChecker";

interface ResultsFooterProps {
  accounts: AccountCheckResult[];
  workingAccounts: AccountCheckResult[];
  nonWorkingAccounts: AccountCheckResult[];
  isCheckingComplete: boolean;
}

export function ResultsFooter({ 
  accounts, 
  workingAccounts, 
  nonWorkingAccounts, 
  isCheckingComplete 
}: ResultsFooterProps) {
  return (
    <div className="px-4 py-3 border-t bg-muted/50 flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        {isCheckingComplete
          ? `Total: ${accounts.length} | Working: ${workingAccounts.length} | Not Working: ${nonWorkingAccounts.length}`
          : "Checking in progress..."}
      </span>
      {isCheckingComplete && workingAccounts.length > 0 && (
        <span className="text-sm font-medium text-green-600">
          Success rate: {((workingAccounts.length / accounts.length) * 100).toFixed(1)}%
        </span>
      )}
    </div>
  );
}

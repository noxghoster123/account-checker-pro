
import React from "react";
import { AccountCheckResult } from "@/utils/accountChecker";

interface StatsSummaryProps {
  results: AccountCheckResult[];
  isCheckingComplete: boolean;
}

export function StatsSummary({ results, isCheckingComplete }: StatsSummaryProps) {
  if (!isCheckingComplete || results.length === 0) {
    return null;
  }

  const workingAccounts = results.filter(r => r.isWorking);
  const nonWorkingAccounts = results.filter(r => !r.isWorking);

  return (
    <div className="rounded-lg border bg-primary/5 p-5 space-y-2 animate-fade-in">
      <h3 className="font-medium text-primary">Verification Complete</h3>
      <p className="text-sm text-muted-foreground">
        All accounts have been verified. You can now view and download the working accounts.
      </p>
      <div className="grid grid-cols-2 gap-3 mt-3">
        <div className="rounded bg-card p-3 text-center border">
          <div className="text-2xl font-bold">
            {workingAccounts.length}
          </div>
          <div className="text-xs text-muted-foreground">Working</div>
        </div>
        <div className="rounded bg-card p-3 text-center border">
          <div className="text-2xl font-bold">
            {nonWorkingAccounts.length}
          </div>
          <div className="text-xs text-muted-foreground">Not Working</div>
        </div>
      </div>
    </div>
  );
}

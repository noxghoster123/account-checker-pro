
import React from "react";
import { Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccountCheckResult } from "@/utils/accountChecker";
import { downloadAccounts, copyToClipboard } from "./accountExportUtils";

interface ResultsHeaderProps {
  workingAccounts: AccountCheckResult[];
  isCheckingComplete: boolean;
  toast: any;
}

export function ResultsHeader({ workingAccounts, isCheckingComplete, toast }: ResultsHeaderProps) {
  const handleDownload = () => {
    downloadAccounts(workingAccounts, "working_accounts.txt", toast);
  };

  const handleCopy = () => {
    copyToClipboard(workingAccounts, toast);
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-medium">Results</h3>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={handleCopy}
          disabled={!isCheckingComplete || workingAccounts.length === 0}
        >
          <Copy className="h-3.5 w-3.5 mr-1.5" />
          Copy Working
        </Button>
        <Button
          variant="default"
          size="sm"
          className="text-xs"
          onClick={handleDownload}
          disabled={!isCheckingComplete || workingAccounts.length === 0}
        >
          <Download className="h-3.5 w-3.5 mr-1.5" />
          Download Working
        </Button>
      </div>
    </div>
  );
}

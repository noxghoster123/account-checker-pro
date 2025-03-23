
import React from "react";

export function AboutTool() {
  return (
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
  );
}

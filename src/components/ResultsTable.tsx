import React, { useState } from "react";
import { Check, X, Download, Copy, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AccountCheckResult } from "@/utils/accountChecker";

interface ResultsTableProps {
  accounts: AccountCheckResult[];
  isCheckingComplete: boolean;
}

export function ResultsTable({ accounts, isCheckingComplete }: ResultsTableProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("all");

  const workingAccounts = accounts.filter((account) => account.isWorking);
  const nonWorkingAccounts = accounts.filter((account) => !account.isWorking);

  const downloadWorkingAccounts = () => {
    if (workingAccounts.length === 0) {
      toast({
        title: "No working accounts",
        description: "There are no working accounts to download",
        variant: "destructive",
      });
      return;
    }

    // Create content with email:password format
    const content = workingAccounts
      .map((account) => `${account.email}:${account.password}`)
      .join("\n");

    // Create blob and download
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "working_accounts.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Download complete",
      description: `${workingAccounts.length} working accounts exported`,
    });
  };

  const copyToClipboard = (accounts: AccountCheckResult[]) => {
    if (accounts.length === 0) {
      toast({
        title: "No accounts to copy",
        description: "There are no accounts to copy to clipboard",
        variant: "destructive",
      });
      return;
    }

    const content = accounts
      .map((account) => `${account.email}:${account.password}`)
      .join("\n");

    navigator.clipboard.writeText(content).then(
      () => {
        toast({
          title: "Copied to clipboard",
          description: `${accounts.length} accounts copied to clipboard`,
        });
      },
      (err) => {
        console.error("Failed to copy: ", err);
        toast({
          title: "Failed to copy",
          description: "Could not copy accounts to clipboard",
          variant: "destructive",
        });
      }
    );
  };

  const renderAccountList = (accountList: AccountCheckResult[]) => {
    if (accountList.length === 0) {
      return (
        <div className="p-8 text-center text-muted-foreground">
          No accounts found
        </div>
      );
    }

    return (
      <ScrollArea className="h-[300px] rounded-md border">
        <div className="divide-y">
          {accountList.map((account, index) => (
            <div
              key={`${account.email}-${index}`}
              className={cn(
                "p-3 flex justify-between items-center group hover:bg-muted/50 transition-colors",
                index % 2 === 0 ? "bg-background" : "bg-muted/20"
              )}
            >
              <div className="font-mono text-sm truncate max-w-[70%]">
                {account.email}:{account.password}
              </div>
              <div className="flex items-center gap-2">
                {account.message && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help text-muted-foreground">
                        <Info className="h-4 w-4" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      {account.message}
                    </TooltipContent>
                  </Tooltip>
                )}
                <div
                  className={cn(
                    "flex items-center justify-center rounded-full w-6 h-6",
                    account.isWorking ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                  )}
                >
                  {account.isWorking ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <X className="h-4 w-4" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    );
  };

  return (
    <div className="w-full animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Results</h3>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => copyToClipboard(workingAccounts)}
            disabled={!isCheckingComplete || workingAccounts.length === 0}
          >
            <Copy className="h-3.5 w-3.5 mr-1.5" />
            Copy Working
          </Button>
          <Button
            variant="default"
            size="sm"
            className="text-xs"
            onClick={downloadWorkingAccounts}
            disabled={!isCheckingComplete || workingAccounts.length === 0}
          >
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Download Working
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-lg border overflow-hidden">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="border-b px-4 pt-4">
            <TabsList className="grid grid-cols-3 w-[300px]">
              <TabsTrigger value="all">
                All ({accounts.length})
              </TabsTrigger>
              <TabsTrigger value="working">
                Working ({workingAccounts.length})
              </TabsTrigger>
              <TabsTrigger value="not-working">
                Not Working ({nonWorkingAccounts.length})
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all" className="mt-0">
            {renderAccountList(accounts)}
          </TabsContent>
          <TabsContent value="working" className="mt-0">
            {renderAccountList(workingAccounts)}
          </TabsContent>
          <TabsContent value="not-working" className="mt-0">
            {renderAccountList(nonWorkingAccounts)}
          </TabsContent>
        </Tabs>

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
      </div>
    </div>
  );
}

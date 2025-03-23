
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountCheckResult } from "@/utils/accountChecker";
import { AccountList } from "./results/AccountList";
import { ResultsHeader } from "./results/ResultsHeader";
import { ResultsFooter } from "./results/ResultsFooter";

interface ResultsTableProps {
  accounts: AccountCheckResult[];
  isCheckingComplete: boolean;
}

export function ResultsTable({ accounts, isCheckingComplete }: ResultsTableProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("all");

  const workingAccounts = accounts.filter((account) => account.isWorking);
  const nonWorkingAccounts = accounts.filter((account) => !account.isWorking);

  return (
    <div className="w-full animate-fade-in">
      <ResultsHeader 
        workingAccounts={workingAccounts} 
        isCheckingComplete={isCheckingComplete} 
        toast={toast} 
      />

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
            <AccountList accountList={accounts} />
          </TabsContent>
          <TabsContent value="working" className="mt-0">
            <AccountList accountList={workingAccounts} />
          </TabsContent>
          <TabsContent value="not-working" className="mt-0">
            <AccountList accountList={nonWorkingAccounts} />
          </TabsContent>
        </Tabs>

        <ResultsFooter 
          accounts={accounts}
          workingAccounts={workingAccounts}
          nonWorkingAccounts={nonWorkingAccounts}
          isCheckingComplete={isCheckingComplete}
        />
      </div>
    </div>
  );
}

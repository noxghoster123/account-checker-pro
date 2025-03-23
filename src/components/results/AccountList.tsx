
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AccountListItem } from "./AccountListItem";
import { AccountCheckResult } from "@/utils/accountChecker";

interface AccountListProps {
  accountList: AccountCheckResult[];
}

export function AccountList({ accountList }: AccountListProps) {
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
          <AccountListItem 
            key={`${account.email}-${index}`}
            account={account}
            index={index}
          />
        ))}
      </div>
    </ScrollArea>
  );
}

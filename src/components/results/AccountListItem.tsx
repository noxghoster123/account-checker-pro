
import React from "react";
import { Check, X, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AccountCheckResult } from "@/utils/accountChecker";

interface AccountListItemProps {
  account: AccountCheckResult;
  index: number;
}

export function AccountListItem({ account, index }: AccountListItemProps) {
  return (
    <div
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
  );
}


import { AccountCheckResult } from "@/utils/accountChecker";
import { ToastAction } from "@/components/ui/toast";

export const formatAccountsForExport = (accounts: AccountCheckResult[]): string => {
  return accounts
    .map((account) => `${account.email}:${account.password}`)
    .join("\n");
};

export const downloadAccounts = (accounts: AccountCheckResult[], fileName: string, toast: any) => {
  if (accounts.length === 0) {
    toast({
      title: "No accounts to download",
      description: "There are no accounts to download",
      variant: "destructive",
    });
    return;
  }

  const content = formatAccountsForExport(accounts);

  // Create blob and download
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  toast({
    title: "Download complete",
    description: `${accounts.length} accounts exported`,
  });
};

export const copyToClipboard = (accounts: AccountCheckResult[], toast: any) => {
  if (accounts.length === 0) {
    toast({
      title: "No accounts to copy",
      description: "There are no accounts to copy to clipboard",
      variant: "destructive",
    });
    return;
  }

  const content = formatAccountsForExport(accounts);

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

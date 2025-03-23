
import { sleep } from "./helpers";

export interface AccountCheckResult {
  email: string;
  password: string;
  isWorking: boolean;
}

// This is a simulation function since we can't actually check Netflix accounts
export async function checkAccounts(
  accountsText: string,
  onProgress: (progress: number) => void,
  onResult: (result: AccountCheckResult) => void
): Promise<AccountCheckResult[]> {
  // Parse account text into email/password pairs
  const accountLines = accountsText.split("\n").filter(line => line.trim() !== "");
  const accounts = accountLines.map(line => {
    const [email, password] = line.split(":");
    return { email, password };
  });

  const results: AccountCheckResult[] = [];
  let checkedCount = 0;

  // Process accounts one by one with delay to simulate real checking
  for (const account of accounts) {
    // Simulated delay to mimic network request (100-400ms)
    const delay = Math.floor(Math.random() * 300) + 100;
    await sleep(delay);

    // Simulate checking result (40% working rate for demo purposes)
    const isWorking = Math.random() < 0.4;
    
    // Create result object
    const result: AccountCheckResult = {
      email: account.email,
      password: account.password,
      isWorking
    };
    
    // Add to results array
    results.push(result);
    
    // Call progress callback
    checkedCount++;
    onProgress(Math.floor((checkedCount / accounts.length) * 100));
    
    // Call result callback
    onResult(result);
    
    // Add additional random delay between checks (0-200ms)
    await sleep(Math.floor(Math.random() * 200));
  }

  return results;
}

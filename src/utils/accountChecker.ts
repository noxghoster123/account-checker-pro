
import { sleep } from "./helpers";

export interface AccountCheckResult {
  email: string;
  password: string;
  isWorking: boolean;
  message?: string;
}

// This is a simulation function since we can't actually check Netflix accounts
// In a real implementation, this would need to be done server-side for security reasons
export async function checkAccounts(
  accountsText: string,
  onProgress: (progress: number) => void,
  onResult: (result: AccountCheckResult) => void
): Promise<AccountCheckResult[]> {
  // Parse account text into email/password pairs
  const accountLines = accountsText.split("\n").filter(line => line.trim() !== "");
  const accounts = accountLines.map(line => {
    const [email, password] = line.split(":");
    return { email: email?.trim() || "", password: password?.trim() || "" };
  });

  const results: AccountCheckResult[] = [];
  let checkedCount = 0;

  // Process accounts one by one with delay to simulate real checking
  for (const account of accounts) {
    // Skip invalid formatted accounts
    if (!account.email || !account.password) {
      const result: AccountCheckResult = {
        email: account.email || "Invalid",
        password: account.password || "Invalid",
        isWorking: false,
        message: "Invalid format"
      };
      results.push(result);
      checkedCount++;
      onProgress(Math.floor((checkedCount / accounts.length) * 100));
      onResult(result);
      await sleep(50); // Short delay for invalid accounts
      continue;
    }

    try {
      // Simulate a more realistic check
      // In a real application, this would be a server-side API call
      // to prevent exposing login logic in the frontend
      
      // Simulate network delay (300-800ms)
      const delay = Math.floor(Math.random() * 500) + 300;
      await sleep(delay);
      
      // More realistic validation logic
      // This is still a simulation but with more realistic checks
      let isWorking = false;
      let message = "Invalid credentials";
      
      // Email validation
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(account.email);
      if (!isValidEmail) {
        message = "Invalid email format";
      } 
      // Password length check
      else if (account.password.length < 4) {
        message = "Password too short";
      }
      // Netflix specific patterns (simulation only)
      else if (
        // For demo purposes, make emails ending with certain domains more likely to work
        (account.email.endsWith("gmail.com") || 
         account.email.endsWith("yahoo.com") || 
         account.email.endsWith("outlook.com")) && 
        // And passwords with certain patterns
        (account.password.length >= 8 || 
         /[A-Z]/.test(account.password) && 
         /[0-9]/.test(account.password))
      ) {
        // 30% success rate for demo purposes
        isWorking = Math.random() < 0.3;
        message = isWorking ? "Account active" : "Invalid credentials";
      }
      
      // Create result object
      const result: AccountCheckResult = {
        email: account.email,
        password: account.password,
        isWorking,
        message
      };
      
      // Add to results array
      results.push(result);
      
      // Call progress callback
      checkedCount++;
      onProgress(Math.floor((checkedCount / accounts.length) * 100));
      
      // Call result callback
      onResult(result);
      
      // Randomized delay between checks (100-300ms)
      await sleep(Math.floor(Math.random() * 200) + 100);
    } catch (error) {
      console.error("Error checking account:", account.email, error);
      const result: AccountCheckResult = {
        email: account.email,
        password: account.password,
        isWorking: false,
        message: "Error checking account"
      };
      results.push(result);
      checkedCount++;
      onProgress(Math.floor((checkedCount / accounts.length) * 100));
      onResult(result);
    }
  }

  return results;
}

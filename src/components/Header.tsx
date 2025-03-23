
import React from "react";

export function Header() {
  return (
    <div className="text-center space-y-2 animate-fade-in">
      <div className="flex items-center justify-center">
        <div className="px-3 py-1 text-xs font-medium border rounded-full text-primary bg-primary/5 select-none">
          Account Checker Pro
        </div>
      </div>
      <h1 className="text-4xl font-bold mt-2">Netflix Account Validator</h1>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Upload a list of Netflix accounts to check their validity. The application will verify which accounts are working and allow you to download the results.
      </p>
    </div>
  );
}


import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface SampleDataGeneratorProps {
  className?: string;
}

export function SampleDataGenerator({ className }: SampleDataGeneratorProps) {
  const [isVisible, setIsVisible] = useState(true);

  const generateSampleData = () => {
    const sampleAccounts = [
      "user1@example.com:password123",
      "user2@example.com:qwerty456",
      "user3@example.com:letmein789",
      "user4@example.com:securepass!",
      "user5@example.com:netflix2023",
      "user6@example.com:streaming#01",
      "user7@example.com:movietime22",
      "user8@example.com:watchseries99",
      "user9@example.com:netflixandchill",
      "user10@example.com:password1234"
    ].join("\n");

    const blob = new Blob([sampleAccounts], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample_accounts.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Hide after downloading
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={cn("rounded-lg border bg-card p-4", className)}>
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium">Need a sample file?</h4>
        <p className="text-sm text-muted-foreground">
          Download a sample data file to test the application. This file contains mock email:password combinations.
        </p>
        <Button variant="outline" size="sm" onClick={generateSampleData} className="w-full mt-2">
          <Download className="h-4 w-4 mr-2" />
          Get Sample Data
        </Button>
      </div>
    </div>
  );
}


import React, { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Upload, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  onFileAccepted: (content: string) => void;
  className?: string;
}

export function FileUpload({ onFileAccepted, className }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileRead = async (file: File) => {
    try {
      const content = await file.text();
      const lines = content.split("\n").filter(line => line.trim() !== "");
      
      // Validate file format (email:password)
      const isValid = lines.every(line => {
        const parts = line.split(":");
        return parts.length === 2 && parts[0].includes("@") && parts[1].length > 0;
      });

      if (!isValid) {
        toast({
          title: "Invalid format",
          description: "File must contain email:password pairs, one per line",
          variant: "destructive",
        });
        resetFileInput();
        return;
      }
      
      setFileName(file.name);
      setFileContent(content);
      onFileAccepted(content);
      
      toast({
        title: "File accepted",
        description: `Loaded ${lines.length} accounts from ${file.name}`,
      });
    } catch (error) {
      console.error("Error reading file:", error);
      toast({
        title: "Error",
        description: "Failed to read file. Please try again.",
        variant: "destructive",
      });
      resetFileInput();
    }
  };

  const resetFileInput = () => {
    setFileName(null);
    setFileContent(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "text/plain") {
        handleFileRead(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a text (.txt) file",
          variant: "destructive",
        });
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "text/plain") {
        handleFileRead(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a text (.txt) file",
          variant: "destructive",
        });
      }
    }
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {!fileName ? (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 transition-all duration-200 ease-in-out",
            "bg-muted/50 hover:bg-muted/80",
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/30",
            "animate-fade-in"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <Upload className="h-8 w-8" />
            </div>
            <div className="flex flex-col items-center justify-center gap-1 text-center">
              <h3 className="font-medium">Upload Account List</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Drag and drop your account list file, or click to browse
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Text file (.txt) with email:password format, one account per line
              </p>
            </div>
            <Button
              onClick={handleBrowseClick}
              variant="outline"
              className="mt-2"
              size="sm"
            >
              Browse Files
            </Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".txt"
            onChange={handleFileInput}
          />
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="border rounded-lg p-6 bg-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <File className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{fileName}</p>
                  <p className="text-sm text-muted-foreground">
                    {fileContent?.split("\n").filter(line => line.trim() !== "").length || 0} accounts loaded
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground"
                onClick={resetFileInput}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { UploadCloud, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ImageUploadProps {
  onImageSelected: (file: File) => void;
  isProcessing: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected, isProcessing }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (isProcessing) return;

      const file = acceptedFiles[0];
      
      if (!file) return;
      
      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }
      
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }

      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          onImageSelected(file);
        }
      }, 50);
    },
    [isProcessing, onImageSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"]
    },
    disabled: isProcessing,
    maxFiles: 1
  });

  const removeImage = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
    setUploadProgress(0);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!previewUrl ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-primary bg-primary bg-opacity-5"
              : "border-muted-foreground border-opacity-30 hover:border-primary"
          } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-2">
            <UploadCloud className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-medium mt-2">
              {isDragActive ? "Drop your image here" : "Drag & drop an image here"}
            </h3>
            <p className="text-sm text-muted-foreground">
              or click to browse (JPEG, PNG, GIF)
            </p>
          </div>
        </div>
      ) : (
        <Card className="overflow-hidden">
          <CardContent className="p-0 relative">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-auto object-contain max-h-[60vh]"
            />
            {!isProcessing && (
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 rounded-full"
                onClick={removeImage}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            {uploadProgress < 100 && (
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-background bg-opacity-70">
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImageUpload;

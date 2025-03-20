
import React, { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { UploadCloud, X, Camera, Image as ImageIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface ImageUploadProps {
  onImageSelected: (file: File) => void;
  isProcessing: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelected,
  isProcessing
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  const onDrop = useCallback((acceptedFiles: File[]) => {
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
  }, [isProcessing, onImageSelected]);

  const {
    getRootProps,
    getInputProps,
    isDragActive
  } = useDropzone({
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

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!previewUrl ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div 
              {...getRootProps()} 
              className={`ios-card transition-all ${dragActive ? 'ring-2 ring-primary' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrag}
            >
              <CardContent className={`flex flex-col items-center justify-center ${isMobile ? 'p-6 py-16' : 'p-10 py-20'}`}>
                <div className="mb-5">
                  <motion.div 
                    className="flex items-center justify-center gap-3"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="text-set-purple text-3xl">◇</div>
                    <div className="text-set-red text-3xl">○</div>
                    <div className="text-set-green text-3xl">△</div>
                  </motion.div>
                </div>
                
                <h3 className={`sf-pro-display ${isMobile ? 'text-xl' : 'text-2xl'} font-medium mb-3 text-gray-900`}>
                  {isDragActive ? "Drop your SET game photo here" : "Upload SET game photo"}
                </h3>
                <p className={`sf-pro-text ${isMobile ? 'text-sm' : 'text-base'} text-muted-foreground mb-6 text-center max-w-sm`}>
                  Take a clear, well-lit photo of the cards from directly above
                </p>
                
                <input 
                  ref={fileInputRef}
                  type="file"
                  {...getInputProps()}
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                />
                
                {isMobile ? (
                  <div className="flex flex-col w-full space-y-3 px-6">
                    <Button 
                      onClick={triggerFileInput}
                      className="purple-button gap-2 justify-center py-5 w-full text-base ios-button"
                      disabled={isProcessing}
                    >
                      <ImageIcon className="h-5 w-5" />
                      <span className="sf-pro-display">Choose Photo</span>
                    </Button>
                    <p className="text-sm text-center text-muted-foreground sf-pro-text pt-1">
                      Select from your camera or photo library
                    </p>
                  </div>
                ) : (
                  <Button 
                    onClick={triggerFileInput}
                    className="purple-button gap-2 mb-6 text-base py-3.5 px-8"
                    disabled={isProcessing}
                  >
                    <UploadCloud className="h-5 w-5" />
                    <span className="sf-pro-display">Upload Photo</span>
                  </Button>
                )}
                
                {!isMobile && (
                  <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground sf-pro-text mt-3">
                    <UploadCloud className="h-4 w-4" />
                    <span>Or drag and drop image here</span>
                  </div>
                )}
              </CardContent>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="ios-card overflow-hidden">
              <CardContent className="p-0 relative">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-full h-auto object-contain max-h-[50vh] md:max-h-[60vh]" 
                />
                
                {!isProcessing && (
                  <Button 
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 rounded-full bg-background/70 backdrop-blur-sm"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                
                {isProcessing && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0"
                  >
                    {/* Scanning effect */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent"
                      animate={{ y: ["0%", "100%"], opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    
                    {/* Scanning line */}
                    <motion.div 
                      className="absolute left-0 right-0 h-[2px] scan-line"
                      animate={{ y: ["0%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    
                    {/* Processing indicator */}
                    <div className="absolute top-3 right-3 bg-background/70 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                      <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium sf-pro-display`}>Processing</span>
                    </div>
                    
                    {/* SET Detection grid overlay */}
                    <motion.div 
                      className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-2 p-4"
                      initial="hidden"
                      animate="visible"
                    >
                      {Array.from({ length: 9 }).map((_, i) => (
                        <motion.div 
                          key={i}
                          className="border-2 border-transparent rounded-lg"
                          variants={{
                            hidden: { borderColor: "rgba(151, 71, 234, 0)" },
                            visible: { borderColor: "rgba(151, 71, 234, 0.3)" }
                          }}
                          transition={{ 
                            delay: i * 0.1,
                            duration: 0.3,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                )}
                
                {uploadProgress < 100 && (
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-background/70 backdrop-blur-sm">
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageUpload;

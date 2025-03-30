
import React, { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X, Camera, Image as ImageIcon, Sparkles } from "lucide-react";
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
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  
  // Animated SET symbols
  const symbols = [
    { shape: "◇", color: "text-set-purple", animation: "animate-float" },
    { shape: "○", color: "text-set-red", animation: "animate-pulse-subtle" },
    { shape: "△", color: "text-set-green", animation: "animate-bounce-subtle" }
  ];

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (isProcessing) return;
    const file = acceptedFiles[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      console.error("Please upload an image file");
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      console.error("File size must be less than 10MB");
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
        
        // Add a small delay to simulate processing
        setTimeout(() => {
          onImageSelected(file);
        }, 300);
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
  
  // File selection from gallery/files
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  // Camera capture
  const triggerCameraInput = () => {
    cameraInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!previewUrl ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card 
              className={`set-card overflow-hidden border-0 shadow-xl transition-all ${dragActive ? 'ring-2 ring-set-purple' : ''}`}
              {...getRootProps()} 
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrag}
            >
              <CardContent className={`flex flex-col items-center justify-center ${isMobile ? 'p-5 py-8' : 'p-10 py-16'}`}>
                {/* Interactive SET shapes */}
                <div className="mb-5 flex items-center justify-center gap-3">
                  {symbols.map((symbol, index) => (
                    <motion.div
                      key={index}
                      className={`${symbol.color} text-3xl md:text-4xl font-bold ${symbol.animation}`}
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: index % 2 === 0 ? 15 : -15,
                        transition: { duration: 0.3 }
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {symbol.shape}
                    </motion.div>
                  ))}
                </div>
                
                <motion.h3 
                  className="font-poppins text-xl md:text-2xl font-bold mb-2 text-set-dark"
                  whileHover={{ scale: 1.03 }}
                >
                  {isDragActive ? "Drop your SET game photo here" : "Upload SET game photo"}
                </motion.h3>
                
                <motion.p 
                  className="text-set-gray mb-5 text-center max-w-sm font-sans"
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                >
                  Take a clear photo of the cards on a flat surface
                </motion.p>
                
                {/* Hidden input for file (gallery) selection */}
                <input 
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      onDrop([e.target.files[0]]);
                    }
                  }}
                />
                
                {/* Hidden input for camera */}
                <input 
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      onDrop([e.target.files[0]]);
                    }
                  }}
                />
                
                {/* Don't show these buttons on mobile since we have a sticky toolbar instead */}
                {!isMobile && (
                  <div className="flex flex-col gap-3 w-full max-w-sm">
                    <Button 
                      onClick={triggerCameraInput}
                      className="set-button-primary py-3 text-base w-full"
                      disabled={isProcessing}
                    >
                      <Camera className="h-5 w-5" />
                      <span className="font-poppins">Take Photo</span>
                    </Button>
                    
                    <Button 
                      onClick={triggerFileInput}
                      variant="outline"
                      className="set-button-secondary py-3 text-base w-full"
                      disabled={isProcessing}
                    >
                      <ImageIcon className="h-5 w-5" />
                      <span className="font-poppins">Choose from Gallery</span>
                    </Button>
                  </div>
                )}
                
                {!isMobile && (
                  <div className="flex items-center justify-center gap-1.5 text-sm text-set-gray mt-5">
                    <UploadCloud className="h-4 w-4" />
                    <span>Or drag and drop image here</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="set-card overflow-hidden shadow-xl border-0">
              <CardContent className="p-0 relative">
                <div className="relative">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="w-full h-auto object-contain max-h-[45vh] md:max-h-[60vh]" 
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-set-purple/5 via-transparent to-set-green/5 pointer-events-none"></div>
                  
                  {!isProcessing && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute top-3 right-3"
                    >
                      <Button 
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white hover:shadow-lg"
                        onClick={removeImage}
                      >
                        <X className="h-4 w-4 text-set-gray" />
                      </Button>
                    </motion.div>
                  )}
                </div>
                
                {isProcessing && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {/* Processing indicator overlay */}
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-md"></div>
                    
                    {/* Enhanced processing indicator */}
                    <motion.div 
                      className="bg-white/90 backdrop-blur-xl rounded-2xl px-5 py-4 shadow-xl flex flex-col items-center gap-3 z-10 max-w-xs"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ 
                            rotate: 360,
                            transition: { duration: 2, repeat: Infinity, ease: "linear" }
                          }}
                        >
                          <Sparkles className="h-5 w-5 text-set-purple" />
                        </motion.div>
                        <span className="text-base font-medium font-poppins text-set-dark">Analyzing SET cards...</span>
                      </div>
                      
                      <Progress value={uploadProgress} className="h-1.5 w-full bg-gray-100" />
                      
                      <div className="flex items-center justify-center gap-2">
                        {symbols.map((symbol, index) => (
                          <motion.div
                            key={index}
                            className={`${symbol.color} text-lg font-bold`}
                            animate={{ 
                              scale: [1, 1.2, 1],
                              opacity: [1, 0.8, 1],
                              transition: { 
                                duration: 1.5, 
                                repeat: Infinity, 
                                delay: index * 0.3,
                                ease: "easeInOut"
                              }
                            }}
                          >
                            {symbol.shape}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
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

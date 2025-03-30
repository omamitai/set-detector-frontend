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
  
  // Enhanced SET shapes with gradient styling and red theme
  const symbols = [
    { 
      shape: "◇", 
      style: "text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-red-600 drop-shadow-md", 
      animation: "animate-float" 
    },
    { 
      shape: "○", 
      style: "text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-amber-600 drop-shadow-md", 
      animation: "animate-pulse-subtle" 
    },
    { 
      shape: "△", 
      style: "text-transparent bg-clip-text bg-gradient-to-br from-rose-400 to-rose-600 drop-shadow-md", 
      animation: "animate-bounce-subtle" 
    }
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
              className={`overflow-hidden bg-white border border-gray-100 shadow-lg rounded-xl transition-all ${dragActive ? 'ring-1 ring-red-400' : ''}`}
              {...getRootProps()} 
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrag}
            >
              <CardContent className={`flex flex-col items-center justify-center ${isMobile ? 'p-5 py-8' : 'p-10 py-16'}`}>
                {/* Enhanced SET shapes with gradient styling */}
                <div className="mb-6 flex items-center justify-center gap-6">
                  {symbols.map((symbol, index) => (
                    <motion.div
                      key={index}
                      className={`${symbol.style} text-4xl md:text-5xl font-bold ${symbol.animation}`}
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: index % 2 === 0 ? 10 : -10,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {symbol.shape}
                    </motion.div>
                  ))}
                </div>
                
                <motion.h3 
                  className="font-medium text-xl md:text-2xl mb-3 text-gray-800 bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.02 }}
                >
                  {isDragActive ? "Drop your SET game photo here" : "Upload SET game photo"}
                </motion.h3>
                
                <motion.p 
                  className="text-gray-500 mb-6 text-center max-w-sm"
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                >
                  Take a clear photo of the cards on a flat surface
                </motion.p>
                
                {/* Hidden inputs */}
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
                
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                  <Button 
                    onClick={triggerCameraInput}
                    className="bg-gradient-to-r from-red-500 to-amber-500 text-white rounded-full py-2.5 text-sm w-full shadow-md hover:shadow-lg transition-all hover:-translate-y-1 active:translate-y-0"
                    disabled={isProcessing}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    <span>Take Photo</span>
                  </Button>
                  
                  <Button 
                    onClick={triggerFileInput}
                    variant="outline"
                    className="bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-700 rounded-full py-2.5 text-sm w-full shadow-sm hover:shadow-md transition-all hover:-translate-y-1 active:translate-y-0"
                    disabled={isProcessing}
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    <span>Choose Gallery</span>
                  </Button>
                </div>
                
                {!isMobile && (
                  <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mt-5">
                    <UploadCloud className="h-3.5 w-3.5" />
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
            <Card className="overflow-hidden shadow-lg border border-gray-100 rounded-xl bg-white">
              <CardContent className="p-0 relative">
                <div className="relative">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="w-full h-auto object-contain max-h-[45vh] md:max-h-[60vh]" 
                  />
                  
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
                        className="rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg hover:bg-white border border-gray-200"
                        onClick={removeImage}
                      >
                        <X className="h-4 w-4 text-gray-600" />
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
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-md"></div>
                    
                    {/* Enhanced processing indicator */}
                    <motion.div 
                      className="bg-white/90 backdrop-blur-xl rounded-xl px-5 py-4 shadow-lg flex flex-col items-center gap-3 z-10 max-w-xs border border-gray-100"
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
                          <Sparkles className="h-5 w-5 text-red-500" />
                        </motion.div>
                        <span className="text-base font-medium text-gray-800">Analyzing SET cards...</span>
                      </div>
                      
                      <Progress value={uploadProgress} className="h-1.5 w-full bg-gray-100" />
                      
                      <div className="flex items-center justify-center gap-2">
                        {symbols.map((symbol, index) => (
                          <motion.div
                            key={index}
                            className={`${symbol.style} text-lg font-bold`}
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

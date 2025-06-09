
import React, { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { X, Camera, Image as ImageIcon, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface ImageUploadProps {
  onImageSelected: (file: File) => void;
  isProcessing: boolean;
}

// Animated SET shape component
const SetShapeComponent = ({ type, color, className = "" }) => {
  const baseClasses = `w-12 h-12 mx-auto flex items-center justify-center ${className}`;
  
  return (
    <motion.div 
      className={`set-shape-${type} set-color-${color} ${baseClasses}`}
      initial={{ opacity: 0.7 }}
      animate={{ 
        opacity: [0.7, 1, 0.7],
        scale: [1, 1.05, 1]
      }}
      transition={{ 
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    >
      <div className="w-1/3 h-1/3 rounded-full bg-white/30 backdrop-blur-sm"></div>
    </motion.div>
  );
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelected,
  isProcessing
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (isProcessing) return;
    const file = acceptedFiles[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      console.error("Please upload an image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      console.error("File size must be less than 10MB");
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));

    // Smooth progress animation
    let progress = 0;
    const interval = setInterval(() => {
      progress += 8;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => onImageSelected(file), 200);
      }
    }, 40);
  }, [isProcessing, onImageSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".gif"] },
    disabled: isProcessing,
    maxFiles: 1
  });

  const removeImage = () => {
    setPreviewUrl(null);
    setUploadProgress(0);
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
            <Card 
              className={`overflow-hidden bg-white border border-gray-100 shadow-xl rounded-2xl transition-all duration-300 ${isDragActive ? 'ring-2 ring-set-red/50 border-set-red/30' : 'hover:shadow-2xl'}`}
              {...getRootProps()}
            >
              <CardContent className={`flex flex-col items-center justify-center cursor-pointer ${isMobile ? 'p-6 py-12' : 'p-10 py-16'}`}>
                {/* Animated SET shapes */}
                <div className="mb-8 flex items-center justify-center gap-6">
                  <SetShapeComponent type="diamond" color="red" />
                  <SetShapeComponent type="oval" color="purple" />
                  <SetShapeComponent type="triangle" color="green" />
                </div>
                
                <motion.h3 
                  className="font-semibold text-xl md:text-2xl mb-3 text-gray-800 bg-gradient-to-r from-set-red via-set-purple to-set-green bg-clip-text text-transparent"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {isDragActive ? "Drop your SET photo here" : "Upload SET Game Photo"}
                </motion.h3>
                
                <p className="text-gray-500 mb-8 text-center max-w-sm text-sm md:text-base">
                  Take a clear photo of your SET cards on a flat surface for best results
                </p>
                
                {/* Hidden file inputs */}
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
                
                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      cameraInputRef.current?.click();
                    }}
                    variant="primary"
                    className="rounded-full py-6 text-sm w-full shadow-lg shadow-set-red/20 transition-all hover:shadow-xl hover:scale-105"
                    disabled={isProcessing}
                  >
                    <Camera className="h-5 w-5 mr-2" />
                    <span>Take Photo</span>
                  </Button>
                  
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    variant="ios"
                    className="rounded-full py-6 text-sm w-full shadow-lg transition-all hover:shadow-xl hover:scale-105"
                    disabled={isProcessing}
                  >
                    <ImageIcon className="h-5 w-5 mr-2" />
                    <span>Choose from Gallery</span>
                  </Button>
                </div>
                
                {!isMobile && (
                  <motion.div 
                    className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span>Or drag and drop your image here</span>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden shadow-xl border border-gray-100 rounded-2xl bg-white">
              <CardContent className="p-0 relative">
                <div className="relative">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="w-full h-auto object-contain max-h-[50vh] md:max-h-[60vh]" 
                  />
                  
                  {!isProcessing && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-3 right-3"
                    >
                      <Button 
                        variant="ios"
                        size="icon"
                        className="rounded-full bg-white/90 backdrop-blur-sm shadow-lg h-10 w-10 transition-all"
                        onClick={removeImage}
                      >
                        <X className="h-4 w-4 text-gray-600" />
                      </Button>
                    </motion.div>
                  )}
                </div>
                
                {/* Processing overlay */}
                {isProcessing && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
                    
                    <motion.div 
                      className="bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-5 shadow-xl flex flex-col items-center gap-4 z-10 max-w-xs border border-gray-100"
                      initial={{ y: 20, opacity: 0, scale: 0.9 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          animate={{ 
                            rotate: 360,
                            transition: { duration: 2, repeat: Infinity, ease: "linear" }
                          }}
                        >
                          <Sparkles className="h-5 w-5 text-set-red" />
                        </motion.div>
                        <span className="text-base font-medium text-gray-800">Analyzing SET cards...</span>
                      </div>
                      
                      <Progress value={uploadProgress} className="h-2 w-full bg-gray-100" />
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

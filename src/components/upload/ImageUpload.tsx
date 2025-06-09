
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

// Enhanced animated SET shape component with better performance
const SetShapeComponent = ({ type, color, delay = 0 }) => {
  const shapeClasses = {
    diamond: "set-shape-diamond",
    oval: "set-shape-oval", 
    triangle: "set-shape-triangle"
  };
  
  const colorClasses = {
    red: "set-color-red",
    purple: "set-color-purple",
    green: "set-color-green"
  };
  
  return (
    <motion.div 
      className={`w-16 h-16 ${shapeClasses[type]} ${colorClasses[color]} relative`}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ 
        opacity: [0.8, 1, 0.8],
        scale: [1, 1.1, 1],
        y: [0, -4, 0]
      }}
      transition={{ 
        duration: 4,
        delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    >
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-full opacity-0 animate-pulse" 
           style={{ animationDelay: `${delay}s` }} />
    </motion.div>
  );
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelected,
  isProcessing
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
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
    setIsDragOver(false);

    // Smooth progress animation with better timing
    let progress = 0;
    const interval = setInterval(() => {
      progress += 12;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => onImageSelected(file), 150);
      }
    }, 30);
  }, [isProcessing, onImageSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragOver(true),
    onDragLeave: () => setIsDragOver(false),
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp", ".heic"] },
    disabled: isProcessing,
    maxFiles: 1
  });

  const removeImage = () => {
    setPreviewUrl(null);
    setUploadProgress(0);
    setIsDragOver(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onDrop([e.target.files[0]]);
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!previewUrl ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Card 
              className={`
                overflow-hidden bg-white/95 backdrop-blur-sm border-2 shadow-2xl rounded-3xl 
                transition-all duration-300 ease-out cursor-pointer select-none
                ${isDragActive || isDragOver 
                  ? 'ring-4 ring-set-red/30 border-set-red/50 shadow-set-red/20 scale-[1.02]' 
                  : 'border-gray-100 hover:shadow-3xl hover:scale-[1.01] hover:border-gray-200'
                }
              `}
              {...getRootProps()}
            >
              <CardContent className={`
                flex flex-col items-center justify-center relative
                ${isMobile ? 'p-8 py-16' : 'p-12 py-20'}
              `}>
                {/* Enhanced animated SET shapes with staggered animation */}
                <motion.div 
                  className="mb-10 flex items-center justify-center gap-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <SetShapeComponent type="diamond" color="red" delay={0} />
                  <SetShapeComponent type="oval" color="purple" delay={0.5} />
                  <SetShapeComponent type="triangle" color="green" delay={1} />
                </motion.div>
                
                {/* Improved title with better typography */}
                <motion.div
                  className="text-center mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <h3 className={`
                    font-bold bg-gradient-to-r from-set-red via-set-purple to-set-green 
                    bg-clip-text text-transparent leading-tight
                    ${isMobile ? 'text-2xl' : 'text-3xl'}
                  `}>
                    {isDragActive ? "Drop your SET photo here!" : "Upload SET Game Photo"}
                  </h3>
                </motion.div>
                
                {/* Enhanced description */}
                <motion.p 
                  className="text-gray-600 mb-10 text-center max-w-md leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  Take a clear photo of your SET cards on a flat surface for best results
                </motion.p>
                
                {/* Hidden file inputs with better accept types */}
                <input 
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.heic"
                  className="hidden"
                  onChange={handleFileInput}
                />
                
                <input 
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleFileInput}
                />
                
                {/* Enhanced action buttons with better spacing and effects */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 w-full max-w-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      cameraInputRef.current?.click();
                    }}
                    variant="primary"
                    className={`
                      rounded-2xl font-semibold w-full shadow-lg shadow-set-red/25 
                      transition-all duration-200 ease-out
                      hover:shadow-xl hover:shadow-set-red/30 hover:scale-105 hover:-translate-y-0.5
                      active:scale-95 active:translate-y-0
                      ${isMobile ? 'py-4 text-base' : 'py-5 text-lg'}
                    `}
                    disabled={isProcessing}
                  >
                    <Camera className="h-5 w-5 mr-3" />
                    <span>Take Photo</span>
                  </Button>
                  
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    variant="ios"
                    className={`
                      rounded-2xl font-semibold w-full shadow-lg 
                      transition-all duration-200 ease-out
                      hover:shadow-xl hover:scale-105 hover:-translate-y-0.5
                      active:scale-95 active:translate-y-0
                      ${isMobile ? 'py-4 text-base' : 'py-5 text-lg'}
                    `}
                    disabled={isProcessing}
                  >
                    <ImageIcon className="h-5 w-5 mr-3" />
                    <span>Choose from Gallery</span>
                  </Button>
                </motion.div>
                
                {/* Desktop drag hint with better styling */}
                {!isMobile && (
                  <motion.div 
                    className="flex items-center justify-center gap-2 text-sm text-gray-400 mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <span>Or drag and drop your image here</span>
                  </motion.div>
                )}

                {/* Enhanced drag overlay */}
                {(isDragActive || isDragOver) && (
                  <motion.div
                    className="absolute inset-0 bg-set-red/5 backdrop-blur-sm rounded-3xl border-2 border-dashed border-set-red/50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <Sparkles className="h-12 w-12 text-set-red mx-auto mb-4" />
                      </motion.div>
                      <p className="text-set-red font-semibold text-xl">Drop your photo here!</p>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Card className="overflow-hidden shadow-2xl border-2 border-gray-100 rounded-3xl bg-white">
              <CardContent className="p-0 relative">
                <div className="relative">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="w-full h-auto object-contain max-h-[50vh] md:max-h-[60vh]"
                    loading="eager"
                  />
                  
                  {!isProcessing && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-4 right-4"
                    >
                      <Button 
                        variant="ios"
                        size="icon"
                        className="rounded-full bg-white/95 backdrop-blur-sm shadow-xl h-12 w-12 transition-all hover:bg-white hover:shadow-2xl"
                        onClick={removeImage}
                      >
                        <X className="h-5 w-5 text-gray-600" />
                      </Button>
                    </motion.div>
                  )}
                </div>
                
                {/* Enhanced processing overlay */}
                {isProcessing && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm"
                  >
                    <motion.div 
                      className="bg-white/98 backdrop-blur-md rounded-3xl px-8 py-6 shadow-2xl flex flex-col items-center gap-5 z-10 max-w-xs border border-gray-100"
                      initial={{ y: 20, opacity: 0, scale: 0.9 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <div className="flex items-center gap-4">
                        <motion.div
                          animate={{ 
                            rotate: 360,
                            transition: { duration: 2, repeat: Infinity, ease: "linear" }
                          }}
                        >
                          <Sparkles className="h-6 w-6 text-set-red" />
                        </motion.div>
                        <span className="text-lg font-semibold text-gray-800">Analyzing SET cards...</span>
                      </div>
                      
                      <Progress 
                        value={uploadProgress} 
                        className="h-3 w-full bg-gray-100 rounded-full overflow-hidden"
                      />
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

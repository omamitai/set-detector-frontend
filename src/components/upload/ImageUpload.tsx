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

const SetShapeComponent = ({ type, color, className = "" }) => {
  const baseClasses = `w-14 h-14 mx-auto flex items-center justify-center ${className}`;
  
  return (
    <motion.div 
      className={`set-shape-${type} set-color-${color} ${baseClasses}`}
      initial={{ opacity: 0.8 }}
      animate={{ 
        opacity: [0.8, 1, 0.8],
      }}
      transition={{ 
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    >
      <div className="w-1/2 h-1/2 rounded-full bg-white/20 backdrop-blur-sm"></div>
    </motion.div>
  );
};

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
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));

    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        
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
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
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
              className={`overflow-hidden bg-white border border-gray-100 shadow-xl rounded-2xl transition-all ${dragActive ? 'ring-2 ring-set-red' : ''}`}
              {...getRootProps()} 
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrag}
            >
              <CardContent className={`flex flex-col items-center justify-center ${isMobile ? 'p-6 py-10' : 'p-10 py-16'}`}>
                <div className="mb-8 flex items-center justify-center gap-8">
                  <SetShapeComponent 
                    type="diamond" 
                    color="red" 
                    className="shadow-lg"
                  />
                  
                  <SetShapeComponent 
                    type="oval" 
                    color="purple" 
                    className="shadow-lg" 
                  />
                  
                  <SetShapeComponent 
                    type="squiggle" 
                    color="green" 
                    className="shadow-lg"
                  />
                </div>
                
                <motion.h3 
                  className="font-medium text-xl md:text-2xl mb-3 text-gray-800 bg-gradient-to-r from-set-red to-set-purple bg-clip-text text-transparent"
                  whileHover={{ scale: 1.02 }}
                >
                  {isDragActive ? "Drop your SET game photo here" : "Upload SET game photo"}
                </motion.h3>
                
                <motion.p 
                  className="text-gray-500 mb-8 text-center max-w-sm"
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                >
                  Take a clear photo of the cards on a flat surface
                </motion.p>
                
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
                
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                  <Button 
                    onClick={triggerCameraInput}
                    variant="primary"
                    className="rounded-full py-6 text-sm w-full shadow-lg shadow-set-red/20"
                    disabled={isProcessing}
                  >
                    <Camera className="h-5 w-5 mr-2" />
                    <span>Take Photo</span>
                  </Button>
                  
                  <Button 
                    onClick={triggerFileInput}
                    variant="ios"
                    className="rounded-full py-6 text-sm w-full shadow-lg"
                    disabled={isProcessing}
                  >
                    <ImageIcon className="h-5 w-5 mr-2" />
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
            <Card className="overflow-hidden shadow-xl border border-gray-100 rounded-2xl bg-white">
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
                        variant="ios"
                        size="icon"
                        className="rounded-full bg-white/90 backdrop-blur-xl shadow-md h-10 w-10"
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
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-xl"></div>
                    
                    <motion.div 
                      className="bg-white/90 backdrop-blur-2xl rounded-2xl px-6 py-5 shadow-2xl flex flex-col items-center gap-4 z-10 max-w-xs border border-gray-100"
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
                          <Sparkles className="h-5 w-5 text-set-red" />
                        </motion.div>
                        <span className="text-base font-medium text-gray-800">Analyzing SET cards...</span>
                      </div>
                      
                      <Progress value={uploadProgress} className="h-1.5 w-full bg-gray-100" />
                      
                      <div className="flex items-center justify-center gap-3">
                        <motion.div
                          className="w-6 h-6 text-lg font-bold"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.8, 1],
                            transition: { 
                              duration: 1.5, 
                              repeat: Infinity, 
                              delay: 0,
                              ease: "easeInOut"
                            }
                          }}
                        >
                          <div className="set-shape-diamond set-color-red w-6 h-6"></div>
                        </motion.div>
                        
                        <motion.div
                          className="w-6 h-6 text-lg font-bold"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.8, 1],
                            transition: { 
                              duration: 1.5, 
                              repeat: Infinity, 
                              delay: 0.3,
                              ease: "easeInOut"
                            }
                          }}
                        >
                          <div className="set-shape-oval set-color-purple w-6 h-6"></div>
                        </motion.div>
                        
                        <motion.div
                          className="w-6 h-6 text-lg font-bold"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.8, 1],
                            transition: { 
                              duration: 1.5, 
                              repeat: Infinity, 
                              delay: 0.6,
                              ease: "easeInOut"
                            }
                          }}
                        >
                          <div className="set-shape-squiggle set-color-green w-6 h-6"></div>
                        </motion.div>
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

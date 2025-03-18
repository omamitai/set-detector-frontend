
import { Info, Camera, Search, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

const HowItWorks = () => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="ios-card bg-white/40 backdrop-blur-md">
      <CardHeader className="p-3 md:p-4 pb-0">
        <CardTitle className="text-base md:text-lg sf-pro-display flex items-center">
          <Info className="h-4 w-4 text-primary mr-2" />
          How It Works
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 md:p-4">
        <div className="space-y-6">
          <Card className="overflow-hidden border-0 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
            <div className="bg-white/80 p-4 rounded-xl">
              <div className="flex gap-3">
                <div className="mt-0.5">
                  <div className="bg-set-purple/15 p-2 rounded-full">
                    <Camera className="h-4 w-4 text-set-purple" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-medium mb-1 sf-pro-display text-gray-900">Capture</h3>
                  <p className="text-muted-foreground text-xs md:text-sm sf-pro-text">
                    Take a clear photo of your SET game cards laid out on a surface from above. Try to ensure good lighting and minimal shadows for best results.
                  </p>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="overflow-hidden border-0 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
            <div className="bg-white/80 p-4 rounded-xl">
              <div className="flex gap-3">
                <div className="mt-0.5">
                  <div className="bg-set-red/15 p-2 rounded-full">
                    <Search className="h-4 w-4 text-set-red" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-medium mb-1 sf-pro-display text-gray-900">Analyze</h3>
                  <p className="text-muted-foreground text-xs md:text-sm sf-pro-text">
                    Our advanced computer vision algorithm identifies all cards in the image, analyzing their color, shape, number, and fill pattern to locate valid SETs.
                  </p>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="overflow-hidden border-0 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
            <div className="bg-white/80 p-4 rounded-xl">
              <div className="flex gap-3">
                <div className="mt-0.5">
                  <div className="bg-set-green/15 p-2 rounded-full">
                    <Check className="h-4 w-4 text-set-green" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-medium mb-1 sf-pro-display text-gray-900">View Results</h3>
                  <p className="text-muted-foreground text-xs md:text-sm sf-pro-text">
                    See all valid SETs highlighted in the image along with detailed card information. A valid SET has three cards where each feature is either all the same or all different.
                  </p>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="bg-gray-100/80 backdrop-blur-sm rounded-xl p-3 md:p-4 hover:bg-gray-50/90 transition-colors">
            <p className="font-medium sf-pro-display text-gray-900 mb-1">What makes a valid SET?</p>
            <p className="text-muted-foreground sf-pro-text text-xs md:text-sm">
              A valid SET consists of three cards where each feature (color, shape, number, and fill) is either all the same OR all different across all three cards.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HowItWorks;

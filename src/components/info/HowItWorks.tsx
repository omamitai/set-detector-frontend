
import { Info, Camera, Search, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

const HowItWorks = () => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="ios-card">
      <CardHeader className="p-3 md:p-4 pb-0">
        <CardTitle className="text-base md:text-lg sf-pro-display flex items-center">
          <Info className="h-4 w-4 text-primary mr-2" />
          How It Works
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 md:p-4">
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="mt-0.5">
              <div className="bg-set-purple/10 p-2 rounded-full">
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
          
          <div className="flex gap-3">
            <div className="mt-0.5">
              <div className="bg-set-red/10 p-2 rounded-full">
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
          
          <div className="flex gap-3">
            <div className="mt-0.5">
              <div className="bg-set-green/10 p-2 rounded-full">
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
          
          <div className={`bg-gray-50 rounded-xl p-3 md:p-4 mt-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>
            <p className="font-medium sf-pro-display text-gray-900 mb-1">What makes a valid SET?</p>
            <p className="text-muted-foreground sf-pro-text mb-2">
              A valid SET consists of three cards where each feature (color, shape, number, and fill) is either all the same OR all different across all three cards.
            </p>
            <p className="text-set-purple sf-pro-text">
              <a href="https://www.setgame.com/set/puzzle_rules" target="_blank" rel="noopener noreferrer" className="underline hover:text-set-purple/80">
                View comprehensive rules
              </a>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HowItWorks;

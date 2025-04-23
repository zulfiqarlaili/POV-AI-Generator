import { useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  prompt: string;
}

export function ImageDisplay({ imageUrl, isLoading, prompt }: ImageDisplayProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className={cn(
        "relative w-full min-h-[300px] md:min-h-[400px] flex items-center justify-center",
        "bg-muted/30 rounded-md overflow-hidden"
      )}
      aria-live="polite"
      aria-busy={isLoading}
    >
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background/80 z-10 text-center p-6">
          <div className="animate-pulse text-muted-foreground">
            <Loader2 className="h-12 w-12 animate-spin mx-auto" />
            <p className="mt-4 text-base max-w-[90%] mx-auto">
              Generating your masterpiece...
            </p>
          </div>
        </div>
      )}

      {!isLoading && !imageUrl && (
        <div className="text-center text-muted-foreground p-8">
          <p className="text-lg mb-2">Your image will appear here</p>
          <p className="text-sm">
            Enter a detailed description and click "Generate Image"
          </p>
        </div>
      )}

      {imageUrl && (
        <img
          src={imageUrl}
          alt={prompt || "Generated image"}
          className={cn(
            "w-full h-auto object-contain max-h-[600px]",
            "transition-opacity duration-500",
            !imageLoaded && "opacity-0",
            imageLoaded && "opacity-100"
          )}
          onLoad={() => setImageLoaded(true)}
        />
      )}
    </div>
  );
}
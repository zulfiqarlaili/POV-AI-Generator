import { useState, useRef, useEffect } from "react";
import { useGenerateImage } from "@/hooks/useGenerateImage";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { ImageDisplay } from "./ImageDisplay";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { generateImage, imageUrl, isLoading, error } = useGenerateImage();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast.warning("Please enter a description of what you want to create.");
      return;
    }
    generateImage(prompt);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.metaKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className="max-w-[900px] mx-auto w-full flex flex-col items-center">
      <div className="flex flex-col items-center justify-center w-full mb-8 relative">
        <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary">
          POV AI Generator
        </h1>
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <ThemeToggle />
        </div>
      </div>

      <Card className="w-full p-6 bg-card/50 backdrop-blur-sm border-2 border-primary/10">
        <CardContent className="p-0 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Textarea
                ref={textareaRef}
                placeholder="Describe the POV moment you want to capture..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                className={cn(
                  "min-h-[100px] text-lg p-4 transition-all duration-200 resize-none",
                  "focus:ring-2 focus:ring-primary focus:ring-opacity-50",
                  "placeholder:text-muted-foreground/80",
                  "bg-background/50 backdrop-blur-sm"
                )}
                aria-label="POV description"
              />
              <p className="text-xs text-muted-foreground text-center">
                Press ⌘+Enter to generate
              </p>
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                size="lg"
                disabled={isLoading || !prompt.trim()}
                className={cn(
                  "px-8 py-6 text-lg font-medium",
                  "bg-gradient-to-r from-primary to-purple-400",
                  "hover:opacity-90 transition-all duration-300 transform",
                  "hover:scale-[1.02] active:scale-[0.98]",
                  "shadow-lg hover:shadow-primary/25",
                  "disabled:opacity-50 disabled:hover:scale-100"
                )}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                {isLoading ? "Creating POV..." : "Create POV"}
              </Button>
            </div>
          </form>

          <div className="mt-8">
            <Card className="border-2 border-primary/10 overflow-hidden bg-card/50 backdrop-blur-sm">
              <CardContent className="p-0">
                <ImageDisplay 
                  imageUrl={imageUrl} 
                  isLoading={isLoading} 
                  prompt={prompt} 
                />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
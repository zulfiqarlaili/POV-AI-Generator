import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import ImageGenerator from "@/components/image-generator/ImageGenerator";
import { ParticleBackground } from "@/components/particles/ParticleBackground";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 relative overflow-hidden">
        <ParticleBackground />
        <main className="container mx-auto px-4 py-8 md:py-12 flex flex-col items-center relative z-10">
          <ImageGenerator />
        </main>
        <Toaster richColors />
      </div>
    </ThemeProvider>
  );
}

export default App;

import { useState } from "react";

// A collection of sample images to simulate AI generation
// In a real implementation, this would be replaced with an API call to an AI service
// const SAMPLE_IMAGES = [
//   "https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg",
//   "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg",
//   "https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg",
//   "https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg",
//   "https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg",
//   "https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg",
//   "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg",
//   "https://images.pexels.com/photos/258112/pexels-photo-258112.jpeg",
//   "https://images.pexels.com/photos/7412089/pexels-photo-7412089.jpeg",
//   "https://images.pexels.com/photos/774731/pexels-photo-774731.jpeg",
// ];

export function useGenerateImage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async (prompt: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // // Simulate API call delay
      // await new Promise((resolve) => setTimeout(resolve, 1500));

      // // Get a random image from our sample collection
      // // In a real implementation, this would be the response from an AI API
      // const randomIndex = Math.floor(Math.random() * SAMPLE_IMAGES.length);
      // const randomImage = SAMPLE_IMAGES[randomIndex];

      // // 10% chance of error to demonstrate error handling
      // if (Math.random() < 0.1) {
      //   throw new Error("Failed to generate image. Please try again.");
      // }

      const response = await fetch(
        "https://n8n.07102020.xyz/webhook-test/0684bac3-6c28-47ec-86ab-c22767d70be2",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ "user-prompts": prompt }),
        }
      );

      if (!response.ok) {
        setError("An unexpected error occurred. Please try again.");
        setImageUrl(null);
      }

      const data = await response.json();
      const randomImage = data?.image_url;

      setImageUrl(randomImage);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again."
      );
      setImageUrl(null);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateImage,
    imageUrl,
    isLoading,
    error,
  };
}

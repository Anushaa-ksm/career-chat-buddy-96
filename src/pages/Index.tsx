import { PixelBackground } from '@/components/PixelBackground';
import { CareerQuizBot } from '@/components/CareerQuizBot';
import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    // Update meta tags for SEO
    document.title = 'Career Quest - AI-Powered Career Guidance for Students';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover your perfect career path with our gamified AI quiz. Get personalized career recommendations and roadmaps for Engineering, Medicine, Arts, and Commerce streams.');
    }

    // Add structured data for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "EducationalApplication",
      "name": "Career Quest - AI Career Guidance",
      "description": "Interactive career guidance quiz using AI to help students discover their ideal career paths",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <main className="relative min-h-screen">
      <PixelBackground />
      
      <header className="absolute top-0 left-0 right-0 z-10 p-4">
        <div className="text-center">
          <h1 className="text-2xl lg:text-4xl font-pixel font-bold text-foreground drop-shadow-lg">
            🎮 CAREER QUEST 🎮
          </h1>
          <p className="text-sm lg:text-base font-pixel text-muted-foreground mt-2">
            AI-Powered Career Guidance Adventure
          </p>
        </div>
      </header>

      <div className="relative z-10 pt-24">
        <CareerQuizBot />
      </div>
    </main>
  );
};

export default Index;

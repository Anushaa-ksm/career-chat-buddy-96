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
    <main className="min-h-screen bg-background">
      <header className="p-4 border-b border-border">
        <div className="text-center">
          <h1 className="text-2xl lg:text-4xl font-bold text-foreground">
            🎯 CAREER QUEST
          </h1>
          <p className="text-sm lg:text-base text-muted-foreground mt-2">
            AI-Powered Career Guidance
          </p>
        </div>
      </header>

      <div className="pt-4">
        <CareerQuizBot />
      </div>
    </main>
  );
};

export default Index;

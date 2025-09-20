import { CareerQuizBot } from '@/components/CareerQuizBot';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = 'Career Quest - AI-Powered Career Guidance for Students';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover your perfect career path with our gamified AI quiz. Get personalized career recommendations and roadmaps for Engineering, Medicine, Arts, and Commerce streams.');
    }

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
    <main className="min-h-screen bg-gradient-sky overflow-hidden relative">
      {/* Navigation Button */}
      <div className="absolute top-4 right-4 z-20">
        <Button 
          variant="outline" 
          onClick={() => navigate('/roadmap')}
          className="bg-white/90 backdrop-blur font-pixel"
        >
          🗺️ ROADMAP
        </Button>
      </div>

      {/* Decorative Clouds */}
      <div className="absolute top-[10%] left-[15%] w-32 h-16 bg-white/80 rounded-full filter blur-sm pixelated-image animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute top-[15%] right-[20%] w-48 h-24 bg-white/70 rounded-full filter blur-sm pixelated-image animate-pulse" style={{ animationDuration: '10s' }}></div>
      <div className="absolute top-[25%] left-[30%] w-24 h-12 bg-white/60 rounded-full filter blur-sm pixelated-image animate-pulse" style={{ animationDuration: '9s' }}></div>

      <header className="p-4 text-center relative z-10">
        <h1 className="text-2xl lg:text-4xl font-pixel font-bold text-foreground" style={{ textShadow: '3px 3px 0px hsl(var(--border))' }}>
          🎯 CAREER QUEST
        </h1>
        <p className="text-sm lg:text-base text-foreground/80 mt-2 font-pixel">
          YOUR ADVENTURE AWAITS!
        </p>
      </header>

      <div className="relative z-10 pt-4">
        <CareerQuizBot />
      </div>

      {/* Decorative Grass Floor */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-repeat-x bg-bottom" style={{ backgroundImage: 'linear-gradient(to top, hsl(120, 60%, 35%), hsl(120, 60%, 40%))', borderTop: '8px solid hsl(100, 50%, 25%)' }}/>
    </main>
  );
};

export default Index;
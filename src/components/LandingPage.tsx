
import React, { useState } from 'react';
import StarRating from './StarRating';
import FeedbackForm from './FeedbackForm';
import SocialReviewButtons from './SocialReviewButtons';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Heart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const LandingPage: React.FC = () => {
  const { theme, setTheme, bannerUrl, feedbackText } = useAppContext();
  const [rating, setRating] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { toast } = useToast();

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    setIsSubmitted(false);
  };

  const handleSubmission = () => {
    setIsSubmitted(true);
    toast({
      title: "Thank you!",
      description: "We appreciate your time.",
    });
  };

  const renderFeedbackContent = () => {
    if (!rating) return null;

    if (isSubmitted) {
      return (
        <div className="text-center mt-8 animate-fade-in">
          <h3 className="text-2xl font-semibold mb-4">Thank You!</h3>
          <p className="text-lg">We appreciate your feedback.</p>
          <Button 
            onClick={() => {
              setRating(0);
              setIsSubmitted(false);
            }}
            className="mt-4"
          >
            Rate Again
          </Button>
        </div>
      );
    }

    return (
      <div className="mt-8 animate-fade-in">
        <p className="text-center text-lg mb-6">{feedbackText[rating] || ''}</p>
        
        {rating <= 3 ? (
          <FeedbackForm rating={rating} onSubmit={handleSubmission} />
        ) : (
          <SocialReviewButtons onSubmit={handleSubmission} />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Banner */}
      <div className="w-full h-48 md:h-64 bg-cover bg-center" style={{ backgroundImage: `url(${bannerUrl})` }}>
        <div className="h-full flex items-center justify-center bg-black/30">
          <h1 className="text-white text-3xl md:text-4xl font-bold text-center px-4">
            We Value Your Feedback
          </h1>
        </div>
      </div>

      {/* Theme Selector */}
      <div className="absolute top-4 right-4 flex space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme('light')}
          className={`${theme === 'light' ? 'bg-primary text-primary-foreground' : ''}`}
          aria-label="Light Theme"
        >
          <Sun className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme('dark')}
          className={`${theme === 'dark' ? 'bg-primary text-primary-foreground' : ''}`}
          aria-label="Dark Theme"
        >
          <Moon className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme('pink')}
          className={`${theme === 'pink' ? 'bg-primary text-primary-foreground' : ''}`}
          aria-label="Pink Theme"
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="max-w-2xl w-full mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">
              How would you rate your experience?
            </h2>
            <div className="flex justify-center mb-4">
              <StarRating
                totalStars={5}
                size={40}
                onRatingChange={handleRatingChange}
                initialRating={rating}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Click to rate from 1 to 5 stars
            </p>
          </div>

          {renderFeedbackContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 text-center">
        <a 
          href="/admin" 
          className="text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          Admin Access
        </a>
      </footer>
    </div>
  );
};

export default LandingPage;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Facebook, Globe } from 'lucide-react';

interface SocialReviewButtonsProps {
  onSubmit: () => void;
}

const SocialReviewButtons: React.FC<SocialReviewButtonsProps> = ({ onSubmit }) => {
  const handleGoogleClick = () => {
    // Open Google review page in a new tab
    window.open('https://g.page/r/your-business-id/review', '_blank');
    onSubmit();
  };

  const handleFacebookClick = () => {
    // Open Facebook review page in a new tab
    window.open('https://www.facebook.com/your-business/reviews', '_blank');
    onSubmit();
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto mt-6">
      <Button 
        onClick={handleGoogleClick}
        className="social-button w-full sm:w-1/2 bg-[#4285F4] hover:bg-[#3367d6] text-white"
      >
        <Globe className="mr-2 h-4 w-4" />
        Review on Google
      </Button>
      <Button 
        onClick={handleFacebookClick}
        className="social-button w-full sm:w-1/2 bg-[#1877F2] hover:bg-[#166fe5] text-white"
      >
        <Facebook className="mr-2 h-4 w-4" />
        Review on Facebook
      </Button>
    </div>
  );
};

export default SocialReviewButtons;

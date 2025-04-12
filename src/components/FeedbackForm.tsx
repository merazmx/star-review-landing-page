
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

interface FeedbackFormProps {
  rating: number;
  onSubmit: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ rating, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', { rating, name, email, feedback });
    
    // Show a success message
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your valuable feedback!",
    });
    
    // Reset form
    setName('');
    setEmail('');
    setFeedback('');
    
    // Notify parent component
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto mt-4">
      <div>
        <Input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full"
        />
      </div>
      <div>
        <Input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full"
        />
      </div>
      <div>
        <Textarea
          placeholder="Your Feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
          className="w-full min-h-[100px]"
        />
      </div>
      <Button type="submit" className="w-full">
        Submit Feedback
      </Button>
    </form>
  );
};

export default FeedbackForm;

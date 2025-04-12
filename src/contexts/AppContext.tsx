
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Theme = 'light' | 'dark' | 'pink';

export type FeedbackText = {
  [key: number]: string;
};

type AppContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  bannerUrl: string;
  setBannerUrl: (url: string) => void;
  feedbackText: FeedbackText;
  setFeedbackText: (text: FeedbackText) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
};

const defaultFeedbackText = {
  1: "We're sorry to hear about your experience. Please let us know how we can improve.",
  2: "Thank you for your feedback. We'll work on making things better.",
  3: "We appreciate your feedback and will use it to improve our service.",
  4: "Thank you for your positive feedback! We'd love if you could share your experience.",
  5: "We're thrilled you had a great experience! Please consider sharing a review."
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [bannerUrl, setBannerUrl] = useState<string>('/placeholder.svg');
  const [feedbackText, setFeedbackText] = useState<FeedbackText>(defaultFeedbackText);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    // Apply theme class to the body
    document.body.classList.remove('light-theme', 'dark-theme', 'pink-theme');
    document.body.classList.add(`${theme}-theme`);

    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme && ['light', 'dark', 'pink'].includes(savedTheme)) {
      setTheme(savedTheme);
    }

    // Load banner URL from localStorage
    const savedBannerUrl = localStorage.getItem('bannerUrl');
    if (savedBannerUrl) {
      setBannerUrl(savedBannerUrl);
    }

    // Load feedback text from localStorage
    const savedFeedbackText = localStorage.getItem('feedbackText');
    if (savedFeedbackText) {
      try {
        setFeedbackText(JSON.parse(savedFeedbackText));
      } catch (e) {
        console.error('Error parsing saved feedback text', e);
      }
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        bannerUrl,
        setBannerUrl,
        feedbackText,
        setFeedbackText,
        isAdmin,
        setIsAdmin
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

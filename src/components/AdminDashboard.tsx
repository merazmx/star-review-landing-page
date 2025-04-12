
import React, { useState } from 'react';
import { useAppContext, FeedbackText } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Upload, Save, Sun, Moon, Heart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import StarRating from './StarRating';

const AdminDashboard: React.FC = () => {
  const { 
    theme, 
    setTheme, 
    bannerUrl, 
    setBannerUrl, 
    feedbackText, 
    setFeedbackText, 
    setIsAdmin 
  } = useAppContext();
  
  const [newBannerUrl, setNewBannerUrl] = useState(bannerUrl);
  const [editedFeedbackText, setEditedFeedbackText] = useState<FeedbackText>({...feedbackText});
  const { toast } = useToast();

  const handleBannerUpdate = () => {
    setBannerUrl(newBannerUrl);
    localStorage.setItem('bannerUrl', newBannerUrl);
    toast({
      title: "Banner Updated",
      description: "Your banner image has been updated successfully.",
    });
  };

  const handleFeedbackTextUpdate = () => {
    setFeedbackText(editedFeedbackText);
    localStorage.setItem('feedbackText', JSON.stringify(editedFeedbackText));
    toast({
      title: "Feedback Text Updated",
      description: "Your feedback text has been updated successfully.",
    });
  };

  const handleLogout = () => {
    setIsAdmin(false);
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </header>

        <Tabs defaultValue="banner" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="banner">Banner</TabsTrigger>
            <TabsTrigger value="feedbackText">Feedback Text</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
          </TabsList>

          {/* Banner Tab */}
          <TabsContent value="banner">
            <Card>
              <CardHeader>
                <CardTitle>Banner Image</CardTitle>
                <CardDescription>
                  Update the banner image that appears at the top of the landing page
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="w-full h-48 bg-cover bg-center rounded-md border overflow-hidden" 
                    style={{ backgroundImage: `url(${bannerUrl})` }}>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <Input
                      placeholder="Enter banner image URL"
                      value={newBannerUrl}
                      onChange={(e) => setNewBannerUrl(e.target.value)}
                      className="flex-grow"
                    />
                    <Button onClick={handleBannerUpdate} className="whitespace-nowrap">
                      <Upload className="mr-2 h-4 w-4" />
                      Update Banner
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback Text Tab */}
          <TabsContent value="feedbackText">
            <Card>
              <CardHeader>
                <CardTitle>Feedback Text</CardTitle>
                <CardDescription>
                  Customize the text shown to users based on their rating
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <div key={rating} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <label htmlFor={`feedback-${rating}`} className="font-medium">
                          Rating {rating}:
                        </label>
                        <div className="ml-2">
                          <StarRating initialRating={rating} editable={false} size={20} />
                        </div>
                      </div>
                      <Textarea
                        id={`feedback-${rating}`}
                        value={editedFeedbackText[rating] || ''}
                        onChange={(e) => setEditedFeedbackText({
                          ...editedFeedbackText,
                          [rating]: e.target.value
                        })}
                        placeholder={`Enter feedback text for ${rating} star rating`}
                      />
                    </div>
                  ))}
                  
                  <Button onClick={handleFeedbackTextUpdate}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Feedback Text
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Theme Tab */}
          <TabsContent value="theme">
            <Card>
              <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
                <CardDescription>
                  Change the color theme of your landing page
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <Button
                        variant="outline"
                        onClick={() => setTheme('light')}
                        className={`w-full h-24 ${theme === 'light' ? 'ring-2 ring-primary' : ''}`}
                      >
                        <div className="flex flex-col items-center">
                          <Sun className="h-8 w-8 mb-2" />
                          <span>Light Theme</span>
                        </div>
                      </Button>
                    </div>
                    <div className="flex-1">
                      <Button
                        variant="outline"
                        onClick={() => setTheme('dark')}
                        className={`w-full h-24 ${theme === 'dark' ? 'ring-2 ring-primary' : ''}`}
                      >
                        <div className="flex flex-col items-center">
                          <Moon className="h-8 w-8 mb-2" />
                          <span>Dark Theme</span>
                        </div>
                      </Button>
                    </div>
                    <div className="flex-1">
                      <Button
                        variant="outline"
                        onClick={() => setTheme('pink')}
                        className={`w-full h-24 ${theme === 'pink' ? 'ring-2 ring-primary' : ''}`}
                      >
                        <div className="flex flex-col items-center">
                          <Heart className="h-8 w-8 mb-2" />
                          <span>Pink Theme</span>
                        </div>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <p className="text-sm text-muted-foreground mb-2">
                      Current Theme: <span className="font-medium capitalize">{theme}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      The theme will be applied to your landing page immediately.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;

'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Tag, Globe, Share2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RichContent } from '@/components/shared/rich-content';
import type { SitePost } from '@/lib/site-connector';

type PostContent = {
  category?: string;
  location?: string;
  address?: string;
  website?: string;
  phone?: string;
  email?: string;
  description?: string;
  body?: string;
  excerpt?: string;
  author?: string;
  highlights?: string[];
  logo?: string;
  images?: string[];
  latitude?: number | string;
  longitude?: number | string;
};

const getContent = (post: SitePost): PostContent => {
  const content = post.content && typeof post.content === 'object' ? post.content : {};
  return content as PostContent;
};

interface SbmDetailPageProps {
  post: SitePost;
  category: string;
  descriptionHtml: string;
  postTags: string[];
}

export function SbmDetailPage({ post, category, descriptionHtml, postTags }: SbmDetailPageProps) {
  const [shareLabel, setShareLabel] = useState('Share');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');
  const content = getContent(post);
  const location = content.address || content.location;

  useEffect(() => {
    if (showNotification) {
      console.log('Showing notification:', notificationMessage);
      const timer = setTimeout(() => {
        console.log('Hiding notification');
        setShowNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification, notificationMessage]);

  const handleShare = () => {
    console.log('Share button clicked!');
    
    // Force show notification for testing
    setShowNotification(true);
    setNotificationMessage('Testing notification!');
    setNotificationType('success');
    console.log('Notification forced to show');
    
    // Get the current page URL
    const currentUrl = window.location.href;
    console.log('URL to copy:', currentUrl);
    
    // Simple copy method
    const textArea = document.createElement('textarea');
    textArea.value = currentUrl;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      console.log('Copy successful:', successful);
      
      if (successful) {
        // Update button state
        setShareLabel('Copied');
        setTimeout(() => setShareLabel('Share'), 2000);
        
        // Update notification message
        setTimeout(() => {
          setNotificationMessage('URL copied to clipboard!');
        }, 100);
      } else {
        throw new Error('Copy command failed');
      }
    } catch (err) {
      console.error('Copy failed:', err);
      document.body.removeChild(textArea);
      
      // Update button state for error
      setShareLabel('Copy failed');
      setTimeout(() => setShareLabel('Share'), 2000);
      
      // Show error notification
      setNotificationMessage('Failed to copy URL');
      setNotificationType('error');
    }
  };

  const formatRichHtml = (description: string, fallback: string) => {
    const raw = typeof description === "string" && description.trim() || fallback;
    return raw;
  };

  return (
    <>
      <div className="mx-auto w-full max-w-4xl text-center py-12">
        <div className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="secondary" className="inline-flex items-center gap-1">
            <Tag className="h-3.5 w-3.5" />
            {category}
          </Badge>
          {location && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {location}
            </span>
          )}
        </div>
        <h1 className="mb-6 text-4xl font-bold text-foreground leading-tight">
          {post.title}
        </h1>
        <div className="mb-8 max-w-2xl mx-auto">
          <RichContent html={formatRichHtml(descriptionHtml, "Details coming soon.")} className="text-lg text-muted-foreground leading-relaxed" />
        </div>
        
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          {content.website && (
            <Button 
              size="lg" 
              className="px-8 py-3 text-base font-medium"
              asChild
            >
              <a 
                href={content.website} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Globe className="h-5 w-5" />
                Visit Website
              </a>
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="lg" 
            className="px-8 py-3 text-base font-medium"
            onClick={handleShare}
            type="button"
          >
            {shareLabel === 'Copied' ? <Check className="h-5 w-5" /> : <Share2 className="h-5 w-5" />}
            {shareLabel}
          </Button>
        </div>
        
        {postTags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            {postTags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Custom Notification */}
      {showNotification && (
        <div 
          className={cn(
            "fixed top-4 right-4 z-[9999] px-4 py-3 rounded-lg shadow-lg",
            notificationType === 'success' 
              ? "bg-green-500 text-white" 
              : "bg-red-500 text-white"
          )}
        >
          <div className="flex items-center gap-2">
            {notificationType === 'success' ? (
              <Check className="h-4 w-4" />
            ) : (
              <Share2 className="h-4 w-4" />
            )}
            <span className="font-medium">{notificationMessage}</span>
          </div>
        </div>
      )}
    </>
  );
}

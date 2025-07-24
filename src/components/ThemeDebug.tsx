import React from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, X, Eye } from 'lucide-react';

export function ThemeDebug() {
  const { theme } = useTheme();
  const [currentSystemTheme, setCurrentSystemTheme] = React.useState<'light' | 'dark'>('light');
  const [htmlClasses, setHtmlClasses] = React.useState<string>('');
  const [isVisible, setIsVisible] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(true);

  React.useEffect(() => {
    // Check system theme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setCurrentSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    const handleChange = () => {
      setCurrentSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  React.useEffect(() => {
    // Monitor HTML classes
    const updateClasses = () => {
      setHtmlClasses(document.documentElement.className);
    };

    updateClasses();
    
    const observer = new MutationObserver(updateClasses);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    // Check for debug mode in localStorage or URL params
    const debugMode = localStorage.getItem('theme-debug-enabled') === 'true' || 
                     new URLSearchParams(window.location.search).has('debug') ||
                     process.env.NODE_ENV === 'development';
    setIsVisible(debugMode);
  }, []);

  const toggleVisibility = () => {
    const newVisibility = !isVisible;
    setIsVisible(newVisibility);
    localStorage.setItem('theme-debug-enabled', String(newVisibility));
  };

  // Keyboard shortcut to toggle debug (Ctrl/Cmd + Shift + D)
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        if (event.shiftKey && event.key === 'D') {
          event.preventDefault();
          toggleVisibility();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  // Show toggle button if in development or debug was previously enabled
  const showToggleButton = process.env.NODE_ENV === 'development' || 
                           localStorage.getItem('theme-debug-enabled') !== null;

  if (!showToggleButton) {
    return null;
  }

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleVisibility}
          className="opacity-50 hover:opacity-100 transition-opacity"
          title="Show Theme Debug (Ctrl/Cmd + Shift + D)"
        >
          <Eye className="h-4 w-4" />
          <span className="sr-only">Show theme debug</span>
        </Button>
      </div>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-64 opacity-90 hover:opacity-100 transition-opacity z-50 border-2">
      <CardHeader className="pb-2 flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm">Theme Debug</CardTitle>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-6 w-6 p-0"
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleVisibility}
            className="h-6 w-6 p-0"
            title="Hide Debug (Ctrl/Cmd + Shift + D)"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span>Selected Theme:</span>
            <Badge variant="outline">{theme}</Badge>
          </div>
          <div className="flex justify-between">
            <span>System Preference:</span>
            <Badge variant={currentSystemTheme === 'dark' ? 'default' : 'secondary'}>
              {currentSystemTheme}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>HTML Classes:</span>
            <Badge variant="outline" className="max-w-20 truncate">
              {htmlClasses || 'none'}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>Background Color:</span>
            <div 
              className="w-4 h-4 rounded border bg-background"
              title={`Background: hsl(var(--background))`}
            />
          </div>
          <div className="pt-2 border-t text-muted-foreground">
            <p className="text-xs">
              Press <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl/Cmd + Shift + D</kbd> to toggle
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
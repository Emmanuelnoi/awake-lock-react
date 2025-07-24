import React from 'react';
import { useTranslation } from 'react-i18next';
import { Info, Monitor, Shield, Zap, Smartphone, ExternalLink, Github } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AboutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AboutDialog: React.FC<AboutDialogProps> = ({ open, onOpenChange }) => {
  const { t } = useTranslation();
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            {t('about.title')}
          </DialogTitle>
          <DialogDescription>
            {t('about.description')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* App Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Monitor className="h-4 w-4" />
                {t('about.whatIs.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {t('about.whatIs.description')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="text-center p-3 border rounded-lg">
                  <Shield className="h-6 w-6 mx-auto mb-2 text-green-500" />
                  <p className="font-medium">Privacy First</p>
                  <p className="text-muted-foreground">No data collection</p>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <Zap className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                  <p className="font-medium">Battery Aware</p>
                  <p className="text-muted-foreground">Optimized for efficiency</p>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <Smartphone className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                  <p className="font-medium">Cross Platform</p>
                  <p className="text-muted-foreground">Works on all devices</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Screen Wake Lock</p>
                    <p className="text-muted-foreground">Prevents screen from turning off</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium">System Wake Lock</p>
                    <p className="text-muted-foreground">Keeps entire device awake</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Intelligent Fallbacks</p>
                    <p className="text-muted-foreground">Works on older browsers</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Battery Monitoring</p>
                    <p className="text-muted-foreground">Shows current battery level</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Session Statistics</p>
                    <p className="text-muted-foreground">Track usage patterns</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Theme Support</p>
                    <p className="text-muted-foreground">Light, dark, and system themes</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Browser Support */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Browser Compatibility</CardTitle>
              <CardDescription>
                Wake Lock API support across different browsers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="text-center">
                  <p className="font-medium">Chrome</p>
                  <Badge variant="default" className="mt-1">Full Support</Badge>
                </div>
                <div className="text-center">
                  <p className="font-medium">Firefox</p>
                  <Badge variant="secondary" className="mt-1">Partial</Badge>
                </div>
                <div className="text-center">
                  <p className="font-medium">Safari</p>
                  <Badge variant="secondary" className="mt-1">Partial</Badge>
                </div>
                <div className="text-center">
                  <p className="font-medium">Edge</p>
                  <Badge variant="default" className="mt-1">Full Support</Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                For browsers without native support, the app uses intelligent fallback strategies 
                to maintain functionality.
              </p>
            </CardContent>
          </Card>

          {/* Technical Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Technical Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium mb-1">Version</p>
                  <p className="text-muted-foreground">1.0.0</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Built with</p>
                  <p className="text-muted-foreground">React + TypeScript</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Wake Lock Library</p>
                  <p className="text-muted-foreground">awake-lock v1.1.0</p>
                </div>
                <div>
                  <p className="font-medium mb-1">UI Framework</p>
                  <p className="text-muted-foreground">shadcn/ui</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="https://github.com/Emmanuelnoi/awake-lock" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    Awake Lock Library
                    <ExternalLink className="h-3 w-3 ml-auto" />
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Screen Wake Lock API Documentation
                    <ExternalLink className="h-3 w-3 ml-auto" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="h-4 w-4" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <p>No personal data is collected or transmitted</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <p>All processing happens locally in your browser</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <p>Settings are stored locally using browser storage</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <p>No external tracking or analytics</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
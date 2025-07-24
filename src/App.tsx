import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { WakeLockControl } from '@/components/WakeLockControl';
import { SettingsDialog } from '@/components/SettingsDialog';
import { AboutDialog } from '@/components/AboutDialog';
import { ThemeDebug } from '@/components/ThemeDebug';

function App() {
  const { t } = useTranslation();
  const [showSettings, setShowSettings] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <ThemeProvider defaultTheme="system" storageKey="awake-lock-theme">
      <div className="min-h-screen bg-background">
        <Header 
          onSettingsClick={() => setShowSettings(true)}
          onAboutClick={() => setShowAbout(true)}
        />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">
                {t('app.tagline')}
              </h1>
              <p className="text-xl text-muted-foreground">
                {t('app.subtitle')}
              </p>
            </div>

            {/* Main Control */}
            <WakeLockControl />

            {/* Additional Info */}
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                {t('compatibility.worksWith')}
              </p>
              <p className="text-xs text-muted-foreground">
                {t('compatibility.browserList')}
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t py-6 mt-12">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>
              Built with React, TypeScript, and the{' '}
              <a 
                href="https://github.com/Emmanuelnoi/awake-lock" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                awake-lock library
              </a>
              <br></br>
               by {' '}
              <a 
                href="https://github.com/Emmanuelnoi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                Emmanuel Noi
              </a>
            </p>
          </div>
        </footer>

        {/* Dialogs */}
        <SettingsDialog 
          open={showSettings} 
          onOpenChange={setShowSettings}
        />
        <AboutDialog 
          open={showAbout} 
          onOpenChange={setShowAbout}
        />

        {/* Development Theme Debug */}
        <ThemeDebug />
      </div>
    </ThemeProvider>
  );
}

export default App;
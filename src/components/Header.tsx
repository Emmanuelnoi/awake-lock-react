import React from 'react';
import { Monitor, Settings, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSelector } from '@/components/LanguageSelector';

interface HeaderProps {
  onSettingsClick: () => void;
  onAboutClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSettingsClick, onAboutClick }) => {
  const { t } = useTranslation();

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Monitor className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">{t('header.title')}</h1>
          </div>

          <nav className="flex items-center gap-2">
            <LanguageSelector variant="button" />
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={onSettingsClick}>
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">{t('header.settings')}</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={onAboutClick}>
              <Info className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">{t('header.about')}</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
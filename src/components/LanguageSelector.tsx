import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '@/i18n';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface LanguageSelectorProps {
  variant?: 'select' | 'button';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  variant = 'select', 
  className 
}) => {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  const currentLanguage = SUPPORTED_LANGUAGES.find(
    lang => lang.code === i18n.language
  ) || SUPPORTED_LANGUAGES[0];

  if (variant === 'button') {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          // Cycle through languages
          const currentIndex = SUPPORTED_LANGUAGES.findIndex(
            lang => lang.code === i18n.language
          );
          const nextIndex = (currentIndex + 1) % SUPPORTED_LANGUAGES.length;
          handleLanguageChange(SUPPORTED_LANGUAGES[nextIndex].code);
        }}
        className={`gap-2 ${className}`}
        title={`${t('settings.language.title')}: ${currentLanguage.nativeName}`}
      >
        <Languages className="h-4 w-4" />
        <span className="hidden sm:inline">
          {currentLanguage.code.toUpperCase()}
        </span>
      </Button>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-sm font-medium">
        {t('settings.language.title')}
      </label>
      <Select value={i18n.language} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-full">
          <SelectValue>
            <div className="flex items-center gap-2">
              <Languages className="h-4 w-4" />
              <span>{currentLanguage.nativeName}</span>
              <span className="text-muted-foreground">
                ({currentLanguage.name})
              </span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {SUPPORTED_LANGUAGES.map((language) => (
            <SelectItem key={language.code} value={language.code}>
              <div className="flex items-center gap-2">
                <span className="font-medium">{language.nativeName}</span>
                <span className="text-muted-foreground text-xs">
                  {language.name}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-xs text-muted-foreground">
        {t('settings.language.description')}
      </p>
    </div>
  );
};
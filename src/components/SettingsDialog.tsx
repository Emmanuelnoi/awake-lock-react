import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Settings, Timer, Battery, Monitor, Smartphone, Languages } from 'lucide-react';
import { LanguageSelector } from '@/components/LanguageSelector';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SettingsDialog: React.FC<SettingsDialogProps> = ({ open, onOpenChange }) => {
  const { t } = useTranslation();
  const [autoDisableTimer, setAutoDisableTimer] = useState(false);
  const [timerDuration, setTimerDuration] = useState(30); // minutes
  const [batteryOptimization, setBatteryOptimization] = useState(true);
  const [showNotifications, setShowNotifications] = useState(true);
  const [debugMode, setDebugMode] = useState(false);

  const timerOptions = [15, 30, 60, 120, 180]; // minutes

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            {t('settings.title')}
          </DialogTitle>
          <DialogDescription>
            {t('settings.description')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Auto-disable Timer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Timer className="h-4 w-4" />
                {t('settings.autoDisable.title')}
              </CardTitle>
              <CardDescription>
                {t('settings.autoDisable.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{t('settings.autoDisable.enable')}</span>
                <Switch
                  checked={autoDisableTimer}
                  onCheckedChange={setAutoDisableTimer}
                />
              </div>

              {autoDisableTimer && (
                <div className="space-y-3">
                  <label className="text-sm font-medium">{t('settings.autoDisable.duration')}</label>
                  <div className="grid grid-cols-5 gap-2">
                    {timerOptions.map((duration) => (
                      <Button
                        key={duration}
                        variant={timerDuration === duration ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setTimerDuration(duration)}
                      >
                        {duration}m
                      </Button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t('settings.autoDisable.willDisable', { duration: timerDuration })}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Battery Optimization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Battery className="h-4 w-4" />
                {t('settings.battery.title')}
              </CardTitle>
              <CardDescription>
                {t('settings.battery.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-sm font-medium">{t('settings.battery.enable')}</span>
                  <p className="text-xs text-muted-foreground">
                    {t('settings.battery.reduces')}
                  </p>
                </div>
                <Switch
                  checked={batteryOptimization}
                  onCheckedChange={setBatteryOptimization}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Monitor className="h-4 w-4" />
                {t('settings.notifications.title')}
              </CardTitle>
              <CardDescription>
                {t('settings.notifications.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-sm font-medium">{t('settings.notifications.enable')}</span>
                  <p className="text-xs text-muted-foreground">
                    {t('settings.notifications.whenActivated')}
                  </p>
                </div>
                <Switch
                  checked={showNotifications}
                  onCheckedChange={setShowNotifications}
                />
              </div>
            </CardContent>
          </Card>

          {/* Device Compatibility */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Smartphone className="h-4 w-4" />
                {t('settings.compatibility.title')}
              </CardTitle>
              <CardDescription>
                {t('settings.compatibility.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t('settings.compatibility.screenWakeLock')}</span>
                    <Badge variant="default">{t('settings.compatibility.supported')}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('settings.compatibility.systemWakeLock')}</span>
                    <Badge variant="secondary">{t('settings.compatibility.limited')}</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t('settings.compatibility.browser')}</span>
                    <Badge variant="outline">{t('settings.compatibility.chrome')}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('settings.compatibility.platform')}</span>
                    <Badge variant="outline">{t('settings.compatibility.desktop')}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t('settings.advanced.title')}</CardTitle>
              <CardDescription>
                {t('settings.advanced.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-sm font-medium">{t('settings.advanced.debugMode')}</span>
                  <p className="text-xs text-muted-foreground">
                    {t('settings.advanced.showTechnical')}
                  </p>
                </div>
                <Switch
                  checked={debugMode}
                  onCheckedChange={setDebugMode}
                />
              </div>
            </CardContent>
          </Card>

          {/* Language Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Languages className="h-4 w-4" />
                {t('settings.language.title')}
              </CardTitle>
              <CardDescription>
                {t('settings.language.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LanguageSelector />
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
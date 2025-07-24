import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Monitor, Battery, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';
import { useAwakeLock } from '@/hooks/useAwakeLock';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface WakeLockControlProps {
  className?: string;
}

export const WakeLockControl: React.FC<WakeLockControlProps> = ({ className }) => {
  const { t } = useTranslation();
  const {
    status,
    requestWakeLock,
    releaseWakeLock,
    checkPermissions,
    getSessionStats,
    isSupported,
    isActive,
    error,
  } = useAwakeLock();

  const [wakeLockType, setWakeLockType] = useState<'screen' | 'system'>('screen');
  const [showDetails, setShowDetails] = useState(false);

  const handleToggle = async () => {
    if (isActive) {
      await releaseWakeLock();
    } else {
      await requestWakeLock(wakeLockType, {
        batteryOptimization: true,
        performanceMonitoring: true,
        passive: true,
      });
    }
  };

  const sessionStats = getSessionStats();

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return t('wakeLock.session.duration', { minutes, seconds });
  };

  if (!isSupported) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-destructive" />
            {t('wakeLock.errors.notSupported')}
          </CardTitle>
          <CardDescription>
            {t('wakeLock.errors.compatibilityIssue')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>{t('wakeLock.errors.notSupported')}</AlertTitle>
            <AlertDescription>
              {t('wakeLock.errors.tryDifferentBrowser')}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Control Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              {t('wakeLock.title')}
            </div>
            <Badge variant={isActive ? "default" : "secondary"}>
              {isActive ? t('wakeLock.active') : t('wakeLock.inactive')}
            </Badge>
          </CardTitle>
          <CardDescription>
            {t('wakeLock.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Toggle */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {isActive ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="font-medium">
                  {isActive ? t('wakeLock.screenAwake') : t('wakeLock.sleepDisabled')}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {isActive
                  ? t('wakeLock.usingStrategy', { strategy: status.strategy || 'native' })
                  : t('wakeLock.toggleDescription')
                }
              </p>
            </div>
            <Switch
              checked={isActive}
              onCheckedChange={handleToggle}
              disabled={!!error}
            />
          </div>

          {/* Wake Lock Type Selection */}
          {!isActive && (
            <div className="space-y-3">
              <label className="text-sm font-medium">{t('wakeLock.wakeLockTypes.title')}</label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={wakeLockType === 'screen' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setWakeLockType('screen')}
                  className="justify-start"
                >
                  <Monitor className="h-4 w-4 mr-2" />
                  {t('wakeLock.wakeLockTypes.screen')}
                </Button>
                <Button
                  variant={wakeLockType === 'system' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setWakeLockType('system')}
                  className="justify-start"
                >
                  <Battery className="h-4 w-4 mr-2" />
                  {t('wakeLock.wakeLockTypes.system')}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                {t('wakeLock.wakeLockTypes.screenDescription')} {t('wakeLock.wakeLockTypes.systemDescription')}
              </p>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>{t('common.error')}</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Session Info */}
          {isActive && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">{t('wakeLock.session.current')}</p>
                <p className="text-sm font-medium">
                  {formatDuration(sessionStats.currentSessionTime)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">{t('wakeLock.session.total')}</p>
                <p className="text-sm font-medium">
                  {sessionStats.totalSessions}
                </p>
              </div>
            </div>
          )}

          {/* Battery Info */}
          {status.batteryLevel !== undefined && (
            <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <Battery className="h-4 w-4 text-amber-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                  {t('wakeLock.battery.level', { level: status.batteryLevel })}
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  {t('wakeLock.battery.warning')}
                </p>
              </div>
            </div>
          )}

          {/* Details Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="w-full"
          >
            <Info className="h-4 w-4 mr-2" />
            {showDetails ? t('wakeLock.details.hide') : t('wakeLock.details.show')}
          </Button>
        </CardContent>
      </Card>

      {/* Details Card */}
      {showDetails && (
        <Card>
          <CardHeader>
            <CardTitle>{t('wakeLock.details.title')}</CardTitle>
            <CardDescription>
              {t('wakeLock.details.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium mb-1">{t('wakeLock.details.status')}</p>
                <p className="text-muted-foreground">
                  {isActive ? t('wakeLock.active') : t('wakeLock.inactive')}
                </p>
              </div>
              <div>
                <p className="font-medium mb-1">{t('wakeLock.details.strategy')}</p>
                <p className="text-muted-foreground">
                  {status.strategy || t('wakeLock.details.nativeApi')}
                </p>
              </div>
              <div>
                <p className="font-medium mb-1">{t('wakeLock.details.type')}</p>
                <p className="text-muted-foreground">
                  {status.type || t('wakeLock.details.none')}
                </p>
              </div>
              <div>
                <p className="font-medium mb-1">{t('wakeLock.details.browserSupport')}</p>
                <p className="text-muted-foreground">
                  {isSupported ? t('wakeLock.details.supported') : t('wakeLock.details.notSupported')}
                </p>
              </div>
            </div>

            {sessionStats.totalSessions > 0 && (
              <div>
                <p className="font-medium mb-2">{t('wakeLock.details.sessionStats')}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">{t('wakeLock.details.totalTime')}</p>
                    <p className="font-medium">
                      {formatDuration(sessionStats.totalTime)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t('wakeLock.details.averageSession')}</p>
                    <p className="font-medium">
                      {formatDuration(sessionStats.averageSession)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t('wakeLock.session.total')}</p>
                    <p className="font-medium">
                      {sessionStats.totalSessions}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
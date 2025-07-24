import { useState, useEffect, useCallback, useRef } from 'react';

type WakeLockType = 'screen' | 'system';

interface WakeLockOptions {
  strategies?: string[];
  debug?: boolean;
  batteryOptimization?: boolean;
  performanceMonitoring?: boolean;
  passive?: boolean;
}

interface WakeLockStatus {
  isActive: boolean;
  type: WakeLockType | null;
  strategy: string | null;
  error: string | null;
  isSupported: boolean;
  batteryLevel?: number;
  performanceMetrics?: {
    requestTime: number;
    activeTime: number;
  };
}

interface WakeLockInstance {
  request: (type: WakeLockType, options?: WakeLockOptions) => Promise<void>;
  release: () => Promise<void>;
  isSupported: () => boolean;
  getStatus: () => WakeLockStatus;
  checkPermissions: (type: WakeLockType) => Promise<boolean>;
  addEventListener: (event: string, callback: Function) => void;
  removeEventListener: (event: string, callback: Function) => void;
}

export const useAwakeLock = () => {
  const [status, setStatus] = useState<WakeLockStatus>({
    isActive: false,
    type: null,
    strategy: null,
    error: null,
    isSupported: false,
    batteryLevel: undefined,
    performanceMetrics: undefined,
  });

  const wakeLockRef = useRef<WakeLockInstance | null>(null);
  const sessionStartTime = useRef<number | null>(null);
  const sessionStats = useRef({
    totalSessions: 0,
    totalTime: 0,
    averageSession: 0,
  });

  // Initialize WakeLock instance
  useEffect(() => {
    const initializeWakeLock = async () => {
      try {
        // Dynamic import to handle potential module loading issues
        const { WakeLock } = await import('awake-lock');
        
        const wakeLockInstance = new WakeLock({
          debug: process.env.NODE_ENV === 'development',
          batteryOptimization: true,
          performanceMonitoring: true,
          passive: true,
        });

        wakeLockRef.current = wakeLockInstance;

        // Set up event listeners
        const updateStatus = () => {
          if (wakeLockInstance && typeof wakeLockInstance.getStatus === 'function') {
            const currentStatus = wakeLockInstance.getStatus();
            setStatus(prev => ({
              ...prev,
              ...currentStatus,
              isSupported: wakeLockInstance.isSupported(),
            }));
          }
        };

        const handleError = (error: any) => {
          setStatus(prev => ({
            ...prev,
            error: error.message || 'An error occurred with the wake lock',
            isActive: false,
          }));
        };

        const handleFallback = (strategy: string) => {
          setStatus(prev => ({
            ...prev,
            strategy,
            error: null,
          }));
        };

        wakeLockInstance.addEventListener('error', handleError);
        wakeLockInstance.addEventListener('fallback', handleFallback);
        wakeLockInstance.addEventListener('disabled', () => {
          setStatus(prev => ({ ...prev, isActive: false, error: null }));
        });

        // Initial status update
        updateStatus();

        return () => {
          wakeLockInstance.removeEventListener('error', handleError);
          wakeLockInstance.removeEventListener('fallback', handleFallback);
        };
      } catch (error) {
        console.error('Failed to initialize WakeLock:', error);
        setStatus(prev => ({
          ...prev,
          error: 'Failed to initialize wake lock library',
          isSupported: false,
        }));
      }
    };

    initializeWakeLock();
  }, []);

  // Monitor battery level if available
  useEffect(() => {
    const updateBatteryInfo = async () => {
      try {
        if ('getBattery' in navigator) {
          const battery = await (navigator as any).getBattery();
          setStatus(prev => ({
            ...prev,
            batteryLevel: Math.round(battery.level * 100),
          }));

          const handleBatteryChange = () => {
            setStatus(prev => ({
              ...prev,
              batteryLevel: Math.round(battery.level * 100),
            }));
          };

          battery.addEventListener('levelchange', handleBatteryChange);
          return () => battery.removeEventListener('levelchange', handleBatteryChange);
        }
      } catch (error) {
        // Battery API not supported
      }
    };

    updateBatteryInfo();
  }, []);

  const requestWakeLock = useCallback(async (type: WakeLockType = 'screen', options?: WakeLockOptions) => {
    if (!wakeLockRef.current) {
      setStatus(prev => ({ ...prev, error: 'Wake lock not initialized' }));
      return;
    }

    try {
      setStatus(prev => ({ ...prev, error: null }));
      await wakeLockRef.current.request(type, options);
      
      sessionStartTime.current = Date.now();
      sessionStats.current.totalSessions++;
      
      setStatus(prev => ({
        ...prev,
        isActive: true,
        type,
        error: null,
        performanceMetrics: {
          requestTime: Date.now(),
          activeTime: 0,
        },
      }));
    } catch (error: any) {
      setStatus(prev => ({
        ...prev,
        error: error.message || 'Failed to request wake lock',
        isActive: false,
      }));
    }
  }, []);

  const releaseWakeLock = useCallback(async () => {
    if (!wakeLockRef.current) return;

    try {
      await wakeLockRef.current.release();
      
      // Update session statistics
      if (sessionStartTime.current) {
        const sessionDuration = Date.now() - sessionStartTime.current;
        sessionStats.current.totalTime += sessionDuration;
        sessionStats.current.averageSession = 
          sessionStats.current.totalTime / sessionStats.current.totalSessions;
        sessionStartTime.current = null;
      }

      setStatus(prev => ({
        ...prev,
        isActive: false,
        type: null,
        strategy: null,
        error: null,
      }));
    } catch (error: any) {
      setStatus(prev => ({
        ...prev,
        error: error.message || 'Failed to release wake lock',
      }));
    }
  }, []);

  const checkPermissions = useCallback(async (type: WakeLockType = 'screen') => {
    if (!wakeLockRef.current) return false;

    try {
      return await wakeLockRef.current.checkPermissions(type);
    } catch (error) {
      return false;
    }
  }, []);

  const getSessionStats = useCallback(() => ({
    ...sessionStats.current,
    currentSessionTime: sessionStartTime.current 
      ? Date.now() - sessionStartTime.current 
      : 0,
  }), []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (wakeLockRef.current && status.isActive) {
        wakeLockRef.current.release().catch(console.error);
      }
    };
  }, [status.isActive]);

  return {
    status,
    requestWakeLock,
    releaseWakeLock,
    checkPermissions,
    getSessionStats,
    isSupported: status.isSupported,
    isActive: status.isActive,
    error: status.error,
  };
};
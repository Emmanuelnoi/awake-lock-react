import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n'
import { ThemeProvider } from '@/components/ThemeProvider'
import { WakeLockControl } from '@/components/WakeLockControl'
import { describe, it, beforeAll, afterAll, expect } from 'vitest'

describe('Italian Translations', () => {
  beforeAll(async () => {
    // Set language to Italian
    await i18n.changeLanguage('it')
  })

  afterAll(async () => {
    // Reset to English
    await i18n.changeLanguage('en')
  })

  function renderWithProviders(component: React.ReactElement) {
    return render(
      <I18nextProvider i18n={i18n}>
        <ThemeProvider defaultTheme="light">
          {component}
        </ThemeProvider>
      </I18nextProvider>
    )
  }

  it('should display Italian translations in WakeLockControl', () => {
    renderWithProviders(<WakeLockControl />)
    
    // Since wake lock behavior varies in test environment, check for any Italian text that should be present
    // Look for the main title or error messages - using getAllByText for multiple instances
    const italianErrors = screen.queryAllByText('Wake Lock Non Supportato')
    const italianTitles = screen.queryAllByText('Controllo Wake Lock')
    
    // At least one of these should be present
    expect(italianErrors.length > 0 || italianTitles.length > 0).toBeTruthy()
    
    // Also check if the translation is working properly at the API level
    expect(i18n.t('wakeLock.title')).toBe('Controllo Wake Lock')
    expect(i18n.t('wakeLock.description')).toBe('Impedisci al tuo dispositivo di addormentarsi o spegnere lo schermo')
  })

  it('should handle Italian translation keys correctly', () => {
    expect(i18n.t('wakeLock.title')).toBe('Controllo Wake Lock')
    expect(i18n.t('wakeLock.active')).toBe('Attivo')
    expect(i18n.t('wakeLock.inactive')).toBe('Inattivo')
    expect(i18n.t('settings.title')).toBe('Impostazioni')
    expect(i18n.t('about.title')).toBe('Informazioni su Awake Lock')
  })

  it('should display correct Italian theme translations', () => {
    expect(i18n.t('theme.light')).toBe('Chiaro')
    expect(i18n.t('theme.dark')).toBe('Scuro')
    expect(i18n.t('theme.system')).toBe('Sistema')
  })

  it('should have comprehensive Italian error messages', () => {
    expect(i18n.t('wakeLock.errors.notSupported')).toBe('Wake Lock Non Supportato')
    expect(i18n.t('wakeLock.errors.failed')).toBe('Richiesta wake lock fallita')
    expect(i18n.t('common.error')).toBe('Errore')
    expect(i18n.t('common.loading')).toBe('Caricamento...')
  })

  it('should translate complex phrases with interpolation', () => {
    expect(i18n.t('wakeLock.battery.level', { level: 75 })).toBe('Livello Batteria: 75%')
    expect(i18n.t('settings.autoDisable.willDisable', { duration: 30 })).toBe('Il wake lock verrà rilasciato automaticamente dopo 30 minuti')
  })
})


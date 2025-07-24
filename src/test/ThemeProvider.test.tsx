import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { ThemeProvider, useTheme } from '@/components/ThemeProvider'

// Test component to interact with theme
function ThemeTestComponent() {
  const { theme, setTheme } = useTheme()
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button onClick={() => setTheme('dark')} data-testid="set-dark">Set Dark</button>
      <button onClick={() => setTheme('light')} data-testid="set-light">Set Light</button>
      <button onClick={() => setTheme('system')} data-testid="set-system">Set System</button>
    </div>
  )
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    // Reset document classes
    document.documentElement.className = ''
  })

  it('should provide default theme', () => {
    render(
      <ThemeProvider>
        <ThemeTestComponent />
      </ThemeProvider>
    )

    expect(screen.getByTestId('current-theme')).toHaveTextContent('system')
  })

  it('should change theme when setTheme is called', async () => {
    const user = userEvent.setup()
    
    render(
      <ThemeProvider>
        <ThemeTestComponent />
      </ThemeProvider>
    )

    await user.click(screen.getByTestId('set-dark'))
    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark')
    
    await user.click(screen.getByTestId('set-light'))
    expect(screen.getByTestId('current-theme')).toHaveTextContent('light')
  })

  it('should add correct CSS classes to document', async () => {
    const user = userEvent.setup()
    
    render(
      <ThemeProvider>
        <ThemeTestComponent />
      </ThemeProvider>
    )

    await user.click(screen.getByTestId('set-dark'))
    expect(document.documentElement).toHaveClass('dark')

    await user.click(screen.getByTestId('set-light'))
    expect(document.documentElement).toHaveClass('light')
    expect(document.documentElement).not.toHaveClass('dark')
  })

  it('should persist theme in localStorage', async () => {
    const user = userEvent.setup()
    
    render(
      <ThemeProvider>
        <ThemeTestComponent />
      </ThemeProvider>
    )

    await user.click(screen.getByTestId('set-dark'))
    expect(localStorage.setItem).toHaveBeenCalledWith('ui-theme', 'dark')
  })

  it('should load theme from localStorage', () => {
    localStorage.getItem = vi.fn(() => 'dark')
    
    render(
      <ThemeProvider>
        <ThemeTestComponent />
      </ThemeProvider>
    )

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark')
  })

  it('should handle system theme with matchMedia', () => {
    // Mock dark system preference
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    render(
      <ThemeProvider defaultTheme="system">
        <ThemeTestComponent />
      </ThemeProvider>
    )

    expect(document.documentElement).toHaveClass('dark')
  })

  it('should throw error when useTheme is used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    expect(() => {
      render(<ThemeTestComponent />)
    }).toThrow('useTheme must be used within a ThemeProvider')
    
    consoleSpy.mockRestore()
  })
})
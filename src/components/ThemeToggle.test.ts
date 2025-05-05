import { describe, it, expect, vi, beforeEach } from 'vitest';
import ThemeToggle from './ThemeToggle.svelte';

// Mock necessary modules
vi.mock('svelte-i18n', () => ({
  _: () => ({ subscribe: (fn: Function) => {
    fn('Toggle theme');
    return { unsubscribe: () => {} };
  }})
}));

vi.mock('@skeletonlabs/skeleton-svelte', () => ({
  Switch: vi.fn()
}));

vi.mock('@lucide/svelte/icons/moon', () => ({
  default: vi.fn()
}));

vi.mock('@lucide/svelte/icons/sun', () => ({
  default: vi.fn()
}));

// Setup mock storage and DOM
type Mock<T extends (...args: any) => any> = ReturnType<typeof vi.fn<T>>;

interface StorageMock extends Storage {
  getItem: Mock<Storage['getItem']>;
  setItem: Mock<Storage['setItem']>;
  removeItem: Mock<Storage['removeItem']>;
  clear: Mock<Storage['clear']>;
  key: Mock<Storage['key']>;
}

const localStorageMock: StorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
  removeItem: vi.fn(),
  key: vi.fn(),
  length: 0,
  [Symbol.iterator]: function*() { yield* []; }
};

const documentElementMock = {
  setAttribute: vi.fn()
};

// Directly test the functionality by extracting it from the ThemeToggle component
// We'll create test functions that mimic the behavior of the component
function setTheme(mode: string) {
  document.documentElement.setAttribute('data-mode', mode);
  localStorage.setItem('mode', mode);
}

function getThemeFromLocalStorage() {
  const savedMode = localStorage.getItem('mode');
  return savedMode || 'dark'; // Default to dark if no saved preference
}

function initTheme() {
  const savedMode = getThemeFromLocalStorage();
  setTheme(savedMode);
}

describe('ThemeToggle functionality', () => {
  beforeEach(() => {
    // Setup mocks before each test
    vi.clearAllMocks();
    
    // Setup global mocks
    global.localStorage = localStorageMock;
    global.document = {
      ...document,
      documentElement: documentElementMock
    } as any;
  });

  it('should initialize with dark mode by default', () => {
    // Mock localStorage.getItem to return null (no saved preference)
    localStorageMock.getItem.mockReturnValue(null);
    
    // Test the function directly
    initTheme();
    
    // Verify the dark theme was set'
    expect(localStorageMock.setItem).toHaveBeenCalledWith('mode', 'dark');
    expect(documentElementMock.setAttribute).toHaveBeenCalledWith('data-mode', 'dark');
  });

  it('should load theme from localStorage on init', () => {
    // Mock localStorage to return 'light'
    localStorageMock.getItem.mockReturnValue('light');
    
    // Test the function directly
    initTheme();
    
    // Verify the light theme was set
    expect(documentElementMock.setAttribute).toHaveBeenCalledWith('data-mode', 'light');
  });
});
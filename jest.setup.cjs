require('@testing-library/jest-dom');

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
};

// Mock Framer Motion to avoid "Element type is invalid" errors in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => {
      const React = require('react');
      // Filter out Framer Motion specific props
      const {
        initial,
        animate,
        exit,
        transition,
        layout,
        layoutId,
        ...rest
      } = props;
      return React.createElement('div', rest, children);
    },
    button: ({ children, ...props }) => {
      const React = require('react');
      const { initial, animate, exit, transition, ...rest } = props;
      return React.createElement('button', rest, children);
    },
    span: ({ children, ...props }) => {
      const React = require('react');
      const { initial, animate, exit, transition, ...rest } = props;
      return React.createElement('span', rest, children);
    },
  },
  AnimatePresence: ({ children }) => {
    const React = require('react');
    return React.createElement(React.Fragment, null, children);
  },
}));


import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { render, screen, cleanup } from '@testing-library/react';
import { TopBar } from './TopBar';

describe('TopBar Property Tests', () => {
  /**
   * Feature: customers-dashboard, Property 2: Greeting Format
   * Validates: Requirements 2.1
   * 
   * For any user name, the Top Bar greeting should follow the format
   * "Hello {name} 👋," where {name} is the provided user name.
   */
  it('Property 2: Greeting Format - greeting follows correct format for any user name', () => {
    // Generate non-empty strings for user names
    const userNameArbitrary = fc.string({ minLength: 1, maxLength: 50 })
      .filter(name => name.trim().length > 0);

    fc.assert(
      fc.property(userNameArbitrary, (userName) => {
        // Clean up before each render to avoid duplicate elements
        cleanup();
        
        render(<TopBar userName={userName} />);

        const greeting = screen.getByTestId('greeting');
        
        // Verify the greeting follows the format "Hello {name} 👋🏼,"
        const expectedGreeting = `Hello ${userName} 👋🏼,`;
        expect(greeting.textContent).toBe(expectedGreeting);
      }),
      { numRuns: 100 }
    );
  });
});

import { describe, it, expect } from 'vitest';

describe('Project Setup', () => {
  it('should have fast-check available', async () => {
    const fc = await import('fast-check');
    expect(fc).toBeDefined();
  });

  it('should run basic property test', async () => {
    const fc = await import('fast-check');
    
    fc.assert(
      fc.property(fc.integer(), (n) => {
        return n + 0 === n;
      })
    );
  });
});

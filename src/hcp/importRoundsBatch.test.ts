import { describe, it, expect, vi, beforeEach } from 'vitest';
import { importRoundsBatch } from './importRoundsBatch';
import { getCurrentHCP, getInitialHCP, updateHCPChain } from './hcpService';

vi.mock('./hcpService', () => ({
  getCurrentHCP: vi.fn(),
  getInitialHCP: vi.fn(),
  updateHCPChain: vi.fn(),
}));

describe('importRoundsBatch', () => {
  const mockRounds = [
    { id: 'round1', data: 'test1' },
    { id: 'round2', data: 'test2' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call getCurrentHCP and getInitialHCP', () => {
    (getCurrentHCP as any).mockReturnValue('currentHCP');
    (getInitialHCP as any).mockReturnValue('initialHCP');

    importRoundsBatch(mockRounds);

    expect(getCurrentHCP).toHaveBeenCalled();
    expect(getInitialHCP).toHaveBeenCalled();
  });

  it('should call updateHCPChain with correct arguments', () => {
    const currentHCP = 'currentHCP';
    const initialHCP = 'initialHCP';
    (getCurrentHCP as any).mockReturnValue(currentHCP);
    (getInitialHCP as any).mockReturnValue(initialHCP);

    importRoundsBatch(mockRounds);

    expect(updateHCPChain).toHaveBeenCalledWith({
      rounds: mockRounds,
      anchorHCP: currentHCP,
    });
  });

  it('should not use initialHCP as anchorHCP', () => {
    const currentHCP = 'currentHCP';
    const initialHCP = 'initialHCP';
    (getCurrentHCP as any).mockReturnValue(currentHCP);
    (getInitialHCP as any).mockReturnValue(initialHCP);

    importRoundsBatch(mockRounds);

    const callArgs = (updateHCPChain as any).mock.calls[0][0];
    expect(callArgs.anchorHCP).not.toEqual(initialHCP);
    expect(callArgs.anchorHCP).toEqual(currentHCP);
  });

  it('should handle empty rounds array', () => {
    (getCurrentHCP as any).mockReturnValue('currentHCP');
    (getInitialHCP as any).mockReturnValue('initialHCP');

    expect(() => importRoundsBatch([])).not.toThrow();
    expect(updateHCPChain).toHaveBeenCalledWith({
      rounds: [],
      anchorHCP: 'currentHCP',
    });
  });

  it('should handle null or undefined rounds gracefully', () => {
    (getCurrentHCP as any).mockReturnValue('currentHCP');
    (getInitialHCP as any).mockReturnValue('initialHCP');

    expect(() => importRoundsBatch(null as any)).toThrow();
    expect(() => importRoundsBatch(undefined as any)).toThrow();
  });

  it('should handle getCurrentHCP returning null', () => {
    (getCurrentHCP as any).mockReturnValue(null);
    (getInitialHCP as any).mockReturnValue('initialHCP');

    expect(() => importRoundsBatch(mockRounds)).toThrow();
  });

  it('should handle getInitialHCP returning null', () => {
    (getCurrentHCP as any).mockReturnValue('currentHCP');
    (getInitialHCP as any).mockReturnValue(null);

    expect(() => importRoundsBatch(mockRounds)).not.toThrow();
  });

  it('should handle updateHCPChain throwing an error', () => {
    (getCurrentHCP as any).mockReturnValue('currentHCP');
    (getInitialHCP as any).mockReturnValue('initialHCP');
    (updateHCPChain as any).mockImplementation(() => {
      throw new Error('Chain update failed');
    });

    expect(() => importRoundsBatch(mockRounds)).toThrow('Chain update failed');
  });

  it('should handle rounds with missing properties', () => {
    const incompleteRounds = [{ id: 'round1' }, { data: 'test2' }];
    (getCurrentHCP as any).mockReturnValue('currentHCP');
    (getInitialHCP as any).mockReturnValue('initialHCP');

    expect(() => importRoundsBatch(incompleteRounds as any)).not.toThrow();
    expect(updateHCPChain).toHaveBeenCalledWith({
      rounds: incompleteRounds,
      anchorHCP: 'currentHCP',
    });
  });

  it('should handle large number of rounds', () => {
    const largeRounds = Array.from({ length: 1000 }, (_, i) => ({ id: `round${i}`, data: `test${i}` }));
    (getCurrentHCP as any).mockReturnValue('currentHCP');
    (getInitialHCP as any).mockReturnValue('initialHCP');

    expect(() => importRoundsBatch(largeRounds)).not.toThrow();
    expect(updateHCPChain).toHaveBeenCalledWith({
      rounds: largeRounds,
      anchorHCP: 'currentHCP',
    });
  });

  it('should handle duplicate rounds', () => {
    const duplicateRounds = [
      { id: 'round1', data: 'test1' },
      { id: 'round1', data: 'test1' },
    ];
    (getCurrentHCP as any).mockReturnValue('currentHCP');
    (getInitialHCP as any).mockReturnValue('initialHCP');

    expect(() => importRoundsBatch(duplicateRounds)).not.toThrow();
    expect(updateHCPChain).toHaveBeenCalledWith({
      rounds: duplicateRounds,
      anchorHCP: 'currentHCP',
    });
  });

  it('should handle rounds with special characters in data', () => {
    const specialRounds = [{ id: 'round1', data: 'test with <special> & characters!' }];
    (getCurrentHCP as any).mockReturnValue('currentHCP');
    (getInitialHCP as any).mockReturnValue('initialHCP');

    expect(() => importRoundsBatch(specialRounds)).not.toThrow();
    expect(updateHCPChain).toHaveBeenCalledWith({
      rounds: specialRounds,
      anchorHCP: 'currentHCP',
    });
  });

  it('should handle getCurrentHCP and getInitialHCP returning same value', () => {
    const sameHCP = 'sameHCP';
    (getCurrentHCP as any).mockReturnValue(sameHCP);
    (getInitialHCP as any).mockReturnValue(sameHCP);

    importRoundsBatch(mockRounds);

    const callArgs = (updateHCPChain as any).mock.calls[0][0];
    expect(callArgs.anchorHCP).toEqual(sameHCP);
  });
});
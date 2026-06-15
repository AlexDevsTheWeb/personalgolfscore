import { describe, it, expect, vi, beforeEach } from 'vitest';
import { importRoundsBatch } from './importRoundsBatch';
import { getCurrentHCP, getInitialHCP, updateHCPChain } from './hcpService';

vi.mock('./hcpService', () => ({
  getCurrentHCP: vi.fn(),
  getInitialHCP: vi.fn(),
  updateHCPChain: vi.fn()
}));

describe('importRoundsBatch', () => {
  const mockRounds = [
    { id: 'round1', data: 'test' },
    { id: 'round2', data: 'test2' }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should anchor to currentHCP when it exists and is different from initialHCP', () => {
    const currentHCP = { hash: 'currentHash', timestamp: 100 };
    const initialHCP = { hash: 'initialHash', timestamp: 0 };
    (getCurrentHCP as any).mockReturnValue(currentHCP);
    (getInitialHCP as any).mockReturnValue(initialHCP);

    importRoundsBatch(mockRounds);

    expect(updateHCPChain).toHaveBeenCalledWith(
      expect.objectContaining({
        anchorHCP: currentHCP,
        rounds: mockRounds
      })
    );
  });

  it('should anchor to currentHCP even when initialHCP is same as currentHCP', () => {
    const currentHCP = { hash: 'sameHash', timestamp: 50 };
    const initialHCP = { hash: 'sameHash', timestamp: 50 };
    (getCurrentHCP as any).mockReturnValue(currentHCP);
    (getInitialHCP as any).mockReturnValue(initialHCP);

    importRoundsBatch(mockRounds);

    expect(updateHCPChain).toHaveBeenCalledWith(
      expect.objectContaining({
        anchorHCP: currentHCP
      })
    );
  });

  it('should anchor to currentHCP when initialHCP is null', () => {
    const currentHCP = { hash: 'currentHash', timestamp: 100 };
    (getCurrentHCP as any).mockReturnValue(currentHCP);
    (getInitialHCP as any).mockReturnValue(null);

    importRoundsBatch(mockRounds);

    expect(updateHCPChain).toHaveBeenCalledWith(
      expect.objectContaining({
        anchorHCP: currentHCP
      })
    );
  });

  it('should anchor to currentHCP when initialHCP is undefined', () => {
    const currentHCP = { hash: 'currentHash', timestamp: 100 };
    (getCurrentHCP as any).mockReturnValue(currentHCP);
    (getInitialHCP as any).mockReturnValue(undefined);

    importRoundsBatch(mockRounds);

    expect(updateHCPChain).toHaveBeenCalledWith(
      expect.objectContaining({
        anchorHCP: currentHCP
      })
    );
  });

  it('should throw an error if currentHCP is null', () => {
    (getCurrentHCP as any).mockReturnValue(null);
    (getInitialHCP as any).mockReturnValue({ hash: 'initial', timestamp: 0 });

    expect(() => importRoundsBatch(mockRounds)).toThrow('Current HCP is null');
  });

  it('should throw an error if currentHCP is undefined', () => {
    (getCurrentHCP as any).mockReturnValue(undefined);
    (getInitialHCP as any).mockReturnValue({ hash: 'initial', timestamp: 0 });

    expect(() => importRoundsBatch(mockRounds)).toThrow('Current HCP is undefined');
  });

  it('should process empty rounds array without error', () => {
    const currentHCP = { hash: 'hash', timestamp: 1 };
    (getCurrentHCP as any).mockReturnValue(currentHCP);
    (getInitialHCP as any).mockReturnValue({ hash: 'initial', timestamp: 0 });

    expect(() => importRoundsBatch([])).not.toThrow();
    expect(updateHCPChain).toHaveBeenCalledWith(
      expect.objectContaining({
        anchorHCP: currentHCP,
        rounds: []
      })
    );
  });

  it('should not anchor to initialHCP even if initialHCP is valid and different', () => {
    const currentHCP = { hash: 'current', timestamp: 200 };
    const initialHCP = { hash: 'initial', timestamp: 0 };
    (getCurrentHCP as any).mockReturnValue(currentHCP);
    (getInitialHCP as any).mockReturnValue(initialHCP);

    importRoundsBatch(mockRounds);

    const callArgs = (updateHCPChain as any).mock.calls[0][0];
    expect(callArgs.anchorHCP).not.toEqual(initialHCP);
    expect(callArgs.anchorHCP).toEqual(currentHCP);
  });
});
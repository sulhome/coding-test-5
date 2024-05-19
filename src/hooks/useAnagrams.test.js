import { renderHook, act } from '@testing-library/react-hooks';
import useAnagrams from './useAnagrams';

// Mock the fetch function
global.fetch = jest.fn();

describe('useAnagrams', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('should return an empty array when the input is empty', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useAnagrams(''));

        expect(result.current.anagrams).toEqual([]);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(null);
    });

    it('should fetch anagrams and return the result', async () => {
        const mockResponse = {
            best: ['steak', 'stake', 'takes', 'teaks', 'skate', 'keats', 'skeat']
        };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const { result, waitForNextUpdate } = renderHook(() => useAnagrams('steak'));

        act(() => {
            // Simulate the effect
        });

        await waitForNextUpdate();

        expect(result.current.anagrams).toEqual(mockResponse.best);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(null);
    });

    it('should handle fetch errors', async () => {
        fetch.mockRejectedValueOnce(new Error('Network response was not ok'));

        const { result, waitForNextUpdate } = renderHook(() => useAnagrams('steak'));

        act(() => {
            // Simulate the effect
        });

        await waitForNextUpdate();

        expect(result.current.anagrams).toEqual([]);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).not.toBe(null);
    });

    it('should show "No anagrams found" message for non-anagram inputs', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ best: [] }),
        });

        const { result, waitForNextUpdate } = renderHook(() => useAnagrams('asdfghjk'));

        act(() => {
            // Simulate the effect
        });

        await waitForNextUpdate();

        expect(result.current.anagrams).toEqual([]);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(null);
    });
});

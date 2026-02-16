import { describe, it, expect } from 'vitest';
import { calculateSimpleInterest } from './finance';

describe('calculateSimpleInterest', () => {
    it('should calculate 24% yearly interest correctly for 1 year', () => {
        // 1 Lakh, 24% Yearly, 1 Year -> 24,000 Interest
        const result = calculateSimpleInterest(100000, 24, 1, 'yearly', 'years');
        expect(result.interest).toBe(24000);
        expect(result.total).toBe(124000);
    });

    it('should calculate 2% monthly interest correctly for 1 year (equivalent to 24% yearly)', () => {
        // 1 Lakh, 2% Monthly, 1 Year -> 12 * 2% = 24% Yearly -> 24,000 Interest
        const result = calculateSimpleInterest(100000, 2, 1, 'monthly', 'years');
        expect(result.interest).toBe(24000);
        expect(result.total).toBe(124000);
    });

    it('should calculate 2% monthly interest correctly for 6 months', () => {
        // 1 Lakh, 2% Monthly, 6 Months
        // Annual Rate = 24%
        // Time = 0.5 Years
        // Interest = 100000 * 24/100 * 0.5 = 12000
        const result = calculateSimpleInterest(100000, 2, 6, 'monthly', 'months');
        expect(result.interest).toBe(12000);
        expect(result.total).toBe(112000);
    });

    it('should handle days correctly', () => {
        // 73000 Principal, 10% Yearly, 73 Days
        // 73 Days = 73/365 = 1/5 = 0.2 Years
        // Interest = 73000 * 10/100 * 0.2 = 7300 * 0.2 = 1460
        const result = calculateSimpleInterest(73000, 10, 73, 'yearly', 'days');
        expect(result.interest).toBeCloseTo(1460);
        expect(result.total).toBeCloseTo(74460);
    });
});

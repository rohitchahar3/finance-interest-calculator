import React, { useState, useEffect, useCallback } from 'react';
import { InputGroup } from './InputGroup';
import { EditableResultCard } from './EditableResultCard';
import { Toggle } from './Toggle';
import { DistributionChart } from './DistributionChart';
import { calculateSimpleInterest, calculateRate, calculateTime, type RatePeriod, type TimePeriod } from '../utils/finance';

export const Calculator: React.FC = () => {
    const [principal, setPrincipal] = useState<string>('100000');
    const [rate, setRate] = useState<string>('2');
    const [ratePeriod, setRatePeriod] = useState<RatePeriod>('monthly');
    const [time, setTime] = useState<string>('12');
    const [timePeriod, setTimePeriod] = useState<TimePeriod>('months');
    const [lockedField, setLockedField] = useState<'rate' | 'time'>('rate');

    const [result, setResult] = useState<{ interest: number; total: number }>({ interest: 0, total: 0 });

    // Forward Calculation
    useEffect(() => {
        const p = parseFloat(principal);
        const r = parseFloat(rate);
        const t = parseFloat(time);

        if (!isNaN(p) && !isNaN(r) && !isNaN(t)) {
            setResult(calculateSimpleInterest(p, r, t, ratePeriod, timePeriod));
        }
    }, [principal, rate, ratePeriod, time, timePeriod]);

    // Reverse Calculation Handlers
    const handleInterestChange = useCallback((newInterestStr: string) => {
        const newInterest = parseFloat(newInterestStr);
        if (isNaN(newInterest)) return;

        const p = parseFloat(principal);

        if (lockedField === 'rate') {
            // Rate is locked, calculate Time
            const r = parseFloat(rate);
            if (!isNaN(p) && !isNaN(r)) {
                const newTime = calculateTime(p, newInterest, r, ratePeriod, timePeriod);
                if (isFinite(newTime)) {
                    // Use higher precision to avoid rounding loops during typing
                    setTime(newTime.toString());
                }
            }
        } else {
            // Time is locked, calculate Rate
            const t = parseFloat(time);
            if (!isNaN(p) && !isNaN(t)) {
                const newRate = calculateRate(p, newInterest, t, timePeriod, ratePeriod);
                if (isFinite(newRate)) {
                    // Use higher precision to avoid rounding loops during typing
                    setRate(newRate.toString());
                }
            }
        }
    }, [principal, rate, time, ratePeriod, timePeriod, lockedField]);

    const handleTotalChange = useCallback((newTotalStr: string) => {
        const newTotal = parseFloat(newTotalStr);
        const p = parseFloat(principal);
        if (isNaN(newTotal) || isNaN(p)) return;

        const newInterest = newTotal - p;
        handleInterestChange(newInterest.toString());
    }, [principal, handleInterestChange]);

    return (
        <div className="w-full max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
            <div className="p-8">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Finance Calculator</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        Calculate simple interest based on flexible rates and time periods.
                    </p>
                </div>

                <div className="space-y-6">
                    <InputGroup
                        label="Principal Amount (₹)"
                        value={principal}
                        onChange={setPrincipal}
                        type="number"
                        placeholder="100000"
                        addon={<span className="text-gray-500 font-bold">₹</span>}
                    />

                    <div className="flex gap-4 items-center">
                        <div className="flex-1">
                            <InputGroup
                                label="Interest Rate"
                                value={rate}
                                onChange={setRate}
                                type="number"
                                placeholder="2"
                                addon={<span className="text-gray-500 font-bold">%</span>}
                            />
                        </div>
                        <div className="flex-1 flex flex-col justify-end">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Rate Period
                            </label>
                            <Toggle
                                options={[
                                    { label: 'Monthly', value: 'monthly' },
                                    { label: 'Yearly', value: 'yearly' },
                                ]}
                                value={ratePeriod}
                                onChange={(val) => setRatePeriod(val as RatePeriod)}
                                className="w-full justify-center"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 items-center">
                        <div className="flex-1">
                            <InputGroup
                                label="Time Duration"
                                value={time}
                                onChange={setTime}
                                type="number"
                                placeholder="1"
                            />
                        </div>
                        <div className="flex-1 flex flex-col justify-end">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Time Unit
                            </label>
                            <Toggle
                                options={[
                                    { label: 'Days', value: 'days' },
                                    { label: 'Weeks', value: 'weeks' },
                                    { label: 'Months', value: 'months' },
                                    { label: 'Years', value: 'years' },
                                ]}
                                value={timePeriod}
                                onChange={(val) => setTimePeriod(val as TimePeriod)}
                                className="w-full justify-center flex-wrap"
                            />
                        </div>
                    </div>
                </div>

                <EditableResultCard
                    interest={result.interest}
                    total={result.total}
                    onInterestChange={handleInterestChange}
                    onTotalChange={handleTotalChange}
                    lockedField={lockedField}
                    onToggleLock={setLockedField}
                />

                <DistributionChart principal={result.total - result.interest} interest={result.interest} />
            </div>
        </div>
    );
};

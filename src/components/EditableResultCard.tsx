import React from 'react';
import { Lock, Unlock } from 'lucide-react';

interface EditableResultCardProps {
    interest: number;
    total: number;
    onInterestChange: (value: string) => void;
    onTotalChange: (value: string) => void;
    lockedField: 'rate' | 'time';
    onToggleLock: (field: 'rate' | 'time') => void;
}

export const EditableResultCard: React.FC<EditableResultCardProps> = ({
    interest,
    total,
    onInterestChange,
    onTotalChange,
    lockedField,
    onToggleLock,
}) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-6 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Calculation Result</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                    <span>Locked: </span>
                    <button
                        onClick={() => onToggleLock('rate')}
                        style={{
                            backgroundColor: lockedField === 'rate' ? '#16a34a' : 'rgba(239, 68, 68, 0.1)',
                            color: lockedField === 'rate' ? '#ffffff' : '#ef4444',
                            border: lockedField === 'rate' ? 'none' : '1px solid rgba(239, 68, 68, 0.2)'
                        }}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${lockedField === 'rate' ? 'shadow-sm' : 'hover:opacity-80'}`}
                    >
                        {lockedField === 'rate' ? <Lock size={12} /> : <Unlock size={12} />} Rate
                    </button>
                    <button
                        onClick={() => onToggleLock('time')}
                        style={{
                            backgroundColor: lockedField === 'time' ? '#16a34a' : 'rgba(239, 68, 68, 0.1)',
                            color: lockedField === 'time' ? '#ffffff' : '#ef4444',
                            border: lockedField === 'time' ? 'none' : '1px solid rgba(239, 68, 68, 0.2)'
                        }}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${lockedField === 'time' ? 'shadow-sm' : 'hover:opacity-80'}`}
                    >
                        {lockedField === 'time' ? <Lock size={12} /> : <Unlock size={12} />} Time
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg group focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                    <label className="text-sm text-blue-600 dark:text-blue-400 mb-1 block">Total Interest (Editable)</label>
                    <div className="flex items-center">
                        <span className="text-xl font-bold text-blue-700 dark:text-blue-300 mr-1">₹</span>
                        <input
                            type="number"
                            step="1"
                            value={Math.round(interest).toString()}
                            onChange={(e) => onInterestChange(e.target.value)}
                            className="bg-transparent text-2xl font-bold text-blue-700 dark:text-blue-300 w-full focus:outline-none"
                        />
                    </div>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg group focus-within:ring-2 focus-within:ring-green-500 transition-all">
                    <label className="text-sm text-green-600 dark:text-green-400 mb-1 block">Total Amount (Editable)</label>
                    <div className="flex items-center">
                        <span className="text-xl font-bold text-green-700 dark:text-green-300 mr-1">₹</span>
                        <input
                            type="number"
                            step="1"
                            value={Math.round(total).toString()}
                            onChange={(e) => onTotalChange(e.target.value)}
                            className="bg-transparent text-2xl font-bold text-green-700 dark:text-green-300 w-full focus:outline-none"
                        />
                    </div>
                </div>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
                * Modifying these values will recalculate the <strong>{lockedField === 'rate' ? 'Time Duration' : 'Interest Rate'}</strong>.
            </p>
        </div>
    );
};

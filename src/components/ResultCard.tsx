import React from 'react';
import { formatINR } from '../utils/finance';

interface ResultCardProps {
    interest: number;
    total: number;
}

export const ResultCard: React.FC<ResultCardProps> = ({ interest, total }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Calculation Result</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Total Interest</p>
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                        {formatINR(interest)}
                    </p>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-green-600 dark:text-green-400 mb-1">Total Amount</p>
                    <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                        {formatINR(total)}
                    </p>
                </div>
            </div>
        </div>
    );
};

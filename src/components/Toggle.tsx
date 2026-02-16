import React from 'react';

interface ToggleProps {
    options: { label: string; value: string }[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ options, value, onChange, className = '' }) => {
    return (
        <div className={`bg-gray-200 dark:bg-gray-700 p-1 rounded-lg inline-flex ${className}`}>
            {options.map((option) => (
                <button
                    key={option.value}
                    onClick={() => onChange(option.value)}
                    style={{
                        backgroundColor: value === option.value
                            ? '#16a34a' // Green-600
                            : 'rgba(239, 68, 68, 0.1)', // Red-500 with opacity
                        color: value === option.value
                            ? '#ffffff'
                            : '#ef4444', // Red-500
                        border: value === option.value
                            ? 'none'
                            : '1px solid rgba(239, 68, 68, 0.2)'
                    }}
                    className={`
            px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
            ${value === option.value ? 'shadow-md' : 'hover:opacity-80'}
          `}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};

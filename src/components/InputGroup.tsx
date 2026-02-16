import React from 'react';

interface InputGroupProps {
    label: string;
    value: number | string;
    onChange: (value: string) => void;
    type?: 'number' | 'text';
    placeholder?: string;
    addon?: React.ReactNode;
    className?: string;
}

export const InputGroup: React.FC<InputGroupProps> = ({
    label,
    value,
    onChange,
    type = 'text',
    placeholder,
    addon,
    className = '',
}) => {
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
            </label>
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 dark:ring-gray-600 dark:bg-gray-800">
                <input
                    type={type}
                    className="block w-full border-0 bg-transparent py-2 pl-3 pr-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                {addon && (
                    <div className="flex select-none items-center pr-3">
                        {addon}
                    </div>
                )}
            </div>
        </div>
    );
};

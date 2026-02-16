export type RatePeriod = 'yearly' | 'monthly';
export type TimePeriod = 'days' | 'weeks' | 'months' | 'years';

export const calculateSimpleInterest = (
    principal: number,
    rate: number,
    time: number,
    ratePeriod: RatePeriod,
    timePeriod: TimePeriod
): { interest: number; total: number } => {
    // Convert rate to annual rate for standard calculation
    // If rate is monthly, multiply by 12 to get yearly rate
    const annualRate = ratePeriod === 'monthly' ? rate * 12 : rate;

    // Convert time to years
    let timeInYears = 0;
    switch (timePeriod) {
        case 'days':
            timeInYears = time / 365;
            break;
        case 'weeks':
            timeInYears = time / 52;
            break;
        case 'months':
            timeInYears = time / 12;
            break;
        case 'years':
            timeInYears = time;
            break;
    }

    // Simple Interest Formula: P * R * T / 100
    const interest = (principal * annualRate * timeInYears) / 100;
    const total = principal + interest;

    return { interest, total };
};

export const calculateRate = (
    principal: number,
    targetInterest: number,
    time: number,
    timePeriod: TimePeriod,
    targetRatePeriod: RatePeriod
): number => {
    if (principal <= 0 || time <= 0) return 0;

    // I = P * R * T / 100  =>  R = (I * 100) / (P * T)

    let timeInYears = 0;
    switch (timePeriod) {
        case 'days':
            timeInYears = time / 365;
            break;
        case 'weeks':
            timeInYears = time / 52;
            break;
        case 'months':
            timeInYears = time / 12;
            break;
        case 'years':
            timeInYears = time;
            break;
    }

    const annualRate = (targetInterest * 100) / (principal * timeInYears);

    // Convert to requested rate period
    return targetRatePeriod === 'monthly' ? annualRate / 12 : annualRate;
};

export const calculateTime = (
    principal: number,
    targetInterest: number,
    rate: number,
    ratePeriod: RatePeriod,
    targetTimePeriod: TimePeriod
): number => {
    if (principal <= 0 || rate <= 0) return 0;

    // I = P * R * T / 100  =>  T = (I * 100) / (P * R)

    const annualRate = ratePeriod === 'monthly' ? rate * 12 : rate;
    const timeInYears = (targetInterest * 100) / (principal * annualRate);

    // Convert to requested time period
    switch (targetTimePeriod) {
        case 'days':
            return timeInYears * 365;
        case 'weeks':
            return timeInYears * 52;
        case 'months':
            return timeInYears * 12;
        case 'years':
            return timeInYears;
    }
    return timeInYears;
};

export const formatINR = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2,
    }).format(amount);
};

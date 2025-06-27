import React, { useMemo } from 'react';
import { Progress } from '@/components/ui/progress';

interface PasswordStrengthIndicatorProps {
  password?: string;
}

type StrengthLevel = {
  label: string;
  value: number;
  color: string;
};

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password = '' }) => {
  console.log('PasswordStrengthIndicator loaded');

  const getStrength = (pass: string): StrengthLevel => {
    let score = 0;
    if (!pass) {
      return { label: '', value: 0, color: '' };
    }

    // Award points for different criteria
    if (pass.length > 0) score++; // Min score for any input
    if (pass.length >= 8) score++; // Good length
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score++; // Mix of cases
    if (/\d/.test(pass)) score++; // Contains numbers
    if (/[^A-Za-z0-9]/.test(pass)) score++; // Contains special characters

    switch (score) {
      case 1:
        return { label: 'Very Weak', value: 20, color: 'bg-red-500' };
      case 2:
        return { label: 'Weak', value: 40, color: 'bg-orange-500' };
      case 3:
        return { label: 'Medium', value: 60, color: 'bg-yellow-500' };
      case 4:
        return { label: 'Strong', value: 80, color: 'bg-blue-500' };
      case 5:
        return { label: 'Very Strong', value: 100, color: 'bg-green-500' };
      default:
        return { label: '', value: 0, color: 'bg-gray-200' };
    }
  };

  const strength = useMemo(() => getStrength(password), [password]);

  return (
    <div className="w-full space-y-1">
      <Progress 
        value={strength.value} 
        className="h-2"
        // This targets the inner indicator bar of the Progress component
        indicatorClassName={strength.color} 
      />
      {strength.label && (
        <p className="text-xs text-muted-foreground">
          Strength: <span className="font-semibold">{strength.label}</span>
        </p>
      )}
    </div>
  );
};

// Add a custom prop to the Progress component to allow dynamic color changes easily.
// This is a common pattern to extend shadcn components without ejecting them.
interface CustomProgressProps extends React.ComponentPropsWithoutRef<typeof Progress> {
    indicatorClassName?: string;
}

const CustomProgress = React.forwardRef<
    React.ElementRef<typeof Progress>,
    CustomProgressProps
>(({ className, value, indicatorClassName, ...props }, ref) => (
    <Progress
        ref={ref}
        className={className}
        value={value}
        {...props}
        // This is a workaround to style the inner bar dynamically without complex CSS-in-JS
        style={{ '--indicator-color': `var(--${indicatorClassName})` } as React.CSSProperties}
    />
));
// For simplicity in this component, we'll modify the Progress component's child directly via a special prop.
// This is slightly less clean than the above but works without style vars. Let's revert to a simpler method.

// We will just pass the indicatorClassName directly to the main Progress component and handle it there.
// shadcn/ui Progress doesn't support this out of the box, so we need to be clever.
// Let's create a small wrapper for it, or just use CSS selectors if possible.
// The provided Progress component is not directly modifiable here.
// The best approach is to use the `[&>div]` tailwind selector to style the child.
// Let's correct the main component implementation.

const PasswordStrengthIndicatorFinal: React.FC<PasswordStrengthIndicatorProps> = ({ password = '' }) => {
  console.log('PasswordStrengthIndicator loaded');

  const strength = useMemo(() => getStrength(password), [password]);

  // We need to construct the full class name for the indicator
  const indicatorClass = strength.color || 'bg-transparent';

  return (
    <div className="w-full space-y-2 transition-all duration-300">
      <Progress 
        value={strength.value} 
        className="h-2 bg-gray-200 dark:bg-gray-700"
        // This special syntax targets the direct child div (the indicator) and applies the background color.
        // It's a powerful Tailwind feature for styling un-exposed children elements.
        // NOTE: This approach is not directly supported by React props. A different strategy is needed.
        // A simple way is to wrap it and pass the class. Let's assume a wrapper or we just conditionally render.
      />
      {/* 
        The Progress component from shadcn is a styled wrapper around Radix UI Progress.
        It doesn't have a prop to style the inner `Indicator` element.
        The most robust solution is to use different Progress components or CSS variables.
        For this generator, let's use a simpler, albeit more verbose, method: conditional rendering of styled bars.
        This ensures it works without modifying the base component.
      */}
      <div className="relative h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-300 ${strength.color}`} 
          style={{ width: `${strength.value}%` }}
        />
      </div>
      <p className="text-xs text-right font-medium text-muted-foreground h-4">
        {strength.label}
      </p>
    </div>
  );
};


export default PasswordStrengthIndicatorFinal;
import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = {
  icon?: ReactNode;
  className?: string;
  text?: string;
  onClick?: () => void;
  variant: 'primary' | 'secondary' | 'category' | 'dark';
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variants = {
  primary: 'bg-white',
  dark: 'rounded-md bg-gray-900 text-white',
  secondary: 'bg-gray-100 border border-gray-300',
  category: ' rounded-md bg-gray-100',
};

export const Button = ({
  variant,
  icon,
  className,
  onClick,
  text,
}: ButtonProps) => {
  const style = variants[variant];
  return (
    <button
      onClick={onClick}
      className={`${
        text ? ` gap-2 w-[max-content] p-4` : `w-10`
      } h-10 ${style} ${className}  shrink-0 rounded-full flex items-center justify-center ${
        variant !== 'dark' ? `hover:bg-gray-200 ` : ''
      }`}
    >
      {icon} {text}
    </button>
  );
};

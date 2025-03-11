import React from 'react';

interface LoadingButtonProps {
  onClick: () => void;
  loading: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  loadingText?: string;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  onClick,
  loading,
  disabled = false,
  children,
  loadingText = 'Loading...'
}) => {
  return (
    <button 
      onClick={onClick} 
      disabled={loading || disabled}
      className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-300"
    >
      {loading ? loadingText : children}
    </button>
  );
};

export default LoadingButton;
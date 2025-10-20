interface LoadingProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

const Loading = ({ message = 'Loading...', size = 'md', fullScreen = false }: LoadingProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-12 w-12',
    lg: 'h-14 w-14',
  };

  const containerClasses = fullScreen
    ? 'flex flex-col justify-center items-center h-[80vh] bg-primary/5'
    : 'flex flex-col items-center justify-center py-20';

  return (
    <div className={containerClasses}>
      <div
        className={`animate-spin rounded-full border-4 border-primary/20 border-t-primary mb-4 ${sizeClasses[size]}`}
      ></div>
      <p className="text-primary font-medium">{message}</p>
    </div>
  );
};

export default Loading;

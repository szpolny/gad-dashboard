import { LoaderCircleIcon } from 'lucide-react';

const LoadingFull = () => {
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="flex items-center gap-2">
        <LoaderCircleIcon className="animate-spin" />
        <p>Loading</p>
      </div>
    </div>
  );
};

export default LoadingFull;

import { ModeToggle } from '@/components/ModeToggle';
import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <div>
      <div className="flex w-full h-screen items-center justify-center">
        <Button>Login with Discord</Button>
      </div>
      <div className="absolute right-5 top-5">
        <ModeToggle />
      </div>
    </div>
  );
};

export default Home;

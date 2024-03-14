'use client';

import { useSession, signIn } from 'next-auth/react';
import { FaDiscord } from 'react-icons/fa';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import LoadingFull from '@/components/LoadingFull';

const Home = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <LoadingFull />;
  }

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div>
      <div className="flex w-full h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl m-5 font-semibold">
            Arma 3 GAD - Server Dashboard
          </h1>
          <Button
            onClick={() => {
              signIn('discord');
            }}
          >
            Login with Discord <FaDiscord className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;

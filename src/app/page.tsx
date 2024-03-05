'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { FaDiscord } from 'react-icons/fa';

import { Button } from '@/components/ui/button';

const Home = () => {
  const { data: session } = useSession();

  if (!session) {
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
  } else {
    return (
      <div>
        <p>You are logged in as {session.user!.name}!</p>
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
    );
  }
};

export default Home;

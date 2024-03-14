'use client';

import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const NotAuthorized = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/');
    },
  });

  if (session?.user.roles.includes('access')) {
    redirect('/dashboard');
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-10">
          Nie masz dostępu do panelu
        </h1>
        <div className="w-80 flex justify-between items-center m-auto">
          <Button>Poproś o dostęp</Button>
          <Button
            variant="outline"
            onClick={() => {
              signOut();
            }}
          >
            Wyloguj
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotAuthorized;

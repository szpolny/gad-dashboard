'use client';

import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Dashboard = () => {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/');
    },
  });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Dashboard</p>
      <Button
        onClick={() => {
          signOut();
        }}
      >
        Wyloguj się
      </Button>
    </div>
  );
};

export default Dashboard;

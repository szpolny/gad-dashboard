'use client';

import LoadingFull from '@/components/LoadingFull';
import Navbar from '@/components/Navbar';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Dashboard = () => {
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/');
    },
  });

  if (status === 'loading') {
    return <LoadingFull />;
  }

  return (
    <div>
      <Navbar session={session} />
    </div>
  );
};

export default Dashboard;

'use client';

import LoadingFull from '@/components/LoadingFull';
import Navbar from '@/components/Navbar';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
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
    <div className="h-screen">
      <Navbar session={session} />
      <div className="flex items-center h-full justify-center">
        <div className="grid grid-cols-3 grid-rows-4 h-5/6 w-10/12">
          <Card className="col-span-2 row-span-3">
            <CardHeader>
              <CardTitle>Presety</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

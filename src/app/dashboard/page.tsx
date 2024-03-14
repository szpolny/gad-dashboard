'use client';

import LoadingFull from '@/components/LoadingFull';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import PresetsWidget from './components/widgets/PresetsWidget';
import Navbar from './components/Navbar';

const Dashboard = () => {
  const [presets, setPresets] = useState({ list: [], loading: true });
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/');
    },
  });

  useEffect(() => {
    const fetchPresets = async () => {
      const res = await fetch('/api/server/presets');
      const { presetsList: data } = await res.json();
      setPresets({ list: data, loading: false });
    };

    fetchPresets();
  }, []);

  if (status === 'loading') {
    return <LoadingFull />;
  }

  return (
    <div className="h-screen">
      <Navbar session={session} />
      <div
        style={{
          height: 'calc(100vh - 3.5rem)',
        }}
        className="flex items-center justify-center"
      >
        <div className="grid grid-cols-3 grid-rows-4 h-5/6 w-10/12">
          <PresetsWidget presets={presets} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

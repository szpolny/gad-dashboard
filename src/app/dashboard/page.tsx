'use client';

import LoadingFull from '@/components/LoadingFull';
import { css } from '@emotion/react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import PresetsWidget from './components/widgets/PresetsWidget';
import Navbar from './components/Navbar';
import PlayersWidget from './components/widgets/PlayersWidget';
import ModsWidget from './components/widgets/ModsWidget';

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

  if (!session?.user.roles.includes('access')) {
    redirect('/not-authorized');
  }

  return (
    <div className="sm:h-screen">
      <Navbar session={session} />
      <div
        css={css`
          @media (min-width: 640px) {
            height: calc(100vh - 3.5rem);
          }
        `}
        className="flex items-center justify-center"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 grid-rows-8 sm:h-5/6 w-10/12 sm:min-h-[650px]">
          <PresetsWidget presets={presets} />
          <PlayersWidget />
          <ModsWidget />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

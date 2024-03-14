'use client';

import LoadingFull from '@/components/LoadingFull';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Table, TableBody } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LoaderCircleIcon } from 'lucide-react';
import PresetsListItem from './presetsListItem';

const Dashboard = () => {
  const [presets, setPresets] = useState([]);
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
      setPresets(data);
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
          <Card className="col-span-1 row-span-3">
            <CardHeader>
              <CardTitle>Presety</CardTitle>
            </CardHeader>
            <CardContent className="h-[80%]">
              {presets.length === 0 ? (
                <div className="h-full flex justify-center items-center">
                  <LoaderCircleIcon className="animate-spin" />
                </div>
              ) : (
                <ScrollArea className="h-full">
                  <Table className="">
                    <TableBody className="">
                      {presets.map((p) => {
                        return <PresetsListItem key={p} item={p} />;
                      })}
                    </TableBody>
                  </Table>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

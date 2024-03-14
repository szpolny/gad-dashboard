'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import LoadingFull from '@/components/LoadingFull';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import Navbar from '../components/Navbar';

interface IServerData {
  attributes: {
    details: {
      modNames: string[];
      modIds: string[];
    };
  };
}

interface IMod {
  id: string;
  title: string;
}

const ModsPage = () => {
  const [serverData, setServerData] = useState<IServerData>();
  const [installedMods, setInstalledMods] = useState<IMod[]>();

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/');
    },
  });

  useEffect(() => {
    const fetchServerData = async () => {
      const res = await fetch(`https://api.battlemetrics.com/servers/12205171`);
      const serverInfo = await res.json();
      setServerData(serverInfo.data);
    };

    const fetchInstalledMods = async () => {
      const res = await fetch('/api/server/mods');
      const mods = await res.json();
      setInstalledMods(mods.modsList);
    };

    fetchServerData();
    fetchInstalledMods();
  }, []);

  if (status === 'loading') {
    return <LoadingFull />;
  }

  if (!session?.user.roles.includes('access')) {
    redirect('/not-authorized');
  }

  return (
    <div className="h-screen">
      <Navbar session={session} />
      <div
        css={css`
          @media (min-width: 640px) {
            height: calc(100vh - 3.5rem);
          }
        `}
        className="flex items-center justify-center"
      >
        <div className="grid grid-cols-2 grid-rows-1 h-5/6 w-10/12">
          <Card className="m-5 col-span-1 row-span-1">
            <CardHeader>
              <CardTitle>Odpalone mody</CardTitle>
              <CardDescription>Mody w aktualnym presecie</CardDescription>
            </CardHeader>
            <CardContent className="h-[80%]">
              {serverData === undefined ? (
                <div>loading...</div>
              ) : (
                <ScrollArea className="h-full">
                  <Table>
                    <TableBody>
                      {serverData.attributes.details.modNames.map(
                        (mod, index) => {
                          return (
                            <TableRow key={mod}>
                              <TableCell className="">{mod}</TableCell>
                              <TableCell>
                                <Button
                                  onClick={() => {
                                    window.open(
                                      `https://steamcommunity.com/sharedfiles/filedetails/?id=${serverData.attributes.details.modIds[index]}`,
                                      '_blank',
                                    );
                                  }}
                                >
                                  Steam Workshop
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        },
                      )}
                    </TableBody>
                  </Table>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
          <Card className="m-5 col-span-1 row-span-1">
            <CardHeader>
              <CardTitle>Pobrane mody</CardTitle>
              <CardDescription>Mody pobrane na serwerze</CardDescription>
            </CardHeader>
            <CardContent className="h-[80%]">
              {installedMods === undefined ? (
                <p>Loading...</p>
              ) : (
                <ScrollArea className="h-full">
                  <Table>
                    <TableBody>
                      {installedMods.map((mod) => {
                        return (
                          <TableRow key={mod.id}>
                            <TableCell>{mod.title}</TableCell>
                            <TableCell>
                              <Button
                                onClick={() => {
                                  window.open(
                                    `https://steamcommunity.com/sharedfiles/filedetails/?id=${mod}`,
                                    '_blank',
                                  );
                                }}
                              >
                                Steam Workshop
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
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

export default ModsPage;

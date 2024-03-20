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
import { css } from '@emotion/react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import Navbar from '../components/Navbar';

const PresetsPage = () => {
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
        <div className="grid grid-cols-1 sm:grid-cols-8 grid-rows-2 sm:h-5/6 w-10/12 sm:min-h-[650px]">
          <Card className="m-5 col-span-4 row-span-2 max-h-96 sm:max-h-none">
            <CardHeader>
              <CardTitle>Presety</CardTitle>
              <CardDescription>Presety na serwerze</CardDescription>
            </CardHeader>
            <CardContent className="h-[80%]">
              <ScrollArea className="h-full">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="">mod</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PresetsPage;

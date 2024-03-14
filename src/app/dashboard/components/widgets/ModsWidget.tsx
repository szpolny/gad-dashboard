import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useEffect, useState } from 'react';

interface IServerData {
  attributes: {
    details: {
      modNames: string[];
      modIds: string[];
    };
  };
}

const ModsWidget = () => {
  const [serverData, setServerData] = useState<IServerData>();

  useEffect(() => {
    const fetchServerData = async () => {
      const res = await fetch(`https://api.battlemetrics.com/servers/12205171`);
      const serverInfo = await res.json();
      setServerData(serverInfo.data);
    };

    fetchServerData();
  }, []);

  return (
    <Card className="col-span-1 sm:col-span-2 row-span-6 max-h-96 sm:max-h-none m-4">
      <CardHeader>
        <CardTitle>Mody</CardTitle>
        <CardDescription>Aktualne mody odpalone na serwerze</CardDescription>
      </CardHeader>
      <CardContent className="h-[60%] sm:h-[70%]">
        {serverData === undefined ? (
          <div>loading...</div>
        ) : (
          <ScrollArea className="h-full">
            <Table>
              <TableBody>
                {serverData.attributes.details.modNames.map((mod, index) => {
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
                })}
              </TableBody>
            </Table>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default ModsWidget;

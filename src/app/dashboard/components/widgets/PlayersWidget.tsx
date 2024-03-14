import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';

interface IServerData {
  attributes: {
    players: number;
  };
}

const PlayersWidget = () => {
  const [serverData, setServerData] = useState<IServerData>();

  useEffect(() => {
    const fetchPlayers = async () => {
      const res = await fetch(`https://api.battlemetrics.com/servers/12205171`);
      const serverInfo = await res.json();
      setServerData(serverInfo.data);
    };

    fetchPlayers();
  }, []);

  return (
    <Card className="col-span-1 row-span-3 m-4">
      <CardHeader>
        <CardTitle>Gracze</CardTitle>
        <CardDescription>Liczba graczy na serwerze</CardDescription>
      </CardHeader>
      <CardContent>
        {serverData === undefined ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <div className="text-4xl font-bold">
            {serverData.attributes.players}
            <span className="font-medium text-muted-foreground">/64</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PlayersWidget;

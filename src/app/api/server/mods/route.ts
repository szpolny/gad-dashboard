import fetchTitle from '@/lib/fetchTitle';
import { NextResponse } from 'next/server';
import { createInterface } from 'readline';
import Client from 'ssh2-sftp-client';

interface IMod {
  id: string;
  title: string;
}

export async function GET() {
  const client = new Client();
  try {
    await client.connect({
      host: process.env.SFTP_HOST,
      port: 22,
      username: process.env.SFTP_USER,
      password: process.env.SFTP_PASSWORD,
    });

    const dataStream = await client.createReadStream(
      '/mods/presets/mods-available.txt',
    );
    const rl = createInterface({
      input: dataStream,
      crlfDelay: Infinity,
    });

    let lines = [];
    // eslint-disable-next-line no-restricted-syntax
    for await (const line of rl) {
      lines.push(line);
    }

    lines = lines.map((line) => {
      if (line.split(':')[1] !== undefined) return line.split(':')[1];
      return line.split(':')[0];
    });

    const mods: IMod[] = await Promise.all(
      lines.map(async (id): Promise<IMod> => {
        if (id.startsWith('@')) {
          return { title: id, id: 'none' };
        }
        const title = await fetchTitle(
          `https://steamcommunity.com/sharedfiles/filedetails/?id=${id}`,
        );

        const newTitle = title.split('Workshop::')[1];

        return { id, title: newTitle };
      }),
    );

    return NextResponse.json({ modsList: mods }, { status: 200 });
  } catch (e) {
    console.error('Failed to fetch mods', e);
    client.end();
    return NextResponse.json(
      { error: 'Error connecting to SFTP server' },
      { status: 500 },
    );
  }

  client.end();
}

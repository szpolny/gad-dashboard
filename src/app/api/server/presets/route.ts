import Client from 'ssh2-sftp-client';
import { NextResponse } from 'next/server';

export async function GET() {
  const client = new Client();
  try {
    await client.connect({
      host: process.env.SFTP_HOST,
      port: 22,
      username: process.env.SFTP_USER,
      password: process.env.SFTP_PASSWORD,
    });

    const data = await client.list('/mods/presets');
    const presetsList = data.map((file) => file.name.replace('.txt', ''));
    client.end();
    return NextResponse.json({ presetsList }, { status: 200 });
  } catch (e) {
    console.error('Failed to fetch presets', e);
    client.end();
    return NextResponse.json(
      { error: 'Error connecting to SFTP server' },
      { status: 500 },
    );
  }

  client.end();
}

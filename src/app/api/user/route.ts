import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';

interface args {
  username: string;
  email: string;
  image: string;
  roles: string[];
}

export async function POST(req: Request) {
  const { username, email, image, roles }: args = await req.json();
  await connectMongoDB();
  await User.create({ username, email, image, roles });
  return NextResponse.json({ message: 'User created' }, { status: 201 });
}

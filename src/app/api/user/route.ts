import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';

interface IArgs {
  username: string;
  email: string;
  image: string;
  roles: string[];
}

export async function POST(req: Request) {
  const { username, email, image, roles }: IArgs = await req.json();
  try {
    await connectMongoDB();
    await User.create({ username, email, image, roles });
    return NextResponse.json({ message: 'User created' }, { status: 201 });
  } catch (error) {
    console.error(error);
  }

  return NextResponse.json(
    { message: 'Failed to create user' },
    { status: 500 },
  );
}

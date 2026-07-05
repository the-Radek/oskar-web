import { createPost } from '@/lib/actions/post';
import { auth } from '@/lib/auth';
import { Role } from '@/prisma/enums';

export async function POST(req: Request) {
  const [body, session] = await Promise.all([req.json(), auth()]);
  if (!session?.user?.id) {
    return new Response('Unauthorized', { status: 401 });
  }
  if (session.user.role !== Role.ADMIN) {
    return new Response('Insufficient permissions', { status: 403 });
  }

  try {
    await createPost(session.user.id, body);
    return new Response('Success', { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response('Error creating post', { status: 400 });
  }
}

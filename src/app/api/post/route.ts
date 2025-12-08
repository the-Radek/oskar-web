import { createPost } from '@/lib/actions/post';

export async function POST(req: Request) {
  const body = await req.json();
  try {
    await createPost(body);
    return new Response(null, { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response('Error creating post', { status: 400 });
  }
}

import { prisma } from '../prisma';
import { auth } from '../auth';
import { Role } from '@/prisma/enums';
import z from 'zod';
import { PostSchema } from '../validators/post';
import { ImageSchema } from '../validators/image';

const CreatePostInputSchema = z.object({
  post: PostSchema,
  images: z.array(ImageSchema),
});

export type CreatePostInput = z.infer<typeof CreatePostInputSchema>;

export async function createPost(input: CreatePostInput) {
  const session = await auth();
  if (!session?.user?.id /*|| session?.user?.role !== Role.ADMIN */) {
    // console.log(session?.user?.id, session?.user?.role);
    throw new Error('Unauthorized');
  }

  const result = CreatePostInputSchema.safeParse(input);
  if (!result.success) {
    console.error(result.error);
    throw new Error('Invalid input data');
  }

  await prisma.post.create({
    data: {
      ...result.data.post,
      authorId: session.user.id,
      images: {
        create: result.data.images.map((image) => ({ ...image, authorId: session.user!.id! })),
      },
    },
  });
}

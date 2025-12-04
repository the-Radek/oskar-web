import { ImageModel, PostModel } from '@/prisma/models';
import { prisma } from '../prisma';
import { auth } from '../auth';
import { Role } from '@/prisma/enums';

export async function createPost(post: PostModel, images: ImageModel[]) {
  const session = await auth();
  if (!session?.user?.id || session?.user?.role !== Role.ADMIN) {
    throw new Error('Unauthorized');
  }

  await prisma.post.create({
    data: {
      ...post,
      authorId: session.user.id,
      images: {
        create: images.map((image) => ({ ...image, authorId: session.user!.id! })),
      },
    },
  });
}

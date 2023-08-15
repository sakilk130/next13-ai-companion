import { auth, redirectToSignIn } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
import { CompanionForm } from './components/companion-form';

interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
}

const CompanionIdPage = async ({
  params: { companionId },
}: CompanionIdPageProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirectToSignIn();
  }
  const companion = await prismadb.companion.findUnique({
    where: {
      userId,
      id: companionId,
    },
  });

  const categories = await prismadb.category.findMany();

  return (
    <>
      <CompanionForm initialData={companion} categories={categories} />
    </>
  );
};

export default CompanionIdPage;

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
  const companion = await prismadb.companion.findUnique({
    where: {
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

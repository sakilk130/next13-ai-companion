import { Categories } from '@/components/categories';
import { Companions } from '@/components/companions';
import { SearchInput } from '@/components/search-input';
import prismadb from '@/lib/prismadb';

interface RootPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

const RootPage = async ({
  searchParams: { categoryId, name },
}: RootPageProps) => {
  const categories = await prismadb.category.findMany();
  const data = await prismadb.companion.findMany({
    where: {
      categoryId,
      name: {
        search: name,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Categories data={categories} />
      <Companions data={data} />
    </div>
  );
};

export default RootPage;

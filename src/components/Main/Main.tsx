import { Content } from '../Content/Content';
import { Categories } from '../Categories/Categories';
import { CategoryType } from '../../types/types';

type categoriesProps = {
  categories: CategoryType[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

export const Main = ({
  categories,
  selectedCategory,
  onSelect,
}: categoriesProps) => {
  return (
    <main className='flex relative flex-col overflow-x-hidden gap-4 px-1 no-scrollbar-button md:px-6 select-none'>
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={onSelect}
      ></Categories>
      <Content></Content>
    </main>
  );
};

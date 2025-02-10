import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Sidebar } from './components/Sidebar/Sidebar';
import { SidebarProvider } from './context/SidebarContext';
import { useFetchCategories } from './utils/useFetchCategories';

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

function App() {
  const { categories, selectedCategory, setSelectedCategory } =
    useFetchCategories();

  return (
    <SidebarProvider>
      <div className='max-h-screen flex flex-col p-2'>
        <Header />
        <div className='grid grid-cols-[auto,1fr] flex-grow-1 overflow-y-auto gap-2'>
          <Sidebar />
          <Main
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;

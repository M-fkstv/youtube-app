import { useState } from 'react';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Sidebar } from './components/Sidebar/Sidebar';
import { categories } from './data';
import { SidebarProvider } from './context/SidebarContext';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
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

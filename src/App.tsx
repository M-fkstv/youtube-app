import { useState } from 'react';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Sidebar } from './components/Sidebar/Sidebar';

const categories: string[] = [
  'JavaScript',
  'All',
  'TypeScript',
  'Programming',
  'Weight Lifting',
  'Bowling',
  'Hiking',
  'React',
  'Next.js',
  'Functional Programming',
  'Object Oriented Programming',
  'Frontend Web Development',
  'Backend Web Development',
  'Web Development',
  'Coding',
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  return (
    <div className='max-h-screen flex flex-col p-2'>
      <Header />
      <div className='grid grid-cols-[auto,1fr]  gap-2'>
        <Sidebar />
        <Main
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>
    </div>
  );
}

export default App;

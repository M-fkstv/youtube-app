import { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { Button } from '../Button/Button';

type categoriesProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

const TRANSLATE_AMOUNT = 200;
export const Main = ({
  categories,
  onSelect,
  selectedCategory,
}: categoriesProps) => {
  const [translate, setTranslate] = useState(0);
  const [isLeftVisible, setIsLeftVisible] = useState(true);
  const [isRightVisible, setIsRightVisible] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);

  const clientWidth = containerRef.current?.clientWidth || 0;
  const scrollWidth = scrollRef.current?.scrollWidth || 0;
  const offset = scrollWidth - clientWidth;

  useEffect(() => {
    setIsLeftVisible(translate > 0);
    setIsRightVisible(translate < offset);
  }, [offset, translate]);

  const scrollRight = () => {
    if (translate + TRANSLATE_AMOUNT <= offset) {
      setTranslate((prev) => prev + TRANSLATE_AMOUNT);
    } else {
      setTranslate(offset);
    }
  };

  const scrollLeft = () => {
    if (translate - TRANSLATE_AMOUNT >= 0) {
      setTranslate((prev) => prev - TRANSLATE_AMOUNT);
    } else {
      setTranslate(0);
    }
  };

  // Обработчики перетаскивания
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentTranslate(translate);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Добавляем обработчики событий при монтировании компонента
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const distanceMoved = e.clientX - startX;
      const newTranslate = currentTranslate - distanceMoved; // Изменяем translate на основе перемещения мыши

      if (newTranslate >= 0 && newTranslate <= offset) {
        setTranslate(newTranslate);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [currentTranslate, isDragging, offset, startX]);

  return (
    <div
      className='flex flex-col overflow-x-hidden pt-2 relative select-none'
      ref={containerRef}
      onMouseDown={handleMouseDown}
    >
      <div className='flex overflow-x-auto no-scrollbar'>
        {isLeftVisible && (
          <div className='absolute  z-20 bg-gradient-to-r w-20 from-white from-50% to-transparent'>
            <Button
              className=''
              variant='primary'
              onClick={scrollLeft}
              icon={<FaArrowLeft />}
            />
          </div>
        )}
        {isRightVisible && (
          <div className='absolute right-0 z-20 bg-gradient-to-l w-20 from-white from-50% to-transparent flex justify-end'>
            <Button
              variant='primary'
              onClick={scrollRight}
              icon={<FaArrowRight />}
            />
          </div>
        )}

        <div
          ref={scrollRef}
          style={{
            transform: `translateX(-${translate}px)`,
          }}
          className='flex gap-2 transition-transform w-[max-content]'
        >
          {categories.map((category) => (
            <Button
              variant={selectedCategory === category ? 'dark' : 'category'}
              key={category}
              text={category}
              onClick={() => onSelect(category)}
            />
          ))}
        </div>
      </div>

      <main>content</main>
    </div>
  );
};

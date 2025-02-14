import { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

import { Button } from '../Button/Button';
import { useLazySearchVideoByCategoryQuery } from '../../redux/api/searchApi';
import { CategoryType } from '../../types/types';

const TRANSLATE_AMOUNT = 200;

type categoriesProps = {
  categories: CategoryType[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

export const Categories = ({
  categories,
  onSelect,
  selectedCategory,
}: categoriesProps) => {
  const [translate, setTranslate] = useState(0);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [trigger] = useLazySearchVideoByCategoryQuery();

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);

  const clientWidth = containerRef.current?.clientWidth || 0;
  const scrollWidth = scrollRef.current?.scrollWidth || 0;
  const offset = scrollWidth - clientWidth;

  useEffect(() => {
    setIsLeftVisible(translate > 0);
    setIsRightVisible(translate <= offset);
  }, [offset, translate]);

  const setCategory = (category: CategoryType) => {
    onSelect(category.title);
    trigger(category.id);
  };

  const scrollRight = () => {
    if (translate + TRANSLATE_AMOUNT <= offset) {
      setTranslate((prev) => prev + TRANSLATE_AMOUNT);
    } else {
      setTranslate(offset + 1);
    }
  };

  const scrollLeft = () => {
    if (translate - TRANSLATE_AMOUNT >= 0) {
      setTranslate((prev) => prev - TRANSLATE_AMOUNT);
    } else {
      setTranslate(0);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentTranslate(translate);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const distanceMoved = e.clientX - startX;
      const newTranslate = currentTranslate - distanceMoved;

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
      onMouseDown={handleMouseDown}
      className='flex sticky top-0 bg-white py-4 overflow-x-clip no-scrollbar'
      ref={containerRef}
    >
      {isLeftVisible && (
        <div className='absolute z-20 bg-gradient-to-r w-20 from-white from-50% to-transparent'>
          <Button
            variant='primary'
            onClick={scrollLeft}
            icon={<FaArrowLeft />}
          />
        </div>
      )}
      {isRightVisible && (
        <div className='absolute right-0 z-20 bg-gradient-to-l w-20 from-white from-50% to-transparent flex justify-end '>
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
        className='flex  gap-2 transition-transform w-[max-content]'
      >
        {categories &&
          categories.map((category) => (
            <Button
              variant={
                selectedCategory === category.title ? 'dark' : 'category'
              }
              key={category.id}
              text={category.title}
              className=''
              onClick={() => setCategory(category)}
            />
          ))}
      </div>
    </div>
  );
};

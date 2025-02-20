import {useDroppable } from '@dnd-kit/core';

const Droppable = ({ id, children }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div ref={setNodeRef} className='p-5 border-2 border-dashed border-[#ffe16a] rounded-md min-h-[200px] min-w-[300px] flex flex-col'>
      {children}
    </div>
  );
};

export default Droppable
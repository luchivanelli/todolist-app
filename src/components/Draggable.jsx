import { useDraggable } from "@dnd-kit/core";
import { useState, useRef, useEffect } from "react";
import iconDelete from "../assets/trash.svg";
import iconEdit from "../assets/edit.svg";

const Draggable = ({ id, children, handleNameTask, handleDeleteTask, state }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
  
  //Estado que define si la tarea está en modo edición
  const [edit, setEdit] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    if (edit) {
      //Da focus al input de edición
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [edit]);


  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  //Función que permite la edición de la tarea
  const handleEdit = () => setEdit(true);

  //Función que permite salir de la edición de la tarea
  const EditOff = () => setEdit(false);

  //Guarda el nombre nuevo de la tarea y sale del modo edición
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleNameTask(inputRef.current.value, children);
      EditOff();
    }
  };

  return (
    <div className="m-1 flex justify-between gap-2 relative touch-none select-none">
      {!isDragging && (
        <div className="flex absolute right-1 top-2.5">
          <img
            src={iconEdit}
            alt="Edit"
            onClick={handleEdit}
            className="cursor-pointer w-[22px]"
          />
          <img 
            src={iconDelete} 
            alt="Delete" 
            onClick={()=> handleDeleteTask(children)}
            className="cursor-pointer w-[22px]" 
          />
        </div>
      )}

      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        onClick={(e) => e.stopPropagation()}
        className={`p-3 pr-14 rounded-md flex justify-between cursor-grab w-[250px] ${edit && "hidden"} ${state ? "bg-[#a3a3a3] line-through" : "bg-white"}`}
      >
        <p className="break-words w-full">{children}</p>
      </div>

      <input
        ref={inputRef}
        className={`p-3 pr-14 bg-[#c2c2c2] rounded-md w-[250px] focus:outline-0 ${!edit && "hidden"}`}
        onKeyDown={handleEnter}
        onBlur={EditOff}
      />
    </div>
  );
};

export default Draggable;

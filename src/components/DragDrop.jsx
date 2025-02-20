import { DndContext } from '@dnd-kit/core';
import Droppable from './Droppable';
import Draggable from './Draggable';

const DragDrop = ({items1, items2, setItems1, setItems2, setBandera}) => {

    const handleDragEnd = (event) => {
        const { active, over } = event;

        // Verifica si el elemento se suelta sobre otro contenedor
        if (!over) return;

        if (over.id === 'container1' && !items1.includes(active.id)) {
            setItems2((prev) => prev.filter((item) => item !== active.id));
            setItems1((prev) => [...prev, active.id]);
        } else if (over.id === 'container2' && !items2.includes(active.id)) {
            setItems1((prev) => prev.filter((item) => item !== active.id));
            setItems2((prev) => [...prev, active.id]);
        }
    };

    //Funcion para editar el nombre de una tarea
    const handleNameTask = (newName, oldName)=> {
        console.log(oldName)
        const result1 = items1.some(element => element == newName)
        const result2 = items2.some(element => element == newName)
        console.log(items1, result1, result2)

        if (result1 == false && result2 == false) {
            const result3 = items1.findIndex(element => element == oldName)
            const result4 = items2.findIndex(element => element == oldName)
            console.log(result1, result2)

            if (result3 != -1) {
                const updatedArray1 = [...items1]
                updatedArray1[result3] = newName
                setItems1(updatedArray1)
            } else {
                const updatedArray2 = [...items2]
                updatedArray2[result4] = newName
                setItems2(updatedArray2)
            }
        } else {
            setBandera(true)
            setTimeout(()=> {
                setBandera(false)
            }, 4000)
        }
    }

    //Función para eliminar una tarea
    const handleDeleteTask = (task)=> {
        setItems1(items1.filter((item) => item !== task));
        setItems2(items2.filter((item) => item !== task));
    }

    return (
    <DndContext onDragEnd={handleDragEnd}>
        <div className='z-50 flex flex-col md:flex-row gap-5'>
        <Droppable id="container1">
            <span className='pb-2 text-center text-xl text-white'>Tareas <b className='bg-amber-300 p-1 text-black rounded-md'>incompletas</b></span>
            {items1.map((item) => (
                <Draggable key={item} id={item} handleNameTask={handleNameTask} handleDeleteTask={handleDeleteTask} state={false}>
                    {item}
                </Draggable>
            ))}
        </Droppable>

        <Droppable id="container2">
            <span className='pb-2 text-center text-xl text-white'>Tareas <b className='bg-amber-300 p-1 text-black rounded-md'>realizadas</b></span>
            {items2.map((item) => (
                <Draggable key={item} id={item} handleNameTask={handleNameTask} handleDeleteTask={handleDeleteTask} state={true}>
                    {item}
                </Draggable>
            ))}
        </Droppable>
        </div>
    </DndContext>
    );
};

export default DragDrop;


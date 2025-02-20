import DragDrop from "./components/DragDrop"
import AddTask from "./components/AddTask"
import { useState } from 'react';

const App = ()=> {
  const [items1, setItems1] = useState(['Hacer las compras', 'Estudiar inglés', 'Limpiar la casa']);
  const [items2, setItems2] = useState([]);

  return (
    <div className="bg-gradient-to-t from-[#000] to-[#222] flex flex-col gap-4 justify-center items-center h-screen bg-transparent">
      <div className="flex items-center gap-3 z-50 mb-4">
        <h2 className="px-3 py-2 bg-amber-300 rounded-xl tracking-wide text-5xl">TODO</h2>
        <h2 className="text-5xl text-white tracking-wide">list</h2>
      </div>
      <AddTask items1={items1} items2={items2} setItems1={setItems1}/>
      <DragDrop items1={items1} items2={items2} setItems1={setItems1} setItems2={setItems2}/>
    </div>  
  )
}

export default App
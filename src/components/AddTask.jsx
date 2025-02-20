import { useRef, useState } from "react";
  
const AddTask = ({items1, items2, setItems1})=> {
    const [bandera, setBandera] = useState(false)

    //Agregar una tarea
    const handleTask = ()=> {
        const result1 = items1.some(element => element == inputRef.current.value)
        const result2 = items2.some(element => element == inputRef.current.value)
        if (!result1 && !result2) {
            //Si la tarea no está en la lista, la agrega
            setItems1([...items1, inputRef.current.value])
            inputRef.current.value = ""
        } else {
            //Si la tarea ya existe, no la agrega y muestra un mensaje durante 4 segundos
            setBandera(true)
            setTimeout(()=> {
                setBandera(false)
            }, 4000)
        }
    }

    const inputRef = useRef(null);
    return (
        <div className="flex flex-col items-center gap-3">
            <div className="flex gap-3 z-50">
                <input type="text" ref={inputRef} placeholder="Escribe algo.." className="p-2 border-2 border-[#c2c2c2] rounded-md text-white placeholder:text-white focus:outline-0"/>
                <button className="px-3 cursor-pointer border-2 border-[#c2c2c2] text-white p-1 rounded-2xl hover:bg-[#c2c2c2] hover:text-black transition-all" onClick={handleTask}>Agregar</button>
            </div>
            <p className={`text-amber-300 ${!bandera && "hidden"}`}>Esta tarea ya se encuentra en la lista</p>
        </div>
    )
}

export default AddTask
import { useState, createContext, useContext } from "react";
import AccordionItem from "./AccordionItem.jsx";

const AccordionContext = createContext();

export function useAccordionContext(){
    const ctx= useContext(AccordionContext);

    if(!ctx){
        throw new Error('Accordion-related components must be wrapped by <Accordion>')
    }

    return ctx;
}

export default function Accordion({className, children}){
    const [openItemId, setOpenItemId] = useState(null)

    function toggleItem(id){
        setOpenItemId(prevId => prevId===id ? null : id)
    }


    const ctxValue={
        openItemId,
        toggleItem
    }
    return (
    <AccordionContext.Provider value={ctxValue}>
        <ul className={className}> 
            {children}
        </ul>
    </AccordionContext.Provider>
    )
    
}

Accordion.Item= AccordionItem
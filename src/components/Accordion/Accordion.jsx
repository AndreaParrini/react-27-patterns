import { useState, createContext, useContext } from "react";

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

    function openItem(id){
        setOpenItemId(id)
    }

    function closeItem(){
        setOpenItemId(null)
    }

    const ctxValue={
        openItemId,
        openItem,
        closeItem
    }
    return (
    <AccordionContext.Provider value={ctxValue}>
        <ul className={className}> 
            {children}
        </ul>
    </AccordionContext.Provider>
    )
    
}
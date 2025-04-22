import { useState, useRef } from "react";

export default function SearchableList({items, itemKeyFn, children}){
    const lastChange = useRef();
    const [searchTerm, setSearchTerm] = useState('');

    const searcResults = items.filter((item) => JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase()))

    function handleChange(event){
    // con questo codice evitiamo il Debouncing, ovvero aggiornare lo stato ad ogni pressione di un nuovo tasto
    // con questa app non dava problemi ma con una app in cui si inviano richiesto al backend potrebbe creare dei problemi.
    // in questo modo si aggiorna lo stato SOLO passati i 500 millesecondi dall'ultima pressione dell'utente.

        // quando si cambia lo stato si controlla se c'è un timer attivo, 
        // se c'è lo si cancella in quanto vuol dire che non sono passati i 500 millesencodi dall'ultima modifica
       if(lastChange.current){
            clearTimeout(lastChange.current);
        }
        
        // e qui poi si reimposta il timer
        lastChange.current = setTimeout(()=> {
            lastChange.current = null;
            setSearchTerm(event.target.value);
        }, 500)  
    }

    return(
        <div className="searchable-list">
            <input type='search' placeholder="Search" onChange={handleChange}/>
            <ul>
                {searcResults.map((item) => (
                    <li key={itemKeyFn(item)}>{children(item)}</li>
                ))}
            </ul>
        </div>
    )
}
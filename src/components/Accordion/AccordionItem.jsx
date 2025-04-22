export default function AccordionItem({className, title, children}){
    return <li className={className}>
        <h2>{title}</h2>
        {children}
    </li>
}
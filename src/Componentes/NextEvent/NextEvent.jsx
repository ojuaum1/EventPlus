import React from 'react';
import './NextEvent.css';
import { dateFormatDbToView } from '../../Utils/StringFunction';
 
import { Tooltip } from 'react-tooltip'

const NextEvent = ({title, description, eventDate, idEvent}) => {
    function Conectar(idEvent) {
        alert(`chamar um recurso para conectar: ${idEvent}`)
        
    }
    return (
        <article className='event-card'>
            <h2 className='event-card__title'>{title} </h2>
            <p className='event-card__description'
            data-tooltip-id={idEvent}
            data-tooltip-content={description}
            data-tooltip-place="top"
            >
            <Tooltip id={idEvent} className='tooltip'/>
            {description.substr(0, 15)}
            </p>
            <p className='event-card__description'>{dateFormatDbToView(eventDate)} ...</p>
            <a onClick={()=> {Conectar(idEvent)}}href= "" className="event-card__conect-link">Conectar</a>

        </article>
    );
};

export default NextEvent;
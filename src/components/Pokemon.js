import React from 'react';

export const Pokemon = (props) => {
    return (
        
        <div className='cards' onClick={props.onClick} > 
           <img className='cardsImg' src={props.img} alt={props.name}></img>
            <span className='pokemonName' id={props.id}>{props.name}</span>
    <div className='pokemonType' ><span style={null}>{props.types[0]} </span> {props.types[1] ? <span style={null}>{props.types[1]}</span>: null}</div>
        </div>
    )
}
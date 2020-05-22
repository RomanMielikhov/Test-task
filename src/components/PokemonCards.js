import React from 'react';
import {Pokemon} from './Pokemon';

export class PokemonCards extends React.Component {
  
    renderCards(i){
        
        return (
            <Pokemon 
                    onClick={() => this.props.onClick(this.props.allPokArr[i].id)}
                    name={this.props.allPokArr[i].name}
                    types={this.props.allPokArr[i].type}
                    img={this.props.allPokArr[i].img}
                    id={this.props.allPokArr[i].id}
            />
        )
   }
   render() {
    let arr = Array(this.props.allPokArr.length).fill('');
    let cardArr = [];
    for(let i=0; i<arr.length; i++){
        cardArr.push(<div key={this.props.allPokArr[i].id}>{this.renderCards(i)}</div>)
    }
     return(
        
        <>
            {cardArr}
        </>
        
        
    )
  }
}

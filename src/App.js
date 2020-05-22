import React from 'react';
import {PokemonCards} from './components/PokemonCards';

 class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        url: 'http://pokeapi.co/api/v2/pokemon/?limit=12',
        error: null,
        load: false,
        allPokArr: [],
        singlePokemon: {},
        flag: false,
        filter: '',
      };
      this.loadClick = this.loadClick.bind(this);
      this.changeSelect = this.changeSelect.bind(this)
      this.hendleFilter = this.hendleFilter.bind(this)
    }    
    
     componentDidMount() {
     const url = this.state.url;
     this.loadData(url);
    }

    async loadData(url){
      try {
        const response = await fetch(url);
        const data = await response.json();
        let results = data.results;
        let nextUrl = data.next;
        let types = [];
        let urls = [];
        let names = [];
        let img = [];
        let id = [];
        let allPokArr=[];
      for (let i=0; i < results.length; i++){
        names.push(results[i].name);
        urls.push(results[i].url);
      }
      Promise.all(
        urls.map(url => fetch(url)
                          .then(response => response.json())
                          .then(response => {
                            let arrTypes = response.types;
                            let typesOfPokemon = arrTypes.map(item =>item.type.name)
                            types.push(typesOfPokemon)
                            img.push(response.sprites.front_default)
                            id.push(response.id)
                          })
                          .catch(err => console.log(err))
       
                          )
      ).then(() => {
        for(let i=0; i<names.length; i++){
          allPokArr.push({
            name: names[i],
            type: types[i],
            img: img[i],
            id: id[i],
          })
        }
           this.setState({
            load: true, 
            allPokArr: [...this.state.allPokArr,...allPokArr], 
            url: nextUrl
          })}
      )
    } catch(err) {
      console.log('err',err)
     }
    }

   async hendleClick(id){
      let url = 'https://pokeapi.co/api/v2/pokemon/'+(id);
        const response = await fetch(url);
        const data = await response.json();
        let singlePokemon = {
          type: data.types.map(item => item.type.name),
          weight: data.weight,
          TotalMoves: data.moves.length,
          name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
          id: data.id.toString().padStart(3, '0'),
          img: data.sprites.front_default
        }
          
        for(let i=0; i< data.stats.length; i++){
          singlePokemon[data.stats[i].stat.name] = data.stats[i].base_stat
        }
        this.setState({
          singlePokemon: singlePokemon,
          flag: true
        })
    }

    loadClick(){
      const url = this.state.url;
      this.loadData(url);
    }

    hendleFilter(){
      let {filter, allPokArr} = this.state
      this.setState({allPokArr:allPokArr.filter(i=> i.type.includes(filter))})
    }

    changeSelect(event){
      this.setState({filter: event.target.value})
    }

 render() {
   const { singlePokemon, load, flag, allPokArr } = this.state;
   let arr = [];
   allPokArr.map(i=>i.type.map(i=>arr.push(i)));
   let uniqueArrTypes = arr.filter((e,i,a)=>a.indexOf(e)===i)
  return(
    <div className='app'>
       <h1 className='header'>Pokedex</h1>
       <div className='view'>
      {
      !load 
      ?(<div>loading...</div>) 
      :(
        <div className='pokemons'> 
        
       <PokemonCards allPokArr={allPokArr}
                      onClick={(i) => this.hendleClick(i)}
        />
        <button className='loadButton' onClick={this.loadClick}>Load More</button>
        </div>
      )
      
      }
     
      <div className='details'>
        <div className='detailsCard'
          style={{display: !flag ? 'none' : 'block'}}>
        <img className='detailsImg' src={singlePokemon.img} alt={singlePokemon.name}></img>
<span className='detailsName'>{singlePokemon.name} #{singlePokemon.id} </span>
      <table>
      <tbody>
  <tr>
    <td>Type</td>
    <td>{singlePokemon.type}</td>
  </tr>
  <tr>
    <td>Attack</td>
    <td>{singlePokemon.attack}</td>
  </tr>
  <tr>
    <td>Defense</td>
    <td>{singlePokemon.attack}</td>
  </tr>
  <tr>
    <td>HP</td>
    <td>  {singlePokemon.hp}</td>
  </tr>
  <tr>
    <td>SP Attack</td>
    <td>{singlePokemon['special-attack']}</td>
  </tr>
  <tr>
    <td>SP Defense</td>
    <td> {singlePokemon['special-defense']}</td>
  </tr>
  <tr>
    <td>Speed</td>
    <td> {singlePokemon.speed}</td>
  </tr>
  <tr>
    <td>Weight</td>
    <td>{singlePokemon.weight}</td>
  </tr>
  <tr>
    <td> Total moves</td>
    <td>{singlePokemon.TotalMoves}</td>
  </tr>
  </tbody>
</table>

         </div>
         <div className='filter'>
      <select name="filter" className="selectFilter" onChange={this.changeSelect} value={this.state.front_default}>
           {uniqueArrTypes.map(i=>  <option key={i} value={i}>{i}</option>)}
</select>
<button className='buttonFilter' onClick={this.hendleFilter}>filter</button>
</div>
            
         </div>
    </div>
    </div>
    
  )
}
}
 

export default App;

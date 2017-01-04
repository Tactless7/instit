import React from 'react';
import Calcul from './Calcul'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCalcul: false,
      showConjugaison: false,
    }
    this.handleCalculClick = this.handleCalculClick.bind(this);
  };

  handleCalculClick(){
    this.setState({
      showCalcul: true,
    });
  }

  render() {
    return (
      <div id="content">
        <nav>
          <ul>
            <li><button onClick={this.handleCalculClick}> Calcul Mental </button></li>
            <li><button> Conjugaison </button></li>
          </ul>
        </nav>
        <div id="settings"> 
          {this.state.showCalcul ? <Calcul /> : null}
          {this.state.showConjugaison ? <Conjugaison /> : null}
        </div>
      </div>
    );
  }
}

// class Calcul extends React.Component {
//   render(){
//     return (
//       <form>
//         <label htmlFor="seriesNumber">Nombre de séries : <input name="seriesNumber" id="seriesNumber" type="number" /></label>
//         <label htmlFor="calculNumber">Séries de :<input name="calculNumber" id="calculNumber" type="number" /></label>
//         <span>Opérations : </span>
//         <label><input id="addition" value="addition" type="checkbox" />Addition</label>
//         <label><input id="substraction" value="substraction" type="checkbox" />Soustraction</label>
//         <button type="submit" id="generate">Lancer</button>
//       </form>
//     )
//   }
// }
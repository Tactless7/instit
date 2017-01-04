import React from 'react';
import Calcul from './Calcul';
import Conjugaison from './Conjugaison';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCalcul: false,
      showConjugaison: false,
    }

    this.calculClick = this.calculClick.bind(this);
    this.conjugaisonClick = this.conjugaisonClick.bind(this);
  };

  calculClick(){
    this.setState({
      showConjugaison: false,
      showCalcul: true,
    });
  }

  conjugaisonClick(){
    this.setState({
      showCalcul: false,
      showConjugaison: true,
    })
  }

  render() {
    return (
      <div id="content">
        <nav>
          <ul>
            <li><button onClick={this.calculClick}> Calcul Mental </button></li>
            <li><button onClick={this.conjugaisonClick}> Conjugaison </button></li>
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
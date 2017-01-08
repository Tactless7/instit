import React from 'react';

export default class Calcul extends React.Component {
  handleClickGenerate() {

  }

  render(){
    return (
      <form>
        <SeriesNumber />
        <CalculNumber />
        <span>Opérations : </span>
        <Addition />
        <Substraction />
        <button id="generate" onClick={this.handleClickGenerate}>Générer des séries</button>
      </form>
    )
  }
}

class SeriesNumber extends React.Component {
  constructor(props){
    super(props);
    this.state = {value: 0};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({value: event.target.value});
    console.log(this.state);
  }

  render(){
    return (
      <label htmlFor="seriesNumber">Nombre de séries : 
        <input name="seriesNumber" id="seriesNumber" type="number" value={this.state.value} onChange={this.handleChange} />
      </label>
    )
  }
}

class CalculNumber extends React.Component {
  constructor(props){
    super(props);
    this.state = {value: 0};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({value: event.target.value});
    console.log(this.state);
  }

  render(){
    return (
      <label htmlFor="calculNumber">Séries de :
        <input name="calculNumber" id="calculNumber" type="number" value={this.state.value} onChange={this.handleChange}/>
      </label>
    )
  }
}

class Addition extends React.Component {
  constructor(props){
    super();
    this.state = {checked: false};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    if(this.state.checked){
      this.setState({checked : false});
    } else {
      this.setState({checked: true});
    }
  }

  render(){
    return (
      <label><input id="addition" value="addition" type="checkbox" onChange={this.handleChange} />Addition</label>
    )
  }
}

class Substraction extends React.Component {
  render(){
    return (
      <label><input id="substraction" value="substraction" type="checkbox" />Soustraction</label>
    )
  }
}
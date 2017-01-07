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
  render(){
    return (
      <label htmlFor="seriesNumber">Nombre de séries : <input name="seriesNumber" id="seriesNumber" type="number" /></label>
    )
  }
}

class CalculNumber extends React.Component {
  render(){
    return (
      <label htmlFor="calculNumber">Séries de :<input name="calculNumber" id="calculNumber" type="number" /></label>
    )
  }
}

class Addition extends React.Component {
  render(){
    return (
      <label><input id="addition" value="addition" type="checkbox" />Addition</label>
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
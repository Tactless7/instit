import React from 'react';

export default class Calcul extends React.Component {
  render(){
    return (
      <form>
        <label htmlFor="seriesNumber">Nombre de séries : <input name="seriesNumber" id="seriesNumber" type="number" /></label>
        <label htmlFor="calculNumber">Séries de :<input name="calculNumber" id="calculNumber" type="number" /></label>
        <span>Opérations : </span>
        <label><input id="addition" value="addition" type="checkbox" />Addition</label>
        <label><input id="substraction" value="substraction" type="checkbox" />Soustraction</label>
        <button type="submit" id="generate">Lancer</button>
      </form>
    )
  }
}
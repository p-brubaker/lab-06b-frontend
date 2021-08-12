import { Component } from 'react';
import './App.css';

class App extends Component {

  state = { data: [] }

  fetchData = async function() {
    let url = 'https://serene-garden-03124.herokuapp.com/scientists';
    let response = await fetch(url);
    let data = await response.json();
    this.setState({data});
  }

  render() {

    return (
      <>
      <button onClick={() => this.fetchData()}>Get the Data!</button>
      <h1>Heres the Data:</h1>
      <p>{this.state.data.map((scientist) => {
        return (
          <div className="scientist-div">
          <h3>{scientist.name}</h3>
          <h3>Currently living: {scientist.living ? 'true' : 'false'}</h3>
          <h3>Specialty: {scientist.specialty}</h3>
          </div>
        );
      })}</p>
      </>
    )
  }
}

export default App;

import { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './Components/Header';
import List from './Components/List';
import Create from './Components/Create';
import Detail from './Components/Detail';
import './App.css';


class App extends Component {

  render() {

    return (
      <section className='app'>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path='/create' component={Create} />
            <Route path='/scientists/:id' component={Detail} />
            <Route path='/' component={List} />
          </Switch>
        </BrowserRouter>
      </section>

    )
  }
}

export default App;

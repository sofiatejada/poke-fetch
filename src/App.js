// import './App.css';
import Header from './Header';
import Footer from './Footer.js';
import Main from './Main.js';
import Home from './Home.js';
import PokeDetail from './PokeDetail.js';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />

        <Switch>

          <Route exact path="/" component={Home} />
          <Route exact path="/pokemon" component={Main} />
          <Route exact path="/pokemon/:pokeId" component={PokeDetail} />


        
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

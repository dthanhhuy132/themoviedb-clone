import 'swiper/swiper.min.css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './App.scss';

import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Catelog from './pages/Catelog';
import Detail from './pages/Detail';
import Home from './pages/Home';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App(props) {
  return (
    <div className="App">
      <BrowserRouter>
        <Header {...props}></Header>

        <Switch>
          <Route path="/:category/search/:keyword" component={Catelog}></Route>
          <Route path="/:category/:id" component={Detail}></Route>
          <Route path="/:category" component={Catelog}></Route>
          <Route path="/" component={Home}></Route>
        </Switch>

        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;

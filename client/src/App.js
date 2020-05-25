import React from 'react';
import AppNavbar from './components/AppNavbar'
import ShoppingList from './components/ShoppingList'
import ItemModal from './components/ItemModal'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Provider } from 'react-redux'
import store from './store'
import {Container} from 'reactstrap'

function App() {
  return (
    <Provider store={store} className="App">
      <div className="App">
        <AppNavbar />
        <Container>
        <ItemModal/>
        <ShoppingList />
        </Container>
      </div>
    </Provider>

  );
}

export default App;

import React, { useEffect } from 'react';
import AppNavbar from './components/AppNavbar'
import ShoppingList from './components/ShoppingList'
import ItemModal from './components/ItemModal'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Container } from 'reactstrap'
import { useDispatch } from "react-redux";
import allActions from './actions'
import Particle from './components/Particle'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(allActions.authActions.loadUser())
  }, [dispatch]);

  return (
      <div className="App">
        <AppNavbar />
        <Container className="contain">
          <ItemModal />
          <ShoppingList />
        </Container>
      <Particle/>
      </div>

  );
}

export default App;

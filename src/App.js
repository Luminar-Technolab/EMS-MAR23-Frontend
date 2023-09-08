import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Add from './pages/Add';
import Edit from './pages/Edit';
import View from './pages/View';
import Header from './components/Header';

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/add' element={<Add/>} />
        <Route path='/view/:id' element={<View/>} />
        <Route path='/edit/:id' element={<Edit/>} />

      </Routes>
    </div>
  );
}

export default App;

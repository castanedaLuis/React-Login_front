
import {BrowserRouter} from 'react-router-dom';
import { Routes ,Route } from 'react-router-dom';


import Login from '../pages/login';
import Home from '../pages/home';

function Routess() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<Login/>}/>
            <Route exact path='/home' element={<Home/>}/>
        </Routes>
  
    </BrowserRouter>
  );
}

export default Routess;

import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Sidebar from './Sidebar';

import Chat from './Chat';
import Login from './Login';
import { useStateValue } from './StateProvider';


function App() {

const [{user},dispatch]= useStateValue();

  return (
    <div className="App">

   
{!user ?(
 <Login></Login>

):(


<div className="app-body">

{/* sidebar */}
<Router>
<Sidebar></Sidebar>
<Switch>
<Route path="/rooms/:roomId">
<Chat/>
</Route>

<Route path="/">
 
 {/* <Chat/> */}
</Route>




</Switch>
</Router>

</div>
)}
    </div>
  );
}

export default App;

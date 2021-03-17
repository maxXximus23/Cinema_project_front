import React from 'react'
import 'bootstrap/dist/css/bootstrap.css' 
import 'react-slideshow-image/dist/styles.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import MainPage from './components/MainPage/MainPage'
import UserPage from './components/UserPage/UserPage'




function App(){
    return(
       <div className="App">
           <Router>
               <Route path="/mainpage" component={MainPage}/>
               <Route path="/userpage" component={UserPage}/>
               
           </Router>
           
       </div>
    )
}

export default App
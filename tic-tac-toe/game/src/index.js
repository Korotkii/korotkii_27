import React from 'react';
import ReactDom from 'react-dom';
import {AddGame} from './AddGame.js';  
import {Game_List} from './GameList';  
import {BrowserRouter as Router, Route} from "react-router-dom";
ReactDom.render((
    <Router>
        <Route exact path = "/" component = {Game_List} />
        <Route path = "/AddGame/:id" component = {AddGame} />

    </Router>), document.getElementById('root')); 







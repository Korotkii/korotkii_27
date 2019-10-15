import React from 'react';
import ReactDom from 'react-dom';

//----------------------------------------Blog----------------------------------------------------------

// import {BrowserRouter as Router, Route} from "react-router-dom";
// import Blog from './Blog/Blog.js';
// import Page from './Blog/page.js';
// import Page_created from './Blog/Page_created';
// import Update_page from './Blog/Update_page.js';
// ReactDom.render((
//     <Router>
//         <Route exact path="/" component={Blog}/>
//         <Route path="/page/:id" component={Page}/>  {/* :id  ----получить id при переходе на этот адрес  */}
//         <Route path="/page_created/" component={Page_created}/>
//         <Route path="/update_page/:id" component={Update_page}/>
// </Router>), document.getElementById('root'));


//--------------------------------------- Tic-tac-toe---------------------------------------------------

// ReactDom.render(<AddGame/>, document.getElementById('root')); // игра в крестики нолики

import {AddGame} from './AddGame.js';  // игра в крестики нолики
import {Game_List} from './GameList';  // список игр
import {BrowserRouter as Router, Route} from "react-router-dom";
ReactDom.render((
    <Router>
        <Route exact path = "/" component = {Game_List} />
        <Route path = "/AddGame/:id" component = {AddGame} />

    </Router>), document.getElementById('root'));  // список игр

//-----------------------------------------Note--------------------------------------------------------

// import {Note} from './CN_note.js';
// import{View} from './Notebook.js'
// ReactDom.render(<View/>, document.getElementById('root'));
// ReactDom.render(<Note/>, document.getElementById('root'));





import React from 'react';
import {Routes,Route,Navigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddComment from './components/AddComment'
import EditComment from './components/EditComment'
import CommentList from './components/CommentList'

function App() {

  return (

    <div  class="container card mb-4 box-shadow">

        <div class="card-header">
            <h4 class="my-0 font-weight-normal">TechGeekNext - React CRUD Example</h4>
        </div>

    <Routes>
        <Route path="/" element={<Navigate to="/read" />} />
        <Route exact path="/create" element={<AddComment/>}/>
        <Route exact path="/read" element={<CommentList/>}/>
        <Route path="/edit/:id" element={<EditComment/>}/>
    </Routes>

    </div>
  );
}

export default App;
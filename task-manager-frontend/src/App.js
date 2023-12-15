import React from "react";
import AddTask from "./AddTask";
import DisplayTasks from "./displayTasks"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<AddTask />} />
        <Route path="/displayTasks" element={<DisplayTasks />} />
      </Routes>
    </div>
  </Router>);
}

export default App;

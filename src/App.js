import './App.css';
import React, { Component } from 'react'
import Navbar from './Component/Navbar';
import News from './Component/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
 
export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
        <Navbar />
          <Routes>
            <Route exact path="/" element={<News pageSize={5} page={1} country="us"/>} />
            <Route exact path="/business" element={<News key="business" page={1} pageSize={5} country="us" category="business" />} />
            <Route exact path="/entertainment" element={<News key="entertainment" page={1} pageSize={5} country="us" category="entertainment" />} />
            <Route exact path="/general" element={<News key="general" page={1} pageSize={5} country="us" category="general" />} />
            <Route exact path="/health" element={<News key="health" page={1} pageSize={5} country="us" category="health" />} />
            <Route exact path="/science" element={<News key="science" page={1} pageSize={5} country="us" category="science" />} />
            <Route exact path="/sports" element={<News key="sports" page={1} pageSize={5} country="us" category="sports" />} />
            <Route exact path="/technology" element={<News key="technology" page={1} pageSize={5} country="us" category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
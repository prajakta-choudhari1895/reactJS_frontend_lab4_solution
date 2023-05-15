import React from 'react';
import './App.css';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import ShowList from './components/ShowList';
import ExpenseTracker from './components/ExpenseTracker';

function App() {
  return (
    <div className="App">
      {/* <h1>Expense tracker loading</h1> */}
      <Router>
        <Routes>
          <Route path='/home' element={<ExpenseTracker onTrue={()=>{}} onClose={()=>{}}/>}/>
          <Route path='/' element={<ShowList/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

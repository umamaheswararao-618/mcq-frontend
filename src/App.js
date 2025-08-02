import React from 'react';
import './App.css';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import CreateQuestion from './Components/Admin/CreateQuestion';
import AllQuestions from './Components/AllQuestions';
import UserQuiz from './Components/UserQuiz';
import ViewQuiz from './Components/ViewQuiz';
import Header from './Header';
import Paths from './Components/Paths';
import Sidebar from './Components/Sidebar';
import Footer from './Footer';
function App() {
  return (
    <div className="App ">
      <div className="Header">
        <Header />
      </div>
      <div className="Content-App">
        <div className="col-2 Sidebar">
          <Sidebar />
        </div>
        <div className="col-10 Main-Content">
          <Paths />
        </div>

      </div>
      <div className="Footer">
        <Footer />  
      </div>
    </div>
  );
}

export default App;

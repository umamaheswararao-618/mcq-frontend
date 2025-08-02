import React from 'react';
import './App.css';

import Header from './Header';
import Paths from './Components/Paths';
import Sidebar from './Components/Sidebar';
import Footer from './Footer';
import { AuthProvider } from './Components/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <div className="Content-App container-fluid">
          <div className="row h-100">
            <div className="col-md-3 Sidebar">
              <Sidebar />
            </div>
            <div className="col-md-9 Main-Content">
              <Paths />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
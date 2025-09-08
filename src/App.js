import React from 'react';
import './App.css';
import Stopwatch from './Stopwatch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>⏱️ ساعة التوقيف</h1>
      </header>
      <main>
        <Stopwatch />
      </main>
      <footer>
        <p>تم التطوير باستخدام React ⚛️</p>
      </footer>
    </div>
  );
}

export default App;
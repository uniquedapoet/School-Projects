import logo from './logo.svg';
import './App.css';
import CounterContainer from './components/CounterButton';
import ShoppingListApp from './components/ShoppingListApp'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ShoppingListApp />
      </header>
    </div>
  );
}

export default App;

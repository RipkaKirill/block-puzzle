import './App.css';
import Board from './components/board/board';
import Elements from './components/elements/elements';
import Score from './components/score/score';
import './normalize.css';
import { AppProvider } from './providers/app-provider';
import { BoardProvider } from './providers/board-provider';

function App() {
  return (
    <AppProvider>
      <BoardProvider>
        <div className='app'>
          <Score value={0} />
          <Board />
          <Elements />

          <div
            onClick={() => {
              localStorage.clear()
            }}
          >
            reset
          </div>
        </div>
      </BoardProvider>
    </AppProvider>
  )
}

export default App

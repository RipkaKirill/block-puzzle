import './App.css';
import Board from './components/board/board';
import Elements from './components/elements/elements';
import GameOverModal from './components/game-over-modal/game-over-modal';
import Score from './components/score/score';
import './normalize.css';
import { AppProvider } from './providers/app-provider';
import { BoardProvider } from './providers/board-provider';

function App() {
  return (
    <AppProvider>
      <BoardProvider>

        <div className='app'>
          <Score />
          <Board />
          <Elements />
        </div>

        <GameOverModal />
      </BoardProvider>
    </AppProvider>
  )
}

export default App

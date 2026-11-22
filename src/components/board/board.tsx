import { useDroppable } from '@dnd-kit/react';
import clsx from 'clsx';
import { useAppContext } from '../../providers/app-provider';
import { Cell } from '../../shared/types';
import Element from '../element/element';
import styles from './board.module.css';

const Board = () => {
  const { x, y, droppedElement, board, shadowBoard } = useAppContext()
  const { ref } = useDroppable({ id: 'board' });

  // console.log('shadowBoard', shadowBoard)

  return (
    <>
      <div ref={ref} className={styles.board}>
        {board.map((row: any, y: number) => <div key={'r' + y} className={styles.row}>
          {row.map((el: any, x: number) => <div key={'e' + x} className={clsx(
            styles.cell,
            { [styles.hover]: [Cell.HOVER, Cell.HOVER_REMOVE].includes(shadowBoard[y][x]) },
            { [styles.fill]: el === 1 },
            { [styles.remove]: shadowBoard[y][x] === 2 },
            { [styles.drop]: !!droppedElement }
          )}
          />)}
        </div>)}


        <div
          style={{ '--x': x, '--y': y } as any}
          className={styles.element}
        >
          {droppedElement && <Element {...droppedElement} />}
        </div>


      </div>

    </>
  );
}

export default Board
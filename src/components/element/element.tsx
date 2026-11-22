import { useDraggable } from '@dnd-kit/react';
import clsx from 'clsx';
import { memo, type FC } from 'react';
import { useAppContext } from '../../providers/app-provider';
import { DynamicLift } from '../../shared/helpers/dynamic-lift-modifier';
import { Cell, type IElementData } from '../../shared/types';
import styles from './element.module.css';

const Element: FC<IElementData> = ({ cell, id }) => {
  const { shadowBoard, x, y, selectedElement, droppedElement } = useAppContext()

  const { ref, handleRef, isDragging } = useDraggable({
    id: `element-${id}`,
    data: { cell, id },
    modifiers: [
      DynamicLift.configure({
        baseLift: 75,
        maxAdditionalLift: 150,
        responseDistance: 180,
      }),
    ],
  });

  const getIsRemoveCell = (cellValue: Cell, xx: number, yy: number) => {
    if (x === null || y === null) return false
    if (cellValue !== 1) return false
    if (selectedElement?.id !== id) return false

    return [Cell.HOVER_REMOVE, Cell.REMOVE].includes(shadowBoard?.[yy + y]?.[xx + x])
  }

  return (
    <>
      <div
        ref={ref}
        data-dragging={isDragging}
        className={clsx(styles.element)}
      >
        {cell.map((row, yy) => (
          <div key={`row-${row}-${yy}`} className={styles.row}>
            {
              row.map((el, xx) => (
                <div
                  key={`el-${id}-${xx}`}
                  className={clsx(
                    styles.cell,
                    { [styles.full]: el === 1 },
                    { [styles.remove]: getIsRemoveCell(el, xx, yy) },
                    { [styles.drop]: !!droppedElement }
                  )}
                />
              ))
            }
          </div>
        ))}

        <div ref={handleRef} className={styles.handle}></div>
      </div>
    </>
  );
}

export default memo(Element, (prev, next) => prev.id !== next.id)
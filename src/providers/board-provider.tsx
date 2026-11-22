import { Feedback } from '@dnd-kit/dom';
import { DragDropProvider, PointerSensor } from "@dnd-kit/react";
import type { FC, ReactNode } from "react";
import { useDndActions } from '../shared/hooks/use-dnd-actions';

export const BoardProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const actions = useDndActions()

  return <DragDropProvider
    sensors={(defaults) => [
      ...defaults.filter((sensor) => sensor !== PointerSensor),
      PointerSensor.configure({
        activationConstraints: () => undefined,
      }),
    ]}
    plugins={(defaults) => [
      ...defaults,
      Feedback.configure({
        dropAnimation: {
          duration: 0,
          easing: 'ease-out',
        },
      }),
    ]}
    {...actions}
  >
    {children}
  </DragDropProvider>
}
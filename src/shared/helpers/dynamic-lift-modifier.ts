import { Modifier, type DragDropManager } from '@dnd-kit/abstract';
import type { Coordinates } from '@dnd-kit/geometry';

type DynamicLiftOptions = {
  baseLift?: number;
  maxAdditionalLift?: number;
  responseDistance?: number;
};

export class DynamicLift extends Modifier {
  constructor(
    manager: DragDropManager<any, any>,
    options?: DynamicLiftOptions,
  ) {
    super(manager, options);
  }

  public apply(
    operation: Parameters<Modifier['apply']>[0],
  ): Coordinates {
    if (this.disabled) {
      return operation.transform;
    }

    const {
      baseLift = 50,
      maxAdditionalLift = 100,
      responseDistance = 180,
    } = this.options ?? {};

    const { transform } = operation;

    // Нас интересует только перемещение вверх
    const upwardDistance = Math.max(0, -transform.y);

    // Плавное увеличение расстояния
    const progress =
      1 - Math.exp(-upwardDistance / responseDistance);

    const additionalLift = maxAdditionalLift * progress;

    return {
      ...transform,
      y: transform.y - baseLift - additionalLift,
    };
  }
}
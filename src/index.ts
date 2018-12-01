import { Constructor as PointConstructorSource } from './Point';
import { Constructor as WorkoutConstructorSource } from './Workout';

import * as WORKOUT_TYPES from './workout-types';

export { default as Workout } from './Workout';
export { default as Point } from './Point';

export { WORKOUT_TYPES };

export declare namespace TYPES {
    export { PointConstructorSource as PointConstructor };
    export { WorkoutConstructorSource as WorkoutConstructor };
}

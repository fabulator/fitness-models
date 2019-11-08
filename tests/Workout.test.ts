import { DateTime, Duration } from 'luxon';
import { Workout } from '../src';

describe('Test Workout model', () => {
    const now = DateTime.local();
    const workout = new Workout({
        privacy: 1,
        start: now,
        duration: Duration.fromMillis(1000),
        typeId: 'run',
    });

    it('converts to object', () => {
        expect(workout.toObject()).toHaveProperty('privacy', 1);
    });

    it('is immutable', () => {
        expect(workout.toObject()).toHaveProperty('privacy', 1);
        const workout2 = workout.setPrivacy(2);
        expect(workout.getPrivacy()).toEqual(1);
        expect(workout2.getPrivacy()).toEqual(2);
    });
});

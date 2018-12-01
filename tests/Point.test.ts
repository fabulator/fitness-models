import { Point } from '../src';

describe('Test Point model', () => {
    it('converts to object', () => {
        const point = new Point({ hr: 5 });
        expect(point.toObject()).toHaveProperty('hr', 5);
    });

    it('clones object on set property', () => {
        const point = new Point({ hr: 5 });
        expect(point.getHeartRate()).toEqual(5);
        const point2 = point.setHeartRate(6);
        expect(point.getHeartRate()).toEqual(5);
        expect(point2.getHeartRate()).toEqual(6);
    });
});

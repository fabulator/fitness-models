import { Point } from '../src';

describe('Test Point model', () => {
    it('converts to object', () => {
        const point = new Point({ hr: 5 });
        expect(point.toObject()).toHaveProperty('hr', 5);
    });
});

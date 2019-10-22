import { GarminBuilder, buildGPX } from 'gpx-builder';
import Workout from './Workout';
import EndomondoPoint from './Point';

const {
    Point,
    Metadata,
    Track,
    Segment,
} = GarminBuilder.MODELS;

// @ts-ignore
function convertPoints(points: EndomondoPoint[]): Point[] {
    return points.map((point: EndomondoPoint) => {
        return point.toObject();
    }).map((point) => {
        const {
            altitude,
            cadence,
            hr,
            latitude,
            longitude,
            speed,
            time,
            temperature,
        } = point;

        if (!latitude || !longitude) {
            return null;
        }

        return new Point(latitude, longitude, {
            time: time ? time.toJSDate() : undefined,
            hr,
            cad: cadence,
            ele: altitude ? altitude.toNumber('m') : undefined,
            speed: speed ? speed.toNumber('m/s') : undefined,
            atemp: temperature ? temperature.toNumber('celsius') : undefined,
        });
    }).filter((item) => item !== null);
}

export default (workout: Workout): string => {
    const builder = new GarminBuilder();

    builder.setMetadata(new Metadata({
        time: workout.getStart().toJSDate(),
    }));

    builder.setTracks([
        new Track([new Segment(convertPoints(workout.getPoints()))], {
            type: workout.getTypeName(),
        }),
    ]);

    return buildGPX(builder.toObject());
};

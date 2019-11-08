import { buildGPX } from 'gpx-builder';
import Workout from './Workout';
import EndomondoPoint from './Point';

export default (workout: Workout): string => {
    return buildGPX({
        attributes: {
            'xsi:schemaLocation': 'http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2 http://www.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd',
            'xmlns:ns5': 'http://www.garmin.com/xmlschemas/ActivityGoals/v1',
            'xmlns:ns3': 'http://www.garmin.com/xmlschemas/ActivityExtension/v2',
            'xmlns:ns2': 'http://www.garmin.com/xmlschemas/UserProfile/v2',
            'xmlns': 'http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2',
            'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        },
        // @ts-ignore
        Activities: {
            Activity: {
                attributes: {
                    Sport: 'Biking',
                },
                Id: '2019-11-02T12:25:28Z',
                Lap: {
                    TotalTimeSeconds: 4125,
                    DistanceMeters: 22026,
                    Track: {
                        Trackpoint: {
                            Time: '2019-11-02T12:25:28Z',
                            Position: {
                                LatitudeDegrees: 50.0284650,
                                LongitudeDegrees: 50.0284650,
                            },
                            AltitudeMeters: 313,
                            DistanceMeters: 1,
                            HeartRateBpm: {
                                Value: 81,
                            },
                            Cadence: {
                                Value: 81,
                            },
                            Extensions: {
                                TPX: {
                                    attributes: {
                                        xmlns: 'http://www.garmin.com/xmlschemas/ActivityExtension/v2',
                                    },
                                    speed: 0,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
};

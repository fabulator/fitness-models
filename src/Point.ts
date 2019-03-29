import { DateTime, Duration } from 'luxon';
import { Unit } from 'mathjs';

export interface Constructor {
    time?: DateTime,
    latitude?: number,
    longitude?: number,
    hr?: number,
    cadence?: number,
    distance?: Unit,
    altitude?: Unit,
    duration?: Duration,
    speed?: Unit,
    temperature?: Unit,
}

export default class Point {
    protected time?: DateTime;

    protected latitude?: number;

    protected longitude?: number;

    protected distance?: Unit;

    protected duration?: Duration;

    protected speed?: Unit;

    protected hr?: number;

    protected cadence?: number;

    protected altitude?: Unit;

    protected temperature?: Unit;

    public constructor({
        time,
        latitude,
        longitude,
        distance,
        duration,
        speed,
        hr,
        cadence,
        altitude,
        temperature,
    }: Constructor) {
        this.time = time;
        this.latitude = latitude;
        this.longitude = longitude;
        this.distance = distance;
        this.duration = duration;
        this.speed = speed;
        this.hr = hr;
        this.cadence = cadence;
        this.altitude = altitude;
        this.temperature = temperature;
    }

    protected clone(extend: Partial<Constructor>): Point {
        return new Point({
            ...this.toObject(),
            ...extend,
        });
    }

    public getTime() {
        return this.time;
    }

    public getLatitude() {
        return this.latitude;
    }

    public getLongitude() {
        return this.longitude;
    }

    public getAltitude() {
        return this.altitude;
    }

    public getDistance() {
        return this.distance;
    }

    public getSpeed() {
        return this.speed;
    }

    public getHeartRate() {
        return this.hr;
    }

    public getCadence() {
        return this.cadence;
    }

    public getDuration() {
        return this.duration;
    }

    public getTemperature() {
        return this.temperature;
    }

    public setTime(time?: DateTime) {
        return this.clone({ time });
    }

    public setLatitude(latitude?: number) {
        return this.clone({ latitude });
    }

    public setLongitude(longitude?: number) {
        return this.clone({ longitude });
    }

    public setAltitude(altitude?: Unit) {
        return this.clone({ altitude });
    }

    public setDistance(distance?: Unit) {
        return this.clone({ distance });
    }

    public setSpeed(speed?: Unit) {
        return this.clone({ speed });
    }

    public setHeartRate(hr?: number) {
        return this.clone({ hr });
    }

    public setCadence(cadence?: number) {
        return this.clone({ cadence });
    }

    public setDuration(duration?: Duration) {
        return this.clone({ duration });
    }

    public setTemperature(temperature?: Unit) {
        return this.clone({ temperature });
    }

    public toObject(): Constructor {
        return {
            time: this.time,
            latitude: this.latitude,
            longitude: this.longitude,
            distance: this.distance,
            duration: this.duration,
            speed: this.speed,
            hr: this.hr,
            cadence: this.cadence,
            altitude: this.altitude,
            temperature: this.temperature,
        };
    }
}

import { DateTime, Duration } from 'luxon';
import { Unit } from 'mathjs';
import { WorkoutType } from './workout-types';
import SPORT_NAMES from './workout-type-names';
import * as PRIVACY from './workout-privacy';
import Point from './Point';
import workoutGPXExporter from './workoutGPXExporter';

export interface Constructor {
    start: DateTime,
    duration: Duration,
    typeId: WorkoutType | string | number,

    points?: Point[],
    distance?: Unit,
    ascent?: Unit,
    descent?: Unit,
    calories?: number,
    notes?: string,
    avgHeartRate?: number,
    maxHeartRate?: number,
    title?: string,
    hashtags?: string[],
    isRace?: boolean,
    isCommute?: boolean,
    privacy?: PRIVACY.Privacy,
    mapPrivacy?: PRIVACY.Privacy,
}

export default class Workout {
    protected start: DateTime;

    protected duration: Duration;

    protected typeId: WorkoutType | string | number;

    protected points: Point[];

    protected distance?: Unit;

    protected calories?: number;

    protected notes?: string;

    protected avgHeartRate?: number;

    protected maxHeartRate?: number;

    protected title?: string;

    protected ascent?: Unit;

    protected descent?: Unit;

    protected hashtags: string[];

    public isRace: boolean;

    public isCommute: boolean;

    protected privacy?: PRIVACY.Privacy;

    protected mapPrivacy?: PRIVACY.Privacy;

    public constructor({
        start,
        duration,
        typeId,
        distance,
        points,
        calories,
        notes,
        avgHeartRate,
        maxHeartRate,
        title,
        ascent,
        descent,
        isRace,
        isCommute,
        hashtags,
        privacy,
        mapPrivacy,
    }: Constructor) {
        this.start = start;
        this.duration = duration;
        this.typeId = typeId;
        this.distance = distance;
        this.points = points || [];
        this.calories = calories;
        this.notes = notes;
        this.avgHeartRate = avgHeartRate;
        this.maxHeartRate = maxHeartRate;
        this.title = title;
        this.ascent = ascent;
        this.descent = descent;
        this.hashtags = hashtags || [];
        this.isRace = isRace || false;
        this.isCommute = isCommute || false;
        this.privacy = privacy;
        this.mapPrivacy = mapPrivacy;
    }

    static PRIVACY = PRIVACY;

    protected clone(extend: Partial<Constructor>): Workout {
        return new Workout({
            ...this.toObject(),
            ...extend,
        });
    }

    public getTypeId() {
        return this.typeId;
    }

    public getTypeName(): string {
        // @ts-ignore
        return SPORT_NAMES[this.getTypeId()];
    }

    public getStart() {
        return this.start;
    }

    public getEnd(): DateTime {
        const points = this.getPoints();

        if (points.length > 0) {
            const latPointTime = points[points.length - 1].getTime();
            if (latPointTime) {
                return latPointTime;
            }
        }

        return this.getStart().plus(this.getDuration());
    }

    public getDuration() {
        return this.duration;
    }

    public getDistance() {
        return this.distance;
    }

    public getPoints() {
        return this.points;
    }

    public hasPoints(): boolean {
        return this.points.length > 0;
    }

    public hasGps(): boolean {
        return this.points.some((point) => point.getLatitude() != null && point.getLongitude() != null);
    }

    public getCalories() {
        return this.calories;
    }

    public getNotes() {
        return this.notes;
    }

    public getAvgHeartRate() {
        return this.avgHeartRate;
    }

    public getMaxHeartRate() {
        return this.maxHeartRate;
    }

    public getTitle() {
        return this.title;
    }

    public getAscent() {
        return this.ascent;
    }

    public getDescent() {
        return this.descent;
    }

    public getPrivacy() {
        return this.privacy;
    }

    public getMapPrivacy() {
        return this.mapPrivacy;
    }

    public getHashtags(): string[] {
        return this.hashtags;
    }

    public hasHashtag(hashtag: string): boolean {
        return this.hashtags.includes(hashtag);
    }

    public setHashtags(hashtags: string[]) {
        return this.clone({ hashtags });
    }

    public removeHashtag(hashtag: string) {
        return this.removeHashtags([hashtag]);
    }

    public removeHashtags(hashtags: string[]) {
        return this.clone({
            hashtags: hashtags.filter((hashtag) => hashtags.includes(hashtag)),
        });
    }

    public addHashtags(hashtags: string[]) {
        return this.clone({
            hashtags: [
                ...this.getHashtags(),
                ...hashtags,
            ],
        });
    }

    public addHashtag(hashtag: string) {
        return this.addHashtags([hashtag]);
    }

    public setTypeId(typeId: WorkoutType | string | number) {
        return this.clone({ typeId });
    }

    public setStart(start: DateTime) {
        return this.clone({ start });
    }

    public setDuration(duration: Duration) {
        return this.clone({ duration });
    }

    public setDistance(distance?: Unit) {
        return this.clone({ distance });
    }

    public setPoints(points: Point[]) {
        return this.clone({ points });
    }

    public setCalories(calories?: number) {
        return this.clone({ calories });
    }

    public setNotes(notes?: string) {
        return this.clone({ notes });
    }

    public setAvgHeartRate(avgHeartRate?: number) {
        return this.clone({ avgHeartRate });
    }

    public setMaxHeartRate(maxHeartRate?: number) {
        return this.clone({ maxHeartRate });
    }

    public setTitle(title?: string) {
        return this.clone({ title });
    }

    public setAscent(ascent?: Unit) {
        return this.clone({ ascent });
    }

    public setDescent(descent?: Unit) {
        return this.clone({ descent });
    }

    public setCommute(isCommute: boolean) {
        return this.clone({ isCommute });
    }

    public setRace(isRace: boolean) {
        return this.clone({ isRace });
    }

    public setPrivacy(privacy?: PRIVACY.Privacy) {
        return this.clone({ privacy });
    }

    public setMapPrivacy(privacy?: PRIVACY.Privacy) {
        return this.clone({ mapPrivacy: privacy });
    }

    public toObject(): Constructor {
        return {
            start: this.start,
            duration: this.duration,
            typeId: this.typeId,
            distance: this.distance,
            points: this.points,
            calories: this.calories,
            notes: this.notes,
            avgHeartRate: this.avgHeartRate,
            maxHeartRate: this.maxHeartRate,
            title: this.title,
            ascent: this.ascent,
            descent: this.descent,
            isRace: this.isRace,
            isCommute: this.isCommute,
            hashtags: this.hashtags,
            privacy: this.privacy,
            mapPrivacy: this.mapPrivacy,
        };
    }

    public toGpx(): string {
        return workoutGPXExporter(this);
    }

    public toString(): string {
        const distance = this.getDistance();

        return [
            'Workout',
            `type: ${this.getTypeName()}`,
            `start: ${this.getStart().toFormat('yyyy-MM-dd HH:mm')}`,
            distance ? `distance: ${Math.round(distance.toNumber('km') * 10) / 10}km` : null,
            `duration: ${Math.round(this.getDuration().as('minutes'))}min`,
        ].join('; ');
    }
}

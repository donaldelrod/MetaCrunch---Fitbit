import IntradayDataPoint from './IntradayDataPoint.js'

export default class HeartrateDataPoint extends IntradayDataPoint {

    bpm = null;
    confidence = null;

    constructor(date, data) {
        super(date, data, 'Heart rate');

        this.bpm = data.bpm;
        this.confidence = data.confidence;
    }

    makeInfluxDatapoint() {
        this.influxDatapoint = new Point(this.measurement)
            .intField('bpm', this.bpm)
            .intField('confidence', this.confidence)
            .tag('person', 'Donald')
            .tag('source', 'Fitbit Ionic')
            .timestamp(this.date);
    }
}
import { Point } from '@influxdata/influxdb-client'
import IntradayDataPoint from './IntradayDataPoint.js'

export default class StepDataPoint extends IntradayDataPoint {

    steps = null;

    constructor(date, data) {
        super(date, 'Steps');

        this.steps = data;
    }

    makeInfluxDatapoint() {
        this.influxDatapoint = new Point(this.measurement)
            .intField('steps', this.steps)
            .tag('person', 'Donald')
            .tag('source', 'Fitbit Ionic')
            .timestamp(this.date);
    }
}
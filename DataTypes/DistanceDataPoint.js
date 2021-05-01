import { Point } from '@influxdata/influxdb-client'
import IntradayDataPoint from './IntradayDataPoint.js'

export default class DistanceDataPoint extends IntradayDataPoint {

    distance = null;

    constructor(date, data) {
        super(date, 'Distance');

        this.amount = data.amount;
        this.unit = data.unit;
    }

    makeInfluxDatapoint() {
        this.influxDatapoint = new Point(this.measurement)
            .intField('amount', this.amount)
            .stringField('unit', this.unit)
            .tag('person', 'Donald')
            .tag('source', 'Fitbit Ionic')
            .timestamp(this.date);
    }
}
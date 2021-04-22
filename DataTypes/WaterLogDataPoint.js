import { Point } from '@influxdata/influxdb-client'
import IntradayDataPoint from './IntradayDataPoint.js'

export default class WaterLogDataPoint extends IntradayDataPoint {

    amount = null;
    unit = null;

    constructor(date, data) {
        super(date, data, 'Water Log');

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
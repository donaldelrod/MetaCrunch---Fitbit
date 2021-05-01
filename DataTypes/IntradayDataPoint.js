export default class IntradayDataPoint {

    date = null;
    influxDatapoint = null;
    measurement = null;

    constructor(date, measurement) {
        this.date = new Date(date);
        this.measurement = measurement;
    }

    makeInfluxDatapoint() {
        
    }
}
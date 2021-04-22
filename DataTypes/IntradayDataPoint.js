export default class IntradayDataPoint {

    date = null;
    iso = null;
    data = {};
    influxDatapoint = null;
    measurement = null;

    constructor(date, data, measurement) {
        this.date = new Date(date);
        this.iso = this.date.getTime();
        this.measurement = measurement;
        this.data = data;
    }

    makeInfluxDatapoint() {
        
    }
}
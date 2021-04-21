export default class IntradayDataPoint {

    date = null;
    iso = null;
    data = {};

    constructor(date, data) {
        this.date = new Date(date);
        this.iso = this.date.getTime();
        this.data = data;
    }
}
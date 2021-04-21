import fs from 'fs'
import IntradayDataPoint from './IntradayDataPoint.js'

class HeartrateDataPoint extends IntradayDataPoint {

    bpm = null;
    confidence = null;

    constructor(date, data) {
        super(date, data);

        this.bpm = data.bpm;
        this.confidence = data.confidence;
    }
}


export default class FileParser {

    datapath = 'Donald/';
    hr_data = [];
    sleep_data = [];

    constructor() {

    }

    processHeartrate() {
        let hr_path = './Donald/Heartrate/';

        // get a list of all the heart rate files
        let file_list = fs.readdirSync(hr_path);
        console.log('Number of files: ' + file_list.length)

        // go through all the files and parse them
        for (let file of file_list) {
            let data = fs.readFileSync(hr_path + file);
            let jsdata = JSON.parse(data);
            for (let datapoint of jsdata) {
                let dp = new HeartrateDataPoint(datapoint.dateTime, datapoint.value);
                this.hr_data.push(dp);
            }
        }
        
    }


}
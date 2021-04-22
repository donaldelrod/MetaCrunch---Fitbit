import fs from 'fs'
import HeartrateDataPoint from './DataTypes/HeartrateDataPoint.js'


export default class FileParser {

    datapath = './Donald/';

    constructor() {

    }

    async processHeartrate(db) {
        let hr_path = './Donald/Heartrate/';

        // get a list of all the heart rate files
        let file_list = fs.readdirSync(hr_path);
        console.log('Number of files: ' + file_list.length)
        let counter = 0;
        // go through all the files and parse them
        for (let file of file_list) {
            // read the heart rate file and parse the json
            let data = fs.readFileSync(hr_path + file);
            let jsdata = JSON.parse(data);

            // make a Point for each hr data point, and write it
            for (let datapoint of jsdata) {
                let dp = new HeartrateDataPoint(datapoint.dateTime, datapoint.value);
                dp.makeInfluxDatapoint();
                db.writePoint(dp.influxDatapoint);

                counter++;
                if (counter % 1000 == 0) {
                    await db.writePoints();
                    console.log(`finished writing point ${counter} to the db!`);
                }
            }
            await db.writePoints();
            console.log(`processed file ${file}`);
        }
    }
}
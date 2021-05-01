import fs from 'fs';
import HeartrateDataPoint from './DataTypes/HeartrateDataPoint.js';
import WaterLogDataPoint from './DataTypes/WaterLogDataPoint.js';
import StepDataPoint from './DataTypes/StepDataPoint.js';


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

    async processWaterLogs(db) {
        let wl_path = './Donald/Nutrition/';
        // get a list of all the water log files
        let file_list = fs.readdirSync(wl_path);
        console.log('Number of files: ' + file_list.length)
        let counter = 0;
        // go through all the files and parse them
        for (let file of file_list) {
            // read the heart rate file and parse the json
            let data = fs.readFileSync(wl_path + file);
            let jsdata = JSON.parse(data);

            // make a Point for each hr data point, and write it
            for (let datapoint of jsdata) {
                let dp = new WaterLogDataPoint(datapoint.date, 
                    { 
                        amount: datapoint.waterAmount,
                        unit:  datapoint.measurementUnit
                    } );
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

    async processSteps(db) {
        let step_path = './Donald/Steps/';
        // get a list of all the water log files
        let file_list = fs.readdirSync(step_path);
        console.log('Number of files: ' + file_list.length)
        let counter = 0;
        // go through all the files and parse them
        for (let file of file_list) {
            // read the heart rate file and parse the json
            let data = fs.readFileSync(step_path + file);
            let jsdata = JSON.parse(data);

            // make a Point for each hr data point, and write it
            for (let datapoint of jsdata) {
                let dp = new StepDataPoint(datapoint.dateTime, datapoint.value);
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
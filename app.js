import FileParser from './FileParser.js'
import InfluxInterface from './InfluxInterface.js'
import fs from 'fs'

const config = JSON.parse(fs.readFileSync('./config.json'));
const secrets= JSON.parse(fs.readFileSync('./secrets.json'));

let FP = new FileParser();
let II = new InfluxInterface(config.host, secrets.influxdb_token);

II.connect();


// await FP.processHeartrate(II);
// await FP.processWaterLogs(II);

II.close();
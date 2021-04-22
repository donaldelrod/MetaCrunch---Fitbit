import {InfluxDB, Point} from '@influxdata/influxdb-client'

const writeOptions = {
    /* the maximum points/line to send in a single batch to InfluxDB server */
    batchSize: 10000 + 1, // don't let automatically flush data
    /* maximum time in millis to keep points in an unflushed batch, 0 means don't periodically flush */
    flushInterval: 0,
    /* maximum size of the retry buffer - it contains items that could not be sent for the first time */
    maxBufferLines: 30000,
    /* the count of retries, the delays between retries follow an exponential backoff strategy if there is no Retry-After HTTP header */
    maxRetries: 3,
    /* maximum delay between retries in milliseconds */
    maxRetryDelay: 15000,
    /* minimum delay between retries in milliseconds */
    minRetryDelay: 1000, // minimum delay between retries
    /* a random value of up to retryJitter is added when scheduling next retry */
    retryJitter: 1000,
    // ... or you can customize what to do on write failures when using a writeFailed fn, see the API docs for details
    // writeFailed: function(error, lines, failedAttempts){/** return promise or void */},
}

export default class InfluxInterface {

    influx = null;
    token = 'dmjuBS2o2soVK2m4cJ0fa5rJv3Md5UTPh34NH4Xn6ngoTLHe97TH8bmXiORReHi_ZCIGTdBgWAhAZE7-pKgPSw==';
    host = 'localhost';
    config = {};
    writeApi = null;

    constructor(host, token) {

        this.host = host;
        this.token = token;
        // this.config = {
        //     host: host,
        //     username: user,
        //     password: pass,
        //     database: 'Fitbit',
        //     schema: [
        //         {
        //             measurement: 'heart rate',
        //             fields: { 
        //                 bpm: Influx.FieldType.INTEGER, 
        //                 confidence: Influx.FieldType.INTEGER 
        //             },
        //             tags: ['source', 'person']
        //         }
        //     ]
        // };

        

    }

    connect() {
        this.influx = new InfluxDB({url: this.host, token: this.token});
        this.writeApi = this.influx.getWriteApi('MetaCrunch', 'Fitbit', 's', writeOptions);
        console.log('connected to influxdb...');
    }

    async writePoints() {
        // console.log('flushing writeApi...');
        try {
            await this.writeApi.flush();
            // console.log('wrote 1000 points successfully!');
        } catch (err) {
            console.log(err);
        }
    }

    writePoint(point) {
        this.writeApi.writePoint(point);
        // console.log(`wrote point ${point}`);
    }

    close() {
        this.writeApi.close()
            .then(() => {
                console.log('closed connection to influxdb');
            })
            .catch(err => {
                console.log(err);
            })
    }
}



// let II = new InfluxInterface('donaldelrod', 's9yenaVE!', '192.168.1.3');
// II.connect();
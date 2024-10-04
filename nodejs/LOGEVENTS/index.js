const { v4: uuid } = require('uuid');
const { format } = require('date-fns');
const fs = require('fs').promises;
const path = require('path');

const logEvents = async (message) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${uuid()}\t${dateTime}\t${message}\n`;

    try {
        const logsFolder = path.join(__dirname, 'logs');
        
        if (!fs.existsSync(logsFolder)) {
            await fs.mkdir(logsFolder);
        }
        
        const filePath = path.join(logsFolder, 'eventLogs.txt');
        await fs.appendFile(filePath, logItem);
        console.log('Log written to file');
    } catch (err) {
        console.error(err);
    }
};

module.exports = logEvents;

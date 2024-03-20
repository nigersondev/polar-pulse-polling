const axios = require('axios');
const EventEmitter = require('eventemitter3');
const { debounce } = require('lodash.debounce');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

class PolarPulsePolling extends EventEmitter {
  constructor(url, interval = 10000) {
    super();
    this.url = url;
    this.interval = interval;
    this.pollingId = uuidv4();
    this.isPolling = false;
  }

  start() {
    if (this.isPolling) return;
    this.isPolling = true;
    this.emit('start', { pollingId: this.pollingId, startTime: moment().toISOString() });

    this.poll = debounce(async () => {
      try {
        const response = await axios.get(this.url);
        this.emit('data', response.data);
        if (this.isPolling) setTimeout(this.poll, this.interval);
      } catch (error) {
        this.emit('error', error);
        this.stop();
      }
    }, this.interval);

    this.poll();
  }

  stop() {
    this.isPolling = false;
    this.emit('stop', { pollingId: this.pollingId, stopTime: moment().toISOString() });
  }
}

module.exports = PolarPulsePolling;

# Polar Pulse Polling

Polar Pulse Polling is a lightweight JavaScript library for efficient polling of APIs or resources with customizable intervals. It uses a combination of popular libraries such as axios for requests, lodash for debouncing, and moment for time handling, providing a robust solution for your polling needs.

## Features

- Easy to use API for starting and stopping polling.
- Customizable polling intervals.
- Event-driven architecture with EventEmitter.
- Dependency on popular, well-maintained libraries.

## Installation

```bash
npm install polar-pulse-polling
```

## Usage

```javascript
const PolarPulsePolling = require('polar-pulse-polling');

const polling = new PolarPulsePolling('https://api.example.com/data', 5000);

polling.on('start', (info) => console.log(`Polling started with ID: \${info.pollingId}`));
polling.on('data', (data) => console.log(`Received data: `, data));
polling.on('error', (error) => console.error(`Polling error: `, error));
polling.on('stop', (info) => console.log(`Polling stopped with ID: \${info.pollingId}`));

polling.start();

// Stop polling after 30 seconds
setTimeout(() => {
polling.stop();
}, 30000);
```

## License

MIT

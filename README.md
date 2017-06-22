# ipheartbeat

Check your computer's public IP address repeatedly on a given interval and send a notification when the IP address has changed.

## Included notifiers

- Email
- Twitter DM

## How to

- Clone this repo
- Install dependencies `npm install`

### Running it directly

- Edit `config.js`
- Run `node index.js`

### Using it as a module

```
var ihb = require('./ipheartbeat');
ihb.config = {
    ... // same format as config.js
};
ihb.loadNotifiers();
ihb.run();
```

### Custom notifiers

- Create notifier in `/notifiers/<your_notifier>.js`
- Notifier module should export an object that has `notify(config, newIp)` function
- Add notifier config in `config.notifiers.<your_notifier>` to include it when `loadNotifiers()`

## License

MIT

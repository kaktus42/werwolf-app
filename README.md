# Werwolf Helfer

Ein kleines Tool / App, die kontaktloses spielleiten von Werwolf ermöglicht.

https://werwolf-berlin.de/app/

### Build Android App

- Install bubblewrap
- Set correct path to keystore in `twa-manifest.json`
- Run `bubblewrap update` to create app files
- Run `bubblewrap build` to build the apk

Somehow this assetlinks.json is needed to make the browser bar go away.
Doesn't work so far. Maybe it takes some time? Couldn't figure it out yet. Caching problem?

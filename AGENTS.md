# Local Android device installs

- Never install Play Store builds (`playRelease`, application ID ending in `.g`)
  on the user's local devices.
- Use the local release signing setup from `~/bin/bri`: `~/browser.keystore`
  with alias `browser`. Do not substitute the Play upload keystore from
  `~/.secrets/einkbro-keystore.properties`.
- Build the `release` variant and install the appropriate ABI APK with
  `adb -s <device-serial> install -r` to preserve existing app data.

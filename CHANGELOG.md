# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0-beta.12] - 2019-09-02
### Changed
- Push notification library to `react-native-push-notifications`.
  
### Fixed
- App crashing on first run caused by `react-native-notifications`.
- On cancel api request, raising an error because `cancelRequest` was not an arrow function.

## [1.0.0-beta.11] - 2019-09-01
### Added
- Added notifications if app is in background.
- Bugsnag native crash support.

### Removed
- Firebase's analytics and crashlytics. 

## [1.0.0-beta.10] - 2019-08-30
### Changed
- Try Catch around Progress (Encoding and Decoding).

## [1.0.0-beta.9] - 2019-08-30
### Added
- Padding to FAQ list.

### Changed
- Colours in about list to all blue.
- Loader to include optional overlay.

### Fixed
- Hide status bar during loading indicator on MainApp.

## [1.0.0-beta.8] - 2019-08-29
### Fixed
- Not asking permissions from user.

### Removed
- Timber for logging.
- Proguard to shrink app.

## [1.0.0-beta.7] - 2019-08-29
### Added
- Native crashing support for bugsnag.

### Fixed
- Fixed crashing problem.

## [1.0.0-alpha.3] - 2019-08-28
### Fixed
- Added BUGSNAG API in the `AndroidManifest.xml`.

## [1.0.0-beta.6] - 2019-08-27
### Fixed
- Photo album list not rendering.
- Image message page showing white background.
- Automatic theme button not working in `Themes.tsx`.

### Removed
- Logs from photo album list.

## [1.0.0-beta.5] - 2019-08-27
### Fixed
- Notch being ignore by app, makes the app look ugly in dark mode.

## [1.0.0-beta.4] - 2019-08-26
### Added
- Extra logging in `Progress.tsx` (for decoding).

### Fixed
- Photo album list not rendering.
- Image message page showing white background.
- Automatic theme button not working in `Themes.tsx`.
- If empty message sent to decoding, shouldn't show a message.
- Hide keyboard after submit button pressed(Encoding), removing weird half white screen.
- `checkNetworkStatus` if no network promise fails, added try catch.

### Removed
- Logs from photo album list.
- PrimaryColor reducer changed implementation to use view name instead to determine what colour should be used.

## [1.0.0-beta.3] - 2019-08-26
### Changed
- PhotoAlbumList componentDidMount function to mount differently.

## [1.0.0-beta.2] - 2019-08-26
### Added
- Timber and Bugsnag for extra error checking.

## [1.0.0-beta.1] - 2019-08-25
### Fixed
- Fixed missing app icons.

## [1.0.0-alpha.2] - 2019-08-24
### Added
- The AAB (Android App Bundle), to reduce app size.
- Extra logging to check why firebase is not working.

### Fixed
- Fixed missing app icons.

## [1.0.0-alpha.1] - 2019-08-24
### Added
- Encode and decode using LSB.
- Share save encoded images (as png files).
- Share encoded images with app to decode them.
- Initial Release.

[1.0.0-beta.12]: https://gitlab.com/stegappasaurus/stegappasaurus-app/-/tags/release%2F1.0.0-beta.12
[1.0.0-beta.11]: https://gitlab.com/stegappasaurus/stegappasaurus-app/-/tags/release%2F1.0.0-beta.11
[1.0.0-beta.10]: https://gitlab.com/stegappasaurus/stegappasaurus-app/-/tags/release%2F1.0.0-beta.10
[1.0.0-beta.9]: https://gitlab.com/stegappasaurus/stegappasaurus-app/-/tags/release%2F1.0.0-beta.9
[1.0.0-beta.8]: https://gitlab.com/stegappasaurus/stegappasaurus-app/-/tags/release%2F1.0.0-beta.8
[1.0.0-beta.7]: https://gitlab.com/stegappasaurus/stegappasaurus-app/-/tags/release%2F1.0.0-beta.7
[1.0.0-alpha.3]: https://gitlab.com/stegappasaurus/stegappasaurus-app/-/tags/release%2F1.0.0-alpha.3
[1.0.0-beta.6]: https://gitlab.com/stegappasaurus/stegappasaurus-app/-/tags/release%2F1.0.0-beta.6
[1.0.0-beta.5]: https://gitlab.com/stegappasaurus/stegappasaurus-app/-/tags/release%2F1.0.0-beta.5
[1.0.0-beta.4]: https://gitlab.com/stegappasaurus/stegappasaurus-app/-/tags/release%2F1.0.0-beta.4
[1.0.0-beta.3]: https://gitlab.com/stegappasaurus/stegappasaurus-app/-/tags/release%2F1.0.0-beta.3
[1.0.0-beta.2]: https://gitlab.com/stegappasaurus/stegappasaurus-app/-/tags/release%2F1.0.0-beta.2
[1.0.0-beta.1]: https://gitlab.com/stegappasaurus/stegappasaurus-app/-/tags/release%2F1.0.0-beta.1
[1.0.0-alpha.2]: https://gitlab.com/stegappasaurus/stegappasaurus-app/-/tags/release%2F1.0.0-alpha.2
[1.0.0-alpha.1]: https://gitlab.com/stegappasaurus/stegappasaurus-app/-/tags/release%2F1.0.0-alpha.1

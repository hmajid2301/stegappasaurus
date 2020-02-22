# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.2] - 2020-02-23
### Added
- Android play store badge to `README`.

### Changed
- App screenshots to be more modern.

### Fixed
- Check if `response.app` exists before `logShare` is called in `encoding/Progress.tsx`.


## [1.0.1] - 2020-02-01
### Added
- Bugsnag will track errors caused by BitmapModule.kt.

### Fixed
- Bugsnag not reporting errors.

### Removed
- Crashlytics only need one tool for error monitoring.

## [1.0.0] - 2020-01-31
### Added
- Encode and decode using LSB.
- Share save encoded images (as png files).
- Share encoded images with app to decode them.
- Initial Release.

[1.0.2]: https://gitlab.com/hmajid2301/stegappasaurus/compare/release%2F1.0.2...release%2F1.0.1
[1.0.1]: https://gitlab.com/hmajid2301/stegappasaurus/compare/release%2F1.0.1...release%2F1.0.0
[1.0.0]: https://gitlab.com/hmajid2301/stegappasaurus/-/tags/release%2F1.0.0

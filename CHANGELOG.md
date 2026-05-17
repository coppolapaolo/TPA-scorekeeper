# Changelog

All notable changes to TPA Scorekeeper are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - 2026-05-17

### Added
- **Break format selector** on the start screen: *Alternate Break*
  (default), *Winner Breaks*, *Loser Breaks*.
- **Next-break indicator**: a small, non-binding "break" badge on the
  player who should break the next rack according to the selected
  format. It never blocks free player switching and clears as soon as
  the new rack's break is played.
- **Match time summary**: total match duration plus per-game durations,
  shown only in the final match summary screen.
- 8-ball: after an opponent foul (no hit / cue ball pocketed) the
  incoming player can enter `0` then `G` to win the rack.
- Runout tracking: 3-category classification (no / yes / maybe) with a
  dedicated **"Runout?"** button for ambiguous cases.

### Fixed
- Runout detection redefined as full-table clearance in a single turn.
- 8-ball: foul indicator now shows `F` instead of `F1`/`F2` (the triple
  foul rule does not apply).
- 8-ball: M/K/S buttons now shown after a break with `totalPotted = 0`.
- 8-ball: `gameType` is converted to an integer in the `Match`
  constructor.

## [2.1.0] - 2026-01-03

### Changed
- Bug fixes and UI layout improvements.
- Updated the Accu-Stats TPA reference link to drdavepoolinfo.com.

## [2.0.0] - 2026-01-02

### Added
- 10-ball support on the home screen, with the UI adapting the number
  pad accordingly.
- Local match history, statistics, and settings views.
- TPA trend and error-analysis with advanced filters and a game-type
  filter in the statistics view.
- Match state persistence via localStorage (resume an in-progress
  match after a reload).
- Undo/redo navigation through turn history.
- Run Out, Break & Run, and Perfect Rack tracking, with achievement
  labels in the player section.
- Optional Google Sheets sync (opt-in; no default URL).
- About section with credits in Settings.

### Changed
- "Balls remaining" now alternates correctly between the two players.
- Default display settings hide BR/RO/PR achievements.

### Fixed
- Score display bug.
- Triple foul handling (issues #11, #13) and related fixes (#16).
- Foul badge not clearing and player selection in history mode.

## [1.0.0] - 2024-03-01

### Added
- Initial release: client-side TPA scorekeeper for 9-ball and 8-ball,
  with full TPA error notation, live scoring, and rack tracking.

[2.2.0]: https://github.com/coppolapaolo/TPA-scorekeeper/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/coppolapaolo/TPA-scorekeeper/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/coppolapaolo/TPA-scorekeeper/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/coppolapaolo/TPA-scorekeeper/releases/tag/v1.0.0

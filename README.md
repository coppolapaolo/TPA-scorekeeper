# TPA Scorekeeper

A web-based tool for tracking pool match scores using the Accu-Stats Total Performance Average (TPA) rating system. Supports **9-ball**, **8-ball**, and **10-ball** games.

Built with love for American pool by Paolo Coppola.

## Features

### Match Scoring
- **TPA Notation**: Full support for official TPA error notation (Miss, Kick, Safety, Position, Break errors)
- **Multi-game Support**: Track 9-ball, 8-ball, and 10-ball matches
- **Real-time Scoring**: Live TPA calculation, balls pocketed, errors, and racks won
- **Achievement Tracking**: Break & Run (BR), Run Out (RO), and Perfect Rack (PR) detection
- **Foul Counter**: Visual indicator for consecutive fouls (F1, F2)

### Statistics & History
- **Local Storage**: All matches saved locally using IndexedDB
- **TPA Trend Chart**: Track your performance over time
- **Error Analysis**: Breakdown by error type with trend visualization
- **Head-to-Head Records**: Compare performance against specific opponents
- **Match History**: Browse, filter, and review past matches with full turn-by-turn navigation

### Data Management
- **Google Sheets Integration**: Optionally save match results to a Google Sheet
- **Export/Import**: Backup and restore your match data
- **Player Memory**: Remembers player names between sessions

## Live Demo

Access the app at [https://www.coppolapaolo.it/tpa.html](https://www.coppolapaolo.it/tpa.html)

## System Requirements

The app runs entirely in the browser with no server required. Built with Bootstrap 5.3.2 and optimized for smartphones, but works on any modern browser with JavaScript enabled.

## How to Use

1. Enter player names and select the game type (9-ball, 8-ball, or 10-ball)
2. Click **Start** to begin the match
3. For each turn, enter:
   - Number of balls pocketed (for break shots: balls on break + total)
   - Any errors or fouls using the TPA notation buttons
4. Toggle between players using the player name buttons
5. Press **G** when the game ball is pocketed to end the rack
6. View statistics and match history from the navigation menu

## TPA Notation Reference

| Button | Meaning |
|--------|---------|
| M | Miss |
| K | Kick shot |
| S | Safety |
| P | Pocketed cue ball (foul) |
| N | No hit (foul) |
| n | Difficult miss (Mn) |
| x | Safety exchange |
| p | Push out |

## Learn More About TPA

The Total Performance Average system was developed by Accu-Stats Video Productions. Learn more at [Accu-Stats TPA Rating](https://billiards.colostate.edu/faq/rating/accu-stats-tpa/).

## License

TPA Scorekeeper is released under the AGPL license. See the license file for details.

## Contributing

Found a bug or have a suggestion? Open an issue on [GitHub](https://github.com/coppolapaolo/TPA-scorekeeper/issues).

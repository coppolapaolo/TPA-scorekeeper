# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TPA Scorekeeper is a single-page web app for tracking 9-ball, 8-ball, and 10-ball pool match scores using the Accu-Stats Total Performance Average (TPA) rating system. The app runs entirely client-side with no build process.

## Development

**Local Development**: Open `tpa.html` directly in a browser - no build or server required.

**Deployment**: Push to `master` triggers GitHub Actions workflow that FTP-deploys to `www/` on the configured server. Live at https://www.coppolapaolo.it/tpa.html

## Architecture

The entire application lives in `tpa.html` - a self-contained HTML file with embedded JavaScript and CSS.

### Core Classes (in `tpa.html`)

- **Match**: Root game state manager. Tracks players, racks, current turn, and aggregate scores. The `annotate()` method handles all button input processing.
- **Turn**: Represents a single player's turn within a rack. Tracks balls remaining, previous turn reference, and whether it's a break/winning turn. The `showButtons()` method determines valid UI buttons based on current turn state.
- **TPAAnnotation**: The TPA notation for a turn: balls potted (total + break), error types (M/K/S), fouls (P/N), and modifiers (n/x/p).
- **KickIn**: Represents kick-in sequences for tracking first-shot kicks after safeties.

### TPA Error Categories

The app tracks five distinct error types per TPA methodology:
- `missErrors`: Regular misses (1) or difficult shot misses (2 for Mn notation)
- `breakErrors`: Fouls on break shots
- `kickErrors`: Fouls on kick shots
- `safetyErrors`: Safety attempts that leave opponent an easy shot
- `positionError`: Position errors during run-outs

### Data Persistence

- **Cookies**: Player names persist for 60 days via `saveNames()`/`getCookie()`
- **Google Sheets**: Match results POST to Google Apps Script endpoint (`saveTPA.gs` contains the receiving script)

### Key State Machine Logic

Turn progression follows TPA rules strictly:
1. Ball count annotation (break shots require two inputs: break potted + total potted)
2. Error/action type (M/K/S buttons)
3. Foul type (P for pocketed cue ball, N for no hit)
4. Optional modifiers (n for difficult miss, x for safety exchange, p for push)

The `canSwitchPlayer()` method enforces when player toggle is legal based on TPA rules. The `updateScore()` method calculates all error attributions including retroactive safety errors.

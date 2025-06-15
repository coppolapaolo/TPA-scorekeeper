// ===== USER INTERFACE MANAGEMENT =====

/**
 * Update button visibility based on turn state
 * @param {Turn} turn - Current turn object
 */
function updateButtons(turn) {
    const buttonIDs = [];
    const buttonToShow = turn.showButtons();
    
    // Get all button children of scoreButtons
    const buttons = document.getElementById('scoreButtons').querySelectorAll('button');
    buttons.forEach(button => buttonIDs.push(button.id));
    
    // Show/hide buttons based on turn state
    buttonIDs.forEach(buttonID => {
        if (buttonToShow.includes(buttonID)) {
            document.getElementById(buttonID).style.display = 'block';
        } else {
            document.getElementById(buttonID).style.display = 'none';
        }
    });
    
    updateSwitchPlayerStatus();
    document.getElementById('endMatch').classList.remove('d-flex');
}

/**
 * Update labels and display for current turn
 * @param {Turn} turn - Current turn object
 */
function updateLabels(turn) {
    const playerLabel = turn.player === 1 ? 'whiteLabel1' : 'whiteLabel2';
    const grayLabel = turn.player === 1 ? 'grayLabel1' : 'grayLabel2';

    // Update circle border for game won
    document.getElementById(turn.player === 1 ? 'circle1' : 'circle2').style.border = turn.isWinning() ? "2px solid black" : "none";

    // Reset other player's labels
    if (turn.player === 1) {
        document.getElementById('whiteLabel2').textContent = '';
        document.getElementById('grayLabel2').textContent = '';
        document.getElementById('circle2').style.border = "none";
        document.getElementById('kicks').textContent = '';
    }

    // Build white label text
    let whiteLabelText = '';
    if (turn.tpaAnnotation.breakPotted) {
        whiteLabelText += `<sup>${turn.tpaAnnotation.breakPotted}</sup>`;
    }
    whiteLabelText += `${turn.tpaAnnotation.totalPotted !== null ? (turn.tpaAnnotation.totalPotted >= 0 ? turn.tpaAnnotation.totalPotted : '') : ''}`;
    whiteLabelText += ` ${turn.tpaAnnotation.mainNote()}`;

    document.getElementById(playerLabel).innerHTML = whiteLabelText;
    document.getElementById(grayLabel).textContent = turn.tpaAnnotation.secondaryNote();

    // Update kick sequence display
    if (turn.player === 1) {
        document.getElementById('kicks').innerHTML = kickSequence(turn.tpaAnnotation.kickSequence);
    } else {
        if (turn.previousTurn) {
            document.getElementById('kicks').innerHTML = kickSequence(turn.previousTurn.tpaAnnotation.kickSequence);
        }
        document.getElementById('kicks').innerHTML += kickSequence(turn.tpaAnnotation.kickSequence);
    }

    // Update warning badges for consecutive errors
    updateAllPlayerBadges(turn);
}

/**
 * Update player switch button status
 */
function updateSwitchPlayerStatus() {
    const radioButtons = document.querySelectorAll('#playersGroup input[type="radio"]');
    const labelsForRadioButtons = document.querySelectorAll('#playersGroup label');
    const canSwitch = match.canSwitchPlayer();

    // Enable or disable the radio buttons
    radioButtons.forEach(radio => {
        radio.disabled = !canSwitch;
        if (radio.id === `player${match.currentPlayer}Option`) {
            radio.checked = true;
        }
    });
        
    // Update label styles to reflect disabled state
    labelsForRadioButtons.forEach(label => {
        if (!canSwitch) {
            label.classList.add('disabled');
        } else {
            label.classList.remove('disabled');
        }
    });
}

/**
 * Generate HTML annotation for results display
 * @param {Turn} turn - Turn object to generate annotation for
 * @returns {string} HTML string for turn annotation
 */
function htmlDivAnnotation(turn) {
    let kickSequence = '&nbsp;';
    for (let i = 0; i < turn.tpaAnnotation.kickSequence.length; i++) {
        if (turn.tpaAnnotation.kickSequence[i].player === turn.player) {
            kickSequence += `<span class="circle-kick"><label class="col-1">${turn.tpaAnnotation.kickSequence[i].player}</label></span>`;
        }
    }
    
    let whiteLabelText = '';
    if (turn.tpaAnnotation.breakPotted) {
        whiteLabelText += `<sup>${turn.tpaAnnotation.breakPotted}</sup>`;
    }
    whiteLabelText += `${turn.tpaAnnotation.totalPotted !== null ? (turn.tpaAnnotation.totalPotted >= 0 ? turn.tpaAnnotation.totalPotted : '') : ''}`;
    whiteLabelText += ` ${turn.tpaAnnotation.mainNote()}`;
    
    let circleBorder = turn.isWinning() ? "2px solid black" : "none";
    
    return `<div class="mb-1">${kickSequence}</div>
            <div class="align-items-center">
                <div class="row">
                    <div class="d-flex justify-content-center">
                        <span class="circle" style="border: ${circleBorder}">
                            <label class="white-label d-flex">${whiteLabelText}</label>
                        </span>
                        <label class="border gray-label d-flex">${turn.tpaAnnotation.secondaryNote()}</label>
                    </div>
                </div>
            </div>`;
}

/**
 * Handle player toggle event
 * @param {Event} event - Click event on player label
 */
function togglePlayer(event) {
    // Find the actual label element (in case we clicked on a child span)
    let targetLabel = event.target;
    while (targetLabel && !targetLabel.id.startsWith('player')) {
        targetLabel = targetLabel.parentElement;
    }
    
    if (!targetLabel) return; // Safety check
    
    // Extract player number from ID (player1Label -> 1, player2Label -> 2)
    const clickedPlayerNumber = targetLabel.id === 'player1Label' ? 1 : 
                               targetLabel.id === 'player2Label' ? 2 : null;
    
    if (clickedPlayerNumber === null) return; // Invalid click
    
    // Only toggle if clicked player is different from current player
    if (clickedPlayerNumber !== match.currentPlayer) {
        match.togglePlayer();
        updateLabels(match.getTurn());
        updateButtons(match.getTurn());
        
        // Update score display
        document.getElementById('score').innerHTML = scoreToString(match.score);
        
        // Show/hide end match button based on break turn
        if (match.getTurn().isBreak()) {
            document.getElementById('endMatch').classList.add('d-flex');
        } else {
            document.getElementById('endMatch').classList.remove('d-flex');
        }
    }
}

/**
 * Handle reset current turn
 */
function resetCurrentTurn() {
    match.getTurn().tpaAnnotation.reset();
    match.getTurn().winningTurn = false;
    updateLabels(match.getTurn());
    updateButtons(match.getTurn());
}

/**
 * Load saved player names from cookies on page load
 */
function loadSavedPlayerNames() {
    var player1 = getCookie('player1');
    if (player1 != "") {
        document.getElementById('player1').value = player1;
    }

    var player2 = getCookie('player2');
    if (player2 != "") {
        document.getElementById('player2').value = player2;
    }
}
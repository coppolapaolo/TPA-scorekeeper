// ===== WARNING BADGES FOR CONSECUTIVE ERRORS =====

/**
 * Initialize player buttons with badge support structure
 * Replaces simple text content with structured HTML for badges
 */
function initializePlayerButtons() {
    const player1Label = document.getElementById('player1Label');
    const player2Label = document.getElementById('player2Label');
    
    [player1Label, player2Label].forEach((label, index) => {
        const playerNumber = index + 1;
        const playerName = match.players[index].name;
        
        label.innerHTML = `
            <span class="player-name">${playerName}</span>
            <span class="warning-badges" id="warningBadges${playerNumber}"></span>
        `;
    });
}

/**
 * Update warning badges based on consecutive errors
 * @param {Turn} turn - Current turn object
 */
function updateWarningBadges(turn) {
    const playerNumber = turn.player;
    const consecutiveErrors = turn.consecutiveErrors || 0;
    const badgesContainer = document.getElementById(`warningBadges${playerNumber}`);
    
    if (!badgesContainer) return; // Safety check
    
    // Clear existing badges
    badgesContainer.innerHTML = '';
    
    // Add appropriate warning badges based on consecutive errors
    if (consecutiveErrors === 1) {
        badgesContainer.innerHTML = '<span class="warning-badge error-1">⚠️</span>';
    } else if (consecutiveErrors === 2) {
        badgesContainer.innerHTML = '<span class="warning-badge error-2">⚠️</span><span class="warning-badge error-2">⚠️</span>';
    }
    // Note: 3+ errors result in automatic game end, so no badges needed
}

/**
 * Clear all warning badges for both players
 * Useful when starting new games or resetting state
 */
function clearAllWarningBadges() {
    [1, 2].forEach(playerNumber => {
        const badgesContainer = document.getElementById(`warningBadges${playerNumber}`);
        if (badgesContainer) {
            badgesContainer.innerHTML = '';
        }
    });
}

/**
 * Clear warning badges for a specific player
 * @param {number} playerNumber - Player number (1 or 2)
 */
function clearPlayerWarningBadges(playerNumber) {
    const badgesContainer = document.getElementById(`warningBadges${playerNumber}`);
    if (badgesContainer) {
        badgesContainer.innerHTML = '';
    }
}

/**
 * Update badges for both players, clearing inactive player badges
 * @param {Turn} turn - Current turn object
 */
function updateAllPlayerBadges(turn) {
    // Update current player badges
    updateWarningBadges(turn);
    
    // Clear other player's badges when current player starts fresh
    const otherPlayer = turn.player === 1 ? 2 : 1;
    if (turn.consecutiveErrors === 0) {
        clearPlayerWarningBadges(otherPlayer);
    }
}
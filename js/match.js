// ===== MATCH PAGE LOGIC =====

/**
 * Match state management
 */
const MatchState = {
    // Player info
    player1Name: '',
    player2Name: '',
    gameType: '',
    startDate: '',
    
    // Current state
    currentPlayer: 1, // 1 or 2
    
    // Player box states: { topNumber: null, bottomNumber: null }
    playerBoxes: {
        1: { topNumber: null, bottomNumber: null },
        2: { topNumber: null, bottomNumber: null }
    },
    
    /**
     * Initialize match state from parameters
     */
    initialize: function(params) {
        this.player1Name = params.player1Name;
        this.player2Name = params.player2Name;
        this.gameType = params.gameType;
        this.startDate = params.startDate;
        this.currentPlayer = 1;
        
        // Reset player boxes
        this.playerBoxes[1] = { topNumber: null, bottomNumber: null };
        this.playerBoxes[2] = { topNumber: null, bottomNumber: null };
        
        console.log('Match state initialized:', this);
    },
    
    /**
     * Save current state to localStorage
     */
    save: function() {
        const state = {
            player1Name: this.player1Name,
            player2Name: this.player2Name,
            gameType: this.gameType,
            startDate: this.startDate,
            currentPlayer: this.currentPlayer,
            playerBoxes: JSON.parse(JSON.stringify(this.playerBoxes))
        };
        saveMatchState(state);
    },
    
    /**
     * Load state from localStorage
     */
    load: function() {
        const state = loadMatchState();
        if (state) {
            Object.assign(this, state);
            console.log('Match state loaded:', this);
            return true;
        }
        return false;
    }
};

/**
 * Initialize match page
 */
function initializeMatch() {
    console.log('TPA Scorekeeper - Match page initialized');
    
    // Load match parameters
    const params = loadMatchParams();
    if (!params) {
        console.error('No match parameters found, redirecting to login');
        goToLogin();
        return;
    }
    
    // Initialize match state
    MatchState.initialize(params);
    
    // Set up UI
    setupMatchUI();
    
    // Set up event listeners
    setupMatchEventListeners();
    
    console.log('Match initialized successfully');
}

/**
 * Set up match UI elements
 */
function setupMatchUI() {
    // Set title with date and game type
    const title = `${MatchState.startDate} - ${getGameTypeDisplayName(MatchState.gameType)}`;
    document.getElementById('dateTitle').textContent = title;
    
    // Set player names in buttons
    document.getElementById('player1Label').textContent = MatchState.player1Name;
    document.getElementById('player2Label').textContent = MatchState.player2Name;
    
    // Initialize active player
    setActivePlayer(MatchState.currentPlayer);
    
    console.log('Match UI set up');
}

/**
 * Set up event listeners for match interface
 */
function setupMatchEventListeners() {
    // Check if already initialized to prevent double listeners
    if (window.matchListenersInitialized) {
        console.log('Match event listeners already set up - skipping');
        return;
    }
    
    // Player toggle listeners
    const playersGroup = document.getElementById('playersGroup');
    if (playersGroup) {
        playersGroup.addEventListener('click', handlePlayerToggle);
    }
    
    // Number button listeners
    const numberButtons = document.querySelectorAll('#scoreButtons button[id^="button"]');
    numberButtons.forEach(button => {
        const buttonId = button.id;
        if (buttonId.match(/^button\d+$/)) { // Only number buttons (button0, button1, etc.)
            const number = parseInt(buttonId.replace('button', ''));
            button.addEventListener('click', () => handleNumberClick(number));
        }
    });
    
    // Reset box listeners (click on circles to reset)
    document.getElementById('circle1')?.addEventListener('click', () => resetPlayerBox(1));
    document.getElementById('circle2')?.addEventListener('click', () => resetPlayerBox(2));
    
    // Mark as initialized
    window.matchListenersInitialized = true;
    
    console.log('Match event listeners set up');
}

/**
 * Handle player toggle button clicks
 */
function handlePlayerToggle(event) {
    if (event.target.id === 'player1Label' || event.target.id === 'player1Option') {
        setActivePlayer(1);
    } else if (event.target.id === 'player2Label' || event.target.id === 'player2Option') {
        setActivePlayer(2);
    }
}

/**
 * Set active player
 * @param {number} playerNumber - Player number (1 or 2)
 */
function setActivePlayer(playerNumber) {
    MatchState.currentPlayer = playerNumber;
    
    // Update radio buttons
    document.getElementById('player1Option').checked = (playerNumber === 1);
    document.getElementById('player2Option').checked = (playerNumber === 2);
    
    // Save state
    MatchState.save();
    
    console.log(`Active player: ${playerNumber} (${playerNumber === 1 ? MatchState.player1Name : MatchState.player2Name})`);
}

/**
 * Handle number button clicks - UPDATED WITH SIMPLIFIED LOGIC
 * @param {number} number - Number clicked (0-10)
 */
function handleNumberClick(number) {
    console.log(`=== CLICK DEBUG: Button ${number} clicked ===`);
    
    const playerBox = MatchState.playerBoxes[MatchState.currentPlayer];
    console.log(`Before: Player ${MatchState.currentPlayer} box:`, JSON.stringify(playerBox));
    
    // Simplified logic: fill top first, then bottom, then stop
    if (playerBox.topNumber === null) {
        // First position: goes to top (superscript)
        playerBox.topNumber = number;
        console.log(`Set topNumber to ${number}`);
    } else if (playerBox.bottomNumber === null) {
        // Second position: goes to bottom (normal)
        playerBox.bottomNumber = number;
        console.log(`Set bottomNumber to ${number}`);
    } else {
        // Both positions filled: do nothing
        console.log(`Player ${MatchState.currentPlayer} box is full - click ignored`);
        return; // Exit early, no updates needed
    }
    
    console.log(`After: Player ${MatchState.currentPlayer} box:`, JSON.stringify(playerBox));
    
    // Update display
    updatePlayerDisplay(MatchState.currentPlayer);
    
    // Save state
    MatchState.save();
    
    console.log(`=== END CLICK DEBUG ===`);
}

/**
 * Update player display box
 * @param {number} playerNumber - Player number (1 or 2)
 */
function updatePlayerDisplay(playerNumber) {
    const playerBox = MatchState.playerBoxes[playerNumber];
    const whiteLabel = document.getElementById(`whiteLabel${playerNumber}`);
    
    if (!whiteLabel) return;
    
    let displayText = '';
    
    // Build display text - superscript only, no repetition
    if (playerBox.topNumber !== null) {
        displayText += `<sup>${playerBox.topNumber}</sup>`;
    }
    
    if (playerBox.bottomNumber !== null) {
        displayText += playerBox.bottomNumber;
    }
    
    whiteLabel.innerHTML = displayText;
    
    console.log(`Updated player ${playerNumber} display:`, displayText);
}

/**
 * Reset player box
 * @param {number} playerNumber - Player number (1 or 2)
 */
function resetPlayerBox(playerNumber) {
    MatchState.playerBoxes[playerNumber] = { topNumber: null, bottomNumber: null };
    updatePlayerDisplay(playerNumber);
    MatchState.save();
    
    console.log(`Player ${playerNumber} box reset`);
}

/**
 * Go back to login page
 */
function goBackToLogin() {
    // Clear match state
    clearMatchState();
    clearMatchParams();
    
    // Navigate to login
    goToLogin();
}

// ===== AUTO-INITIALIZATION =====

/**
 * Initialize when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if we're on the match page
    if (document.getElementById('main')) {
        initializeMatch();
    }
});

/**
 * Initialize when window loads (fallback)
 */
window.addEventListener('load', function() {
    // Only initialize if we're on the match page
    if (document.getElementById('main')) {
        initializeMatch();
    }
});
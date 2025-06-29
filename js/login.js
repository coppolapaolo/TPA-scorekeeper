// ===== LOGIN PAGE LOGIC =====

/**
 * Initialize login page
 */
function initializeLogin() {
    console.log('TPA Scorekeeper - Login page initialized');
    
    // Load saved player names from cookies
    loadSavedPlayerNames();
    
    // Set up event listeners
    setupLoginEventListeners();
    
    // Clear any previous match state
    clearMatchState();
}

/**
 * Load saved player names from cookies
 */
function loadSavedPlayerNames() {
    const player1 = getCookie('player1');
    const player2 = getCookie('player2');
    
    if (player1) {
        document.getElementById('player1').value = player1;
    }
    
    if (player2) {
        document.getElementById('player2').value = player2;
    }
    
    console.log('Loaded saved names:', { player1, player2 });
}

/**
 * Set up event listeners for login form
 */
function setupLoginEventListeners() {
    // Save names on input change
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');
    
    if (player1Input) {
        player1Input.addEventListener('change', savePlayerNames);
        player1Input.addEventListener('input', savePlayerNames);
    }
    
    if (player2Input) {
        player2Input.addEventListener('change', savePlayerNames);
        player2Input.addEventListener('input', savePlayerNames);
    }
    
    // Start button handler
    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.addEventListener('click', handleStartMatch);
    }
    
    console.log('Login event listeners set up');
}

/**
 * Handle start match button click
 */
function handleStartMatch() {
    console.log('Start match button clicked');
    
    // Get form values
    const player1Name = document.getElementById('player1').value.trim() || 'Player 1';
    const player2Name = document.getElementById('player2').value.trim() || 'Player 2';
    const gameType = document.querySelector('input[name="gameType"]:checked').value;
    
    // Validate inputs
    if (!player1Name || !player2Name) {
        alert('Please enter names for both players');
        return;
    }
    
    // Save to cookies
    savePlayerNames();
    
    // Create match parameters
    const matchParams = {
        player1Name,
        player2Name,
        gameType,
        startDate: formatDateTime(new Date()),
        timestamp: Date.now()
    };
    
    // Save parameters to localStorage
    saveMatchParams(matchParams);
    
    console.log('Starting match with params:', matchParams);
    
    // Navigate to match page
    goToMatch();
}

/**
 * Validate form inputs
 * @returns {boolean} True if form is valid
 */
function validateLoginForm() {
    const player1 = document.getElementById('player1').value.trim();
    const player2 = document.getElementById('player2').value.trim();
    const gameType = document.querySelector('input[name="gameType"]:checked');
    
    if (!player1 || !player2) {
        return false;
    }
    
    if (!gameType) {
        return false;
    }
    
    return true;
}

/**
 * Enable/disable start button based on form validity
 */
function updateStartButtonState() {
    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.disabled = !validateLoginForm();
    }
}

// ===== AUTO-INITIALIZATION =====

/**
 * Initialize when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if we're on the login page
    if (document.getElementById('playerForm')) {
        initializeLogin();
    }
});

/**
 * Initialize when window loads (fallback)
 */
window.addEventListener('load', function() {
    // Only initialize if we're on the login page
    if (document.getElementById('playerForm')) {
        initializeLogin();
    }
});
// ===== UTILITY FUNCTIONS =====

/**
 * Get cookie value by name
 * @param {string} cname - Cookie name
 * @returns {string} Cookie value or empty string
 */
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/**
 * Save player names to cookies
 */
function savePlayerNames() {
    var player1 = document.getElementById('player1')?.value || '';
    var player2 = document.getElementById('player2')?.value || '';
    var d = new Date();
    d.setTime(d.getTime() + (60 * 60 * 24 * 60 * 1000)); // Two months
    var expires = "expires=" + d.toUTCString();

    document.cookie = "player1=" + player1 + ";" + expires + ";path=/";
    document.cookie = "player2=" + player2 + ";" + expires + ";path=/";
}

/**
 * Format date and time for display
 * @param {Date} date - Date object to format
 * @returns {string} Formatted date string
 */
function formatDateTime(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}

// ===== LOCAL STORAGE MANAGEMENT =====

/**
 * Save match parameters to localStorage
 * @param {Object} params - Match parameters
 */
function saveMatchParams(params) {
    try {
        localStorage.setItem('tpa_match_params', JSON.stringify(params));
        console.log('Match params saved:', params);
    } catch (error) {
        console.error('Failed to save match params:', error);
    }
}

/**
 * Load match parameters from localStorage
 * @returns {Object|null} Match parameters or null if not found
 */
function loadMatchParams() {
    try {
        const params = localStorage.getItem('tpa_match_params');
        return params ? JSON.parse(params) : null;
    } catch (error) {
        console.error('Failed to load match params:', error);
        return null;
    }
}

/**
 * Clear match parameters from localStorage
 */
function clearMatchParams() {
    try {
        localStorage.removeItem('tpa_match_params');
        console.log('Match params cleared');
    } catch (error) {
        console.error('Failed to clear match params:', error);
    }
}

/**
 * Save match state to localStorage
 * @param {Object} state - Current match state
 */
function saveMatchState(state) {
    try {
        localStorage.setItem('tpa_match_state', JSON.stringify(state));
    } catch (error) {
        console.error('Failed to save match state:', error);
    }
}

/**
 * Load match state from localStorage
 * @returns {Object|null} Match state or null if not found
 */
function loadMatchState() {
    try {
        const state = localStorage.getItem('tpa_match_state');
        return state ? JSON.parse(state) : null;
    } catch (error) {
        console.error('Failed to load match state:', error);
        return null;
    }
}

/**
 * Clear match state from localStorage
 */
function clearMatchState() {
    try {
        localStorage.removeItem('tpa_match_state');
    } catch (error) {
        console.error('Failed to clear match state:', error);
    }
}

// ===== NAVIGATION UTILITIES =====

/**
 * Navigate to login page
 */
function goToLogin() {
    window.location.href = 'login.html';
}

/**
 * Navigate to match page
 */
function goToMatch() {
    window.location.href = 'match.html';
}

/**
 * Get game type display name
 * @param {string} gameType - Game type ('8', '9', '10')
 * @returns {string} Display name
 */
function getGameTypeDisplayName(gameType) {
    const gameTypeNames = {
        '8': '8-ball',
        '9': '9-ball', 
        '10': '10-ball'
    };
    return gameTypeNames[gameType] || 'Unknown';
}
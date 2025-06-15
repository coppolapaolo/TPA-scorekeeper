// ===== APPLICATION INITIALIZATION AND COORDINATION =====

/**
 * Initialize the application when the page loads
 */
window.onload = function() {
    // Load saved player names from cookies
    loadSavedPlayerNames();
};

/**
 * Set up event listeners when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
    // Player selection event listener
    const playersGroup = document.getElementById('playersGroup');
    if (playersGroup) {
        playersGroup.addEventListener('click', togglePlayer);
    }

    // Reset turn event listener
    const divPlayers = document.getElementById('divPlayers');
    if (divPlayers) {
        divPlayers.addEventListener('click', resetCurrentTurn);
    }

    // Form input change listeners for saving names
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');
    
    if (player1Input) {
        player1Input.addEventListener('change', saveNames);
    }
    
    if (player2Input) {
        player2Input.addEventListener('change', saveNames);
    }
});

/**
 * Global functions that need to be accessible from HTML
 * These are attached to window object for compatibility with existing HTML
 */

// Make functions globally accessible for HTML onclick handlers
window.startMatch = startMatch;
window.endMatch = endMatch;
window.saveNames = saveNames;

/**
 * Application state management
 */
const AppState = {
    currentMatch: null,
    
    /**
     * Reset application state
     */
    reset: function() {
        this.currentMatch = null;
        clearAllWarningBadges();
    },
    
    /**
     * Get current match
     * @returns {Match|null} Current match or null
     */
    getCurrentMatch: function() {
        return this.currentMatch;
    },
    
    /**
     * Set current match
     * @param {Match} match - Match object to set as current
     */
    setCurrentMatch: function(match) {
        this.currentMatch = match;
    }
};

/**
 * Error handling and logging
 */
const ErrorHandler = {
    /**
     * Log error to console with context
     * @param {string} context - Context where error occurred
     * @param {Error} error - Error object
     */
    logError: function(context, error) {
        console.error(`[TPA Scorekeeper Error - ${context}]:`, error);
    },
    
    /**
     * Handle UI errors gracefully
     * @param {string} message - User-friendly error message
     */
    showUserError: function(message) {
        alert(`Error: ${message}`);
    }
};

/**
 * Development helpers (only in development mode)
 */
const DevHelpers = {
    /**
     * Check if running in development mode
     * @returns {boolean} True if in development
     */
    isDevelopment: function() {
        return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    },
    
    /**
     * Log debug information (only in development)
     * @param {string} message - Debug message
     * @param {*} data - Additional data to log
     */
    debug: function(message, data = null) {
        if (this.isDevelopment()) {
            console.log(`[TPA Debug]: ${message}`, data || '');
        }
    },
    
    /**
     * Expose match object for debugging
     * @returns {Match|null} Current match object
     */
    getMatch: function() {
        return match;
    }
};

// Expose dev helpers globally in development
if (DevHelpers.isDevelopment()) {
    window.TPA_DEBUG = DevHelpers;
    console.log('TPA Scorekeeper - Development mode enabled');
    console.log('Use TPA_DEBUG.getMatch() to inspect current match');
}

/**
 * Application lifecycle management
 */
const AppLifecycle = {
    /**
     * Initialize application
     */
    init: function() {
        DevHelpers.debug('Application initializing...');
        
        try {
            // Any additional initialization logic can go here
            DevHelpers.debug('Application initialized successfully');
        } catch (error) {
            ErrorHandler.logError('Application Initialization', error);
            ErrorHandler.showUserError('Failed to initialize application');
        }
    },
    
    /**
     * Clean up when leaving page
     */
    cleanup: function() {
        DevHelpers.debug('Application cleanup...');
        AppState.reset();
    }
};

// Initialize app when this script loads
AppLifecycle.init();

// Clean up on page unload
window.addEventListener('beforeunload', AppLifecycle.cleanup);
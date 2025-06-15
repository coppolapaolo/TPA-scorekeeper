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
function saveNames() {
    var player1 = document.getElementById('player1').value;
    var player2 = document.getElementById('player2').value;
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

/**
 * Calculate total errors for a player
 * @param {Object} player - Player score object
 * @returns {number} Total errors
 */
function totalErrors(player) {
    return player.missErrors + player.breakErrors + player.kickErrors + player.safetyErrors + player.positionError;
}

/**
 * Calculate TPA score for a player
 * @param {Object} player - Player score object
 * @returns {number} TPA score (0-1000)
 */
function tpaScore(player) {
    return Math.trunc(player.ballsPotted/(player.ballsPotted+totalErrors(player))*1000);
}

/**
 * Convert score to display string
 * @param {Object} score - Match score object
 * @returns {string} Formatted score string
 */
function scoreToString(score) {
    return `<small>(${score.player1.ballsPotted},${totalErrors(score.player1)},${tpaScore(score.player1)}) <strong>${score.player1.racksWon} - ${score.player2.racksWon}</strong> (${score.player2.ballsPotted},${totalErrors(score.player2)},${tpaScore(score.player2)})</small>`;
}

/**
 * Generate kick sequence HTML
 * @param {Array} kickIn - Array of KickIn objects
 * @returns {string} HTML string for kick sequence
 */
function kickSequence(kickIn) {
    let kickSequence = '';
    for (let i = 0; i < kickIn.length; i++) {
        if (kickIn[i].isFirst) 
            kickSequence += `<span class="circle-kick"><label class="fs-6 col-1">${kickIn[i].player}</label></span>`;
        else
            kickSequence += `<label class="fs-6 col-1">${kickIn[i].player}</label>`;
    }
    return kickSequence;
}
// ===== CORE GAME LOGIC =====

// Global match variable
let match = null;

/**
 * Start a new match with the given players and game type
 */
function startMatch() {
    match = new Match(
        getCookie('player1'),
        getCookie('player2'),
        document.querySelector('input[name="gameType"]:checked').value
    );

    console.log('Match started:', {
        currentPlayer: match.currentPlayer,
        player1: match.players[0].name,
        player2: match.players[1].name
    });

    // Show/hide UI elements
    document.getElementById('dateTitle').style.display = 'block';
    document.getElementById('main').style.display = 'block';
    document.getElementById('playerForm').style.display = 'none';
    document.getElementById('playerForm').classList.remove('d-flex');
    
    // Set match information
    document.getElementById('dateTitle').textContent = match.startDate;
    
    // Initialize player buttons with badge support
    initializePlayerButtons();

    // Set up event listeners for score buttons
    const buttons = document.getElementById('scoreButtons').querySelectorAll('button.btn-square');
    buttons.forEach(button => button.addEventListener('click', match.annotate.bind(match)));
    
    // Set up kick-in button listener
    document.getElementById('buttonK-in').addEventListener('click', function() {
        match.getTurn().tpaAnnotation.kickSequence.push(new KickIn(match.currentPlayer, true));
        updateLabels(match.getTurn());
        updateButtons(match.getTurn());
    });

    // Initialize display
    updateLabels(match.getTurn());
    updateButtons(match.getTurn());
}

/**
 * End the current match and generate results
 */
function endMatch() {
    var confirmation = window.confirm("This will end the match.\nAre you sure?");
  
    if (!confirmation) return;
    
    // Build results table
    const results = document.createElement('table');
    results.classList.add('table');
    results.innerHTML = `
        <thead>
            <tr>
                <th scope="col">${match.players[0].name}</th>
                <th scope="col">${match.players[1].name}</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    
    const tbody = results.querySelector('tbody');
    
    // Process each rack (skip the last empty rack)
    for (let i = 1; i < match.racks.length - 1; i++) {
        let row = document.createElement('tr');
        
        // Process each turn in the rack
        for (let j = 1; j < match.racks[i].turns.length; j++) {
            const turn = match.racks[i].turns[j];
            
            if (turn.player === 2) {
                if (j === 1) {
                    row = document.createElement('tr');
                    row.innerHTML = `<td></td><td>${htmlDivAnnotation(turn)}</td>`;
                } else {
                    row.innerHTML += `<td>${htmlDivAnnotation(turn)}</td>`;
                }
            } else {
                row = document.createElement('tr');
                row.innerHTML = `<td>${htmlDivAnnotation(turn)}</td>`;                      
            }
            
            tbody.appendChild(row);
            
            // Add rack score after last turn
            if (j === match.racks[i].turns.length - 1) {
                let scoreRow = document.createElement('tr');
                scoreRow.innerHTML = `<td colspan="2">${turn.score}</td>`;
                tbody.appendChild(scoreRow);
                
                // Add final score breakdown if this is the last rack
                if (i === match.racks.length - 2) {
                    let finalScoreRow = document.createElement('tr');
                    finalScoreRow.innerHTML = `
                        <td>
                            <div class="d-flex justify-content-between">
                              <div>
                                <p class="mb-0 ps-2 text-start">miss errs:</p>
                                <p class="mb-0 ps-2 text-start">break errs:</p>
                                <p class="mb-0 ps-2 text-start">kick errs:</p>
                                <p class="mb-0 ps-2 text-start">safety errs:</p>
                                <p class="mb-0 ps-2 text-start">position errs:</p>
                              </div>
                              <div class="text-right">
                                <p class="mb-0 pe-2 text-end">${match.score.player1.missErrors}</p>
                                <p class="mb-0 pe-2 text-end">${match.score.player1.breakErrors}</p>
                                <p class="mb-0 pe-2 text-end">${match.score.player1.kickErrors}</p>
                                <p class="mb-0 pe-2 text-end">${match.score.player1.safetyErrors}</p>
                                <p class="mb-0 pe-2 text-end">${match.score.player1.positionError}</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div class="d-flex justify-content-between">
                              <div>
                                <p class="mb-0 ps-2 text-start">miss errs:</p>
                                <p class="mb-0 ps-2 text-start">break errs:</p>
                                <p class="mb-0 ps-2 text-start">kick errs:</p>
                                <p class="mb-0 ps-2 text-start">safety errs:</p>
                                <p class="mb-0 ps-2 text-start">position errs:</p>
                              </div>
                              <div class="text-right">
                                <p class="mb-0 pe-2 text-end">${match.score.player2.missErrors}</p>
                                <p class="mb-0 pe-2 text-end">${match.score.player2.breakErrors}</p>
                                <p class="mb-0 pe-2 text-end">${match.score.player2.kickErrors}</p>
                                <p class="mb-0 pe-2 text-end">${match.score.player2.safetyErrors}</p>
                                <p class="mb-0 pe-2 text-end">${match.score.player2.positionError}</p>
                              </div>
                            </div>
                          </td>`;
                    tbody.appendChild(finalScoreRow);                    
                }
            }
        }
    }
    
    // Display results
    document.getElementById('results').appendChild(results);
    document.getElementById('main').style.display = 'none';
    document.getElementById('endMatch').classList.remove('d-flex');
    document.getElementById('results').style.display = 'block';

    // Save match data to Google Sheets
    saveMatchToGoogleSheets(results);
}

/**
 * Save match data to Google Sheets
 * @param {HTMLElement} results - Results table element
 */
function saveMatchToGoogleSheets(results) {
    // Google Sheets URL (hardcoded for now)
    const googleSheetURL = 'https://script.google.com/macros/s/AKfycbzn6HJDjup8zqvASM4-cB9zmPcPMi8h-u-iXAXaPDenkr_G9Q2Ap05mrisaWL_Fe8FK4w/exec';
    
    const matchData = {
        date: match.startDate,
        player1: match.players[0].name,
        player2: match.players[1].name,
        player1Score: tpaScore(match.score.player1),
        player2Score: tpaScore(match.score.player2),
        player1RacksWon: match.score.player1.racksWon,
        player2RacksWon: match.score.player2.racksWon,
        player1BallsPotted: match.score.player1.ballsPotted,
        player2BallsPotted: match.score.player2.ballsPotted,
        player1MissErrors: match.score.player1.missErrors,
        player2MissErrors: match.score.player2.missErrors,
        player1BreakErrors: match.score.player1.breakErrors,
        player2BreakErrors: match.score.player2.breakErrors,
        player1KickErrors: match.score.player1.kickErrors,
        player2KickErrors: match.score.player2.kickErrors,
        player1SafetyErrors: match.score.player1.safetyErrors,
        player2SafetyErrors: match.score.player2.safetyErrors,
        player1PositionError: match.score.player1.positionError,
        player2PositionError: match.score.player2.positionError,
        gameType: match.gameType,
        htmlTable: results.outerHTML
    };
    
    fetch(googleSheetURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(matchData)
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
// ===== TEST ESSENZIALI - SOLO 2 TEST =====

describe('TPA App Essential Tests', () => {
    
    it('should display correct player names in buttons after start', () => {
        // Skip test if not in browser environment
        if (typeof document === 'undefined' || typeof startMatch === 'undefined') {
            console.log('Skipping test - not in browser environment');
            return;
        }
        
        // Setup: set player names in form
        document.getElementById('player1').value = 'Mario';
        document.getElementById('player2').value = 'Luca';
        
        // Select 9 ball
        document.getElementById('gameType2').checked = true;
        
        // Save names to cookies (simulate change event)
        saveNames();
        
        // Start match
        startMatch();
        
        // Verify player names appear in buttons
        const player1Button = document.getElementById('player1Label');
        const player2Button = document.getElementById('player2Label');
        
        assert.ok(player1Button, 'Player 1 button should exist');
        assert.ok(player2Button, 'Player 2 button should exist');
        
        const player1Text = player1Button.textContent || player1Button.innerText;
        const player2Text = player2Button.textContent || player2Button.innerText;
        
        assert.ok(player1Text.includes('Mario'), `Player 1 button should contain 'Mario', got: ${player1Text}`);
        assert.ok(player2Text.includes('Luca'), `Player 2 button should contain 'Luca', got: ${player2Text}`);
        
        console.log('✅ Player names test passed - Mario and Luca displayed correctly');
    });
    
    it('should show warning badge after 0 P and player switch', () => {
        // Skip test if not in browser environment or if match not started
        if (typeof document === 'undefined' || typeof match === 'undefined' || !match) {
            console.log('Skipping test - match not available (run previous test first)');
            return;
        }
        
        // Reset match to clean state
        if (match.currentTurn > 1) {
            // Create fresh match for clean test
            match = new Match('Mario', 'Luca', 9);
            initializePlayerButtons();
        }
        
        // Ensure we're starting with player 1 (Mario)
        assert.equal(match.currentPlayer, 1, 'Should start with player 1');
        
        // Step 1: Input "0" for first player
        const button0 = document.getElementById('button0');
        assert.ok(button0, 'Button 0 should exist');
        button0.click();
        
        // Step 2: Input "P" (pocket foul) for first player  
        const buttonP = document.getElementById('buttonP');
        assert.ok(buttonP, 'Button P should exist');
        buttonP.click();
        
        // Step 3: Switch to second player (Luca)
        const player2Button = document.getElementById('player2Label');
        assert.ok(player2Button, 'Player 2 button should exist');
        
        // Click on player 2 button to switch
        player2Button.click();
        
        // Verify we switched to player 2
        assert.equal(match.currentPlayer, 2, 'Should be player 2 after switch');
        
        // Step 4: Check if warning badge appears next to first player (Mario)
        const warningContainer1 = document.getElementById('warningBadges1');
        assert.ok(warningContainer1, 'Warning badges container 1 should exist');
        
        const badgeContent = warningContainer1.innerHTML;
        const hasWarningBadge = badgeContent.includes('⚠️') || badgeContent.includes('warning-badge');
        
        // Debug info
        console.log('Current player after switch:', match.currentPlayer);
        console.log('Player 1 consecutive errors:', match.racks[match.currentRack].turns[match.currentTurn-1]?.consecutiveErrors);
        console.log('Warning badges content:', badgeContent);
        
        assert.ok(hasWarningBadge, `Mario should have warning badge after 0 P. Badge content: '${badgeContent}'`);
        
        console.log('✅ Warning badge test passed - badge appears after 0 P and player switch');
    });
});
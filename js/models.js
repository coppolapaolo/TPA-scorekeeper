// ===== DATA MODELS =====

/**
 * TPA Annotation class for tracking turn statistics
 */
class TPAAnnotation {
    constructor() {
        this.totalPotted = null;
        this.breakPotted = null;
        this.missErrors = null; // can be 0, 1, 2
        this.kick = null;
        this.pocketed = null;
        this.safety = null;
        this.push = null;
        this.safeX = null;
        this.noHit = null;
        this.kickSequence = [];
    }

    reset() {
        this.totalPotted = null;
        this.breakPotted = null;
        this.missErrors = null;
        this.kick = null;
        this.pocketed = null;
        this.safety = null;
        this.push = null;
        this.safeX = null;
        this.noHit = null;
        this.kickSequence = [];
    }

    ballsAnnotated() {
        return this.totalPotted !== null;
    }

    mainNote() {
        if (this.kick) {
            return 'K';
        } else if (this.safety) {
            if (this.safeX) {
                return 'S<sup>x</sup>';
            } else if (this.push) {
                return 'S<sup>p</sup>';
            } else {
                return 'S';
            }
        } else if (this.missErrors == 2) {
            return 'M<sup>n</sup>';
        } else if (this.missErrors == 1) {
            return 'M';
        }
        return '';
    }

    secondaryNote() {
        if (this.noHit) {
            return 'N';
        } else if (this.pocketed) {
            return 'P';
        }
        return '';
    }

    hasKickIn() {
        return this.kickSequence.length > 0;
    }
}

/**
 * KickIn class for tracking kick-in shots
 */
class KickIn {
    constructor(player, isFirst) {
        this.player = player;
        this.isFirst = isFirst;
    }
}

/**
 * Turn class representing a single player turn
 */
class Turn {
    constructor(player, breakTurn, ballsRemaining) {
        this.player = player;
        this.breakTurn = breakTurn;
        this.ballsRemaining = ballsRemaining;
        this.tpaAnnotation = new TPAAnnotation();
        this.pushed = false;
        this.winningTurn = false;
        this.previousTurn = null;
        this.score = null;
        this.consecutiveErrors = 0;
    }

    showButtons() {
        const buttonIDs = [];
        
        if (this.isWinning() || (this.tpaAnnotation.push)) {
            if (this.isWinning() && this.previousTurn != null && (this.previousTurn.tpaAnnotation.safeX || this.previousTurn.tpaAnnotation.push || this.previousTurn.tpaAnnotation.safety) && this.tpaAnnotation.kickSequence.length === 0) {
                buttonIDs.push('buttonK-in');
            }
            return buttonIDs;
        }
        
        if (!this.tpaAnnotation.ballsAnnotated()) {
            if (!this.breakTurn || this.tpaAnnotation.breakPotted === null) {
                for (let i = 0; i <= this.ballsRemaining; i++) {
                    buttonIDs.push(`button${i}`);
                }
            } else {
                buttonIDs.push('button0');
                for (let i = match.gameType == 8 ? 0 : this.tpaAnnotation.breakPotted; i <= this.ballsRemaining; i++) {
                    buttonIDs.push(`button${i}`);
                }
            }
        } else if (!this.tpaAnnotation.noHit && !this.tpaAnnotation.pocketed) {
            if (this.breakTurn && this.tpaAnnotation.totalPotted === 0) {
                buttonIDs.push('buttonN');
                buttonIDs.push('buttonP');
            } else if (!this.tpaAnnotation.safety && !this.tpaAnnotation.missErrors && !this.tpaAnnotation.kick) {
                if (this.tpaAnnotation.breakPotted <= this.tpaAnnotation.totalPotted && this.tpaAnnotation.totalPotted > 0) {
                    buttonIDs.push('buttonG');
                    if (this.previousTurn != null && (this.previousTurn.tpaAnnotation.safeX || this.previousTurn.tpaAnnotation.push || this.previousTurn.tpaAnnotation.safety) && this.tpaAnnotation.kickSequence.length === 0) {
                        buttonIDs.push('buttonK-in');
                    }
                }
                buttonIDs.push('buttonM');
                buttonIDs.push('buttonK');
                buttonIDs.push('buttonS');
                buttonIDs.push('buttonP');
                buttonIDs.push('buttonN');
            } else {
                buttonIDs.push('buttonN');
                buttonIDs.push('buttonP');
                if (this.tpaAnnotation.safety) {
                    if (this.isBreakShot() || (this.isPushed() && this.tpaAnnotation.totalPotted === 0) || (this.previousTurn != null && this.previousTurn.isBreak() && this.previousTurn.tpaAnnotation.totalPotted === 0 && this.tpaAnnotation.totalPotted === 0)) {
                        buttonIDs.push('buttonp');
                    }
                    if (this.tpaAnnotation.totalPotted > 0) {
                        buttonIDs.push('buttonx');
                    }
                } else if (this.tpaAnnotation.missErrors === 1) {
                    buttonIDs.push('buttonN');
                    buttonIDs.push('buttonP');
                    buttonIDs.push('buttonn');
                }
            }
        }
        return buttonIDs;
    }

    isBreak() {
        return this.breakTurn;
    }

    isBreakShot() {
        return this.isBreak() && this.tpaAnnotation.totalPotted === this.tpaAnnotation.breakPotted;
    }

    push() {
        this.pushed = true;
    }

    isPushed() {
        return this.pushed;
    }

    setWinningTurn() {
        this.winningTurn = true;
    }

    isWinning() {
        return this.winningTurn = this.winningTurn || this.ballsRemaining === 0 || this.ballsRemaining == this.tpaAnnotation.totalPotted;
    }

    hasBeenPlayed() {
        return this.tpaAnnotation.ballsAnnotated();
    }
}

/**
 * Match class - main game controller
 */
class Match {
    constructor(player1name, player2name, gameType) {
        this.startDate = formatDateTime(new Date());
        this.players = [
            { name: player1name },
            { name: player2name }
        ];
        this.score = {
            player1: { 
                racksWon: 0, 
                ballsPotted: 0, 
                missErrors: 0, 
                breakErrors: 0, 
                kickErrors: 0, 
                safetyErrors: 0, 
                positionError: 0
            },
            player2: { 
                racksWon: 0, 
                ballsPotted: 0, 
                missErrors: 0, 
                breakErrors: 0,
                kickErrors: 0,
                safetyErrors: 0,
                positionError: 0
            }
        };
        this.racks = [null]; // dummy element for 1-based indexing
        this.currentRack = 1;
        this.currentTurn = 1;
        this.currentPlayer = 1;
        this.gameType = gameType;
        this.racks.push({turns:[null, new Turn(this.currentPlayer,true,this.gameType)]});
    }

    annotate(event) {
        const buttonID = event.target.id;
        const buttonValue = parseInt(buttonID.slice(6));
        
        if (buttonValue === 0) {
            this.getTurn().tpaAnnotation.totalPotted = 0;
            if (this.getTurn().isBreak()) {
                this.getTurn().tpaAnnotation.breakPotted = this.getTurn().tpaAnnotation.breakPotted === null ? 0 : this.getTurn().tpaAnnotation.breakPotted;
            }
        } else if (!isNaN(buttonValue)) {
            if (this.getTurn().isBreak()) {
                if (this.getTurn().tpaAnnotation.breakPotted === null) {
                    this.getTurn().tpaAnnotation.breakPotted = buttonValue;
                } else {
                    this.getTurn().tpaAnnotation.totalPotted = buttonValue;
                }
            } else {
                this.getTurn().tpaAnnotation.totalPotted = buttonValue;
            }
        } else {
            switch (buttonID) {
                case 'buttonM':
                    this.getTurn().tpaAnnotation.missErrors = 1;
                    this.getTurn().tpaAnnotation.safety = false;
                    this.getTurn().tpaAnnotation.kick = false;
                    break;
                case 'buttonK':
                    this.getTurn().tpaAnnotation.kick = true;
                    this.getTurn().tpaAnnotation.missErrors = 0;
                    this.getTurn().tpaAnnotation.safety = false;
                    break;
                case 'buttonS':
                    this.getTurn().tpaAnnotation.safety = true;
                    this.getTurn().tpaAnnotation.kick = false;
                    this.getTurn().tpaAnnotation.missErrors = 0;
                    break;
                case 'buttonG':
                    this.getTurn().setWinningTurn();
                    break;
                case 'buttonP':
                    this.getTurn().tpaAnnotation.pocketed = this.getTurn().tpaAnnotation.pocketed === null ? true : !this.getTurn().tpaAnnotation.pocketed;
                    this.getTurn().tpaAnnotation.noHit = false;
                    break;
                case 'buttonN':
                    this.getTurn().tpaAnnotation.noHit = this.getTurn().tpaAnnotation.noHit === null ? true : !this.getTurn().tpaAnnotation.noHit;
                    this.getTurn().tpaAnnotation.pocketed = false;
                    break;
                case 'buttonn': 
                    this.getTurn().tpaAnnotation.missErrors = this.getTurn().tpaAnnotation.missErrors === 2 ? 1 : 2;
                    break;
                case 'buttonx': 
                    this.getTurn().tpaAnnotation.safeX = this.getTurn().tpaAnnotation.safeX === null ? true : !this.getTurn().tpaAnnotation.safeX;
                    this.getTurn().tpaAnnotation.push = false;
                    break;
                case 'buttonp': 
                    this.getTurn().tpaAnnotation.push = this.getTurn().tpaAnnotation.push === null ? true : !this.getTurn().tpaAnnotation.push;
                    this.getTurn().pushed = this.getTurn().tpaAnnotation.push;
                    this.getTurn().tpaAnnotation.safeX = false;
                    break;
            }
        }
        
        // NUOVO: Calcola consecutive errors immediatamente
        this.calculateConsecutiveErrors(this.getTurn());
        
        updateLabels(this.getTurn());
        updateButtons(this.getTurn());
    }

    getTurn() {
        if (arguments.length === 1 && arguments[0] < 0) {
            return this.currentTurn+arguments[0] >= 0 ? this.racks[this.currentRack].turns[this.currentTurn + arguments[0]] : null;
        }
        return this.racks[this.currentRack].turns[this.currentTurn];
    }

    canSwitchPlayer() {
        if (!this.getTurn().hasBeenPlayed()) {
            return this.getTurn().isBreak() && this.getTurn().tpaAnnotation.breakPotted === null;
        } else if (this.getTurn().isWinning()) {
            return true;
        } else if (this.getTurn().isBreak() && this.getTurn().tpaAnnotation.breakPotted === 0 && this.getTurn().tpaAnnotation.totalPotted === 0) {
            return true;
        } else if(this.getTurn().isBreak() && this.getTurn().tpaAnnotation.breakPotted > 0 && this.getTurn().tpaAnnotation.totalPotted === 0 && (this.getTurn().tpaAnnotation.noHit || this.getTurn().tpaAnnotation.pocketed)) {
            return true;
        } else if (!this.getTurn().tpaAnnotation.kick && !this.getTurn().tpaAnnotation.safety && !this.getTurn().tpaAnnotation.missErrors && !this.getTurn().tpaAnnotation.pocketed && !this.getTurn().tpaAnnotation.noHit) {
            return false;
        } else return true;
    }

    togglePlayer() {
        const previousPlayer = this.currentPlayer;
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        
        console.log(`Player switched: ${previousPlayer} → ${this.currentPlayer}`);
        
        if (!this.racks[this.currentRack].turns[this.currentTurn].hasBeenPlayed() && this.getTurn().isBreak()) {
            this.racks[this.currentRack].turns[this.currentTurn].player = this.currentPlayer;
            console.log(`Updated break turn player to: ${this.currentPlayer}`);
        } else {
            this.updateScore(this.racks[this.currentRack].turns[this.currentTurn]);
            const tripleFoul = this.getTurn().consecutiveErrors >= 3;
            this.getTurn().score = scoreToString(this.score);
            
            if (this.racks[this.currentRack].turns[this.currentTurn].isWinning()) {
                this.racks.push({ turns: [null] });
                this.currentRack++;
                this.currentTurn = 1;
                this.racks[this.currentRack].turns.push(new Turn(this.currentPlayer,true,this.gameType));
            } else {
                let ballsRemaining = this.getTurn().ballsRemaining - Math.max(this.getTurn().tpaAnnotation.totalPotted, this.getTurn().tpaAnnotation.breakPotted);
                
                if (this.getTurn().tpaAnnotation.breakPotted === this.gameType && this.getTurn().tpaAnnotation.totalPotted === 0) {
                    ballsRemaining = 1;
                }
                
                let pushed = this.getTurn().isPushed() && (this.getTurn().isBreak() || (this.getTurn().isPushed() && this.getTurn().previousTurn.isBreak() && this.getTurn().previousTurn.tpaAnnotation.totalPotted === 0 && this.getTurn().tpaAnnotation.totalPotted === 0));
                this.currentTurn++;
                
                this.racks[this.currentRack].turns.push(new Turn(this.currentPlayer,false,this.gameType == 8 ? (this.currentTurn < 3 ? 8 : this.getTurn(-2).ballsRemaining - this.getTurn(-2).tpaAnnotation.totalPotted) : ballsRemaining));
                this.getTurn().previousTurn = this.racks[this.currentRack].turns[this.currentTurn-1];
                
                if (pushed) {
                    this.getTurn().push();
                }
                
                if (tripleFoul) {
                    this.getTurn().tpaAnnotation.totalPotted = 0;
                    this.getTurn().setWinningTurn();
                    updateLabels(this.getTurn());
                    updateButtons(this.getTurn());
                }
            } 
        }
    }
    
    /**
     * Calculate consecutive errors for current turn (real-time)
     * @param {Turn} turn - Current turn to calculate errors for
     */
    calculateConsecutiveErrors(turn) {
        // Check if current turn has errors
        const hasError = turn.tpaAnnotation.noHit || turn.tpaAnnotation.pocketed;
        
        if (hasError) {
            // Get previous turn's consecutive errors
            let previousErrors = 0;
            if (turn.previousTurn && turn.previousTurn.consecutiveErrors) {
                previousErrors = turn.previousTurn.consecutiveErrors;
            }
            
            // Increment consecutive errors
            turn.consecutiveErrors = previousErrors + 1;
            
            console.log(`Consecutive error detected! Count: ${turn.consecutiveErrors}`);
        } else {
            // Reset consecutive errors if no error in current turn
            turn.consecutiveErrors = 0;
        }
    }

    updateScore(turn) {
        const scorePlayer = this.score[`player${turn.player}`];
        
        if (turn.isWinning()) {
            scorePlayer.racksWon++;
        }
        
        if (turn.tpaAnnotation.missErrors) {
            scorePlayer.missErrors += turn.tpaAnnotation.missErrors;
        }
        
        if (turn.isBreakShot() && (turn.tpaAnnotation.pocketed || turn.tpaAnnotation.noHit)) {
            if (turn.tpaAnnotation.pocketed) {
                if (!turn.tpaAnnotation.kick && !turn.tpaAnnotation.safety && !turn.tpaAnnotation.missErrors) {
                    scorePlayer.breakErrors++;
                } else if (turn.tpaAnnotation.missErrors){
                    scorePlayer.positionError++;
                }
            } else {
                scorePlayer.breakErrors++;
            }   
        }
        
        if (turn.tpaAnnotation.kick && (turn.tpaAnnotation.noHit || turn.tpaAnnotation.pocketed)) {
            scorePlayer.kickErrors++;
        }
        
        if (this.currentTurn > 1) {
            const previousTurn = this.racks[this.currentRack].turns[this.currentTurn-1];
            if (previousTurn.tpaAnnotation.safety) {
                if (turn.tpaAnnotation.totalPotted > 0) {
                    if (turn.tpaAnnotation.kickSequence.length === 0) {
                        this.score[`player${previousTurn.player}`].safetyErrors++;
                    }
                } else if (turn.tpaAnnotation.missErrors === 2) {
                    this.score[`player${previousTurn.player}`].safetyErrors++;
                }
            }
        }
        
        if (turn.tpaAnnotation.missErrors !== 2 && !turn.tpaAnnotation.safeX && !turn.isWinning() && turn.tpaAnnotation.totalPotted > 0) {
            if (turn.tpaAnnotation.breakPotted != turn.tpaAnnotation.totalPotted) {
                scorePlayer.positionError++;
            }
        } 
        
        if (turn.tpaAnnotation.pocketed && !turn.tpaAnnotation.kick && !turn.isBreak()) {
            scorePlayer.positionError++;
        }
        
        scorePlayer.ballsPotted += turn.tpaAnnotation.totalPotted;
        
        // Update consecutive errors
        if (turn.tpaAnnotation.noHit || turn.tpaAnnotation.pocketed) {
            const previousErrors = turn.previousTurn === null ? 0 : turn.previousTurn.previousTurn === null ? 0 : turn.previousTurn.previousTurn.consecutiveErrors;
            if (turn.tpaAnnotation.totalPotted === 0) {
                turn.consecutiveErrors = previousErrors + 1;
            } else {
                turn.consecutiveErrors = 1;
            }
        } else {
            turn.consecutiveErrors = 0;
        }
    }
}
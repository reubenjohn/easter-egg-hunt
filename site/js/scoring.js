/* ==============================================
   DATA — loaded from config.json via config.js
   ============================================== */
let PLAYERS = [];

const STORAGE_KEY = 'easterEggScoring_v1';

let state = {};

/* ==============================================
   INIT — wait for config, then bootstrap
   ============================================== */
CONFIG.ready(function (cfg) {
    PLAYERS = cfg.players;
    state = loadState();
    renderGrid();
});

/* ==============================================
   STATE MANAGEMENT
   ============================================== */
function defaultState() {
    const s = {};
    PLAYERS.forEach(p => {
        s[p.id] = {
            score: 0,
            powerups: {
                doubleDown: false,
                bonusHaul: false,
                eggSwap: false
            }
        };
    });
    return s;
}

function loadState() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            // Validate structure
            const def = defaultState();
            PLAYERS.forEach(p => {
                if (!parsed[p.id]) parsed[p.id] = def[p.id];
                if (typeof parsed[p.id].score !== 'number') parsed[p.id].score = 0;
                if (!parsed[p.id].powerups) parsed[p.id].powerups = def[p.id].powerups;
            });
            return parsed;
        }
    } catch (e) { /* ignore */ }
    return defaultState();
}

function saveState() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* ignore */ }
}

/* ==============================================
   RENDER PLAYER GRID
   ============================================== */
function renderGrid() {
    const grid = document.getElementById('playerGrid');
    grid.innerHTML = '';

    PLAYERS.forEach(player => {
        const ps = state[player.id];
        const card = document.createElement('div');
        card.className = 'player-card';
        card.style.setProperty('--accent', player.color);

        const ddUsed = ps.powerups.doubleDown;
        const bhUsed = ps.powerups.bonusHaul;
        const esUsed = ps.powerups.eggSwap;

        // Build used power-up tags
        let usedTags = [];
        if (ddUsed) usedTags.push('Double Down');
        if (bhUsed) usedTags.push('Bonus Haul');
        if (esUsed) usedTags.push('Egg Swap');
        const usedHTML = usedTags.length > 0
            ? `<div class="powerup-used-tag">Used: ${usedTags.join(', ')}</div>`
            : '';

        card.innerHTML = `
            <div class="egg-frame">
                <img src="${player.photo}" alt="${player.name}">
            </div>
            <div class="player-name">${player.name}</div>
            <div class="score-label">Skittles</div>
            <div class="score-display" id="score-${player.id}">${ps.score}</div>
            <div class="score-controls">
                <button class="btn-score btn-minus" onclick="adjustScore('${player.id}', -1)" aria-label="Decrease score">−</button>
                <button class="btn-score btn-plus" onclick="adjustScore('${player.id}', 1)" aria-label="Increase score">+</button>
            </div>
            <div class="powerups">
                <button class="btn-powerup double-down" onclick="useDoubleDown('${player.id}')" ${ddUsed ? 'disabled' : ''}>Double Down (+5)</button>
                <button class="btn-powerup bonus-haul" onclick="useBonusHaul('${player.id}')" ${bhUsed ? 'disabled' : ''}>Bonus Haul (+5)</button>
                <button class="btn-powerup egg-swap" onclick="openSwapModal('${player.id}')" ${esUsed ? 'disabled' : ''}>Egg Swap</button>
            </div>
            ${usedHTML}
        `;

        grid.appendChild(card);
    });
}

/* ==============================================
   SCORE ACTIONS
   ============================================== */
function adjustScore(playerId, delta) {
    const ps = state[playerId];
    ps.score = Math.max(0, ps.score + delta);
    saveState();

    // Animate
    const el = document.getElementById(`score-${playerId}`);
    if (el) {
        el.textContent = ps.score;
        el.classList.add('bumped');
        setTimeout(() => el.classList.remove('bumped'), 150);
    }
}

/* ==============================================
   POWER-UPS
   ============================================== */
function useDoubleDown(playerId) {
    state[playerId].powerups.doubleDown = true;
    state[playerId].score += 5;
    saveState();
    renderGrid();
    flashCard(playerId);
}

function useBonusHaul(playerId) {
    state[playerId].powerups.bonusHaul = true;
    state[playerId].score += 5;
    saveState();
    renderGrid();
    flashCard(playerId);
}

function flashCard(playerId) {
    const el = document.getElementById(`score-${playerId}`);
    if (el) {
        el.classList.add('bumped');
        setTimeout(() => el.classList.remove('bumped'), 200);
    }
}

/* ==============================================
   EGG SWAP MODAL
   ============================================== */
let swapFromId = null;

function openSwapModal(playerId) {
    swapFromId = playerId;
    const player = PLAYERS.find(p => p.id === playerId);
    document.getElementById('swapFromName').textContent = player.name;

    const select = document.getElementById('swapTarget');
    select.innerHTML = '';
    PLAYERS.forEach(p => {
        if (p.id !== playerId) {
            const opt = document.createElement('option');
            opt.value = p.id;
            opt.textContent = p.name;
            select.appendChild(opt);
        }
    });

    document.getElementById('swapAmount').value = 1;
    document.getElementById('swapModal').classList.add('active');
}

function closeSwapModal() {
    document.getElementById('swapModal').classList.remove('active');
    swapFromId = null;
}

function executeSwap() {
    if (!swapFromId) return;

    const targetId = document.getElementById('swapTarget').value;
    const amount = parseInt(document.getElementById('swapAmount').value, 10);

    if (!targetId || isNaN(amount) || amount < 1) return;

    // Transfer: take from source, give to target
    const actualAmount = Math.min(amount, state[swapFromId].score);
    state[swapFromId].score -= actualAmount;
    state[targetId].score += actualAmount;
    state[swapFromId].powerups.eggSwap = true;

    saveState();
    closeSwapModal();
    renderGrid();
}

/* ==============================================
   RESET
   ============================================== */
function confirmReset() {
    document.getElementById('confirmOverlay').classList.add('active');
}

function closeConfirm() {
    document.getElementById('confirmOverlay').classList.remove('active');
}

function resetAll() {
    state = defaultState();
    saveState();
    closeConfirm();
    renderGrid();
}

/* ==============================================
   CROWN THE WINNER
   ============================================== */
function crownWinner() {
    // Find highest score
    let maxScore = -1;
    PLAYERS.forEach(p => {
        if (state[p.id].score > maxScore) maxScore = state[p.id].score;
    });

    if (maxScore <= 0) {
        alert('No scores yet! Start counting Skittles first.');
        return;
    }

    // Find all players with that score (handles ties)
    const winners = PLAYERS.filter(p => state[p.id].score === maxScore);

    showCelebration(winners, maxScore);
}

function showCelebration(winners, score) {
    const overlay = document.getElementById('celebrationOverlay');
    const content = document.getElementById('celebrationContent');
    const confettiContainer = document.getElementById('confettiContainer');

    // Clear previous
    confettiContainer.innerHTML = '';

    const isTie = winners.length > 1;

    if (isTie) {
        let winnersHTML = '';
        winners.forEach(w => {
            winnersHTML += `
                <div class="tied-item">
                    <div class="winner-egg-frame" style="border-color: ${w.color};">
                        <img src="${w.photo}" alt="${w.name}">
                    </div>
                    <div class="tied-name">${w.name}</div>
                </div>
            `;
        });

        content.innerHTML = `
            <div class="celebration-trophy">CHAMPION EGG HUNTERS!</div>
            <div class="tied-winners">${winnersHTML}</div>
            <div class="winner-score">${score} Skittles &mdash; It's a tie!</div>
            <button class="btn-dismiss" onclick="closeCelebration()">Close</button>
        `;
    } else {
        const w = winners[0];
        content.innerHTML = `
            <div class="celebration-trophy">CHAMPION EGG HUNTER!</div>
            <div class="winner-egg-frame" style="border-color: ${w.color};">
                <img src="${w.photo}" alt="${w.name}">
            </div>
            <div class="winner-name">${w.name}</div>
            <div class="winner-score">${score} Skittles</div>
            <button class="btn-dismiss" onclick="closeCelebration()">Close</button>
        `;
    }

    overlay.classList.add('active');
    launchConfetti();
}

function closeCelebration() {
    const overlay = document.getElementById('celebrationOverlay');
    overlay.classList.remove('active');
    document.getElementById('confettiContainer').innerHTML = '';
}

/* ==============================================
   CONFETTI EFFECT — uses player colors from config
   ============================================== */
function launchConfetti() {
    const container = document.getElementById('confettiContainer');
    // Use player colors from config + some extras
    const playerColors = PLAYERS.map(p => p.color);
    const extraColors = ['#ffd54f', '#ff7043', '#ab47bc', '#29b6f6', '#66bb6a', '#ffee58'];
    const colors = playerColors.concat(extraColors);
    const shapes = ['circle', 'square', 'rect'];
    const totalPieces = 120;

    for (let i = 0; i < totalPieces; i++) {
        setTimeout(() => {
            const piece = document.createElement('div');
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            piece.className = `confetti-piece ${shape}`;
            piece.style.left = Math.random() * 100 + 'vw';
            piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            piece.style.animationDuration = (2.5 + Math.random() * 3) + 's';
            piece.style.animationDelay = '0s';

            const size = 6 + Math.random() * 10;
            if (shape === 'rect') {
                piece.style.width = (size * 0.5) + 'px';
                piece.style.height = size + 'px';
            } else {
                piece.style.width = size + 'px';
                piece.style.height = size + 'px';
            }

            container.appendChild(piece);

            // Remove after animation
            piece.addEventListener('animationend', () => piece.remove());
        }, i * 30);
    }

    // Second wave
    setTimeout(() => {
        for (let i = 0; i < 60; i++) {
            setTimeout(() => {
                const piece = document.createElement('div');
                const shape = shapes[Math.floor(Math.random() * shapes.length)];
                piece.className = `confetti-piece ${shape}`;
                piece.style.left = Math.random() * 100 + 'vw';
                piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                piece.style.animationDuration = (2.5 + Math.random() * 3) + 's';

                const size = 6 + Math.random() * 10;
                if (shape === 'rect') {
                    piece.style.width = (size * 0.5) + 'px';
                    piece.style.height = size + 'px';
                } else {
                    piece.style.width = size + 'px';
                    piece.style.height = size + 'px';
                }

                container.appendChild(piece);
                piece.addEventListener('animationend', () => piece.remove());
            }, i * 40);
        }
    }, 2000);
}

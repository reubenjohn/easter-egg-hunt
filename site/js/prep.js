/**
 * Prep page logic — reads config and renders the egg preparation checklist
 * with validation, Skittle distribution, and assembly instructions.
 */
CONFIG.ready(function (cfg) {
    var players = cfg.players;
    var kit = cfg.eggKit;
    var eggsPerPlayer = cfg.eggsPerPlayer;
    var skittlesCfg = cfg.skittles;
    var tasks = cfg.tasks;
    var powerups = cfg.powerups;
    var difficulties = ['easy', 'medium', 'hard', 'extreme'];

    // ── Kit color lookup ──
    var kitColorMap = {};
    kit.colors.forEach(function (c) { kitColorMap[c.id] = c; });
    var specialColorObj = kitColorMap[kit.specialColor];

    var totalKitEggs = 0;
    kit.colors.forEach(function (c) { totalKitEggs += c.count; });

    // ── Task egg counts ──
    var totalTaskEggs = 0;
    difficulties.forEach(function (d) {
        if (tasks[d]) totalTaskEggs += (tasks[d].count || tasks[d].items.length);
    });

    // ── Power-up egg counts ──
    var totalPowerups = 0;
    powerups.forEach(function (pu) { totalPowerups += (pu.count || 1); });

    var totalSpecialEggs = totalTaskEggs + totalPowerups;
    var playerEggsTotal = players.length * eggsPerPlayer;

    // ── Track half usage per color ──
    // Each color has tops and bottoms. Complete eggs use one of each.
    // Power-up eggs take tops from topColors and bottoms from bottomColors.
    var topsUsed = {};
    var bottomsUsed = {};
    kit.colors.forEach(function (c) {
        topsUsed[c.id] = 0;
        bottomsUsed[c.id] = 0;
    });

    // Player complete eggs consume one top + one bottom each
    players.forEach(function (p) {
        topsUsed[p.eggColor] = (topsUsed[p.eggColor] || 0) + eggsPerPlayer;
        bottomsUsed[p.eggColor] = (bottomsUsed[p.eggColor] || 0) + eggsPerPlayer;
    });

    // Task eggs: green top + colored bottom per difficulty
    difficulties.forEach(function (d) {
        if (!tasks[d]) return;
        var count = tasks[d].count || tasks[d].items.length;
        topsUsed[kit.specialColor] = (topsUsed[kit.specialColor] || 0) + count;
        if (tasks[d].bottomColor) {
            bottomsUsed[tasks[d].bottomColor] = (bottomsUsed[tasks[d].bottomColor] || 0) + count;
        } else {
            bottomsUsed[kit.specialColor] = (bottomsUsed[kit.specialColor] || 0) + count;
        }
    });

    // Power-up eggs: tops from each powerup's topColor/topColors, bottoms from bottomColor
    powerups.forEach(function (pu) {
        var count = pu.count || 1;
        // Get top color(s) for this powerup
        var puTopColors = pu.topColors || (pu.topColor ? [pu.topColor] : []);
        for (var i = 0; i < count; i++) {
            var topId = puTopColors[i % puTopColors.length];
            if (topId) topsUsed[topId] = (topsUsed[topId] || 0) + 1;
        }
        // All bottoms come from the powerup's bottomColor
        if (pu.bottomColor) {
            bottomsUsed[pu.bottomColor] = (bottomsUsed[pu.bottomColor] || 0) + count;
        }
    });

    // ── Skittle calculations ──
    var skittlesPerPlayer = 0;
    var distEggCount = 0;
    skittlesCfg.distribution.forEach(function (d) {
        skittlesPerPlayer += d.perEgg * d.count;
        distEggCount += d.count;
    });
    var totalPlayerSkittles = skittlesPerPlayer * players.length;

    var totalTaskReward = 0;
    difficulties.forEach(function (d) {
        if (tasks[d]) {
            var count = tasks[d].count || tasks[d].items.length;
            totalTaskReward += tasks[d].reward * count;
        }
    });

    var totalPowerupBonus = 0;
    powerups.forEach(function (pu) {
        totalPowerupBonus += (pu.scoreBonus || 0) * (pu.count || 1);
    });

    var grandTotalSkittles = totalPlayerSkittles + totalTaskReward + totalPowerupBonus;

    // ── Validation ──
    var errors = [];

    if (distEggCount !== eggsPerPlayer) {
        errors.push('Skittle distribution covers ' + distEggCount + ' eggs but eggsPerPlayer is ' + eggsPerPlayer);
    }

    // Check half availability per color
    kit.colors.forEach(function (c) {
        var topOver = (topsUsed[c.id] || 0) - c.count;
        var bottomOver = (bottomsUsed[c.id] || 0) - c.count;
        if (topOver > 0) {
            errors.push(c.name + ': need ' + topsUsed[c.id] + ' top halves but kit only has ' + c.count);
        }
        if (bottomOver > 0) {
            errors.push(c.name + ': need ' + bottomsUsed[c.id] + ' bottom halves but kit only has ' + c.count);
        }
    });

    // Check player color assignments exist
    players.forEach(function (p) {
        if (!kitColorMap[p.eggColor]) {
            errors.push(p.name + ' assigned to color "' + p.eggColor + '" which is not in the egg kit');
        }
        if (p.eggColor === kit.specialColor) {
            errors.push(p.name + ' is assigned the special egg color (' + kit.specialColor + ')');
        }
    });

    // Check skittles supply
    if (grandTotalSkittles > skittlesCfg.total) {
        errors.push('Need ' + grandTotalSkittles + ' Skittles but only have ' + skittlesCfg.total + ' in supply');
    }

    // ── Render Header ──
    document.getElementById('prepTitle').textContent = 'Easter Egg Hunt ' + cfg.event.year;
    document.title = 'Easter Egg Hunt ' + cfg.event.year + ' \u2014 Prep Checklist';

    // ── Render Validation Banner ──
    var banner = document.getElementById('validationBanner');
    if (errors.length === 0) {
        banner.className = 'validation-banner validation-pass';
        banner.innerHTML = '<span class="icon">&#9989;</span><div>All checks passed! Your egg kit, Skittle supply, and configuration are ready to go.</div>';
    } else {
        banner.className = 'validation-banner validation-fail';
        var errorHtml = '<span class="icon">&#9888;&#65039;</span><div>Found ' + errors.length + ' issue' + (errors.length > 1 ? 's' : '') + ' to fix:<ul class="validation-errors">';
        errors.forEach(function (e) { errorHtml += '<li>' + e + '</li>'; });
        errorHtml += '</ul></div>';
        banner.innerHTML = errorHtml;
    }

    // ── Render Stats Bar ──
    var statsBar = document.getElementById('statsBar');
    var spareEggs = totalKitEggs - playerEggsTotal - totalSpecialEggs;
    var stats = [
        { value: totalKitEggs, label: 'Total Eggs' },
        { value: playerEggsTotal, label: 'Player Eggs' },
        { value: totalTaskEggs, label: 'Task Eggs' },
        { value: totalPowerups, label: 'Power-Up Eggs' },
        { value: players.length, label: 'Players' },
        { value: skittlesCfg.total, label: 'Skittles Supply' }
    ];
    stats.forEach(function (s) {
        var card = document.createElement('div');
        card.className = 'stat-card';
        card.innerHTML = '<div class="stat-value">' + s.value + '</div><div class="stat-label">' + s.label + '</div>';
        statsBar.appendChild(card);
    });

    // ── Render Player Egg Assignments ──
    var playerTable = document.getElementById('playerEggTable');
    var playerTbody = '';
    players.forEach(function (p) {
        var kitColor = kitColorMap[p.eggColor];
        var available = kitColor ? kitColor.count : 0;
        var tUsed = topsUsed[p.eggColor] || 0;
        var bUsed = bottomsUsed[p.eggColor] || 0;
        var maxUsed = Math.max(tUsed, bUsed);
        var spare = available - maxUsed;
        var statusBadge = spare >= 0
            ? '<span class="badge badge-ok">' + spare + ' spare</span>'
            : '<span class="badge badge-error">' + Math.abs(spare) + ' short</span>';
        playerTbody +=
            '<tr>' +
                '<td><div class="color-cell"><span class="color-swatch" style="background:' + p.color + '"></span>' + p.name + '</div></td>' +
                '<td>' + p.colorName + '</td>' +
                '<td>' + eggsPerPlayer + '</td>' +
                '<td>' + available + '</td>' +
                '<td>' + statusBadge + '</td>' +
            '</tr>';
    });
    playerTbody +=
        '<tr class="total-row">' +
            '<td colspan="2">Total Player Eggs</td>' +
            '<td>' + playerEggsTotal + '</td>' +
            '<td></td>' +
            '<td></td>' +
        '</tr>';
    playerTable.innerHTML = playerTbody;

    // ── Render Special Egg Breakdown ──
    var specialTable = document.getElementById('specialEggTable');
    var specialTbody = '';
    var diffLabels = { easy: 'Easy Task', medium: 'Medium Task', hard: 'Hard Task', extreme: 'Extreme Task' };
    var diffIcons = { easy: '&#127793;', medium: '&#127800;', hard: '&#128293;', extreme: '&#128128;' };

    // Task eggs (green top + colored bottom)
    specialTbody += '<tr><td colspan="4" style="font-weight:700;background:#e8f5e9;color:#2e7d32;padding:0.5rem 1rem;">Task Eggs (' + specialColorObj.name + ' top + colored bottom)</td></tr>';
    difficulties.forEach(function (d) {
        if (!tasks[d]) return;
        var count = tasks[d].count || tasks[d].items.length;
        var bottomObj = tasks[d].bottomColor ? kitColorMap[tasks[d].bottomColor] : specialColorObj;
        var bottomHex = bottomObj ? bottomObj.hex : specialColorObj.hex;
        var bottomName = bottomObj ? bottomObj.name : specialColorObj.name;
        specialTbody +=
            '<tr>' +
                '<td><div class="special-type-row"><div class="mini-egg two-tone-mini" style="background:linear-gradient(180deg, ' + specialColorObj.hex + ' 50%, ' + bottomHex + ' 50%);"></div>' + diffIcons[d] + ' ' + diffLabels[d] + '</div></td>' +
                '<td>' + specialColorObj.name + ' / ' + bottomName + '</td>' +
                '<td>' + count + '</td>' +
                '<td>' + tasks[d].rewardText + '</td>' +
            '</tr>';
    });

    // Power-up eggs (two-tone, per-powerup top colors)
    specialTbody += '<tr><td colspan="4" style="font-weight:700;background:#fff3e0;color:#e65100;padding:0.5rem 1rem;">Power-Up Eggs (pink top + colored bottom)</td></tr>';
    powerups.forEach(function (pu) {
        var count = pu.count || 1;
        var bottomObj = kitColorMap[pu.bottomColor];
        var bottomHex = bottomObj ? bottomObj.hex : '#999';
        var bottomName = bottomObj ? bottomObj.name : pu.bottomColor;
        var puTopColors = pu.topColors || (pu.topColor ? [pu.topColor] : []);
        // Show one mini egg per distinct top color
        var eggsHtml = '';
        for (var i = 0; i < count; i++) {
            var topId = puTopColors[i % puTopColors.length];
            var topHex = kitColorMap[topId] ? kitColorMap[topId].hex : '#999';
            eggsHtml += '<div class="mini-egg two-tone-mini" style="background:linear-gradient(180deg, ' + topHex + ' 50%, ' + bottomHex + ' 50%);"></div>';
        }
        var topNames = puTopColors.map(function (id) { return kitColorMap[id] ? kitColorMap[id].name : id; });
        var topLabel = topNames.length > 1 ? topNames.join(' / ') : topNames[0] || '';

        specialTbody +=
            '<tr>' +
                '<td><div class="special-type-row">' + eggsHtml + ' ' + pu.icon + ' ' + pu.name + '</div></td>' +
                '<td>' + topLabel + ' top / ' + bottomName + ' bottom</td>' +
                '<td>' + count + '</td>' +
                '<td>' + (pu.scoreBonus > 0 ? '+' + pu.scoreBonus + ' Skittles' : 'Special effect') + '</td>' +
            '</tr>';
    });

    specialTbody +=
        '<tr class="total-row">' +
            '<td>Total Special Eggs</td>' +
            '<td></td>' +
            '<td>' + totalSpecialEggs + '</td>' +
            '<td></td>' +
        '</tr>';
    specialTable.innerHTML = specialTbody;

    // Special eggs status
    var specialStatus = document.getElementById('specialEggStatus');
    var greenSpare = (specialColorObj ? specialColorObj.count : 0) - totalTaskEggs;
    specialStatus.innerHTML = '<span class="badge ' + (greenSpare >= 0 ? 'badge-ok' : 'badge-error') + '">' +
        totalTaskEggs + ' green for tasks (' + greenSpare + ' spare), ' + totalPowerups + ' two-tone for power-ups</span>';

    // ── Render Skittle Distribution ──
    var skittleDist = document.getElementById('skittleDistCards');
    skittlesCfg.distribution.forEach(function (d) {
        var total = d.perEgg * d.count;
        var card = document.createElement('div');
        card.className = 'dist-card';
        card.innerHTML =
            '<div class="dist-count">' + d.count + ' eggs</div>' +
            '<div class="dist-label">' + d.perEgg + ' Skittle' + (d.perEgg > 1 ? 's' : '') + ' each</div>' +
            '<div class="dist-detail">' + total + ' Skittles subtotal</div>' +
            '<div class="skittle-visual">' + renderSkittleDots(d.perEgg, d.count) + '</div>';
        skittleDist.appendChild(card);
    });

    var perPlayerCard = document.createElement('div');
    perPlayerCard.className = 'dist-card';
    perPlayerCard.style.borderColor = '#66bb6a';
    perPlayerCard.style.borderWidth = '2px';
    perPlayerCard.style.borderStyle = 'solid';
    perPlayerCard.innerHTML =
        '<div class="dist-count">' + skittlesPerPlayer + '</div>' +
        '<div class="dist-label">Skittles per Player</div>' +
        '<div class="dist-detail">' + eggsPerPlayer + ' eggs \u00d7 avg ' + (skittlesPerPlayer / eggsPerPlayer).toFixed(1) + '</div>';
    skittleDist.appendChild(perPlayerCard);

    // Skittle summary table
    var skittleSummary = document.getElementById('skittleSummary');
    skittleSummary.innerHTML =
        '<tr><td>Player eggs (' + players.length + ' players \u00d7 ' + skittlesPerPlayer + ')</td><td>' + totalPlayerSkittles + '</td></tr>' +
        '<tr><td>Task rewards (if all completed)</td><td>' + totalTaskReward + '</td></tr>' +
        '<tr><td>Power-up bonuses (if all triggered)</td><td>' + totalPowerupBonus + '</td></tr>' +
        '<tr class="total-row"><td>Max Skittles needed</td><td>' + grandTotalSkittles + '</td></tr>' +
        '<tr><td>Skittles in supply</td><td>' + skittlesCfg.total + '</td></tr>' +
        '<tr><td>Buffer</td><td>' +
            (skittlesCfg.total >= grandTotalSkittles
                ? '<span class="badge badge-ok">+' + (skittlesCfg.total - grandTotalSkittles) + ' extra</span>'
                : '<span class="badge badge-error">' + (skittlesCfg.total - grandTotalSkittles) + ' short!</span>') +
        '</td></tr>';

    // ── Render Kit Inventory ──
    var kitTable = document.getElementById('kitInventoryTable');
    var kitTbody = '';
    var totalUsedEggs = 0;

    kit.colors.forEach(function (c) {
        var tUsed = topsUsed[c.id] || 0;
        var bUsed = bottomsUsed[c.id] || 0;
        var maxHalves = Math.max(tUsed, bUsed);

        // Determine usage description
        var usages = [];
        var playerUser = null;
        players.forEach(function (p) { if (p.eggColor === c.id) playerUser = p; });

        if (playerUser) usages.push(playerUser.name + ' (' + eggsPerPlayer + ' eggs)');
        if (c.id === kit.specialColor) usages.push('Tasks (' + totalTaskEggs + ' eggs)');

        // Check if tops or bottoms used for power-ups
        var puTops = 0, puBottoms = 0;
        powerups.forEach(function (pu) {
            var puTopColors = pu.topColors || (pu.topColor ? [pu.topColor] : []);
            var puCount = pu.count || 1;
            for (var j = 0; j < puCount; j++) {
                if (puTopColors[j % puTopColors.length] === c.id) puTops++;
            }
        });
        if (puTops > 0) usages.push(puTops + ' tops for power-ups');
        powerups.forEach(function (pu) {
            if (pu.bottomColor === c.id) puBottoms += (pu.count || 1);
        });
        if (puBottoms > 0) usages.push(puBottoms + ' bottoms for power-ups');

        // Check if bottoms used for task eggs
        var taskBottoms = 0;
        difficulties.forEach(function (d) {
            if (tasks[d] && tasks[d].bottomColor === c.id) {
                taskBottoms += (tasks[d].count || tasks[d].items.length);
            }
        });
        if (taskBottoms > 0) usages.push(taskBottoms + ' bottoms for tasks');

        if (usages.length === 0) usages.push('Unassigned');

        var spare = c.count - maxHalves;
        totalUsedEggs += Math.min(maxHalves, c.count);

        kitTbody +=
            '<tr>' +
                '<td><div class="color-cell"><span class="color-swatch" style="background:' + c.hex + '"></span>' + c.name + '</div></td>' +
                '<td>' + c.count + '</td>' +
                '<td>' + usages.join(', ') + '</td>' +
                '<td>' + maxHalves + '</td>' +
                '<td>' + (spare >= 0
                    ? '<span class="badge badge-ok">' + spare + '</span>'
                    : '<span class="badge badge-error">' + spare + '</span>') +
                '</td>' +
            '</tr>';
    });
    kitTbody +=
        '<tr class="total-row">' +
            '<td>Total</td>' +
            '<td>' + totalKitEggs + '</td>' +
            '<td></td>' +
            '<td>' + totalUsedEggs + '</td>' +
            '<td><span class="badge badge-ok">' + (totalKitEggs - totalUsedEggs) + '</span></td>' +
        '</tr>';
    kitTable.innerHTML = kitTbody;

    // ── Assembly Instructions ──
    var assemblyContainer = document.getElementById('assemblySteps');

    // Build power-up assembly description
    var puAssemblyHtml = '<p>Assemble ' + totalPowerups + ' two-tone power-up eggs:</p><ul>';
    powerups.forEach(function (pu) {
        var count = pu.count || 1;
        var bottomObj = kitColorMap[pu.bottomColor];
        var bottomName = bottomObj ? bottomObj.name : pu.bottomColor;
        var puTopColors = pu.topColors || (pu.topColor ? [pu.topColor] : []);
        var topNames = puTopColors.map(function (id) { return kitColorMap[id] ? kitColorMap[id].name : id; });
        puAssemblyHtml += '<li><strong>' + pu.icon + ' ' + pu.name + '</strong> (' + count + '): ' +
            topNames.join(' or ') + ' top + ' + bottomName + ' bottom</li>';
    });
    puAssemblyHtml += '</ul><p>Place the matching power-up card inside each. <strong>Do NOT add Skittles.</strong></p>';

    var steps = [
        {
            title: 'Print & Cut Task Cards',
            time: '~10 min',
            body: '<p>Open the <a href="tasks-print.html" class="prep-link-btn btn-print" style="display:inline;padding:0.2rem 0.6rem;font-size:0.82rem;margin:0;">Print Cards Page</a> and print all ' + totalSpecialEggs + ' cards (' + totalTaskEggs + ' task + ' + totalPowerups + ' power-up). Cut along borders and fold to fit inside eggs.</p>'
        },
        {
            title: 'Sort Eggs by Color',
            time: '~5 min',
            body: '<p>Separate all ' + totalKitEggs + ' eggs into ' + kit.colors.length + ' piles by color. Verify counts match the kit inventory above.</p>'
        },
        {
            title: 'Stuff Player Eggs',
            time: '~45\u201360 min',
            body: '<p>For each player\'s ' + eggsPerPlayer + ' eggs:</p>' +
                '<ul>' +
                skittlesCfg.distribution.map(function (d) {
                    return '<li>Put <strong>' + d.perEgg + ' Skittle' + (d.perEgg > 1 ? 's' : '') + '</strong> in ' + d.count + ' eggs</li>';
                }).join('') +
                '</ul>' +
                '<p>Snap closed, shuffle, and bag with player\'s name. Repeat for all ' + players.length + ' players.</p>' +
                '<p><strong>Pro tip:</strong> Assembly-line style \u2014 one person stuffs while the other bags.</p>'
        },
        {
            title: 'Assemble Task Eggs',
            time: '~15 min',
            body: '<p>Assemble ' + totalTaskEggs + ' two-tone task eggs (' + specialColorObj.name + ' top + colored bottom):</p>' +
                '<ul>' +
                difficulties.map(function (d) {
                    if (!tasks[d]) return '';
                    var count = tasks[d].count || tasks[d].items.length;
                    var bottomObj = tasks[d].bottomColor ? kitColorMap[tasks[d].bottomColor] : specialColorObj;
                    var bottomName = bottomObj ? bottomObj.name : specialColorObj.name;
                    return '<li><strong>' + diffLabels[d] + '</strong> (' + count + '): ' + specialColorObj.name + ' top + ' + bottomName + ' bottom</li>';
                }).join('') +
                '</ul>' +
                '<p>Place the matching task card inside each. <strong>Do NOT add Skittles</strong> \u2014 task rewards are given after completion.</p>'
        },
        {
            title: 'Assemble Power-Up Eggs',
            time: '~10 min',
            body: puAssemblyHtml
        },
        {
            title: 'Final Verification',
            time: '~5 min',
            body: '<ul>' +
                '<li>' + players.length + ' player bags with ' + eggsPerPlayer + ' eggs each</li>' +
                '<li>1 task eggs bag with ' + totalTaskEggs + ' green eggs</li>' +
                '<li>1 power-up eggs bag with ' + totalPowerups + ' two-tone eggs</li>' +
                '<li>All eggs snap closed firmly (shake test!)</li>' +
                '<li>Bags labeled clearly</li>' +
                '</ul>'
        }
    ];

    steps.forEach(function (step, i) {
        var div = document.createElement('div');
        div.className = 'assembly-step';
        div.innerHTML =
            '<div class="step-badge">' + String.fromCharCode(65 + i) + '</div>' +
            '<div class="step-content">' +
                '<h4>' + step.title + ' <span style="color:#8d6e63;font-weight:400;font-size:0.82rem;">(' + step.time + ')</span></h4>' +
                step.body +
            '</div>';
        assemblyContainer.appendChild(div);
    });

    // ── Print page link ──
    document.getElementById('printPageLink').href = 'tasks-print.html';
});

function renderSkittleDots(perEgg, count) {
    var html = '';
    for (var i = 0; i < count; i++) {
        html += '<span class="skittle-dot skittle-' + perEgg + '" title="' + perEgg + ' Skittle' + (perEgg > 1 ? 's' : '') + '"></span>';
    }
    return html;
}

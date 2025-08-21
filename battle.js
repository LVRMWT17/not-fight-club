const selectedCharacter = localStorage.getItem('selectedCharacter');
let characterImage = '';
    switch (selectedCharacter) {
        case 'CodeName: "Uno"':
            characterImage = 'assets/Uno.png';
            break;
        case 'CodeName: "Dos"':
            characterImage = 'assets/Dos.jpg';
            break;
        case 'CodeName: "Tres"':
            characterImage = 'assets/Tres.png';
            break;
        case 'CodeName: "Tira"':
            characterImage = 'assets/Tira.jpg';
            break;
        case 'CodeName: "Jevaro"':
            characterImage = 'assets/Jevaro.png';
            break;
        default:
    }

    function addUserIcons() {
        const userHero = document.querySelector('.hero');
        const currentHero = localStorage.getItem("newName");
            const img = document.createElement('img');
            img.src = characterImage;
            img.alt = selectedCharacter;
            img.style.width = '320px';
            img.style.height = '390px';
            img.style.borderRadius = '30px';
            img.style.verticalAlign = 'middle';
            img.style.marginLeft = '30px';
            img.style.marginTop = '45px';
            userHero.appendChild(img);
            const nameElement = document.createElement('p');
            nameElement.textContent = currentHero;
            userHero.appendChild(nameElement);
    }

    addUserIcons();

const enemyPhoto = [
    { id: 1, name: 'Carat', img: 'assets/Carat.png' },
    { id: 2, name: 'Lazurit', img: 'assets/Lazurit.png' },
    { id: 3, name: 'Ruby', img: 'assets/Ruby.png' },
    { id: 4, name: 'Wolfire', img: 'assets/Wolfire.png' },
    { id: 5, name: 'Fizz', img: 'assets/Fizz.png' }
];

let currentEnemyIndex = localStorage.getItem('currentEnemyIndex');

if (currentEnemyIndex === null) {
    currentEnemyIndex = 0;
} else {
    currentEnemyIndex = parseInt(currentEnemyIndex, 10);
}

const enemyDiv = document.getElementById('enemy');
const currentEnemy = enemyPhoto[currentEnemyIndex];
enemyDiv.innerHTML = `<p>${currentEnemy.name}</p><img src="${currentEnemy.img}" alt="${currentEnemy.name}">`;

const defenceCheckboxes = document.querySelectorAll('.defence input[type="checkbox"]');

defenceCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const checkedCheckboxes = document.querySelectorAll('.defence input[type="checkbox"]:checked');
        if (checkedCheckboxes.length >= 2) {
            defenceCheckboxes.forEach(cb => {
                if (!cb.checked) {
                    cb.disabled = true;
                }
            });
        } else {
            defenceCheckboxes.forEach(cb => {
                cb.disabled = false;
            });
        }
    });
});

const characters = {
    Uno: { attack: 15, defense: 10 },
    Dos: { attack: 15, defense: 15 },
    Tres: { attack: 15, defense: 20 },
    Tira: { attack: 20, defense: 10 },
    Jevaro: { attack: 10, defense: 15 }
};

const enemies = {
    Carat: { attack: 10, defense: 10, attackPoints: 1, defensePoints: 2 },
    Lazurit: { attack: 10, defense: 15, attackPoints: 2, defensePoints: 2 },
    Ruby: { attack: 10, defense: 10, attackPoints: 1, defensePoints: 3 },
    Wolfire: { attack: 5, defense: 10, attackPoints: 3, defensePoints: 1 },
    Fizz: { attack: 10, defense: 15, attackPoints: 2, defensePoints: 1 }
};

let playerHP = parseFloat(localStorage.getItem('playerHP')) || 150;
let enemyHP = parseFloat(localStorage.getItem('enemyHP')) || 150;
let playerCriticalHit = false;
let enemyCriticalHit = false;

function updateHealthBars() {
    const heroHPBar = document.querySelector('.hero-hp');
    const enemyHPBar = document.querySelector('.enemy-hp');
    const heroHPText = document.querySelector('.hero-hp-numbers');
    const enemyHPText = document.querySelector('.enemy-hp-numbers');
    const maxHP = 150;

    heroHPBar.style.width = `${(playerHP / maxHP) * 100}%`;
    enemyHPBar.style.width = `${(enemyHP / maxHP) * 100}%`;

    if (heroHPText) heroHPText.textContent = `${Math.max(playerHP, 0)}/${maxHP}`;
    if (enemyHPText) enemyHPText.textContent = `${Math.max(enemyHP, 0)}/${maxHP}`;
}

document.addEventListener('DOMContentLoaded', () => {
    loadLogs();
});

function loadLogs() {
    const logs = localStorage.getItem('gameLogs');
    if (logs) {
        document.querySelector('.logs').innerHTML = logs;
    }
}

function saveLogs() {
    const logsContent = document.querySelector('.logs').innerHTML;
    localStorage.setItem('gameLogs', logsContent);
}

function saveData() {
    localStorage.setItem('playerHP', playerHP);
    localStorage.setItem('enemyHP', enemyHP);
}

function attack() {
    let selectedCharacter = localStorage.getItem('selectedCharacter');
    selectedCharacter = selectedCharacter.replace(/\"/g, '').replace("CodeName: ", "").trim();
    const enemyKeys = Object.keys(enemies);
    const enemy = enemies[enemyKeys[currentEnemyIndex]];
    const enemyAttackZones = getRandomAttackZones(enemy.attackPoints);
    const enemyDefenseZones = getRandomDefenseZones(enemy.defensePoints).map(zone => zone.name.toLowerCase().trim());
    const enemyAttackValue = enemy.attack;
    const logs = document.querySelector('.logs');

    const attackZone = document.querySelector('input[name="attack-zone"]:checked');
    const defenseZones = Array.from(document.querySelectorAll('input[name="defence-zone"]:checked'));

    if (!attackZone || defenseZones.length < 2) {
        alert("Please select an attack zone and two defense zones.");
        return;
    }

    console.log(enemyDefenseZones)

    const playerAttackZone = attackZone.id.split('-')[1].trim();
    const playerAttackValue = characters[selectedCharacter].attack;

    let damageToEnemy = playerAttackValue;

    if (enemyDefenseZones.includes(playerAttackZone)) {
        damageToEnemy = 0;
        logs.innerHTML += `<p><strong>Player</strong> attacked <strong>Enemy</strong> in <strong>${playerAttackZone}</strong> but it was blocked!</p>`;
    } else {
        if (Math.random() < 0.2) {
            damageToEnemy *= 1.5; 
            logs.innerHTML += `<p><strong>Player</strong> attacked <strong>Enemy</strong> in <strong>${playerAttackZone}</strong> and dealt a critical hit of <strong>${damageToEnemy.toFixed(1)}</strong> damage!</p>`;
        } else {
            logs.innerHTML += `<p><strong>Player</strong> attacked <strong>Enemy</strong> in <strong>${playerAttackZone}</strong> and dealt <strong>${damageToEnemy}</strong> damage.</p>`;
        }
    }

    for (const enemyAttackZone of enemyAttackZones) {
    const zoneName = enemyAttackZone.name;
    let damageToPlayer = 0;
    const defended = defenseZones.some(
        cb => cb.id.split('-')[1] === zoneName
    );

    if (defended) {
        logs.innerHTML += `<p><strong>Enemy</strong> attacked <strong>Player</strong> in <strong>${zoneName}</strong> but it was blocked!</p>`;
    } else {
        damageToPlayer = enemyAttackValue;
        if (Math.random() < 0.2) {
            damageToPlayer *= 1.5;
            logs.innerHTML += `<p><strong>Enemy</strong> attacked <strong>Player</strong> in <strong>${zoneName}</strong> and dealt <strong>${damageToPlayer.toFixed(1)}</strong> critical damage!</p>`;
        } else {
            logs.innerHTML += `<p><strong>Enemy</strong> attacked <strong>Player</strong> in <strong>${zoneName}</strong> and dealt <strong>${damageToPlayer}</strong> damage.</p>`;
        }
    }
    playerHP -= damageToPlayer;
    }

    enemyHP -= damageToEnemy;

    if (enemyHP <= 0) {
        enemyHP = 0;
        displayVictoryMessage();
        return;
    }

    if (playerHP <= 0) {
        playerHP = 0;
        displayDefeatMessage();
        return;
    }

    updateHealthBars();
    saveData();
    saveLogs();

    document.querySelector('.hero-hp-numbers').textContent = `${Math.max(playerHP, 0)}/150`;
    document.querySelector('.enemy-hp-numbers').textContent = `${Math.max(enemyHP, 0)}/150`;
    logs.innerHTML += '<hr style="border: 1px solid white; margin: 10px 0;">';
}

updateHealthBars();

function getRandomAttackZones(num) {
    const zones = [
        { id: 'zone-head', name: 'head' },
        { id: 'zone-neck', name: 'neck' },
        { id: 'zone-body', name: 'body' },
        { id: 'zone-belly', name: 'belly' },
        { id: 'zone-legs', name: 'legs' }
    ];
    
    const selectedZones = new Set();
    const maxZones = Math.min(num, zones.length);
    
    while (selectedZones.size < maxZones) {
        const randomZone = zones[Math.floor(Math.random() * zones.length)];
        selectedZones.add(randomZone);
    }
    
    return Array.from(selectedZones);
}

function getRandomDefenseZones(num) {
    const zones = [
        { id: 'zone-head', name: 'head' },
        { id: 'zone-neck', name: 'neck' },
        { id: 'zone-body', name: 'body' },
        { id: 'zone-belly', name: 'belly' },
        { id: 'zone-legs', name: 'legs' }
    ];
    const selectedZones = new Set();
    while (selectedZones.size < num) {
        selectedZones.add(zones[Math.floor(Math.random() * zones.length)]);
    }
    return Array.from(selectedZones);
}

function displayVictoryMessage() {
    const victoryMessage = document.createElement('div');
    victoryMessage.classList.add('message-popup');
    victoryMessage.innerHTML = `<p>Congratulations! You defeated the enemy!</p><button onclick="nextEnemy()">Next Enemy</button>`;
    document.body.appendChild(victoryMessage);
    let wins = parseInt(localStorage.getItem('wins')) || 0;
    localStorage.setItem('wins', wins + 1);
}

function displayDefeatMessage() {
    const defeatMessage = document.createElement('div');
    defeatMessage.classList.add('message-popup');
    defeatMessage.innerHTML = `<p>Maybe next time. Try again!</p><button onclick="resetGame()">Try Again</button>`;
    document.body.appendChild(defeatMessage);

    let losses = parseInt(localStorage.getItem('losses')) || 0;
    losses += 1;
    localStorage.setItem('losses', losses);
}

function resetGame() {

    playerHP = 150;
    enemyHP = 150;

    updateHealthBars();
    document.querySelector('.logs').innerHTML = '';
    localStorage.removeItem('gameLogs');
    localStorage.removeItem('enemyHP');
    localStorage.removeItem('playerHP');
    const messagePopups = document.querySelectorAll('.message-popup');
    messagePopups.forEach(popup => popup.remove());
}

function nextEnemy() {
    currentEnemyIndex = (currentEnemyIndex + 1) % enemyPhoto.length;
    localStorage.setItem('currentEnemyIndex', currentEnemyIndex);
    const nextEnemy = enemyPhoto[currentEnemyIndex];
    enemyDiv.innerHTML = `<p>${nextEnemy.name}</p><img src="${nextEnemy.img}" alt="${nextEnemy.name}">`;
    enemyHP = 150;
    playerHP = 150;
    updateHealthBars();

    document.querySelector('.logs').innerHTML = '';
    localStorage.removeItem('gameLogs');
    localStorage.removeItem('enemyHP');
    localStorage.removeItem('playerHP');
    const messagePopups = document.querySelectorAll('.message-popup');
    messagePopups.forEach(popup => popup.remove());
}

document.querySelector('.attack-button').addEventListener('click', attack);
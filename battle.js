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

const enemies = [
    { id: 1, name: 'Carat', img: 'assets/Carat.png' },
    { id: 2, name: 'Lazurit', img: 'assets/Lazurit.png' },
    { id: 3, name: 'Ruby', img: 'assets/Ruby.png' },
    { id: 4, name: 'Wolfire', img: 'assets/Wolfire.png' },
    { id: 5, name: 'Fizz', img: 'assets/Fizz.png' }
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(enemies);
let currentEnemyIndex = localStorage.getItem('currentEnemyIndex');

if (currentEnemyIndex === null) {
    currentEnemyIndex = 0;
} else {
    currentEnemyIndex = parseInt(currentEnemyIndex, 10);
}

const enemyDiv = document.getElementById('enemy');
const currentEnemy = enemies[currentEnemyIndex];
enemyDiv.innerHTML = `<p>${currentEnemy.name}</p><img src="${currentEnemy.img}" alt="${currentEnemy.name}">`;

function nextEnemy() {
    if (currentEnemyIndex < enemies.length - 1) {
        currentEnemyIndex++;
        localStorage.setItem('currentEnemyIndex', currentEnemyIndex);
        const nextEnemy = enemies[currentEnemyIndex];
        enemyDiv.innerHTML = `<p>${nextEnemy.name}</p><img src="${nextEnemy.img}" alt="${nextEnemy.name}">`;
    } else {
    }
}

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
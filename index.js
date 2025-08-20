window.onload = function() {
            if (localStorage.getItem('selectedCharacter')) { 
                window.location.href = 'story.html';
            }
        };

let activeCard = null;

function activateCard(card) {
        if (activeCard) {
            activeCard.classList.remove('active-card');
            const prevImg = activeCard.querySelector('img');
            prevImg.style.transform = 'scale(1)';
            prevImg.style.width = '';
            prevImg.style.height = '';
            prevImg.style.marginLeft = '';
            prevImg.style.marginTop = '';
            const previousMenu = activeCard.querySelector('.menu');
            previousMenu.style.display = 'none';
        }
        activeCard = card;
        activeCard.classList.add('active-card');
        const cards = document.querySelectorAll('.character-card');
        const img = activeCard.querySelector('img');

        img.style.marginLeft = '25px';
        img.style.marginTop = '5px';
        img.style.width = '200px';
        img.style.height = '270px';

        const currentMenu = activeCard.querySelector('.menu');
        currentMenu.style.display = 'block';

        const characterName = activeCard.querySelector('.character-name').textContent;
        const nameInput = document.querySelector('.main-name input[type="text"]');
        nameInput.placeholder = characterName;

        cards.forEach(c => {
            if (c !== activeCard) {
                c.classList.add('collapsed');
                const menu = c.querySelector('.menu');
                menu.style.display = 'none';
            } else {
                c.classList.remove('collapsed');
            }
        });
}

const enemy = [
    { id: 1, name: 'Carat', img: 'assets/Carat.png' },
    { id: 2, name: 'Lazurit', img: 'assets/Lazurit.png' },
    { id: 3, name: 'Ruby', img: 'assets/Ruby.png' },
    { id: 4, name: 'Wolfire', img: 'assets/Wolfire.png' },
    { id: 5, name: 'Fizz', img: 'assets/Fizz.png' }
];

function assignRandomEnemy() {
    const randomIndex = Math.floor(Math.random() * enemy.length);
    localStorage.setItem('currentEnemyIndex', randomIndex);
}

document.getElementById('create-button').addEventListener('click', function() {
        const nameInput = document.querySelector('.main-name input[type="text"]');
        const newName = nameInput.value.trim();
        const selectedCharacter = activeCard ? activeCard.querySelector('.character-name').textContent : '';

        if (activeCard && newName) {
            localStorage.setItem('selectedCharacter', selectedCharacter);
            localStorage.setItem('newName', newName);

            assignRandomEnemy();

            window.location.href = 'story.html';
        } else {
            alert('Please, select a character and enter a new name.');
        }
    });


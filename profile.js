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
            console.warn('No character selected');
    }

    function addUserIcon() {
        const userHero = document.querySelector('.user-profile');
        const currentHero = localStorage.getItem("newName");
        
        const img = document.createElement('img');
        img.src = characterImage;
        img.alt = selectedCharacter;
        img.style.width = '320px';
        img.style.height = '390px';
        img.style.borderRadius = '30px';
        img.style.verticalAlign = 'middle';
        img.style.marginLeft = '55px';
        img.style.marginTop = '45px';
        userHero.appendChild(img);

        const nameElement = document.createElement('p');
        const userName = localStorage.getItem('newName');
        nameElement.textContent = userName;
        userHero.appendChild(nameElement);

        const wins = document.createElement('p');
        const loses = document.createElement('p');
        const userWins = parseInt(localStorage.getItem('wins')) || 0;
        const userLoses = parseInt(localStorage.getItem('losses')) || 0;
        wins.textContent = `Total Wins: ${userWins}`;
        loses.textContent = `Total Losses: ${userLoses}`;
        userHero.appendChild(wins);
        userHero.appendChild(loses);
    }

    addUserIcon();

    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    document.querySelectorAll('.select').forEach(selectButton => {
        selectButton.addEventListener('click', () => {
            const characterCard = selectButton.parentElement;
            const textDiv = characterCard.querySelector('div');
            const fullText = textDiv.textContent;
            const codeNameMatch = fullText.match(/CodeName:\s*"([^"]+)"/);
            const codeName = codeNameMatch ? `CodeName: "${codeNameMatch[1]}"` : fullText;
            localStorage.setItem('selectedCharacter', codeName);
            updateCharacterSelection();
            updateCharacterImage(codeName);
            location.reload();
        });
    });

    function getCodeName(characterCard) {
        const textDiv = characterCard.querySelector('div');
        const fullText = textDiv.textContent;
        const codeNameMatch = fullText.match(/CodeName:\s*"([^"]+)"/);
        return codeNameMatch ? `CodeName: "${codeNameMatch[1]}"` : fullText;
    }

    function updateCharacterSelection() {
        const selectedCharacter = localStorage.getItem('selectedCharacter');
        
        document.querySelectorAll('.allProtagonists > div').forEach(characterCard => {
            const codeName = getCodeName(characterCard);
            characterCard.classList.toggle('active', codeName === selectedCharacter);
        });
    }

    function updateCharacterImage(selectedCharacter) {
        const userHero = document.querySelector('.user-profile');
        userHero.innerHTML = '';
        addUserIcon();
    }

    updateCharacterSelection();

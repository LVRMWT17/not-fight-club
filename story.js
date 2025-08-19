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
        const userDialogs = [document.querySelector('.dialog2'), document.querySelector('.dialog4'), document.querySelector('.dialog5')];
        
        userDialogs.forEach(dialog => {
            const img = document.createElement('img');
            img.src = characterImage;
            img.alt = selectedCharacter;
            img.style.width = '130px';
            img.style.height = '130px';
            img.style.marginBottom = '20px';
            img.style.borderRadius = '90px';
            img.style.verticalAlign = 'middle';
            dialog.appendChild(img);
        });
    }

    addUserIcons();

    document.getElementById('fight-button').addEventListener('click', function() {
            window.location.href = 'battle.html';
});
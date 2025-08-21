document.getElementById('changeNameBtn').addEventListener('click', function() {
            const playerName = document.getElementById('playerNameInput').value;
            if (playerName) {
                localStorage.setItem('newName', playerName);
                alert('Success!');
            } else {
                alert('Enter new name.');
            }
        });

document.getElementById('resetProgressBtn').addEventListener('click', function() {
        if (confirm('Are you sure?')) {
            localStorage.clear();
            location.replace('index.html');
            }
        });
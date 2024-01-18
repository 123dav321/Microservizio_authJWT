    function login() {
        const userName = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Esegui la richiesta POST per ottenere il token
        fetch('https://localhost:9192/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            
            },
            body: JSON.stringify({ userName, password }),
        })
        .then(response => response.text())
        .then(token => {
			console.log('Token ricevuto:', token);
			
            // Salva il token nel localStorage
            localStorage.setItem('jwt', token);

			// Redirect o esegui altre azioni dopo il login
            	window.location.href = '/home.html';
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    document.getElementById('loginButton').addEventListener('click', function() {
    login();
});
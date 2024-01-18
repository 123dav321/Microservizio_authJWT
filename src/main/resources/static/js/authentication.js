//Funzione per ottenere il token JWT dal localStorage
	function getJwtToken(){
		return localStorage.getItem('jwt');	
	}
	
    // Funzione per effettuare richieste autenticate
    function makeAuthenticatedRequest(url, method) {
        const token = getJwtToken();

        // Assicurati di avere il token prima di effettuare la richiesta
        if (token) {
            fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.text())
            .then(result => {
                // Gestisci la risposta o esegui altre azioni
                console.log(result);
                
            })
            .catch(error => {
                console.error('Error:', error);
           });
        } else {
            console.error('Token JWT non presente nel localStorage.');
        }
    }

    // Funzione per gestire l'accesso alla risorsa protetta
    function accessProtectedResource() {
        // Sostituisci con l'URL dell'endpoint della risorsa protetta
        makeAuthenticatedRequest('https://localhost:9192/risorsaProtetta', 'GET');
    }
   // Aggiungi un listener per l'evento di clic sul link protetto
    document.getElementById('protectedLink').addEventListener('click', accessProtectedResource);

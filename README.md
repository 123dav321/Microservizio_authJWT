# Microservizio con autenticazione JWT

Creazione di un microservizio che integra l'autenticazione basata su JSON Web Token (JWT) utilizzando Spring Boot (v2.2.2). L'applicazione è implementata tramite Spring Security in combinazione con la libreria jjwt per la gestione dei token JWT, e si avvale di un database H2 per la memorizzazione degli utenti. All'avvio, vengono precaricati dati di prova nel database per scopi di testing. È inoltre fornito un front-end di esempio per verificare il corretto funzionamento dell'applicazione. L'applicazione permette di configurare SSL per garantire la sicurezza delle comunicazioni.


## Installazione

L'applicazione farà uso di Java 1.8.

A seconda dell'ambiente di sviluppo utilizzato, come Eclipse o IntelliJ IDEA, i passaggi potrebbero variare, semplificando eventualmente il processo di installazione rispetto all'utilizzo del solo terminale. In linea generale, è necessario prima verificare l'installazione corretta di tutte le dipendenze tramite Maven e, successivamente, sarà possibile avviare il progetto Spring Boot.


## Configurazione

Nell "application.yml" è possibile configurare la porta da utilizzare con:

        server:
            port: 9192

Di default l'applicazione è impostata per usare la 9192.

La chiave segreta usata per il JWT è stata salvata momentaneamente per lo sviluppo e il test, nell'application.propteries sotto la voce:

        jwt.secret

E' buona norma non scrivere mai nel codice chiavi segrete usate per la cifratura dei dati, l'ideale è usare altri sistemi, come l'uso di variabili di ambiente.

L'applicazione consente l'uso di SSL per la cifratura dei dati, è possibile usarlo togliendo i commenti nell'application properties:

    server.ssl.key-store-type
    server.ssl.key-store
    server.ssl.key-store-password
    server.ssl.key-alias

ed inserendo i valori corretti in base al keystore utilizzato, che andrà salvato nella'albero delle cartelle del progetto. 
Bisognerà scommentare le righe di codice presenti nella "SecurityConfiguration" in "configure":

        .requiresChannel()
        .anyRequest()
        .requiresSecure()
        .and()

ed nel front-end modificare URL per l'uso di https.



## Utilizzo

Dopo aver avviato l'applicazione, per ottenere un JWT bisognerà prima autenticarsi con un nome utente e password.

Questa sarà la pagina iniziale di esempio, dove abbiamo un link al form per il login e uno per accedere alla risorsa disponibile solo se in possesso di un JWT.

![immagine](https://github.com/123dav321/Microservizio_authJWT/assets/156787522/cf38eb83-2d71-4cd7-9c4d-f95c6f911140)

Questa è la pagina che ospita il form per l'autenticazione, bisognerà inserire delle credenziali valide per ottenere un JWT. 

![immagine](https://github.com/123dav321/Microservizio_authJWT/assets/156787522/b51b2ddc-7b7c-4c53-84a3-6c00190c49c6)

Se l'autenticazione è andata a buon fine, verrà salvato nel Local Storage del browser il token sotto la voce "jwt". 

![immagine](https://github.com/123dav321/Microservizio_authJWT/assets/156787522/cb39deed-9be2-44ef-b211-d34d3407a263)

(Su google chroome apparirà così)

D'ora in poi tutte quelle risorse che richiedono l'uso di un JWT lo andranno a prelevare dal browser e andranno a verificare la sua validità.

Cliccando sul link risorsaProtetta è possibile vedere nella console del browser il messaggio restituito

![immagine](https://github.com/123dav321/Microservizio_authJWT/assets/156787522/42808a6c-aef0-4b3c-8ee7-9d578af48df7)

Nel caso di studio in questione non si è andati ad usare una risorsa in particolare e ci si è limitati ad un semplice messaggio, in base alle esigenze, sarà possibile cambiare questa risorsa, il tutto senza modificare il comportamente generale dell'applicazione

Nel caso provassimo ad accedere senza un jwt valido, otteremo nella console il seguente messaggio di errore:

![immagine](https://github.com/123dav321/Microservizio_authJWT/assets/156787522/c42b85e9-24cf-45c4-8fcf-13fbbf5c7b2f)


## Funzionamento generale

Nel processo di autenticazione iniziale, effettuato tramite la richiesta POST all'endpoint "/authenticate", le credenziali dell'utente vengono trasmesse nell'header in formato JSON come segue:

    {
      "userName": "nome",
      "password": "password"
    }

Una volta che il microservizio ha verificato la validità delle credenziali, procede alla generazione del JSON Web Token (JWT). Questo token contiene il nome utente, la data di creazione e la data di scadenza (impostata a 10 ore) ed è firmato mediante l'algoritmo H512.

Il JWT viene successivamente memorizzato nel browser in "Local Storage" con l'etichetta "jwt". Quando si desidera accedere agli endpoint protetti, il JWT viene incluso nell'header della richiesta nel seguente modo:

    Authorization: Bearer "jwt"


 

# Microservizio con autenticazione JWT

Realizzazione di un microservizio che implementa l'autenticazione basata su JSON Web Token (JWT), con Spring Boot e Spring Security, con un front-end di esempio per verificarne il funzionamento.

## Requisiti

- Java 1.8 
- Maven 4.0.0

## Installazione

Con Maven assicurarsi che tutte le dipendense vengano installate correttamente con:
mvn install

Successivamente è possibile avviare il progetto Spring Boot

## Configurazione

Nell "application.yml" è possibile configurare la porta da utilizzare con:
server:
    port: 9192

Di default l'applicazione è impostata per usare la 9192.

La chiave segreta usata per il JWT è stata salvata momentaneamente per lo sviluppo e il test nell'application.propteries sotto la voce:
jwt.secret

E' buona norma non scrivere mai nel codice informazioni sensibili come le chiavi di cifratura, l'ideale è usare altri sistemi, come l'uso di variabili di ambiente.

L'applicazione consente l'uso di SSL per la cifratura dei dati, è possibile usarlo scommentando nell'application properties:

server.ssl.key-store-type
server.ssl.key-store
server.ssl.key-store-password
server.ssl.key-alias

ed iserendo i valori corretti in base al keystore utilizzato, successivamente quest'ultimo andrebbe certificato da qualche ente.
Successivamente bisognerà scommentare le righe di codice presenti nella "SecurityConfiguration" in "configure":

        .requiresChannel()
        .anyRequest()
        .requiresSecure()
        .and()

Successivamente bisognerà indicare nel front-end negli URL l'uso del https.

## Utilizzo

Dopo aver avviato l'applicazione, per ottenere un JWT bisognerà prima autenticarsi con un nome utente e password.

Questa sarà la pagina iniziale, dove abbiamo un link al form per il login e uno per accedere alla risorsa disponibile solo se in possesso di un JWT.
![immagine](https://github.com/123dav321/Microservizio_authJWT/assets/156787522/cf38eb83-2d71-4cd7-9c4d-f95c6f911140)

Questa è la pagina che ospita il form per l'autenticazione, bisognerà inserire delle credenziali valide per ottenere un JWT. 
![immagine](https://github.com/123dav321/Microservizio_authJWT/assets/156787522/b51b2ddc-7b7c-4c53-84a3-6c00190c49c6)

Se l'autenticazione è andata a buon fine, verrà salvato nel Local Storage del browser il token sotto la voce "jwt". 
D'ora in poi tutte quei endpoint che richiedono l'uso di un JWT lo andranno a prelevare dal browser e andranno a verificare la sua validità.

Cliccando sul link risorsaProtetta è possibile vedere nella console del browser il messaggio restituito
![immagine](https://github.com/123dav321/Microservizio_authJWT/assets/156787522/42808a6c-aef0-4b3c-8ee7-9d578af48df7)

Nel caso di studio in questione non si è andati ad usare una risorsa in particolare e ci si è limitati ad un semplice messaggio, in base alle esigenze, è possibile in un secondo momeno cambiare questa risorsa, il tutto senza modificare il comportamente generale dell'applicazione

Nel caso provassimo ad accedere senza un jwt valido otteremo nella console il seguente messaggio di errore:
![immagine](https://github.com/123dav321/Microservizio_authJWT/assets/156787522/c42b85e9-24cf-45c4-8fcf-13fbbf5c7b2f)


## Funzionamento


 

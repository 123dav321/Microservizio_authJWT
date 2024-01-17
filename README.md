# Microservizio con autenticazione JWT

Realizzazione di un microservizio che implementa l'autenticazione basata su JSON Web Token (JWT), con Spring Boot(v2.2.2), Spring Security e jjwt, con un front-end di esempio per verificare il funzionamento insieme a dei dati precaricati all'avvio dell'applicazione, e rimossi alla sua chiusura.

## Dettagli

- Java 1.8 
- database: H2

## Installazione

Con Maven assicurarsi che tutte le dipendense vengano installate correttamente con:

        mvn install

Successivamente è possibile avviare il progetto Spring Boot

        mvn spring-boot:run

In base all'ambiente di sviluppo che si sta utilizzando (Eclipse, IntelliJ IDEA ecc.) i passaggi possono essere diversi.

## Configurazione

Nell "application.yml" è possibile configurare la porta da utilizzare con:

        server:
            port: 9192

Di default l'applicazione è impostata per usare la 9192.

La chiave segreta usata per il JWT è stata salvata momentaneamente per lo sviluppo e il test, nell'application.propteries sotto la voce:

        jwt.secret

E' buona norma non scrivere mai nel codice chiavi segrete usate per la cifratura dei dati, l'ideale è usare altri sistemi, come l'uso di variabili di ambiente.

L'applicazione consente l'uso di SSL per la cifratura dei dati, è possibile usarlo scommentando nell'application properties:

    server.ssl.key-store-type
    server.ssl.key-store
    server.ssl.key-store-password
    server.ssl.key-alias

ed inserendo i valori corretti in base al keystore utilizzato, che andrà salvato nella'albero delle cartelle del progetto. Successivamente certificato da qualche ente per il correto funzionamento.
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

Nell'autenticazione iniziale, all'endpoint "/authenticate" in una richiesta POST, nell'header in formato JSON verrano mandate le credenziali dell'utente:

    {
      "userName": "nome",
      "password": "password"
    }

Il microservizio una volta verificata la veridicità delle credenziali, genera il jwt. 
Il JWT è generato con il nome utente, la data di creazione e la data di scadenza (10 ore), firmato con un algoritmo H512.
Il token verrà salvato nel browser in "Local Storage" con la voce "jwt". Quando si desiderà accedere ad endpoint protetti, il jwt verrà inviato nell'header della richiesta nel modo seguente:

    Authorization: Bearer "jwt"


 

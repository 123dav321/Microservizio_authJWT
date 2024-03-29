# Microservizio con autenticazione JWT

Creazione di un microservizio che integra l'autenticazione basata su JSON Web Token (JWT) utilizzando Spring Boot. L'applicazione è implementata tramite Spring Security in combinazione con la libreria jjwt per la gestione dei token JWT, e si avvale di un database H2 per la memorizzazione degli utenti. All'avvio, vengono precaricati dati di prova nel database per scopi di testing. È inoltre fornito un front-end di esempio per verificare il corretto funzionamento dell'applicazione. L'applicazione permette di configurare SSL per garantire la sicurezza delle comunicazioni.


## Installazione

L'applicazione farà uso di Java 1.8.

A seconda dell'ambiente di sviluppo utilizzato, come Eclipse o IntelliJ IDEA, i passaggi potrebbero variare, semplificando eventualmente il processo di installazione rispetto all'utilizzo del solo terminale. In linea generale, è necessario prima verificare l'installazione corretta di tutte le dipendenze tramite Maven e, successivamente, sarà possibile avviare il progetto Spring Boot.


## Configurazione

Nel file "application.yml" è possibile configurare la porta da utilizzare mediante il seguente codice:
```
server:
    port: 9192
```
Di default, l'applicazione è impostata per utilizzare la porta 9192.


La chiave segreta utilizzata per il JSON Web Token (JWT) è temporaneamente salvata nell'"application.properties" sotto la voce:
```
jwt.secret
```
È consigliabile evitare di scrivere chiavi segrete direttamente nel codice per motivi di sicurezza. L'approccio ideale consiste nell'utilizzare altri metodi, come l'uso di un gestore di chiavi. La scelta dell'approccio più appropriato dipenderà dalle specifiche esigenze d'uso.

### SSL
L'applicazione supporta già l'utilizzo di SSL per la cifratura dei dati e la configurazione può essere personalizzata tramite il file "application.properties". I parametri chiave per la configurazione di SSL sono i seguenti:
```
server.ssl.key-store-type= type
server.ssl.key-store= percorso_keystore
server.ssl.key-store-password= psw
server.ssl.key-alias= alias_certificato
```
Dove è possibile inserire i valori desiderati.

<br>
Se si vuole disabilitarlo per motivi di test (siccome nel repository GitHub non è stato inserito un keystore), basta commentare le righe viste in precedenza insieme alle seguenti in "SecurityConfiguration" in "configure":

```
.requiresChannel()
.anyRequest()
.requiresSecure()
.and()
```
Infine, nel front-end, modificare tutti gli URL per far sì che usino HTTP.

<br>
Un metodo comunque facile per ottenere un keystore autofirmato che può essere usato per fini di test è attraverso la JDK con il comando:

```
keytool -genkeypair -keyalg RSA -keysize 2048 -keystore keystore.p12 -storetype PKCS12 -validity 365 -storepass password -keypass password -dname "CN=YourName, OU=YourOrgUnit, O=YourOrg, L=YourCity, ST=YourState, C=YourCountry"
```


## Utilizzo

Dopo aver avviato l'applicazione, è necessario autenticarsi con un nome utente e password per ottenere un JSON Web Token (JWT).

La pagina iniziale di esempio è raggiungibile da https://localhost:9192/home.html e presenta un link al form di login e un altro per accedere a una risorsa disponibile solo con un JWT.

![immagine](https://github.com/123dav321/Microservizio_authJWT/assets/156787522/51379035-54d5-4aa7-9653-75b3cfc8bccc)

La pagina di autenticazione ospita il form in cui è necessario inserire credenziali valide per ottenere il JWT. In caso di successo, il token viene salvato nel "Local Storage" del browser con l'etichetta "jwt".

![immagine](https://github.com/123dav321/Microservizio_authJWT/assets/156787522/b51b2ddc-7b7c-4c53-84a3-6c00190c49c6)
![immagine](https://github.com/123dav321/Microservizio_authJWT/assets/156787522/cb39deed-9be2-44ef-b211-d34d3407a263)


<br>

Da questo momento in poi, le risorse che richiedono un JWT lo prelevano dal browser e ne verificano la validità. Cliccando sul link "risorsaProtetta" è possibile visualizzare nella console del browser il messaggio restituito.


![immagine](https://github.com/123dav321/Microservizio_authJWT/assets/156787522/42808a6c-aef0-4b3c-8ee7-9d578af48df7)


Nel caso di questo caso studio, è stato utilizzato solo un semplice messaggio. A seconda delle esigenze, è possibile cambiare questa risorsa senza modificare il comportamento generale dell'applicazione.


Se si tenta di accedere senza un JWT, verrà visualizzato nella console del browser il seguente messaggio di errore:
![immagine](https://github.com/123dav321/Microservizio_authJWT/assets/156787522/c42b85e9-24cf-45c4-8fcf-13fbbf5c7b2f)



<br>

## Funzionamento generale

Nel processo di autenticazione iniziale, effettuato tramite la richiesta POST all'endpoint "/authenticate", le credenziali dell'utente vengono trasmesse nell'header in formato JSON come segue:

```
{
"userName": "nome",
"password": "password"
}
```

Una volta che il microservizio ha verificato la validità delle credenziali, procede alla generazione del JSON Web Token (JWT). Questo token contiene il nome utente, la data di creazione e la data di scadenza (impostata a 10 ore) ed è firmato mediante l'algoritmo HS512.

Il JWT viene successivamente memorizzato nel browser in "Local Storage" con l'etichetta "jwt". Quando si desidera accedere agli endpoint protetti, il JWT viene incluso nell'header della richiesta nel seguente modo:

```
Authorization: Bearer "jwt"
```

 

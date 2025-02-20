_Dutch version below

### English Version

# Spotify Janitor

Spotify Janitor is a web application built to help you manage and clean up your Spotify library. It allows you to log in with your Spotify account, retrieve your saved tracks (complete with album artwork, title, artist, etc.), and search through your saved tracks by artist or track title. The app also lets you swipe a track to the right to remove it from your saved tracks, and it shows an undo button so you can quickly re-add a track if needed. Additionally, the app saves your login so you don’t have to sign in every time, and it features a profile screen where you can view your profile image, premium status, name, country, etc. You can also search the entire Spotify library by title or artist and save a track by pressing a "add" button on the search results.

## Table of Contents
1. Setup  
2. Technologies and Libraries  
3. Challenges and Hard Choices  
4. Additional Notes

## Setup

To get started with Spotify Janitor after cloning the repository:  
1. **Clone the repository:**  
   git clone https://github.com/Temojikato/spotifyjanitor.git  
   cd spotify-janitor  
2. **Install dependencies:**  
   npm install  
3. **Start the development server:**  
   npm start  
   This will run the app locally. Open http://localhost:3000 in your browser.  
4. **Run tests:**  
   npm test

## Stack and Libraries

I built Spotify Janitor using React and TypeScript, which provide a modern, component-based architecture and strong type safety. Since there was no specification and you were interested in my thought process, I relied on my own knowledge to decide. I considered Angular, but it just wouldn’t make sense for this project. Angular is meant for full-stack solutions where everything is under one roof. In this case, however, by design the app will never need such features and React keeps it lightweight with simpler libraries. I used Material-UI (MUI) to create a sleek, responsive UI with a rich set of pre-built components. Axios is used for HTTP requests to the Spotify API because of its promise-based design and ease of use. CRACO allowed us to customize the default Create React App configuration (especially for Babel and Jest) without ejecting, which was essential for handling module transformations. Our testing stack includes Jest and React Testing Library, ensuring that our tests simulate user interactions accurately. Framer Motion provides smooth animations for modals and interactive elements, and Localforage handles local caching to reduce redundant API calls.

## Challenges and Hard Choices

During development, I faced challenges with ES module syntax and Babel configuration, particularly when dealing with dependencies like Axios. Custom mocks and adjustments to our testing and build configurations were necessary to resolve these issues. Setting up a robust testing environment involved properly mocking libraries like react-router-dom and Axios to simulate real user interactions without affecting production behavior, while ensuring we adhere to all library requirements. Using CRACO for customization was a familiar and easy way to balance default configurations with our custom needs within the testing environments. I also had to carefully simulate realistic API responses while keeping our tests isolated and maintainable.

## Additional Notes

Spotify Janitor minimizes unnecessary API calls by using an offline data store to cache data once it is fetched; however, a refresh operation always pulls fresh data from the API. The app is deployed at https://spotifyjanitor.web.app so you can experience its full functionality without any local setup if you prefer.



### Dutch Version

# Spotify Janitor

Spotify Janitor is een webapplicatie gebouwd om je te helpen bij het beheren en opschonen van je Spotify-bibliotheek. De app laat je inloggen met je Spotify-account, je opgeslagen nummers (inclusief album foto, titel, artiest, etc.) ophalen en door je opgeslagen nummers zoeken op artiest of titel. De app laat je ook een nummer naar rechts swipen om het uit je opgeslagen nummers te verwijderen en toont een undo-knop zodat je snel een nummer opnieuw kunt toevoegen. Bovendien slaat de app je login op zodat je niet elke keer opnieuw hoeft in te loggen en beschikt het over een profielscherm waarop je je profielfoto, premiumstatus, naam, land, etc. kunt bekijken. Je kunt ook de volledige Spotify-bibliotheek doorzoeken op titel of artiest en een nummer opslaan door op een "add" knop in de zoekresultaten te drukken.

## Setup

Om aan de slag te gaan met Spotify Janitor:

1. Clone de repository:  
   git clone https://github.com/Temojikato/spotifyjanitor.git  
   cd spotify-janitor

2. Installeer dependencies:  
   npm install

3. Start de ontwikkelserver:  
   npm start  
   Hiermee wordt de app lokaal uitgevoerd. Open http://localhost:3000 in je browser.

4. Voer tests uit:  
   npm test

## Stack en Libraries

Ik heb Spotify Janitor gebouwd met React en TypeScript, die een moderne, componentgebaseerde architectuur en sterke typeveiligheid bieden. Aangezien er geen specifieke specificatie was en er interesse was in mijn denkwijze, heb ik op mijn eigen kennis vertrouwd. Ik heb aan Angular gedacht, maar dat zou voor dit project simpelweg niet logisch zijn. Angular is bedoeld voor full-stack oplossingen waarbij alles onder één dak zit. In dit project zal de app dergelijke functies nooit nodig hebben en houdt React het lichter en eenvoudiger in gebruik. Ik heb Material-UI (MUI) gebruikt om een strak, responsief UI te creëren met een rijke set aan vooraf gebouwde componenten. Axios wordt gebruikt voor HTTP-verzoeken naar de Spotify API vanwege het promise-gebaseerde ontwerp en het gebruiksgemak. CRACO heeft ons in staat gesteld de standaard Create React App-configuratie (voor Babel en Jest) aan te passen zonder te ejecten, wat essentieel was voor het omgaan met module-transformaties terwijl we het zo simpel mogelijk houden. Onze teststack bestaat uit Jest en React Testing Library, wat ervoor zorgt dat onze tests gebruikersinteracties nauwkeurig simuleren. Framer Motion zorgt voor vloeiende animaties voor modals en interactieve elementen en Localforage verzorgt lokale caching om overbodige API-aanroepen te verminderen.

## Uitdagingen en Keuzes

Tijdens de ontwikkeling stuitte ik op uitdagingen met ES-module syntax en Babel-configuratie, vooral bij het werken met dependencies zoals Axios. Custom mocks en aanpassingen in onze test- en buildconfiguraties waren noodzakelijk om deze problemen op te lossen. Het opzetten van een robuuste testomgeving vereiste het correct mocken van libraries zoals react-router-dom en Axios, zodat echte gebruikersinteracties gesimuleerd konden worden zonder de productieomgeving te beïnvloeden. Het gebruik van CRACO voor aanpassing bleek een vertrouwde en eenvoudige manier om de standaardconfiguraties in balans te brengen met onze eigen behoeften binnen de testomgevingen. Bovendien moest ik realistische API-responses zorgvuldig simuleren terwijl ik de tests geïsoleerd en onderhoudbaar hield.

## Additional Notes

Spotify Janitor minimaliseert onnodige API-aanroepen door een offline datastore te gebruiken voor caching zodra data is opgehaald; een refresh-operatie haalt echter altijd verse data op van de API. De app is gedeployed op https://spotifyjanitor.web.app, zodat je de volledige functionaliteit kunt ervaren zonder dat je lokaal een setup hoeft te doen.

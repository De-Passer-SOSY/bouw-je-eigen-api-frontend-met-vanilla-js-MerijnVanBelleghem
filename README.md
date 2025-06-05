# Backend opstarten
Voer uit in console:
* cd backend
* node app.js

Nu is de database gestart op http://localhost:3333/

---
# Onderwerp
De database bevat meer dan 1000 echte piano's. De meegegeven gegevens zijn: het merk, model, type, bouwjaar en prijs.

---
# Endpoints

Plaats de endpoint achter http://localhost:3333/

Bijvoorbeeld: http://localhost:3333/pianos

`/pianos` Geeft een lijst van alle piano's

`/piano/:id` Geeft de piano met een specifiek id weer

`/newPiano` Voeg een nieuwe piano toe (enkel via Postman)

`/updatePiano/:id` Update een piano met een specifiek id (enkel via Postman)

`/deletePiano/:id` Verwijder een piano met een specifiek id (enkel via Postman)


---
# Frontend

De frontend bevat de volgende functies:
* Pianos bekijken
* Piano's toevoegen
* Piano's verwijderen
* Piano's bewerken

---
# Swagger documentatie

De Swagger documentatie is te vinden bij het endpoint:
`/api-docs`
"use strict";

document.addEventListener('DOMContentLoaded', init)

function init(){
    fetchPianos();
    console.log("Website ingeladen")

    //knoppen toevoegen
    const form = document.getElementById('piano-form');
    const formWrapper = document.getElementById('form-wrapper');
    const openFormBtn = document.getElementById('open-form-btn');

    // Functionaliteit voor formulier om nieuwe piano toe te voegen
    openFormBtn.addEventListener('click', () => {
        formWrapper.classList.remove('hidden');
        formWrapper.scrollIntoView({behavior: 'smooth'});
        resetForm()

    });
    form.addEventListener('submit', handleFormSubmit);
}

async function fetchPianos(){
    try {
        const response = await fetch('http://localhost:3333/pianos')
        const data = await response.json()
        console.log("piano data opgehaald")

        displayPianos(data)
    }catch(error){
        console.log("Fout bij ophalen van API: ", error)
    }
}

function displayPianos(pianos){
    try {
        const list = document.getElementById("pianos-list");
        list.innerHTML = '';

        pianos.forEach(piano => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${piano.merk}</td>
            <td>${piano.model}</td>
            <td>${piano.type}</td>
            <td>${piano.bouwjaar}</td>
            <td>${piano.prijs}</td>
            <td>
                <button class="edit-btn" data-id="${piano.id}">Wijzig</button>
                <button class="delete-btn" data-id="${piano.id}">Verwijder</button>
            </td>
            `;

            row.querySelector('.edit-btn').addEventListener('click', () => editPiano(piano.id));
            row.querySelector('.delete-btn').addEventListener('click', () => deletePiano(piano.id));

            list.appendChild(row);
        });
    } catch (error) {
        console.log("Fout bij tonen van piano's", error);
    }
}

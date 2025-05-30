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

function handleFormSubmit(e) {
    e.preventDefault();

    const id = document.getElementById('piano-id').value;
    const piano = {
        merk: document.getElementById('merk').value,
        model: document.getElementById('merk').value,
        type: document.getElementById('merk').value,
        bouwjaar: document.getElementById('merk').value,
        prijs: document.getElementById('merk').value
    };

    const method = id ? 'PUT' : 'POST';
    const url = id
        ? `http://localhost:3333/updatePiano/${id}`
        : 'http://localhost:3333/newPiano';

    fetch(url, {
        method,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(piano)
    })
        .then(() => {
            showAlert(id ? 'Piano bijgewerkt' : 'Piano toegevoegd', 'success');
            resetForm();
            fetchPianos();
            document.getElementById('form-wrapper').classList.add('hidden');
        })
        .catch(() => showAlert('Er ging iets mis.', 'error'));
}

function editPiano(id){
    try {
        fetch(`http://localhost:3333/piano/${id}`)
            .then( res => res.json())
            .then(piano => {
                document.getElementById('pianos-id').value = piano.id;
                document.getElementById('merk').value = piano.merk;
                document.getElementById('model').value = piano.model;
                document.getElementById('type').value = piano.type;
                document.getElementById('bouwjaar').value = piano.bouwjaar;
                document.getElementById('prijs').value = piano.prijs;
                document.getElementById('form-wrapper').classlist.remove('hidden');
                document.getElementById('piano-form').scrollIntoView({behavior: 'smooth'});
            })
    } catch(error){
    console.log("Fout bij bewerken van piano", error);
    }
}

function deletePiano(id){
    try{
        fetch(`http://localhost:3333/deletePiano/${id}`, {method: 'DELETE'})
            .then(() => {
                showAlert('Piano verwijderd', 'success');
                fetchPianos();
            })
            .catch(() => showAlert('Verwijderen mislukt.', 'error'));
    }catch (error){
        console.log("Fout bij verwijderen van piano", error);
    }
}

function resetForm(){
    document.getElementById('piano-id').value = '';
    document.getElementById('piano-form').reset();
}


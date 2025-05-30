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

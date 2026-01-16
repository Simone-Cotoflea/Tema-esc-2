// Referințe către elementele din DOM
const dogImage = document.getElementById('dog-image');
const statusText = document.getElementById('status-text');
const breedText = document.getElementById('breed-text');
const fetchBtn = document.getElementById('fetch-btn');

// URL-ul API-ului [cite: 126]
const API_URL = "https://dog.ceo/api/breeds/image/random";

// Funcție asincronă pentru a prelua datele [cite: 24]
async function getDog() {
    // Logging pentru punctul bonus [cite: 119]
    console.log("--- Începere cerere API ---");
    
    // UI Feedback: arătăm că se încarcă
    fetchBtn.disabled = true;
    fetchBtn.innerText = "Se încarcă...";
    statusText.innerText = "Se descarcă date...";
    
    try {
        console.log("Fetching data from:", API_URL);
        
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Date primite cu succes:", data); // Log date brute

        // Actualizare DOM - Imagine [cite: 56]
        dogImage.src = data.message;
        
        // Actualizare DOM - Tabel [cite: 58]
        statusText.innerText = data.status.toUpperCase();
        statusText.style.color = "green";

        // Logică extra: Extragem rasa din URL (ex: .../breeds/beagle/...)
        // URL-ul arata asa: https://images.dog.ceo/breeds/germanshepherd/n020914.jpg
        const parts = data.message.split('/');
        const breedIndex = parts.indexOf('breeds') + 1;
        
        if (breedIndex > 0 && parts[breedIndex]) {
            let breed = parts[breedIndex];
            // Formatăm textul (prima literă mare)
            breed = breed.charAt(0).toUpperCase() + breed.slice(1);
            breedText.innerText = breed;
            console.log("Rasă identificată:", breed);
        } else {
            breedText.innerText = "Necunoscută";
        }

    } catch (error) {
        // Gestionare erori [cite: 25]
        console.error("A apărut o eroare:", error);
        statusText.innerText = "Eroare!";
        statusText.style.color = "red";
        alert("Nu am putut descărca imaginea. Verifică conexiunea!");
    } finally {
        // Se execută mereu la final
        console.log("--- Cerere finalizată ---");
        fetchBtn.disabled = false;
        fetchBtn.innerText = "Generează Câine Nou";
    }
}

// Event listener pentru buton [cite: 59]
fetchBtn.addEventListener('click', getDog);

// Încărcare inițială la deschiderea paginii
document.addEventListener('DOMContentLoaded', getDog);
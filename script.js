document.addEventListener("DOMContentLoaded", main)

async function main() {
    const ducks=await fetchDucks()
    renderDucks(ducks)
}

async function fetchDucks() {
    try {
        const response = await fetch("ducks.json")
        if (!response.ok) return []

        return await response.json()
    } catch (error) {
        return []
    }
}

function renderDucks(ducks) {
    const grid = document.getElementById("catalogGrid")
    grid.innerHTML = "";

    if (ducks.length === 0) {
        grid.innerHTML = "Couldn't find any Ducks :(";
        return
    }

    ducks.forEach(duck => {
        const card = createCard(duck)
        grid.appendChild(card)
    })
}

function createCard(duck) {
    const card = document.createElement("div")
    card.classList.add("card")      //MAYBE ADICIONAR UMA IMAGEM DE ERRO PARA SE A IMAGEM NAO CARREGAR
    card.innerHTML = `
        <img src="${duck.image}">
        <div class="duckInfo">
            <h3>${duck.name}</h3>
            <p>Class: ${duck.class}</p>
            <p>Quantity: ${duck.quantity}</p>
            <p>Acquired: ${duck.date}</p>
        </div>
    `
    return card
}
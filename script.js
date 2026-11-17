document.addEventListener("DOMContentLoaded", main)

const duckRainButton = document.getElementById("duckRain")

async function main() {
    const ducks = await fetchDucks()
    renderDucks(ducks)
    search(ducks)

    duckRainButton.addEventListener("click", () => { duckRain(ducks) })

    uselessFact()
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
    card.classList.add("card")
    card.innerHTML = `
        <img src="${duck.image}">
        <div class="duckInfo">
            <h3>${duck.name}</h3>
            <p>Class: ${duck.class}</p>
            <p>Quantity: ${duck.quantity}</p>
        </div>
    `

    card.addEventListener("click", () => {
        openModal(duck)
    })

    return card
}

function openModal(duck) {
    const modal = document.getElementById("modal")

    document.getElementById("modalImage").src = duck.image
    document.getElementById("modalName").textContent = duck.name
    document.getElementById("modalClass").textContent = duck.class
    document.getElementById("modalQuantity").textContent = duck.quantity
    document.getElementById("modalDate").textContent = duck.date
    document.getElementById("modalDescription").textContent = duck.description || "No description for this ducky :("

    modal.showModal()

    const closeModal = document.getElementById("closeModal")
    closeModal.onclick = () => modal.close()
}

function search(ducks) {
    const searchbar = document.getElementById("searchbar")

    searchbar.addEventListener("input", (searching) => {
        const query = searching.target.value.toLowerCase()

        const filtered = ducks.filter(duck =>
            duck.name.toLowerCase().includes(query) || duck.class.toLowerCase().includes(query)
        )
        renderDucks(filtered)
    })
}

function duckRain(ducks) {
    let imagesList = []
    for (let i = 0; i < ducks.length; i++) {
        imagesList.push(ducks[i].image)
    }

    for (let i = 0; i < ducks.length; i++) {
        setTimeout(function () {
            let duckImage = document.createElement("img")
            duckImage.src = imagesList[i]

            duckImage.classList.add("rain")

            let Xcord = Math.random() * window.innerWidth
            duckImage.style.left = Xcord + "px"

            document.body.appendChild(duckImage)

            setTimeout(function () {
                duckImage.remove()
            }, 5000)
        }, i * 200)
    }
}

async function uselessFact() {
    try {
        const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random');
        const data = await response.json();

        if (data && data.text) {
            document.getElementById("uselessFact").textContent = "Random Useless Fact: " + data.text;
        }
    } catch (error) {
        console.error("There is nothing here :(", error);
    }
}
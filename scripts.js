document.addEventListener("DOMContentLoaded", function() {
    const clicker = document.querySelector("div#clicker");
    const coinsSpan = document.querySelector("span#coins");
    const cpsSpan = document.querySelector("span#cps");
    const shopBtn = document.querySelector("div#shopBtn");
    let shopModal = document.querySelector("div#shopModal")
    let coins = 0;
    let cps = 0;
    let cpc = 1;
    const modifiers = {
        autoclicker: {
            cost: 10,
            cps: 1,
            cpc:  0
        },
        farm: {
            cost: 100,
            cps: 10,
            cpc: 0
        },
        golden_mouse: {
            cost: 250,
            cps: 0,
            cpc: 2,
        }
    }

    let ownedModifiers = {
        autoclicker: 5,
        farm: 0,
        golden_mouse: 10
    }

    for(let modifier in modifiers) {
        shopModal.innerHTML += "<div class='modifier'><span>" + modifier + "</span><span>Cost: " + modifiers[modifier].cost + "</span><span>CPS: " + modifiers[modifier].cps + "</span><span>CPC: " + modifiers[modifier].cpc + "</span><button class='buyBtn' data-modifier='" + modifier + "'>Buy</button></div>";
        //console.log(modifier + ": Cost: " + modifiers[modifier].cost + ", Clicks per second: " + modifiers[modifier].cps + ", Coins per click: " + modifiers[modifier].cpc)
    }

    document.querySelectorAll("button.buyBtn").forEach(function(n) {
        n.addEventListener("click", function() {
            if(coins >= modifiers[n.getAttribute("data-modifier")].cost) {
                coins -= modifiers[n.getAttribute("data-modifier")].cost;
                cps += modifiers[n.getAttribute("data-modifier")].cps;
                cpc += modifiers[n.getAttribute("data-modifier")].cpc;
            }
        })
    });

    clicker.addEventListener("click", function() {
        coinsSpan.innerText = "Coins: " + (coins += cpc);
    });

    setInterval(function() {
        cpsSpan.innerText = "CPS: " + cps;
        coins += cps;
        coinsSpan.innerText = "Coins: " + coins;
    }, 1000);

    shopBtn.addEventListener("click", function() {
        
    });

});
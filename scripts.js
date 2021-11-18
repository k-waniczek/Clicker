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
            name: "AutoClicker",
            cost: 10,
            cps: 1,
            cpc:  0,
            costUpgradeRatio: 1.3
        },
        farm: {
            name: "Farm",
            cost: 100,
            cps: 10,
            cpc: 0,
            costUpgradeRatio: 1.2
        },
        golden_mouse: {
            name: "Golden Mouse",
            cost: 250,
            cps: 0,
            cpc: 2,
            costUpgradeRatio: 1.2
        }
    }

    let ownedModifiers = {
        autoclicker: 5,
        farm: 0,
        golden_mouse: 10
    }

    for(let modifier in modifiers) {
        shopModal.innerHTML += "<div class='modifier'><span>" + modifiers[modifier].name + ":</span><span id='cost'> Cost: " + modifiers[modifier].cost + "</span><span> CPS: " + modifiers[modifier].cps + "</span><span> CPC: " + modifiers[modifier].cpc + "</span><button class='buyBtn' data-modifier='" + modifier + "'>Buy</button></div>";
        //console.log(modifier + ": Cost: " + modifiers[modifier].cost + ", Clicks per second: " + modifiers[modifier].cps + ", Coins per click: " + modifiers[modifier].cpc)
    }

    document.querySelectorAll("button.buyBtn").forEach(function(n) {
        n.addEventListener("click", function() {
            if(coins >= modifiers[n.getAttribute("data-modifier")].cost) {
                coins -= modifiers[n.getAttribute("data-modifier")].cost;
                cps += modifiers[n.getAttribute("data-modifier")].cps;
                cpc += modifiers[n.getAttribute("data-modifier")].cpc;
                modifiers[n.getAttribute("data-modifier")].cost = Math.round(modifiers[n.getAttribute("data-modifier")].cost * modifiers[n.getAttribute("data-modifier")].costUpgradeRatio);
                document.querySelector("span#cost").innerText = modifiers[n.getAttribute("data-modifier")].cost;
            }
        })
    });

    clicker.addEventListener("click", function() {
        coinsSpan.innerText = "Coins: " + (coins += cpc);
    });

    setInterval(function() {
        coins += cps;
    }, 1000);

    setInterval(function() {
        cpsSpan.innerText = "CPS: " + cps;
        coinsSpan.innerText = "Coins: " + coins;
    })

    let shown = false;
    shopBtn.addEventListener("click", function() {
        if(shown) {
            document.querySelector("div#overlay").style.filter = "blur(0)";
            shopModal.style.top = "-20%";
            shown = false;
        } else {
            document.querySelector("div#overlay").style.filter = "blur(15px)";
            shopModal.style.top = "50%";
            shown = true;
        }
    });
});
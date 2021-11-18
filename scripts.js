document.addEventListener("DOMContentLoaded", function() {
    let clicker = document.querySelector("div#clicker");
    let coinsSpan = document.querySelector("span#coins");
    let cpsSpan = document.querySelector("span#cps");
    let shopBtn = document.querySelector("div#shopBtn");
    let coins = 0;
    let cps = 0;
    let cpc = 1;
    let modifiers = {
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
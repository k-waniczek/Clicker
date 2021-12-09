$(function() {
    const clicker = $('div#clicker');
    const coinsSpan = $('span#coins');
    const cpsSpan = $('span#cps');
    const shopBtn = $('div#shopBtn');
    let shopModal = $('div#shopModal')
    let coins = 0;
    let cps = 0;
    let cpc = 1;
    const modifiers = {
        autoclicker: {
            name: 'AutoClicker',
            cost: 10,
            cps: 1,
            cpc:  0,
            costUpgradeRatio: 1.3
        },
        farm: {
            name: 'Farm',
            cost: 100,
            cps: 5,
            cpc: 0,
            costUpgradeRatio: 1.2
        },
        golden_mouse: {
            name: 'Golden Mouse',
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

    let html = '';
    for(let modifier in modifiers) {
        html += `<div class='modifier'><span>${modifiers[modifier].name}: </span><span id='cost' data-modifier='${modifier}'>Cost: ${modifiers[modifier].cost} </span><span>CPS: ${modifiers[modifier].cps}</span><span> CPC: ${modifiers[modifier].cpc}</span><button class='buyBtn' data-modifier='${modifier}'>Buy</button></div>`;
    }
    shopModal.html(html);

    $('button.buyBtn').each(function () {
        $(this).click(function() {
            if(coins >= modifiers[$(this).data('modifier')].cost) {
                coins -= modifiers[$(this).data('modifier')].cost;
                cps += modifiers[$(this).data('modifier')].cps;
                cpc += modifiers[$(this).data('modifier')].cpc;
                modifiers[$(this).data('modifier')].cost = Math.round(modifiers[$(this).data('modifier')].cost * modifiers[$(this).data('modifier')].costUpgradeRatio);
                $(`span#cost[data-modifier='${$(this).data('modifier')}']`).text(`Cost: ${modifiers[$(this).data('modifier')].cost} `);
            }
        })
    });

    clicker.click(function() {
        coinsSpan.text(`Coins: ${(coins += cpc)}`);
    });

    setInterval(function() {
        coins += cps;
    }, 1000);

    setInterval(function() {
        cpsSpan.text(`CPS: ${cps}`);
        coinsSpan.text(`Coins: ${coins}`);
    })

    let shown = false;
    shopBtn.click(function() {
        if(shown) {
            $('div#overlay').css('filter', 'blur(0)');
            shopModal.css('top', '-20%');
            shown = false;
        } else {
            $('div#overlay').css('filter', 'blur(15px)');
            shopModal.css('top', '50%');
            shown = true;
        }
    });
});
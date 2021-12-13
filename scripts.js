$(function() {
    const clicker = $('div#clicker');
    const coinsSpan = $('span#coins');
    const cpsSpan = $('span#cps');
    const shopBtn = $('div#shopBtn');
    const overlay = $('div#overlay');
    const shopModal = $('div#shopModal')
    let coins = (parseInt(localStorage.getItem('coins')) > 0) ? parseInt(localStorage.getItem('coins')) : 0;
    let cps = 0;
    let cpc = 1;
    const modifiers = {
        autoclicker: {
            name: 'AutoClicker',
            cost: 10,
            cps: 1,
            cpc:  0,
            costUpgradeRatio: 1.3,
            owned: 0,
            costReductionRatio: 0.9,
            costReductionEvery: 40
        },
        farm: {
            name: 'Farm',
            cost: 100,
            cps: 5,
            cpc: 0,
            costUpgradeRatio: 1.2,
            owned: 0,
            costReductionRatio: 0.8,
            costReductionEvery: 20
        },
        golden_mouse: {
            name: 'Golden Mouse',
            cost: 250,
            cps: 0,
            cpc: 2,
            costUpgradeRatio: 1.2,
            owned: 0,
            costReductionRatio: 0.8,
            costReductionEvery: 10
        }
    }

    let html = '';
    for(let modifier in modifiers) {
        html += `<div class='modifier'><span>${modifiers[modifier].name}: </span><span id='cost' data-modifier='${modifier}'>Cost: ${modifiers[modifier].cost} </span><span>CPS: ${modifiers[modifier].cps}</span><span> CPC: ${modifiers[modifier].cpc}</span><button class='buyBtn' data-modifier='${modifier}'>Buy</button></div>`;
    }
    shopModal.html(html);

    $('button.buyBtn').each(function () {
        $(this).click(function() {
            if(coins >= modifiers[$(this).data('modifier')].cost) {
                let curModifier = modifiers[$(this).data('modifier')];
                coins -= curModifier.cost;
                cps += curModifier.cps;
                cpc += curModifier.cpc;
                curModifier.owned++;
                curModifier.cost = Math.round(curModifier.cost * curModifier.costUpgradeRatio);
                if(curModifier.owned % curModifier.costReductionEvery == 0) {
                    curModifier.costUpgradeRatio = (curModifier.costUpgradeRatio - 1) * curModifier.costReductionRatio + 1;
                }
                $(`span#cost[data-modifier='${$(this).data('modifier')}']`).text(`Cost: ${curModifier.cost} `);
            }
        })
    });

    clicker.click(function() {
        coinsSpan.text(`Coins: ${(coins += cpc)}`);
        $('#audio').append('<audio src="click_sound.mp3" autoplay></audio>');
        $('audio').each(function() {
            $(this).on('ended', function() {
                $(this).remove();
            });
        });
    });

    setInterval(function() {
        coins += cps;
    }, 1000);

    setInterval(function() {
        cpsSpan.text(`CPS: ${cps}`);
        coinsSpan.text(`Coins: ${coins}`);
        localStorage.setItem('coins', coins);
    }, 1)

    //For testing
    $('#autoclick').click(function() {
        setInterval(function() {
            coins += 1;
        }, 1);
    });

    let shown = false;
    shopBtn.click(function() {
        if(shown) {
            overlay.css('filter', 'blur(0)');
            shopModal.css('top', '-20%');
            shown = false;
        } else {
            overlay.css('filter', 'blur(15px)');
            shopModal.css('top', '50%');
            shown = true;
        }
    });
});
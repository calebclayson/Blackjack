let deckId;

function getDeck() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
            type: 'GET',
            success: response => {
                resolve(response);
            },
            error: error => {
                reject(error);
            }
        });
    });
}

function getCards(deckId, cardAmount) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${cardAmount}`,
            type: 'GET',
            success: response => {
                resolve(response);
            },
            error: error => {
                reject(error);
            }
        });
    });
}

let deckPromise = getDeck();

function twoCards(e) {
    $(e).hide();
    $('.addCard').show();
    deckPromise.then(data => {
        getCards(data.deck_id, 4).then(cardData => {
            $('.cards-one').append(`<img class="card" src="${cardData.cards[0].image}"><img class="card" src="${cardData.cards[1].image}">`);
            $('.cards-two').append(`<img class="card2" src="${cardData.cards[2].image}"><img class="card2" src="${cardData.cards[3].image}">`);
        });
    });
    
}


function hit(e) {
    deckPromise.then(data => {
        getCards(data.deck_id, 1).then(cardData => {
            $(e).parent().children('div').append(`<img class="${($(e).parent().attr('id').charAt(15) == 'o') ? "card" : "card2"}" src="${cardData.cards[0].image}">`);
        })
    })
}
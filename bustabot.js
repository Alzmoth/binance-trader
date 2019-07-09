var config = {
  baseBet: { value: 100, type: 'balance', label: 'base bet' },
  payout: { value: 2.17, type: 'multiplier' },
  max: { value: 1e8, type: 'balance', label: 'en yüksek bet' },

};


log('Script is running..');

var currentBet = config.baseBet.value;
var count = 0;

// Always try to bet when script is started


setTimeout(function start(){
    engine.bet(roundBit(currentBet), config.payout.value);
 engine.on('GAME_STARTING', onGameStarted);
engine.on('GAME_ENDED', onGameEnded);
}, 1000 );


function onGameStarted() { 
    engine.bet(roundBit(currentBet), config.payout.value);
  }

function onGameEnded() {
  var lastGame = engine.history.first()

  // If we wagered, it means we played
  if (!lastGame.wager) {
    return;
  }

  // we won..
  if (lastGame.cashedAt) {
      currentBet = config.baseBet.value;
      count =0;
    log('count = ' , count );
  } else {
    // damn, looks like we lost :(
    if ( count < 2) {
      currentBet = config.baseBet.value;
      count++;
      log('count = ' , count );
    } else if(count == 4){
       count++;

      currentBet = config.baseBet.value * 10;
      log('count = ' , count );
    }
 else if(count == 5){
    count++;

   currentBet = config.baseBet.value * 25;
   log('count = ' , count );
 }

    else {
        count++;
        currentBet= currentBet * 2;
        log('count = ' , count );
    }
    log('We lost, so next bet will be', currentBet/100, 'bits')

  }

  if (currentBet > config.max.value) {
    currentBet = config.baseBet.value;
  }
}

function roundBit(bet) {
  return Math.round(bet / 100) * 100;
}

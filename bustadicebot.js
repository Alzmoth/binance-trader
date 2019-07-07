var config = {
  baseBet: { value: 20, type: 'balance', label: 'base bet' },
  payout: { value: 2.60, type: 'multiplier' },
  max: { value: 1e8, type: 'balance', label: 'Max bet' },

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
  currentBet=currentBet*2;
  
    log('We lost, so next bet will be', currentBet/100, 'bits')

  }

  if (currentBet > config.max.value) {
    currentBet = config.baseBet.value;
  }
}

function roundBit(bet) {
  return Math.round(bet / 100) * 100;
}

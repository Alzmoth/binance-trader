var config = {
  baseBet: { value: 100, type: 'balance', label: 'base bet' },
  payout: { value: 3, type: 'multiplier' },
  max: { value: 1e8, type: 'balance', label: 'max Bet' },

};

// some thing wrong sent mail malinayir@gmail.com or bustabit nick "idiottt"


var currentBet = config.baseBet.value;
var count = 1;
var count1 = 1;
var a = 0;
var b = 1;

// Always try to bet when script is started


setTimeout(function start(){
    if(count1==1){
        engine.bet(roundBit(currentBet), config.payout.value);
        engine.on('GAME_STARTING', onGameStarted);
        engine.on('GAME_ENDED', onGameEnded);
    }
    count1=1;
}, 1000 );


function onGameStarted() { 
    if(count1==1){
        engine.bet(roundBit(currentBet), config.payout.value);
    }
    count1=1;
  }

function onGameEnded() {
  var lastGame = engine.history.first()


  if (!lastGame.wager) {
    return;
  }
  if (lastGame.cashedAt) {
      count1=0
      count =1;
      a=0,
      b=0;
      currentBet = config.baseBet.value;
    log('count = ' , count );
  } else {
    count1=1
    a=b;
    b=count;
    count=a+b;
    currentBet=config.baseBet.value*count;

  }

  if (currentBet >= config.max.value * config.baseBet.value) {
    currentBet = config.baseBet.value;
  }
}

function roundBit(bet) {
  return Math.round(bet / 100) * 100;
}

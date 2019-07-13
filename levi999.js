var config = {
  baseBet: { value: 5000, type: 'balance', label: 'base bet' },
  payout: { value: 3, type: 'multiplier' },
  max: { value: 1e8, type: 'balance', label: 'max Bet' },

};


log('Script is running..');

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

  // If we wagered, it means we played
  if (!lastGame.wager) {
    return;
  }

  // we won..
  if (lastGame.cashedAt) {
      count1=0
      count =0;
   
      currentBet = config.baseBet.value;
    log('count = ' , count );
  } else if(count<1){
    count1=1;
    count++
    currentBet=config.baseBet.value;
    log('We lost, so next bet will be', currentBet/100, 'bits')

  }else if (count ==1){
    count1=1;
    count++
    currentBet=config.baseBet.value*2;
    log('We lost, so next bet will be', currentBet/100, 'bits')
  }
  else if (count ==2){
    count++
    count1=1;
    currentBet=config.baseBet.value*3;
    log('We lost, so next bet will be', currentBet/100, 'bits')
  }
  else if (count ==3){
    count++
    count1=1;
    currentBet=config.baseBet.value*5;
    log('We lost, so next bet will be', currentBet/100, 'bits')
  }
  else if (count ==4){
    count1=1;
    currentBet=config.baseBet.value*6;
    count++
    log('We lost, so next bet will be', currentBet/100, 'bits')
  }else{
    count++
    count1=1;
    currentBet=currentBet*2;
    log('We lost, so next bet will be', currentBet/100, 'bits')
  }

  if (currentBet >= config.max.value) {
    currentBet = config.baseBet.value;
  }
}

function roundBit(bet) {
  return Math.round(bet / 100) * 100;
}

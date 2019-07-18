var config = {
    baseBet: { value: 100, type: 'balance', label: 'base bet' },
    payout: { value: 2.17, type: 'multiplier' },
    max: { value: 1e8, type: 'balance', label: 'en yüksek bet' },
  
  };
  
  
  console.log('%c Hello levi script is starting ', 'color: #2D872D');
  
  var currentBet = config.baseBet.value;
  var count = 0;
  var profit = 0;
  var totalcount=0;

  
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
        console.log("%c Game Win !! Profit = ",'color: #2D872D', (currentBet*config.payout.value)/100 ,"Total profit = "  , profit )
        profit+=(currentBet*config.payout.value)/100
        currentBet = config.baseBet.value;
        console.log("%c Game Count = ",'color: #ff5500' , totalcount)
        totalcount++;
        count =0;
    } else {
      // damn, looks like we lost :(
      if ( count < 2) {
        profit-=currentBet/100
        currentBet = config.baseBet.value;
        count++;
        totalcount++;
        console.log("%c Game lost Now bet = ",'color: #e60000', currentBet/100, " Total profit = "  , profit)
        
      } else if(count == 2){
         count++;
         totalcount++;
         profit-=currentBet/100
        currentBet = config.baseBet.value * 10;
        console.log("%c Game lost Now bet = ",'color: #e60000', currentBet/100 , "%k Total profit = " , profit)
      }
   else if(count == 3){
      count++;
      totalcount++;
      profit-=currentBet/100
     currentBet = config.baseBet.value * 25;
     console.log("%c Game lost Now bet = ",'color: #e60000', currentBet/100, "%k Total profit = ", profit )
   }
  else if(count ==11){
  count=0}
      else {
          profit-=currentBet/100
          count++;
          totalcount++;
          currentBet= currentBet * 2;
          console.log("%c Game lost - Bet = " ,'color: #e60000', currentBet/100, "%k Total profit = ", profit)
  
      }
     
    }
  
    if (currentBet > config.max.value) {
      currentBet = config.baseBet.value;
      console.log("%c Fail Fail Fail !!!! ",'color: #e60000'  )
    }
  }
  
  function roundBit(bet) {
    return Math.round(bet / 100) * 100;
  }
                            

var config = {
    wager: { label: "Wager", type: "balance", value: 100 },
    target: { label: "Target", type: "multiplier", value: 1.20 }
  };
  var base=config.target.value;
  var basebet=config.wager.value;
  var sayac=0;



    while (true) {
        const { multiplier } = await this.bet(config.wager.value, config.target.value)
        if (multiplier >= config.target.value) {
            config.wager.value=basebet;
            config.target.value= base
            sayac=0;
        }else{
          if(sayac<2){
            config.wager.value=config.wager.value*4;
            config.target.value=config.target.value+0.09
            sayac++;
          }else if(sayac<4) {
            sayac++;
            config.wager.value=config.wager.value*4;
            }else{
                sayac=0;
                config.wager.value=basebet;
                config.target.value=bet;
            }
          }
            
    }

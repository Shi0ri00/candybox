var lollipops = {
    
    // Variables
    nbrOwned : 0,
    nbrBought : 0,
    nbrInStock : 1000,
    stockShortage : false,
    
    // Functions
    buy1 : function(){
        if(candies.nbrOwned >= shop.oneLollipopPrice && this.nbrInStock >= 1){
            candies.setNbrOwned(candies.nbrOwned - shop.oneLollipopPrice);
            this.setNbrOwned(this.nbrOwned + 1);
            this.setNbrBought(this.nbrBought + 1);
            this.setNbrInStock(this.nbrInStock - 1);
            shop.setMerchantSpeech("谢谢惠顾! 这是你的 " + this.getFlavour() + " 棒棒糖.");
        }
    },
    
    buy10 : function(){
        if(candies.nbrOwned >= shop.tenLollipopsPrice && this.nbrInStock >= 10){
            candies.setNbrOwned(candies.nbrOwned - shop.tenLollipopsPrice);
            this.setNbrOwned(this.nbrOwned + 10);
            this.setNbrBought(this.nbrBought + 10);
            this.setNbrInStock(this.nbrInStock - 10);
            shop.setMerchantSpeech("谢谢惠顾'! 这是你的十个棒棒糖. 多种口味.");
        }
        else shop.setMerchantSpeech("I'm sorry, we don't have enough lollipops in stock to sell you ten of them. We currently have " + this.nbrInStock + " lollipops in stock.");
    },
    
    getFlavour : function(){
        var fruits = ["苹果", "草莓", "葡萄", "黑莓", "橘子", "西瓜", "香蕉", "梨", "樱桃", "树莓", "桂花", "青柠", "桃子", "杏", "蓝莓", "猕猴桃", "荔枝", "菠萝"];
        var uncommon = ["巧克力", "曲奇", "煎饼", "水", "番茄", "小猫"];
        var unrealistic = ["精灵", "棒棒糖", "雪", "风暴", "门"];
        var abstract = ["暴食", "愿望", "爱", "因果", "宿命", "可爱"];
        
        var chances = [];
        if(this.nbrBought < 10) chances = [1];
        else if(this.nbrBought < 10) chances = [1];
        else if(this.nbrBought < 15) chances = [0.9, 1];
        else if(this.nbrBought < 20) chances = [0.8, 1];
        else if(this.nbrBought < 25) chances = [0.7, 1];
        else if(this.nbrBought < 30) chances = [0.5, 1];
        else if(this.nbrBought < 35) chances = [0.4, 0.9, 1];
        else if(this.nbrBought < 40) chances = [0.3, 0.8, 1];
        else if(this.nbrBought < 45){
            if(this.nbrBought == 42 && random.flipACoin()) return "space";
            else chances = [0.2, 0.7, 1];
        }
        else if(this.nbrBought < 50) chances = [0.1, 0.6, 1];
        else if(this.nbrBought < 55) chances = [0.1, 0.5, 1];
        else if(this.nbrBought < 60) chances = [0.1, 0.4, 0.9];
        else if(this.nbrBought < 65) chances = [0.1, 0.3, 0.8];
        else if(this.nbrBought < 70) chances = [0.1, 0.2, 0.7];
        else if(this.nbrBought < 75) chances = [0.1, 0.2, 0.6];
        else if(this.nbrBought < 80) chances = [0.1, 0.2, 0.5];
        else if(this.nbrBought < 85) chances = [0.1, 0.2, 0.4];
        else if(this.nbrBought == 1337 && random.flipACoin()) return "leet";
        else chances = [0.1, 0.2, 0.3];
        
        var r = random.getRandomFloat()
        if(r < chances[0]) return random.pickRandomly(fruits);
        else if(r < chances[1]) return random.pickRandomly(uncommon);
        else if(r < chances[2]) return random.pickRandomly(unrealistic);
        else return random.pickRandomly(abstract);
    },
    
    delivery : function(){
        this.setNbrInStock(this.nbrInStock + 15 + random.getRandomIntUpTo(10));
        window.setTimeout(this.delivery.bind(this), 900000); // One delivery every 15 minutes
    },
    
    setNbrOwned : function(value){
        this.nbrOwned = value;
        if(this.nbrOwned != 1) htmlInteraction.setInnerHtml("lollipops", "You have " + this.nbrOwned + " lollipops!");
        else htmlInteraction.setInnerHtml("lollipops", "You have 1 lollipop!");
        htmlInteraction.setElementVisibility("lollipops", true);
        buttons.checkLollipops();
        cauldron.updateActionsInfoOnPage();
        computer.updateLollipops();
    },
    
    setNbrBought : function(value){
        this.nbrBought = value;
    },
    
    setNbrInStock : function(value){
        // Set the value
        this.nbrInStock = value;
        
        // If > 100, decrease it
        if(this.nbrInStock > 140) this.nbrInStock = 140;
        
        // Handle lollipops stock shortage
        if(this.stockShortage == false && this.nbrInStock == 0){
            this.stockShortage = true;
            buttons.checkLollipopsStockShortage();
        }
        else if(this.stockShortage == true && this.nbrInStock != 0){
            this.stockShortage = false;
            buttons.checkLollipopsStockShortage();
        }
    }
    
};

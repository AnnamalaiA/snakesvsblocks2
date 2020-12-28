class Player{
    constructor(){
        this.name = null
        this.pos = 0
        this.lives = maxLives
        this.index = 0
        this.p = []
    }

    getCount(){
        var playerCountRef = database.ref("playerCount")
        playerCountRef.on("value", function(data){
            playerCount = data.val()
        })
     }

     updateCount(count) {
         database.ref("/").update({
             playerCount: count
         })
     }

      update() {
          var playerIndex = "players/player" + this.index;
         
          database.ref(playerIndex).set({
              name:this.name,
              position: this.pos,
              lives:this.lives   
              
          })

        }

  createPunch(){
    for (var i = 0; i <this.lives; i++){
        this.p.push(new ball(400+i*60,50+(-i*10)))
      }
      
     Matter.Body.setStatic(this.p[0].player,true)
         
    
      
      for(var i =0;i<this.p.length;i++){
        if(i!==this.p.length-1){
        chain.push(new snake(this.p[i].player,this.p[i+1].player))
        }
      }
  }

  displayPunch(){
    for (var i = 0; i <this.p.length; i++){
        this.p[i].display()
      }
  }

  updatePunch(){

  }


}
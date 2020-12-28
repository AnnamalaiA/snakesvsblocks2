class Form{
    constructor(){
      this.textBox =  createInput("").attribute("placeholder", "Name");
      this.button = createButton("START")
      this.greetings = createElement('h2');
     
      
    }

    hideElements(){
      this.textBox.hide()
      this.button.hide()
      this.greetings.hide()
    }
      
    display(){
      
      
        this.textBox.position(displayWidth / 2.25, displayHeight / 2.5-40);
        this.textBox.style('font-size', '24px', 'color', '#ffffff');
        this.button.position(
        displayWidth / 2.1,
        displayHeight / 2.5 + displayHeight / 20
        );
        this.button.style('font-size', '30px');
        this.button.style('background-color', color(200,200,255));      
        
        

        
        this.button.mousePressed(() =>{
            this.textBox.hide()
            this.button.hide()
            con.name =  this.textBox.value()
            playerCount = playerCount+1
            con.index = playerCount
            con.update()
            con.updateCount(playerCount)

            
            

            this.greetings.html("Hi " + player.name + ", waiting for more racers...")
               
      });
    }
}

/* form for data entry - form.js
playersinfo and count shld be updated in the db
player.js
updating the playercount
reading the playercount
writing the name, position and lives

game start when the players are 2

initial stage-form should be created and also empty player list
*/
class Game{
    constructor(){

    }

    start(){

        con = new Player()
        form = new Form()
        form.display()

        con.createPunch()
        


    }

    play(){
        con.displayPunch()

    }
}
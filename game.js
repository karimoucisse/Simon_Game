class Game {
    constructor(){
        this.isGameRunning = false
        this.point = 0
        this.level = 1
        this.sequenceLength = 3
        this.colorArray = []
        this.life = 3
    }

    startingGame(){
        this.isGameRunning = true
        this.handleColorArray()
    }
    handleColorArray(){
        for(let i = 0; i< this.sequenceLength; i++){
            const min = 1
            const max = 4
            let randomNumber = Math.floor(Math.random() * (max - min + 1) + min)
            this.colorArray.push(randomNumber)    
        };
    }
    checkGamePlay(array){
        let numberArray = [...this.colorArray]
        const isValide = array.every((number, index) => number === numberArray[index])

        if(isValide && numberArray.length > 0 && numberArray.length === array.length){
            this.handleGameWin()
            return "true"
        }
        if(!isValide){
            return "false"
        }
    }   

    handleGameWin(){
        this.point += 5
        this.level++
        this.sequenceLength++
        this.colorArray = []
    }
    handleRetry(){
        if(this.life !== 0){
            this.life--
            this.colorArray= []
            this.startingGame()
            return true
        }else {
            this.handleGameOver()
            return false
        }
    }
    handleGameOver(){
        this.isGameRunning = false
        this.point = 0
        this.level = 1
        this.sequenceLength = 3
        this.colorArray = []
        this.life = this.life
    }

}

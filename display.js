class Display{
    constructor(){
        this.init()
        this.displayResult()

        this.userColorArray = []
        this.colors= [
            {darkColor: "rgba(255, 255, 0, 0.6)", lightColor: "yellow"},
            {darkColor: "rgba(0, 0, 255, 0.6)", lightColor: "blue"},
            {darkColor: "rgba(255, 0, 0, 0.6)", lightColor: "red"},
            {darkColor: "rgba(0, 128, 0, 0.6)", lightColor: "green"},
        ]
    }


    init(){
        this.startBtn = document.getElementById("start_btn")
        this.gameObj = new Game()
        this.level = document.getElementById("level")
        this.point = document.getElementById("point")
        this.NextLevelContainer = document.getElementById("NextLevelPanel")
        this.NextLevelBtn = document.getElementById("next_level_btn")
        this.cicleContainer = document.getElementById("cicle_Container")
        // this.gameOverContainer = document.getElementById("gameOverContainer")

        // this.continueGameBtn = document.getElementById("continue_btn")

        // recommence le jeu
        // this.resetBtn, = document.getElementById("reset_btn")

        // affiche le nbr de btn à cliquer
        // this.counterMessage = document.getElementById("counterMessage")

        this.colorBtns = Array.from(document.getElementsByClassName("item"))



        // lance le jeu
        this.startBtn.addEventListener("click", () => {
            this.gameObj.startingGame()
            this.handleColorClick()
        })

        // Quand on click sur une couleur 
        this.colorBtns[0].addEventListener("click", () => {
            this.gameObj.isGameRunning && this.userColorArray.push(1)
            this.checkClickedColor()
        })
        this.colorBtns[1].addEventListener("click", () => {
            this.gameObj.isGameRunning && this.userColorArray.push(2)
            this.checkClickedColor()
        })
        this.colorBtns[2].addEventListener("click", () => {
            this.gameObj.isGameRunning && this.userColorArray.push(3)
            this.checkClickedColor()
        })
        this.colorBtns[3].addEventListener("click", () => {
            this.gameObj.isGameRunning && this.userColorArray.push(4)
            this.checkClickedColor()
        })

        // envoie au niveau suivant
        this.NextLevelBtn.addEventListener("click", () => {
           this.hideControlPanel()
        })
    }

    handleColorClick(){
        this.gameObj.colorArray.forEach((element, index) => {
            setTimeout(() => {  
            // change la couleur des element avec le className === item
            this.colorBtns[element -1].style.backgroundColor = this.colors[element -1].lightColor
                setTimeout(() => {
                    // change la couleur des element avec le className === item
                    this.colorBtns[element -1].style.backgroundColor = this.colors[element -1].darkColor;
                }, (index +1) * 200)
            }, (index +1) * 500)
        });
        // apres avoir lancer le jeu on disable this.startBtn
        this.startBtn.disabled = true
    }

    // verifie si on a bien cliquer sue la bonne couleur
    checkClickedColor(){
        const checkGame = this.gameObj.checkGamePlay(this.userColorArray)
        if (checkGame === "true") {
            this.displayControlPanel()
        } else if(checkGame === "false") {
            this.displayGameOverAnimation()
        }
    }
    displayResult(){
        this.level.innerHTML = `niveau: ${this.gameObj.level}`
        this.point.innerHTML = `point: ${this.gameObj.point}`   
    }
    displayControlPanel(){
        this.NextLevelContainer.classList.add("make_visible")
    }
    hideControlPanel(){
        this.NextLevelContainer.classList.remove("make_visible")
        this.displayResult()
        this.gameObj.startingGame()
        this.handleColorClick()
    }

    displayGameOverAnimation(){
        this.cicleContainer.classList.add("gameOver_animation")
        // this.gameOverContainer.classList.add("gameOver")
    }
}



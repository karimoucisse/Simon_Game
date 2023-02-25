class Display{
    constructor(){
        this.init()
        this.clickFonctions()
        this.displayResult()
        this.displayBestScore()

        this.userColorArray = []
        this.colors= [
            {darkColor: "rgba(255, 255, 0, 0.6)", lightColor: "yellow"},
            {darkColor: "rgba(0, 0, 255, 0.6)", lightColor: "blue"},
            {darkColor: "rgba(255, 0, 0, 0.6)", lightColor: "red"},
            {darkColor: "rgba(0, 128, 0, 0.6)", lightColor: "green"},
        ]
    }


    init(){
        this.gameClass = new Game()
        this.scoreStorageClass = new scoreStorage()
        this.startBtn = document.getElementById("start_btn")
        this.level = document.getElementById("level")
        this.point = document.getElementById("point")
        this.NextLevelContainer = document.getElementById("NextLevelPanel")
        this.NextLevelBtn = document.getElementById("next_level_btn")
        this.cicleContainer = document.getElementById("cicle_Container")
        this.gameOverPanel = document.getElementById("gameOverPanel")
        this.overBtn = document.getElementById('over_btn')
        this.retryBtn = document.getElementById("retry_btn")
        this.lifeContainer = document.getElementById("life_container")
        this.gameOverBtnContainer = document.getElementById("gameOverBtnContainer")
        this.bestScoreContainer = document.getElementById("bestScore_container")
        this.colorBtns = Array.from(document.getElementsByClassName("item"))
    }

    // lance le jeu
    clickFonctions(){

        this.startBtn.addEventListener("click", () => {
            this.startGame()
        })

        // Quand on click sur une couleur 
        this.colorBtns[0].addEventListener("click", () => {
            this.gameClass.isGameRunning && this.userColorArray.push(1)
            this.checkClickedColor()
        })
        this.colorBtns[1].addEventListener("click", () => {
            this.gameClass.isGameRunning && this.userColorArray.push(2)
            this.checkClickedColor()
        })
        this.colorBtns[2].addEventListener("click", () => {
            this.gameClass.isGameRunning && this.userColorArray.push(3)
            this.checkClickedColor()
        })
        this.colorBtns[3].addEventListener("click", () => {
            this.gameClass.isGameRunning && this.userColorArray.push(4)
            this.checkClickedColor()
        })

        // envoie au niveau suivant
        this.NextLevelBtn.addEventListener("click", () => {
            this.displayNextLevel()
        })

        // recommence le jeu
        this.overBtn.addEventListener("click", () => {
            this.restartGame()
        })
        
        // reessayer dernier niveau
        this.retryBtn.addEventListener("click", () => {
            this.retryCurrentLevel()
        })
    }


    // Fonctions
    startGame(){
        this.gameClass.startingGame()
        // affiche le nbr de vie 
        this.displayLife()
        // console.log(this.heartItem);
        this.handleColorClick()
    }
    restartGame(){
        this.startBtn.disabled = false
        this.startBtn.innerHTML= `<p>Start</p>`
        this.hideControlPanel(this.gameOverPanel)
        this.gameClass.handleGameOver()
        this.displayResult()
    }
    retryCurrentLevel(){
        this.startBtn.innerHTML= `<p>Simon</p><p class="counter">0</p>`
        this.handleRetryAction()
        this.lifeContainer.innerHTML= ""
        this.displayHeartAnimation()
        setTimeout(() => {
            this.displayLife()
        },  3000)
        this.handleColorClick()
    }

    displayNextLevel(){
        this.startBtn.innerHTML= `<p>Simon</p><p class="counter">0</p>`
        this.hideControlPanel(this.NextLevelContainer)
        this.displayResult()
        this.gameClass.startingGame()
        setTimeout(() => {
            this.handleColorClick()
        },  1000)
    }

    handleColorClick(){
        this.userColorArray = []
        this.startBtn.innerHTML= `<p>Simon</p><p class="counter">0</p>`
        this.gameClass.colorArray.forEach((element, index) => {
            setTimeout(() => {  
            // change la couleur des element avec le className === item
            this.colorBtns[element -1].style.backgroundColor = this.colors[element -1].lightColor
                setTimeout(() => {
                    // change la couleur des element avec le className === item
                    this.colorBtns[element -1].style.backgroundColor = this.colors[element -1].darkColor;
                }, (index +1) * 200)
            }, (index +1) * 700)
        });
        this.enableBtns()
        // apres avoir lancer le jeu on disable this.startBtn
        this.startBtn.disabled = true
        
    }

    // verifie si on a bien cliquer sue la bonne couleur
    checkClickedColor(){
        const checkGame = this.gameClass.checkGamePlay(this.userColorArray)
        this.startBtn.innerHTML= `<p>Simon</p><p class="counter">${this.userColorArray.length}</p>`
        if (checkGame === "true") {
            this.displayControlPanel(this.NextLevelContainer)
        } else if(checkGame === "false") {
            if(this.gameClass.life === 0 ){
                this.retryBtn.remove()
            }
            this.displayGameOverAnimation()
            this.displayControlPanel(this.gameOverPanel)
        }
    }
    displayResult(){
        this.level.innerHTML = `niveau: ${this.gameClass.level}`
        this.point.innerHTML = `point: ${this.gameClass.point}`   
    }
    displayControlPanel(element){
        setTimeout(() => {
            element.classList.add("make_visible")
        }, 600)
    }
    hideControlPanel(element){
        this.displayBestScore()
        this.disableBtns()
        element.classList.remove("make_visible")
    }

    displayGameOverAnimation(){
        this.cicleContainer.classList.add("gameOver_animation")
        setTimeout(() => {
            this.cicleContainer.classList.remove("gameOver_animation")
        }, 1000)
    }

    handleRetryAction(){
        this.gameClass.handleRetry()
        this.hideControlPanel(this.gameOverPanel)
    }
    disableBtns(){
        this.colorBtns.forEach(element => {
            element.disabled = true
        })
    }
    enableBtns(){
        this.colorBtns.forEach(element => {
            element.disabled = false
        })
    }
    displayLife(){
        let i= 0
        this.lifeContainer.innerHTML= ""
        while(i < this.gameClass.life){
            this.lifeContainer.innerHTML += '<p class = "heart_item">&#10084</p>'
            i++
        }
    }
    displayHeartAnimation(){
        let i= 0
        while(i < this.gameClass.life +1){
            this.lifeContainer.innerHTML += '<p class = "heart_item">&#10084</p>'
            i++
        }
        const heartItem = Array.from(document.getElementsByClassName("heart_item"))
        heartItem[heartItem.length - 1].classList.add("heart_animation")
    }
    displayBestScore(){
        const bestScore = this.scoreStorageClass.returnBestScore(
            this.gameClass.point, 
            this.gameClass.level
        )
        this.bestScoreContainer.innerHTML =`
            <p>Top score</p>
            </br>
            <p>Niveau: ${bestScore.level} </p>
            <p>Point: ${bestScore.point} </p>
        `
    }
}



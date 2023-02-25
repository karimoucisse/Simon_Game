class scoreStorage{

    returnBestScore(point, level){
        const currentLevel = {point, level}
        const localStorageLevel = JSON.parse(localStorage.getItem('bestLevel'))
        if(localStorageLevel && localStorageLevel.point > point){
            return localStorageLevel
        }else{
            localStorage.setItem('bestLevel', JSON.stringify(currentLevel));
            return currentLevel
        }

    }
}
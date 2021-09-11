document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    const width = 4
    let items = []
    let score = 0

    //create board
    function generate(){
        for(i=0; i < width*width; i++){
            item = document.createElement('div')
            item.innerHTML = 0;
            gridDisplay.appendChild(item)
            items.push(item)
        }
        randomize()
        randomize()
    }
    generate()

    function randomize() {
        let rand = Math.floor(Math.random() * items.length)
        if(items[rand].innerHTML == 0) {
            items[rand].innerHTML = 2
            checkForGameOver()
        } else {
            randomize()
        }
    }

    function right(){
        for(i=0; i < width*width; i++){
            if(i % 4 === 0) { //use modulus (calculate remainder) to make sure i is the first item in each row
                //getting each value of row and creating list
                let one = items[i].innerHTML
                let two = items[i+1].innerHTML
                let three = items[i+2].innerHTML
                let four = items[i+3].innerHTML
                let row = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)]

                //takes the 2's and put into array
                let filtered = row.filter(num => num)

                //caluclate the number of zeros, put them into array
                let missing = 4 - filtered.length
                let zeros = Array(missing).fill(0)

                //create updated row
                let updatedRow = zeros.concat(filtered) //concat(filtered) puts the 2's at the right hand side
                
                //updates each grid item
                items[i].innerHTML = updatedRow[0]
                items[i+1].innerHTML = updatedRow[1]
                items[i+2].innerHTML = updatedRow[2]
                items[i+3].innerHTML = updatedRow[3]
            }
        }
    }

    function left(){
        for(i=0; i < width*width; i++){
            if(i % 4 === 0) {
                let one = items[i].innerHTML
                let two = items[i+1].innerHTML
                let three = items[i+2].innerHTML
                let four = items[i+3].innerHTML
                let row = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)]

                let filtered = row.filter(num => num)

                let missing = 4 - filtered.length
                let zeros = Array(missing).fill(0)

                let updatedRow = filtered.concat(zeros) //concat(zeros) puts the 2's at the left hand side

                items[i].innerHTML = updatedRow[0]
                items[i+1].innerHTML = updatedRow[1]
                items[i+2].innerHTML = updatedRow[2]
                items[i+3].innerHTML = updatedRow[3]
            }
        }
    }

    function up() {
        for(i=0; i < width; i++) {
            let one = items[i].innerHTML
            let two = items[i+width].innerHTML
            let three = items[i+(width*2)].innerHTML
            let four = items[i+(width*3)].innerHTML
            let column = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)]

            let filtered = column.filter(num => num)

            let missing = 4 - filtered.length
            let zeros = Array(missing).fill(0)

            let updatedCol = filtered.concat(zeros)

            items[i].innerHTML = updatedCol[0]
            items[i+width].innerHTML = updatedCol[1]
            items[i+(width*2)].innerHTML = updatedCol[2]
            items[i+(width*3)].innerHTML = updatedCol[3]
        }
    }

    function down() {
        for(i=0; i < width; i++) {
            let one = items[i].innerHTML
            let two = items[i+width].innerHTML
            let three = items[i+(width*2)].innerHTML
            let four = items[i+(width*3)].innerHTML
            let column = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)]

            let filtered = column.filter(num => num)

            let missing = 4 - filtered.length
            let zeros = Array(missing).fill(0)

            let updatedCol = zeros.concat(filtered)

            items[i].innerHTML = updatedCol[0]
            items[i+width].innerHTML = updatedCol[1]
            items[i+(width*2)].innerHTML = updatedCol[2]
            items[i+(width*3)].innerHTML = updatedCol[3]
        }
    }

    function combineRow() {
        for(i = 0; i < width*width-1; i++) {
            if(items[i].innerHTML === items[i+1].innerHTML) {
                let total = parseInt(items[i].innerHTML) + parseInt(items[i+1].innerHTML)
                items[i].innerHTML = total
                items[i+1].innerHTML = 0
                score += total
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }

    function combineCol() {
        for(i = 0; i < 12; i++) {
            if(items[i].innerHTML === items[i+width].innerHTML) {
                let total = parseInt(items[i].innerHTML) + parseInt(items[i+width].innerHTML)
                items[i].innerHTML = total
                items[i+width].innerHTML = 0
                score += total
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }

    //assign arrow presses
    function arrows(event) {
        if(event.keyCode === 39){
            rightArrow()
        } else if(event.keyCode == 37){
            leftArrow()
        } else if(event.keyCode == 38){
            upArrow()
        } else if(event.keyCode == 40){
            downArrow()
        }
    }
    document.addEventListener('keyup', arrows)

    function rightArrow() {
        right()
        combineRow()
        right() //checks that items to the right, after row has been combined
        randomize()
    }

    function leftArrow() {
        left()
        combineRow()
        left()
        randomize()
    }

    function upArrow() {
        up()
        combineCol()
        up()
        randomize()
    }

    function downArrow() {
        down()
        combineCol()
        down()
        randomize()
    }

    function checkForWin() {
        for(i=0; i < items.length; i++){
            if(score == 2048) {
                resultDisplay.innerHTML = "You win!"
                document.removeEventListener('keyup', arrows)
            }
        }
    }

    function checkForGameOver(){
        let zeros = 0
        for(i=0; i < items.length; i++) {
            if(items[i].innerHTML == 0) {
                zeros++
            }
        }

        if(zeros === 0) {
            resultDisplay.innerHTML = "You lose!"
            document.removeEventListener('keyup', arrows)
        }
    }
})
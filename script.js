(function(){
    const currPlayerEle = document.querySelector('#current-player');
    const currMarkerEle = document.querySelector('#current-marker');

    const gameBoard = {
        board: [null, null, null, null, null, null, null, null, null],
        players: [],
        playersTurn: 1,
        currentMarker:"O",
        updateMarker: ()=>{
            gameBoard.playersTurn === 1 ? gameBoard.currentMarker = "X" : gameBoard.currentMarker = "O"
            currMarkerEle.innerText = gameBoard.currentMarker 
        },
        updatePlayerTurn: ()=>{
            gameBoard.playersTurn = gameBoard.playersTurn === 1 ? 2 : 1
            currPlayerEle.innerText = gameBoard.playersTurn
        },
    };
    
    currPlayerEle.innerText = gameBoard.playersTurn;
    currMarkerEle.innerText = gameBoard.currentMarker;
    
    function Player(){
        this.playerNum = gameBoard.players.length === 0 ? 1 : 2
        gameBoard.players.push(this.playerNum)
    
        this.maker = this.playerNum === 1 ? "O" : "X"

        this.score = 0
    }
    
    const player1 = new Player();
    const player2 = new Player();
    
    const btns = document.querySelectorAll(".btns");
    
    for (let btn of btns){
        btn.addEventListener("click", ()=>{
            let space = gameBoard.board[btn.id-1]
            
            if (!space){
                gameBoard.board[btn.id-1] = gameBoard.currentMarker
                btn.innerText = `${gameBoard.currentMarker}`
                checkWinner();
                gameBoard.updateMarker();
                gameBoard.updatePlayerTurn();
            } else console.log("you cant go here")
        });
    }
    
    function checkWinner(){
        const winningSpaces = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],]

        let allWinningSets = [];
        
        for (let set of winningSpaces){
            createWinningSet(set);
        }
        
        function createWinningSet(spaces){
            let winningSet = []
            for (let space of spaces){
                winningSet.push(gameBoard.board[space])
            }
            
            allWinningSets.push(winningSet);
            return winningSet;
        }

        for(let set of allWinningSets){
                if (set.join() === "X,X,X" || set.join() === "O,O,O"){
                    createModal(`<p>Player ${gameBoard.playersTurn} won!</p>`);
                    if(set.join() === "O,O,O") {++player1.score; updateScores(player1);}
                    else {++player2.score; updateScores(player2);}
                    return set
                }else{
                    if(allWinningSets.flat().filter((element) => element === null).length === 0 && allWinningSets.indexOf(set) === allWinningSets.length - 1){
                        return createModal("It's a tie! No one wins!")
                    }
                }
        }
    }

    function updateScores(player){
        let playerScoreEle = document.querySelector(`.player${player.playerNum}-score`)
        playerScoreEle.innerText = `Score: ${player.score}`
    }

    function createModal(msg){
        //CREATE backdrop
        const modalContainer = document.createElement("div");
        modalContainer.classList.add('modal-container');
        //CREATE modal window
        const modal = document.createElement("div");
        modal.classList.add("modal");
        modal.innerHTML=`${msg}`;
        //APPEND modal window
        modalContainer.appendChild(modal);
        const btnContainer = document.createElement("div");
        btnContainer.classList.add("btn-container");
        modal.appendChild(btnContainer);
        //CREATE playAgain-btn
        const playAgainBtn = document.createElement("button");
        playAgainBtn.classList.add("play-again-btn");
        playAgainBtn.addEventListener('click', ()=>{playAgain(modalContainer)});
        playAgainBtn.innerText= 'Play Another Round';
        //CREATE resetBtn
        const resetBtn = document.createElement("button");
        resetBtn.classList.add("reset-btn");
        resetBtn.innerText= 'Reset Game';
        resetBtn.addEventListener('click', ()=>{reset(modalContainer)});
        //APPEND buttons
        btnContainer.appendChild(playAgainBtn);
        btnContainer.appendChild(resetBtn);
        //APPEND modal container and window
        document.querySelector(".board-container").appendChild(modalContainer);
    }

    function playAgain(modalContainer){
        gameBoard.board = gameBoard.board.map(el => el = null)
        for (let btn of btns){
            btn.innerText = " ";
        }
        document.querySelector('.board-container').removeChild(modalContainer)
    }

    function reset(modalContainer){
        playAgain(modalContainer)

        gameBoard.playersTurn = 1,
        gameBoard.currentMarker = "O"

        player1.score = 0
        player2.score = 0

        updateScores(player1)
        updateScores(player2)
    }
})()

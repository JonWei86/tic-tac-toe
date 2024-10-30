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
    };
    
    const player1 = new Player();
    const player2 = new Player();
    
    console.log("Player 1:", player1.playerNum, player1.maker);
    console.log("Player 2:", player2.playerNum, player2.maker);
    console.log("Players Array",gameBoard.players);
    console.log("Current Marker", gameBoard.currentMarker);
    console.log("Player" + gameBoard.playersTurn +"'s turn");
    console.log(gameBoard.board[0], gameBoard.board[1], gameBoard.board[2]);
    console.log(gameBoard.board[3], gameBoard.board[4], gameBoard.board[5]);
    console.log(gameBoard.board[6], gameBoard.board[7], gameBoard.board[8]);
    
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
                console.log("Current Marker should be", gameBoard.currentMarker);
                console.log("Player" + gameBoard.playersTurn +"'s turn");
            } else console.log("you cant go here")
    
            console.log(gameBoard.board[0], gameBoard.board[1], gameBoard.board[2]);
            console.log(gameBoard.board[3], gameBoard.board[4], gameBoard.board[5]);
            console.log(gameBoard.board[6], gameBoard.board[7], gameBoard.board[8]);
        });
    };
    
    function checkWinner(){
        let allWinningSets = [];
    
        function createWinningSet(spaces){
            let winningSet = []
            for (let space of spaces){
                winningSet.push(gameBoard.board[space])
            }
            
            allWinningSets.push(winningSet);
            return winningSet;
        };
    
        const row1 = createWinningSet([0,1,2]);
        const row2 = createWinningSet([3,4,5]);
        const row3 = createWinningSet([6,7,8]);
    
        const col1 = createWinningSet([0,3,6]);
        const col2 = createWinningSet([1,4,7]);
        const col3 = createWinningSet([2,5,8]);
    
        const diag1 = createWinningSet([0,4,8]);
        const diag2 = createWinningSet([2,4,6]);
    
        console.log("row 1", row1);
        console.log("row 2", row2);
        console.log("row 3", row3);
        console.log("col 1", col1);
        console.log("col 2", col2);
        console.log("col 3", col3);
        console.log("diag 1", diag1);
        console.log("diag 2", diag2);
    
        for(set of allWinningSets){
            if(allWinningSets.flat().some((element)=> element === null)){
                if (set.join() === "X,X,X" || set.join() === "O,O,O"){
                    createModal(`<p>Player ${gameBoard.playersTurn} won!</p>`);
                    if(set.join() === "O,O,O") {++player1.score; updateScores(player1);}
                    else {++player2.score; updateScores(player2);}
                    console.log('player1 score:', player1.score)
                    console.log('player2 score:', player2.score)
                    return set
                } 
            }else{return createModal("It's a tie! No one wins!")}
        
        }
    
    };

    function updateScores(player){
        let playerScoreEle = document.querySelector(`.player${player.playerNum}-score`)
        playerScoreEle.innerText = `Score: ${player.score}`
    }

    function createModal(msg){
        //create backdrop
        const modalContainer = document.createElement("div");
        modalContainer.classList.add('modal-container');
        //create modal window
        const modal = document.createElement("div");
        modal.classList.add("modal");
        modal.innerHTML=`${msg}`;
        //append modal window
        modalContainer.appendChild(modal);
        const btnContainer = document.createElement("div");
        btnContainer.classList.add("btn-container");
        modal.appendChild(btnContainer);
        //create buttons
        //create playAgain-btn
        const playAgainBtn = document.createElement("button");
        playAgainBtn.classList.add("play-again-btn");
        playAgainBtn.addEventListener('click', ()=>{playAgain(modalContainer)});
        playAgainBtn.innerText= 'Play Another Round';
        //create resetBtn
        const resetBtn = document.createElement("button");
        resetBtn.classList.add("reset-btn");
        resetBtn.innerText= 'Reset Game';
        resetBtn.addEventListener('click', ()=>{reset(modalContainer)});
        //appened buttons
        btnContainer.appendChild(playAgainBtn);
        btnContainer.appendChild(resetBtn);
        //appened modal container and window
        document.querySelector(".board-container").appendChild(modalContainer);
    };

    function playAgain(modalContainer){
        gameBoard.board = [null, null, null, null, null, null, null, null, null];
        for (btn of btns){
            btn.innerText = " ";
        }
        document.querySelector('.board-container').removeChild(modalContainer)
    };

    function reset(modalContainer){
        gameBoard.board = [null, null, null, null, null, null, null, null, null];
        for (btn of btns){
            btn.innerText = " ";
        }

        gameBoard.playersTurn = 1,
        gameBoard.currentMarker = "O"

        player1.score = 0
        player2.score = 0

        updateScores(player1)
        updateScores(player2)

        document.querySelector('.board-container').removeChild(modalContainer)
    };

})()

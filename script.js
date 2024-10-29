const gameBoard = {
    board: [null, null, null, null, null, null, null, null, null],
    players: [],
    playersTurn: 1,
    currentMarker:"O",
    winner: null,
    updateMarker: ()=>{gameBoard.playersTurn === 1 ? gameBoard.currentMarker = "X" : gameBoard.currentMarker = "O"},
    updatePlayerTurn: ()=>{gameBoard.playersTurn = gameBoard.playersTurn === 1 ? 2 : 1},
};

function Player(){
    this.playerNum = gameBoard.players.length === 0 ? 1 : 2
    gameBoard.players.push(this.playerNum)

    this.maker = this.playerNum === 1 ? "O" : "X"
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
        if (set.join() === "X,X,X" || set.join() === "O,O,O"){
            console.log('THE WINNER IS PLAYER:', gameBoard.playersTurn, gameBoard.currentMarker)
            console.log(set)
            return set
        } 
    }

};
const cuadrado = document.querySelector(".cuadrado");
console.log(cuadrado.dataset.value);

const gameBoard = (function(){
    let board = [0,0,0,0,0,0,0,0,0];
    const winningCombinatios = ["012","345","678",""];

    const setMovement = (position) => {board[position]=1};

    const restartGame = ()=>{board = [0,0,0,0,0,0,0,0,0];}

    const fullBoard = ()=>{return board.every((e)=>{e===1})};

    return{
        setMovement,restartGame,fullBoard,winningCombinatios
    }
})();

function createPlayer(figure){
    let play_code = [];

    const getFigure = ()=>{return figure};

    const setPlayCode = (code)=>{play_code.push(code)};

    const getPlayCode = (code)=>{play_code};

    return{
        getFigure,setPlayCode,getPlayCode
    }
}

const gameController = (function(){
    let player_turn = "X";

    const player_1 = createPlayer("X");
    const player_2 = createPlayer("O");

    const get_turn =() =>{return player_turn}

    const change_turn = ()=> {player_turn=player_turn==="X"?"O":"X"}

    const player1Win = ()=>{
        return player_1.getPlayCode.every((code)=>{gameBoard.winningCombinatios.includes(code)})
    }

    const player2Win = ()=>{
        return player_1.getPlayCode.every((code)=>{gameBoard.winningCombinatios.includes(code)})
    }
    return{
        change_turn,get_turn,player1Win,player2Win
    }
})();



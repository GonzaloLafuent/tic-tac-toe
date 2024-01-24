const cuadrado = document.querySelector(".cuadrado");
console.log(cuadrado.dataset.value);

const gameBoard = (function(){
    let board = [0,0,0,0,0,0,0,0,0];
    const winningCombinatios = ["012","345","678"];

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

    const getPlayCode = (code)=>{return play_code};

    return{
        getFigure,setPlayCode,getPlayCode
    }
}

const gameController = (function(){
    const player_1 = createPlayer("X");
    const player_2 = createPlayer("O");

    let player_turn = player_1;

    const getTurn =() =>{return player_turn}

    const changeTurn = ()=> {player_turn=player_turn===player_1?player_2:player_1}

    const playerWin = ()=>{
        return gameBoard.winningCombinatios.some((combination)=>{
            return combination.split("").every((code)=>{
                return gameController.getTurn().getPlayCode().includes(code)
            });
        });
    }

    return{
        changeTurn,getTurn,playerWin
    }
})();

const domController =(function(){
    const boxes = document.querySelectorAll(".cuadrado");
    const text_winner= document.querySelector("h3");
    function addBoxController(){
        boxes.forEach(box => {
            box.addEventListener("click",(e)=>{
                box.textContent = gameController.getTurn().getFigure();
                gameBoard.setMovement(e.target.dataset.value);
                gameController.getTurn().setPlayCode(e.target.dataset.value);
                console.log(e.target.dataset.value);
                console.log(gameController.getTurn().getPlayCode());
                if(gameController.playerWin()) text_winner.textContent = "gano" + gameController.getTurn().getFigure(); 
                gameController.changeTurn();
            })
        });
    }

    const activate = ()=>{
        addBoxController();
    }

    return{
        activate
    }
})();

domController.activate();



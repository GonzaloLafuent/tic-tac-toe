const cuadrado = document.querySelector(".cuadrado");
console.log(cuadrado.dataset.value);

const gameBoard = (function(){
    let board = [0,0,0,0,0,0,0,0,0];
    const winningCombinatios = ["012","345","678","048","246","036","147","258"];
    let end = false;

    const setMovement = (position) => {board[position]=1};

    const validMovement = (position) =>{return board[position]==1?false:true}

    const restartGame = ()=>{
        board = [0,0,0,0,0,0,0,0,0];
        end = false;
    }

    const fullBoard = ()=>{return board.every((e)=>{e===1})};

    const finish = ()=>{end=true}

    const isfinish = ()=>{return end}

    return{
        setMovement,restartGame,fullBoard,validMovement,isfinish,finish,winningCombinatios
    }
})();

function createPlayer(figure){
    let play_code = [];

    const getFigure = ()=>{return figure};

    const setPlayCode = (code)=>{play_code.push(code)};

    const getPlayCode = (code)=>{return play_code};

    let restartPlayCode = ()=>{play_code=[]};

    return{
        getFigure,setPlayCode,getPlayCode,restartPlayCode
    }
}

const gameController = (function(){
    const player_1 = createPlayer("X");
    const player_2 = createPlayer("O");

    let player_turn = player_1;

    const getTurn =() =>{return player_turn}

    const changeTurn = ()=> {player_turn=player_turn===player_1?player_2:player_1}

    const restartPlayers = () => {player_1.restartPlayCode(); player_2.restartPlayCode();}

    const playerWin = ()=>{
        return gameBoard.winningCombinatios.some((combination)=>{
            return combination.split("").every((code)=>{
                return gameController.getTurn().getPlayCode().includes(code)
            });
        });
    }

    return{
        changeTurn,getTurn,playerWin,restartPlayers
    }
})();

const domController =(function(){
    const boxes = document.querySelectorAll(".cuadrado");
    const text_winner= document.querySelector(".txt-winner");
    const btn_restart = document.querySelector("#btn-restart");

    function addBoxController(){
        boxes.forEach(box => {
            box.addEventListener("click",(e)=>{
                if(gameBoard.validMovement(e.target.dataset.value) && !gameBoard.isfinish()){
                    box.textContent = gameController.getTurn().getFigure();
                    gameBoard.setMovement(e.target.dataset.value);
                    gameController.getTurn().setPlayCode(e.target.dataset.value);

                    if(gameController.playerWin()){ 
                        text_winner.textContent = "El Ganador es: " + gameController.getTurn().getFigure() + "!";
                        gameBoard.finish();
                    } else gameController.changeTurn();      

                }    
            })
        });
    }

    function addBtnRestart(){
        btn_restart.addEventListener("click",()=>{
            gameBoard.restartGame();    
            gameController.restartPlayers();
            text_winner.textContent = "";
            boxes.forEach(box => {
                box.textContent = "";
            });
        });
    }

    const activate = ()=>{
        addBoxController();
        addBtnRestart();
    }

    return{
        activate
    }
})();

domController.activate();



const React = require("react");
const Board = require("./Board");

class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //who is next
            xIsNext: true,
            //current step
            stepNumber: 0,
            history: [
                { squares: Array(9).fill(null) }
            ]
        }
    }

    handleClick(i){
        //copy history
        const history = this.state.history.slice(0,this.state.stepNumber+1);
        const current = history[history.length-1];

        const squares = current.squares.slice();

        const winner = caculateWinner(squares);
        const gameDraw = allSquareClicked(squares);

         // squares(i) prevent other player to change value on the same square
        if (squares[i] || winner || gameDraw) {
            return;
        }

        //find out who is next
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        
        this.setState({
            history: history.concat({
                squares: squares
            }),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        })
    }

    restart(){
        this.setState({
            stepNumber: 0,
            xIsNext: true,
            history: [
                { squares: Array(9).fill(null) }
            ]
        })
    }

    redo(step){
        this.setState({
            stepNumber: step - 1,
            xIsNext: ((step+1)%2) === 0
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = caculateWinner(current.squares);
        const gameDraw = allSquareClicked(current.squares);


        // const moves = history.map((step, move) => {
        //     const desc = '';

        //     return(
        //         <li key={move}> 
        //             <button onClick={() => {this.jumpTo(move)}}>
        //                 {desc}
        //             </button>
        //         </li>
        //     )
        // });

        const thisStep = history.length-1;

        let status;
        let whoWin;
        let restart;
        let redo;
        
        status = 'waiting for player ' + (this.state.xIsNext ? 'X' : 'O');
        
        if (thisStep > 0){
            redo = <button className = "re-button" onClick={() => {this.redo(thisStep)}}>redo</button>;
       }

        if(winner){
            status = 'winner is ' + winner;
            redo = '';
            restart = <button className = "re-button" onClick={() => {this.restart()}}>restart</button>;
        } else if (gameDraw){
            status = 'game drawn';
            redo = '';
            restart = <button className = "re-button" onClick={() => {this.restart()}}>restart</button>;
        }

        return (
            <div className = "game">
                <div className = "game-board">
                <Board onClick = {(i) => this.handleClick(i)}
                       squares = {current.squares} />
                </div>
                <div className = "game-info">
                    <div>{status}</div>
                </div>
                <div className = "re-button">
                    <div>{restart}</div>
                    <div>{redo}</div>
                </div>
            </div>
        )
    }
}

function caculateWinner(squares){
    //win conditions
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for(let i =0; i < lines.length; i++){
        const [a, b, c] = lines[i];
        //if X or O on the same line
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
            return squares[a];
        }
    }

    return null;
}

function allSquareClicked(squares){
    let count = 0;

    squares.forEach(function(item){
        if(item !== null){
            count++;
        }
    })

    if (count === 9){
        return true;
    } else {
        return false;
    }
}

module.exports = Game;
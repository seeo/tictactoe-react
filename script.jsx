//then we change the Square class into just a function...
function Square(props) {
    //delete costructor from the square component since square no longer keeps track of the game state, but board is.
        /*By calling this.setState from an onClick handler in the Square’s render method,
        we tell React to re-render that Square whenever its <button> is clicked. */
        /*In React, it’s conventional to use on[Event] names for props which represent events,
        and handle[Event] for the methods which handle the events. */
        return (
            <button
            className="square"
            onClick={props.onClick}
            >
                {props.value}
            </button>
        );
    };

// In React terms, the Square components are now controlled components. The Board has full control over them.

class Board extends React.Component {
/*To collect data from multiple children,
or to have two child components communicate with each other,
you need to declare the shared state in their parent component instead.
The parent component can pass the state back down to the children by using props;
this keeps the child components in sync with each other and with the parent component.
*/

constructor(props){
/*Add a constructor to the Board and set the Board’s initial state to contain an array of 9 nulls;
corresponding to the 9 squares:
  */
    super(props);
    this.state = {
        squares: Array(9).fill(null),
        xIsNext: true, //Each time a player moves, xIsNext (a boolean) will be flipped to determine which player goes next and the game’s state will be saved.
    }
}

    handleClick(i){
        const squares = this.state.squares.slice();
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext, //flip this boolean value
        });
        //Keeping the state of all squares in the Board component will allow it to determine the winner in the future.
    }

    renderSquare(i) {
        /* Now we’re passing down two props from Board to Square: value and onClick.
        We could not set it at the Square component; if we did, we would not be able to pass it back up to the board.
        Since state is considered to be private to a component that defines it, we cannot update the Board’s state directly from Square.*/
        return (
            <Square
                value={this.state.squares[i]}
                onClick={()=>this.handleClick(i)}
            />
        );
    }

    render() {
        const status = 'Next player: ' + (this.state.xIsNext? 'X' : 'O');
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}  {/* NW */}
                    {this.renderSquare(1)}  {/* NN */}
                    {this.renderSquare(2)}  {/* NE */}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}   {/* WW */}
                    {this.renderSquare(4)}   {/* CEN */}
                    {this.renderSquare(5)}   {/* EE */}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}  {/* SW */}
                    {this.renderSquare(7)}  {/* SS */}
                    {this.renderSquare(8)}  {/* SE */}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className = "game">
                <div className = "game-board">
                    <Board />
                </div>
                <div className = "game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

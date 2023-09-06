import "./App.css";
import { useState } from "react";

function App() {
	return (
		<>
			<Board />
		</>
	);
}

export default App;

function Board() {
	let [value, setValue] = useState(Array(9).fill(null));
	let [isXTurn, setXTurn] = useState(true);
	let [winner, setWinner] = useState(null);

	function handleClick(index) {
		if (value[index] || winner) {
			return;
		}
		let clonevalue = value.slice();
		clonevalue[index] = isXTurn ? "X" : "O";
		setValue(clonevalue);
		setXTurn(!isXTurn);
		setWinner(checkWinner(clonevalue));
	}

	function handleRefresh() {
		setValue(Array(9).fill(null));
		setXTurn(true);
		setWinner(null);
	}

	return (
		<>
			<Title currentTurn={isXTurn} winner={winner} draw={() => checkDraw(value, winner)} />
			<div className="flex flex-col justify-center items-center w-full h-full">
				<div className="flex flex-row">
					<Square value={value[0]} onBoxClick={() => handleClick(0)} />
					<Square value={value[1]} onBoxClick={() => handleClick(1)} />
					<Square value={value[2]} onBoxClick={() => handleClick(2)} />
				</div>
				<div className="flex flex-row">
					<Square value={value[3]} onBoxClick={() => handleClick(3)} />
					<Square value={value[4]} onBoxClick={() => handleClick(4)} />
					<Square value={value[5]} onBoxClick={() => handleClick(5)} />
				</div>
				<div className="flex flex-row">
					<Square value={value[6]} onBoxClick={() => handleClick(6)} />
					<Square value={value[7]} onBoxClick={() => handleClick(7)} />
					<Square value={value[8]} onBoxClick={() => handleClick(8)} />
				</div>
			</div>
			<Refresh onRefreshClick={handleRefresh} />
		</>
	);
}

function checkWinner(boxes) {
	let possibleCases = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i of possibleCases) {
		if (boxes && boxes[i[0]] === boxes[i[1]] && boxes[i[0]] === boxes[i[2]]) {
			return boxes[i[0]];
		}
	}
	return null;
}

function checkDraw(boxes, winner) {
	return !winner && !boxes.includes(null) ? true : false;
}

function Square({ value, onBoxClick }) {
	return (
		<div>
			<button onClick={onBoxClick} className="border-black border-2 p-2">
				{value}
			</button>
		</div>
	);
}

function Title({ currentTurn, winner, draw }) {
	if (draw()) {
		return <div>We have a draw</div>;
	}
	if (winner) {
		return <div>We have a winner: {winner}</div>;
	}
	return <div>Current Turn:{currentTurn ? "X" : "O"}</div>;
}

function Refresh({ onRefreshClick }) {
	return <button onClick={onRefreshClick}>Play again?</button>;
}

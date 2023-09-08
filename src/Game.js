import "./Game.css";
import { useState } from "react";

const possibleWinningCases = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

export default function Game() {
	let [boxValues, setBoxValue] = useState(Array(9).fill(null));
	let [isXTurn, setXTurn] = useState(true);
	let [gameResult, setGameResult] = useState(null);

	function handleRefresh() {
		setBoxValue(Array(9).fill(null));
		setXTurn(true);
		setGameResult(null);
	}

	function handleClick(index) {
		if (boxValues[index] || gameResult) {
			return;
		}
		let clonevalue = boxValues.slice();
		clonevalue[index] = isXTurn ? "X" : "O";
		setBoxValue(clonevalue);
		setXTurn(!isXTurn);
		setGameResult(checkResult(clonevalue));
	}

	return (
		<>
			<div className="h-screen flex flex-col justify-center items-center">
				<Board boxValues={boxValues} onBoxClick={handleClick} />
				<div className="flex flex-col justify-center items-center w-full">
					<Title currentTurn={isXTurn} result={() => checkResult(boxValues)} />
				</div>
				<RenderRefresh boxValues={boxValues} handleRefresh={handleRefresh} />
			</div>
		</>
	);
}

function RenderRefresh({ boxValues, handleRefresh }) {
	if (checkResult(boxValues)) {
		return (
			<div className="flex flex-col justify-center items-center w-full mt-8">
				<Refresh onRefreshClick={handleRefresh} />
			</div>
		);
	}
}

function Board({ boxValues, onBoxClick }) {
	let winningCase = getWinningCasePositions(boxValues);
	return (
		<>
			<div className="flex flex-col justify-center items-center w-full">
				<div className="flex flex-row">
					<Square
						value={boxValues[0]}
						onBoxClick={() => onBoxClick(0)}
						backgroundColor={winningCase.includes(0)?"matching-row":""}
					/>
					<Square
						value={boxValues[1]}
						onBoxClick={() => onBoxClick(1)}
						backgroundColor={winningCase.includes(1)?"matching-row":""}
					/>
					<Square
						value={boxValues[2]}
						onBoxClick={() => onBoxClick(2)}
						backgroundColor={winningCase.includes(2)?"matching-row":""}
					/>
				</div>
				<div className="flex flex-row">
					<Square
						value={boxValues[3]}
						onBoxClick={() => onBoxClick(3)}
						backgroundColor={winningCase.includes(3)?"matching-row":""}
					/>
					<Square
						value={boxValues[4]}
						onBoxClick={() => onBoxClick(4)}
						backgroundColor={winningCase.includes(4)?"matching-row":""}
					/>
					<Square
						value={boxValues[5]}
						onBoxClick={() => onBoxClick(5)}
						backgroundColor={winningCase.includes(5)?"matching-row":""}
					/>
				</div>
				<div className="flex flex-row">
					<Square
						value={boxValues[6]}
						onBoxClick={() => onBoxClick(6)}
						backgroundColor={winningCase.includes(6)?"matching-row":""}
					/>
					<Square
						value={boxValues[7]}
						onBoxClick={() => onBoxClick(7)}
						backgroundColor={winningCase.includes(7)?"matching-row":""}
					/>
					<Square
						value={boxValues[8]}
						onBoxClick={() => onBoxClick(8)}
						backgroundColor={winningCase.includes(8)?"matching-row":""}
					/>
				</div>
			</div>
		</>
	);
}

function Square({ value, onBoxClick, backgroundColor }) {
	return (
		<div>
			<button onClick={onBoxClick} className={`h-24 w-24 btn ${backgroundColor}`}>
				<span className={`text-xl font-bold ${value === "X" ? "X-color" : "O-color"}`}>
					{value}
				</span>
			</button>
		</div>
	);
}

function Title({ currentTurn, result }) {
	let title =
		result() === null
			? `Current Turn:${currentTurn ? "X" : "O"}`
			: result() === "Draw"
			? "We have a draw"
			: `We have a winner: ${result()}`;

	return (
		<>
			<div
				className={`font-semibold text-xl mt-7 rounded-full ${
					result() != null ? "animate-bounce text-purple-600" : ""
				}`}
			>
				<div>{title}</div>
			</div>
		</>
	);
}

function Refresh({ onRefreshClick }) {
	return (
		<button
			className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
			onClick={onRefreshClick}
		>
			Play again?
		</button>
	);
}

function checkResult(boxes) {
	let result = null;
	let isDraw = checkDraw(boxes);

	for (let i of possibleWinningCases) {
		if (boxes && boxes[i[0]] && boxes[i[0]] === boxes[i[1]] && boxes[i[0]] === boxes[i[2]]) {
			result = boxes[i[0]];
		}
	}
	return !result && isDraw ? "Draw" : result;
}

function getWinningCasePositions(boxes) {
	for (let i of possibleWinningCases) {
		if (boxes && boxes[i[0]] && boxes[i[0]] === boxes[i[1]] && boxes[i[0]] === boxes[i[2]]) {
			return i;
		}
	}
	return [];
}

function checkDraw(boxes) {
	return !boxes.includes(null) ? true : false;
}

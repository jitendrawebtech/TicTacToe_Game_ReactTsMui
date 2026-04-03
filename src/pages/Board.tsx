import { Box, Grid } from "@mui/material"
import Button from "../components/Button"
import { Button as ButtonReset } from "@mui/material";
import { useEffect, useState } from "react"
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { LOTTIE_URLS } from "../constants/lottie";

type Tplayer = "X" | "O";
type BlockPlayer = "X" | "O" | null;

const Board = () => {

	const [currentPlayer, setCurrentPlayer] = useState<Tplayer>(Math.round(Math.random()) ? "X" : "O");
	const [blocks, setBlocks] = useState<BlockPlayer[]>(Array(9).fill(null));
	const [winner, setWinner] = useState<string | null>(null);

	useEffect(() => {
		const winnerPlayer = calculateWinner(blocks);

		if (winnerPlayer) {
			setWinner(winnerPlayer);
		} else if (!winnerPlayer && !blocks.filter(block => !block).length) {
			setWinner("Both");
		}
	})

	const calculateWinner = (blocks: BlockPlayer[]) => {
		const posibleWinnerCombinations = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];

		return posibleWinnerCombinations.map(combo => {
			const [x, y, z] = combo;

			if (blocks[x] && blocks[x] === blocks[y] && blocks[x] === blocks[z]) {
				return blocks[x];
			}
			return null;
		}).filter(data => data)[0];
	}

	const setButtonValue = (i: number) => {
		const data = blocks.map((BlockVal, BlockI) => {
			if (BlockI === i) {
				return currentPlayer;
			}
			return BlockVal;
		})

		setBlocks(data);
		setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
	}


	const resetGame = () => {
		setBlocks(Array(9).fill(null));
		setWinner(null);
	}

	return (
		<Box className="box">
			{
				winner ?
					<h2 className="heading">
						{winner === 'X' || winner === 'O' ?
							<>{winner} is the winner
								<DotLottieReact
									src={LOTTIE_URLS.win2}
									loop
									autoplay
									className="anim"
								/>
								<DotLottieReact
									src={LOTTIE_URLS.win}
									loop
									autoplay
									className="anim"
								/>
							</>
							: <>{winner} are the Winner.
								<DotLottieReact
									src={LOTTIE_URLS.laughs}
									loop
									autoplay
									className="anim"
								/>
							</>
						}
					</h2>
					: <h2 className="heading">
						Hey {currentPlayer} ! It's your turn
						<DotLottieReact src={LOTTIE_URLS.laugh} loop autoplay className="anim" />
					</h2>}

			<Grid
				container
				className="gridWraper"
			>
				{
					Array(9).fill(null).map((val, i) => (
						<Grid
							className="grid"
							key={i}
							size={4}
						>
							<Button onclick={() => setButtonValue(i)} value={blocks[i]} winner={winner} />
							<p className="d-none">{val}</p>
						</Grid>
					))
				}
			</Grid>
			<ButtonReset size="small" variant="outlined" onClick={resetGame} color="error" sx={{ paddingRight: "32px", marginTop: "40px" }}>
				<DotLottieReact src={LOTTIE_URLS.reset} loop autoplay className="anim mt" />
				Reset Game
			</ButtonReset>
		</Box>
	)
}

export default Board

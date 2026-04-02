import type { ReactNode } from "react";

interface ButtonProps {
  onclick: () => void,
  value: "X" | "O" | null,
  winner: ReactNode | null
}

const Button = ({ onclick, value, winner }: ButtonProps) => {
  if (!value) {
    return (
      <button
        className="btn"
        disabled={Boolean(winner)}
        onClick={onclick}
      >
        {value}
      </button>
    )
  }
  return (
    <button
      disabled
      className={`btn btn_${value}`}
    >
      {value}
    </button>
  )
}

export default Button;

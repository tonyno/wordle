import BackspaceIcon from "@mui/icons-material/Backspace";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect } from "react";
import { KeyValue } from "../../lib/keyboard";
import { getStatuses } from "../../lib/statuses";
import { Key } from "./Key";

type Props = {
  onChar: (value: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  guesses: string[];
};

export const Keyboard = ({ onChar, onDelete, onEnter, guesses }: Props) => {
  const charStatuses = getStatuses(guesses);

  const onClick = (value: KeyValue) => {
    if (value === "ENTER") {
      onEnter();
    } else if (value === "DELETE") {
      onDelete();
    } else {
      onChar(value);
    }
  };

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === "Enter") {
        onEnter();
      } else if (e.code === "Backspace") {
        onDelete();
      } else {
        const key = e.key.toUpperCase();
        if (
          (key.length === 1 && key >= "A" && key <= "Z") ||
          "ĚŠČŘŽÝÁÍÉŮ".includes(key)
        ) {
          onChar(key);
        }
      }
    };
    window.addEventListener("keyup", listener);
    return () => {
      window.removeEventListener("keyup", listener);
    };
  }, [onEnter, onDelete, onChar]);

  return (
    <div>
      <div className="flex justify-center mb-1">
        <Key value="Ě" onClick={onClick} status={charStatuses["Ě"]} />
        <Key value="Š" onClick={onClick} status={charStatuses["Š"]} />
        <Key value="Č" onClick={onClick} status={charStatuses["Č"]} />
        <Key value="Ř" onClick={onClick} status={charStatuses["Ř"]} />
        <Key value="Ž" onClick={onClick} status={charStatuses["Ž"]} />
        <Key value="Ý" onClick={onClick} status={charStatuses["Ý"]} />
        <Key value="Á" onClick={onClick} status={charStatuses["Á"]} />
        <Key value="Í" onClick={onClick} status={charStatuses["Í"]} />
        <Key value="É" onClick={onClick} status={charStatuses["É"]} />
        <Key value="Ů" onClick={onClick} status={charStatuses["Ů"]} />
      </div>
      <div className="flex justify-center mb-1">
        <Key value="Q" onClick={onClick} status={charStatuses["Q"]} />
        <Key value="W" onClick={onClick} status={charStatuses["W"]} />
        <Key value="E" onClick={onClick} status={charStatuses["E"]} />
        <Key value="R" onClick={onClick} status={charStatuses["R"]} />
        <Key value="T" onClick={onClick} status={charStatuses["T"]} />
        <Key value="Y" onClick={onClick} status={charStatuses["Y"]} />
        <Key value="U" onClick={onClick} status={charStatuses["U"]} />
        <Key value="I" onClick={onClick} status={charStatuses["I"]} />
        <Key value="O" onClick={onClick} status={charStatuses["O"]} />
        <Key value="P" onClick={onClick} status={charStatuses["P"]} />
      </div>
      <div className="flex justify-center mb-1">
        <Key value="A" onClick={onClick} status={charStatuses["A"]} />
        <Key value="S" onClick={onClick} status={charStatuses["S"]} />
        <Key value="D" onClick={onClick} status={charStatuses["D"]} />
        <Key value="F" onClick={onClick} status={charStatuses["F"]} />
        <Key value="G" onClick={onClick} status={charStatuses["G"]} />
        <Key value="H" onClick={onClick} status={charStatuses["H"]} />
        <Key value="J" onClick={onClick} status={charStatuses["J"]} />
        <Key value="K" onClick={onClick} status={charStatuses["K"]} />
        <Key value="L" onClick={onClick} status={charStatuses["L"]} />
      </div>
      <div className="flex justify-center">
        <Key width={65.4} value="ENTER" onClick={onClick} color="green">
          <CheckCircleIcon />
        </Key>
        <Key value="Z" onClick={onClick} status={charStatuses["Z"]} />
        <Key value="X" onClick={onClick} status={charStatuses["X"]} />
        <Key value="C" onClick={onClick} status={charStatuses["C"]} />
        <Key value="V" onClick={onClick} status={charStatuses["V"]} />
        <Key value="B" onClick={onClick} status={charStatuses["B"]} />
        <Key value="N" onClick={onClick} status={charStatuses["N"]} />
        <Key value="M" onClick={onClick} status={charStatuses["M"]} />
        <Key width={65.4} value="DELETE" onClick={onClick} color="red">
          <BackspaceIcon />
        </Key>
      </div>
    </div>
  );
};

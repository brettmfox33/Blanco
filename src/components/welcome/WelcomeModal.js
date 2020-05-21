/** @jsx jsx */
import { jsx } from "@emotion/core";
import Dialog from "@material-ui/core/Dialog";
import {useEffect, useState} from "react";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import SelectGameType from "./SelectGameType";
import NewGameConfig from "./NewGameConfig";
import EnterRoomInfo from "./EnterRoomInfo";
import WaitingForPlayers from "./WaitingForPlayers";
import {useSelector} from "react-redux";

/**
 * Welcome Modal that mounts on initial page load.
 * Responsible for setting up the game.
 **/
export default function WelcomeModal({socket}) {
  const players = useSelector(state => state.public.players);
  const roomID = useSelector(state => state.public.roomID);
  const numberOfPlayers = useSelector(state => state.public.numberOfPlayers);

  const [open, setOpen] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (players && Object.values(players).filter(item => item.playerName).length === numberOfPlayers){
      setOpen(false);
    }
  }, [players]);

  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      open={open}
      aria-labelledby="form-dialog-title"
      keepMounted
    >
      <DialogContent
      style={{overflow: "hidden"}}>
        <DialogTitle
        css={{justifyContent: "center", alignItems: "center", display: "grid"}}
        >
          Welcome to Blanco! {roomID}
        </DialogTitle>
        {
          step === 0
            ? <SelectGameType setStep={setStep}/>
          : step === 1
            ? <NewGameConfig socket={socket} setStep={setStep} />
          : step === 2
            ? <EnterRoomInfo socket={socket} setStep={setStep} />
          : step === 3
            ? <WaitingForPlayers />
          : null
        }
      </DialogContent>
    </Dialog>
  )
}
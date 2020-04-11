/** @jsx jsx */
import { jsx } from "@emotion/core";
import Dialog from "@material-ui/core/Dialog";
import {useState} from "react";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import SelectGameType from "./SelectGameType";
import NewGameConfig from "./NewGameConfig";

/**
 * Welcome Modal that mounts on initial page load.
 * Responsible for setting up the game.
 **/
export default function WelcomeModal() {
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState(0);

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
        <DialogTitle>
          Welcome to Blanco!
        </DialogTitle>
        {
          step === 0
            ? <SelectGameType setStep={setStep}/>
            : <NewGameConfig setOpen={setOpen} setStep={setStep}/>
        }
      </DialogContent>
    </Dialog>
  )
}
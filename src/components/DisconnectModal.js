/** @jsx jsx */
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import {jsx} from "@emotion/core";
import React from "react";
import {useSelector} from "react-redux";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function DisconnectModal() {

  const disconnected = useSelector(state => state.public.disconnected);

  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      open={disconnected}
      aria-labelledby="form-dialog-title"
      keepMounted
    >
      <DialogTitle>
        A player has disconnected from the game.
      </DialogTitle>
      <DialogContent>
        Please refresh to start a new game.
      </DialogContent>
    </Dialog>
  )

}
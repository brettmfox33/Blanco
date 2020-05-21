/** @jsx jsx */
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import {jsx} from "@emotion/core";
import React from "react";
import {useSelector} from "react-redux";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";

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
      <DialogTitle
        css={{justifyContent: "center", alignItems: "center", display: "grid"}}
      >
        A player has disconnected from the game
      </DialogTitle>
      <DialogContentText
        css={{justifyContent: "center", alignItems: "center", display: "grid"}}
      >
        Refresh to start a new game
      </DialogContentText>
    </Dialog>
  )

}
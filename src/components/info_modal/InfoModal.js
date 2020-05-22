/** @jsx jsx */
import {jsx} from "@emotion/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import BuiltBy from "./BuiltBy";
import PoweredBy from "./PoweredBy";
import DesignedBy from "./DesignedBy";

export default function InfoModal({modalOpen, setModalOpen}) {
  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      open={modalOpen}
      aria-labelledby="form-dialog-info"
      keepMounted
      onBackdropClick={() => setModalOpen(false)}
    >
      <DialogContent>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          css={{fontWeight: 'bold'}}
        >
          <BuiltBy />
          <PoweredBy />
          <DesignedBy />
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
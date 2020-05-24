/** @jsx jsx */
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import BlurLinearIcon from '@material-ui/icons/BlurLinear';
import {jsx} from "@emotion/core";
import {Fragment} from "react";
import Tooltip from "@material-ui/core/Tooltip";

export default function DesignedBy() {
  return (
    <Fragment>
      <Grid
        css={{marginTop: 10}}
      >
        Images Used With Permission From
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Tooltip title="Freepik">
          <IconButton
            aria-label="info"
            href="https://www.freepik.com/"
            target="_blank"
          >
            <img
              draggable={false}
              alt="react"
              src={require(`../../images/info_icons/freepik.png`)}
              css={{width: '2.1875rem'}}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Vecteezy">
          <IconButton
            aria-label="info"
            href="https://www.vecteezy.com"
            target="_blank"
          >
            <BlurLinearIcon
              css={{color: 'black'}}
              fontSize="large"
              color="inherit"
            />
          </IconButton>
        </Tooltip>
      </Grid>
    </Fragment>
  )
}
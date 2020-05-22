/** @jsx jsx */
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import {jsx} from "@emotion/core";
import {Fragment} from "react";

export default function BuiltBy() {
  return (
    <Fragment>
      <Grid>
        Developed Lovingly By Brett Fox
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <IconButton
          aria-label="info"
          href="https://github.com/bfox6"
          target="_blank"
        >
          <GitHubIcon
            css={{color: 'black'}}
            fontSize="large"
            color="inherit"
          />
        </IconButton>
        <IconButton
          aria-label="info"
          href="https://www.linkedin.com/in/brett-fox-00658a19b/"
          target="_blank"
        >
          <LinkedInIcon
            css={{color: 'black'}}
            fontSize="large"
            color="inherit"
          />
        </IconButton>
      </Grid>
    </Fragment>
  )
}
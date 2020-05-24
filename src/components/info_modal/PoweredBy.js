/** @jsx jsx */
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import {jsx} from "@emotion/core";
import {Fragment} from "react";
import Tooltip from "@material-ui/core/Tooltip";

export default function PoweredBy() {
  return (
    <Fragment>
      <Grid
      css={{marginTop: 10}}
      >
        Powered by
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Tooltip title="ReactJS">
          <IconButton
            aria-label="info"
            href="https://reactjs.org/"
            target="_blank"
          >
            <img
              draggable={false}
              alt="react"
              src={require(`../../images/info_icons/react.png`)}
              css={{width: '2.1875rem'}}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="React-Redux">
          <IconButton
            aria-label="info"
            href="https://react-redux.js.org/"
            target="_blank"
          >
            <img
              draggable={false}
              alt="react"
              src={require(`../../images/info_icons/redux.png`)}
              css={{width: '2.1875rem'}}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Material-UI">
          <IconButton
            aria-label="info"
            href="https://material-ui.com/"
            target="_blank"
          >
            <img
              draggable={false}
              alt="react"
              src={require(`../../images/info_icons/material_ui.png`)}
              css={{width: '2.1875rem'}}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Framer">
          <IconButton
            aria-label="info"
            href="https://www.framer.com/"
            target="_blank"
          >
            <img
              draggable={false}
              alt="react"
              src={require(`../../images/info_icons/framer.png`)}
              css={{width: '2.1875rem'}}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Socket.io">
          <IconButton
            aria-label="info"
            href="https://socket.io/"
            target="_blank"
          >
            <img
              draggable={false}
              alt="react"
              src={require(`../../images/info_icons/socket_io.png`)}
              css={{width: '2.1875rem'}}
            />
          </IconButton>
        </Tooltip>
      </Grid>
    </Fragment>
  )
}
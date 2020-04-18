/** @jsx jsx */
import {jsx} from "@emotion/core";
import {useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import FactoryDisplay from "./game_pieces/FactoryDisplay";

export default function FactoryDisplays() {
  const numberOfFactoryTiles = useSelector(state => state.public.numberOfFactoryTiles);
  return (
    <Grid
    //   id="factoryDisplays"
    //   container
    //   direction="row"
    //   justify="center"
    //   alignItems="center"
      css={{
        gridArea: 'factoryDisplays',
        paddingTop: 10
      }}
    >
       {
        Array.from({length: numberOfFactoryTiles}, (_, index) => {
          return (
            <FactoryDisplay displayNumber={index+1}/>
          )
        })
      }
    </Grid>
  )
}
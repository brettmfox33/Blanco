/** @jsx jsx */
import {jsx} from "@emotion/core";
import {useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import FactoryDisplay from "./game_pieces/FactoryDisplay";

export default function FactoryDisplays() {
  const factoryDisplays = useSelector(state => state.public.gameState.factoryDisplays);

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
         Object.keys(factoryDisplays).map(factoryNumber => {
           return (
             <FactoryDisplay displayNumber={factoryNumber+1} />
           )
         })
      }
    </Grid>
  )
}
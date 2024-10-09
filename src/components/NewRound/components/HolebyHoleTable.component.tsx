import { Box, Table, TableBody } from "@mui/material";
import { IShots } from "../../../types/roundData.types";
import ShotsTableBody from "../../RoundsData/components/shotsTable/ShotsTableBody.component";
import ShotsTableHeader from "../../RoundsData/components/shotsTable/ShotsTableHeader.component";
import ShotsTableHeaderStack from "../../RoundsData/components/shotsTable/ShotsTableHeaderStack.component";
import { ShotPosition } from "../../common/shotPositions/ShotPosition.component";
import HolebyHoleInternal from "./HolebyHoleInternal.component";

interface IHolebyHoleProps {
  holes: IShots[],
}

const HolebyHoleTable = ({ holes }: IHolebyHoleProps) => {
  return (
    <>

      {holes.map((hole: IShots, index: number) => {

        const yyy = Object.entries(hole);
        console.log("-> ", yyy);
        return (
          <>
            <HolebyHoleInternal hole={hole} />


            <Box sx={{
              display: 'flex', gap: '2px', flexGrow: '1', flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'stretch',
              alignContent: 'space-between'
            }}>
              <Box>
                <ShotsTableHeaderStack firstRow='#' secondRow={''} />
                <Box>{hole.holeNumber}</Box>
              </Box>
              <Box>
                <ShotsTableHeaderStack firstRow='par' secondRow={''} />
                <Box>{hole.par}</Box>
              </Box>
              <Box>
                <ShotsTableHeaderStack firstRow='score' secondRow={''} />
                <Box>
                  {/* {`${hole.strokes} (${hole.vspar.value}) | ${vspar.string}`} */}
                  {`${hole.strokes} (+1) | BOGEY`}
                </Box>
              </Box>
              <Box>
                <ShotsTableHeaderStack firstRow='points' secondRow={''} />
                <Box>{hole.points}</Box>
              </Box>
              <Box>
                <ShotsTableHeaderStack firstRow='fairways' secondRow={''} />
                <Box><ShotPosition position={Number(hole.fairway)} /></Box>
              </Box>
              <Box>
                <ShotsTableHeaderStack firstRow='gir' secondRow={''} />
                <Box>{hole.gir ? 'Yes' : 'No'}</Box>
              </Box>
              <Box>
                <ShotsTableHeaderStack firstRow='gir bogey' secondRow={''} />
                <Box>{hole.girBogey ? 'Yes' : 'No'}</Box>
              </Box>
              <Box>
                <ShotsTableHeaderStack firstRow='scramble' secondRow={''} />
                <Box>{hole.scramble !== 0 ? hole.scramble : '-'}</Box>
              </Box>
              <Box>
                <ShotsTableHeaderStack firstRow='up & down' secondRow={''} />
                <Box>{hole.upDown !== '' ? hole.upDown.toUpperCase() : '-'}</Box>
              </Box>
              <Box>
                <ShotsTableHeaderStack firstRow='sand' secondRow={''} />
                <Box>{hole.sand}</Box>
              </Box>
              <Box>
                <ShotsTableHeaderStack firstRow='putts' secondRow={''} />
                <Box>{hole.putts}</Box>
              </Box>
              <Box>
                <ShotsTableHeaderStack firstRow='penalties' secondRow={'water | out'} />
                <Box>{`${hole.water} | ${hole.out}`}</Box>
              </Box>
            </Box>
          </>
        )
      })}


      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <ShotsTableHeader firstLabel='#' singleHole={true} firstColumn={true} />
        <TableBody>
          {holes.map((hole: IShots, index: number) => {
            return (<ShotsTableBody shot={hole} key={index} />)
          })}
        </TableBody>
      </Table>
    </>

  )
}

export default HolebyHoleTable

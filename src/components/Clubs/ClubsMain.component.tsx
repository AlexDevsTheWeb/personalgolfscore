import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { BoxPlayer, Grid, Typography } from "../../styles";
import ClubsList from "./ClubsList.componente";
import ClubsHeaderTypography from "../../styles/typography/ClubsHeaderTypography.styles";

const ClubsMain = () => {
  const { isLoading, clubs, totalClubs } = useSelector((store: RootState) => store.clubs);

  return (
    <BoxPlayer>
      <ClubsHeaderTypography
        playerID={clubs.playerID}
        totalClubs={totalClubs} />
      <Grid
        container
        spacing={{ xs: 1, md: 1 }}
        columns={12}
      >
        {isLoading
          ? (<Typography>Loading ...</Typography>)
          : clubs.types.length > 0
            ?
            (clubs.types.map((club, index) => {
              return (
                <Grid
                  item
                  sm={12}
                  md={12}
                  key={index}
                  sx={{ minWidth: "100%" }}
                >
                  <ClubsList
                    club={club}
                  />
                </Grid>
              )
            })
            )
            : (<Typography>No clubs found.</Typography>)
        }
      </Grid>
    </BoxPlayer >
  );
};

export default ClubsMain;
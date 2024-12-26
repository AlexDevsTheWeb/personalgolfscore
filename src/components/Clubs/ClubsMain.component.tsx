import { RootState } from "@/store/store";
import ClubsHeaderTypography from "@/styles/typography/ClubsHeaderTypography.styles";
import { useSelector } from "react-redux";
import { BoxPlayer, Grid, Typography } from "../../styles";
import ClubsList from "./ClubsList.component";

const ClubsMain = () => {
  const { isLoading, clubs } = useSelector((store: RootState) => store.golfBag);

  return (
    <BoxPlayer>
      <ClubsHeaderTypography />
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
                    typeName={club.typeName}
                    details={club.details}
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
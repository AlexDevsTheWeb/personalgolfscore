import Header from "@/components/common/header/Header.component";
import { Box, Grid, GridProps, Paper, useTheme } from "@mui/material";

interface IStatBlockProps {
  title?: string;
  children: React.ReactNode;
  gridProps?: GridProps;
  subtitle?: string;
  key?: string | number;
}

const StatBlock: React.FC<IStatBlockProps> = ({ title, subtitle, children, gridProps }) => {
  const theme = useTheme();

  return (
    <Grid {...gridProps}>
      <Paper sx={{ gap: 3, height: '100%', display: 'flex', flexDirection: 'column', pb: 2, boxShadow: '0px 0px 15px - 2px rgba(0, 0, 0, 0.46)', border: `1px solid ${theme.palette.divider}` }}>
        <Header title={title as string} subtitle={subtitle} />

        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {children}
        </Box>
      </Paper>
    </Grid>
  )
};

// -webkit - box - shadow: 0px 0px 15px - 2px rgba(0, 0, 0, 0.46);
// box - shadow: ;

export default StatBlock;


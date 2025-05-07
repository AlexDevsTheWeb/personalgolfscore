import { Box, Grid, GridProps, Paper, Typography } from "@mui/material";

interface IStatBlockProps {
  title: string;
  children: React.ReactNode;
  gridProps?: GridProps; // Use the specifically imported Grid2Props
  subtitle?: string;
}

const StatBlock: React.FC<IStatBlockProps> = ({ title, subtitle, children, gridProps }) => (
  <Grid {...gridProps}>
    <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography component="h3" gutterBottom sx={{ textAlign: 'center' }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="caption" display="block" color="text.secondary" sx={{ textAlign: 'center', mt: -1, mb: 1 }}>
          {subtitle}
        </Typography>
      )}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {children}
      </Box>
    </Paper>
  </Grid>
);

export default StatBlock;


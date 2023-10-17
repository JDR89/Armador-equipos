import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";


const appBarStyle = {
  backgroundImage: 'url("../../assets/futbol.jpg")',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
 
};

function Navbar() {
  return (
    <AppBar style={appBarStyle} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              display: { md: "flex" },
              fontFamily: "monospace",
              fontWeight: 500,
              letterSpacing: ".0rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SJD
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;

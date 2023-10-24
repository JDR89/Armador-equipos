import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";



const appBarStyle = {
  backgroundImage: 'url("https://images.unsplash.com/photo-1570498839593-e565b39455fc?auto=format&fit=crop&q=80&w=2835&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
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

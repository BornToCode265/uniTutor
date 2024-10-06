import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Box>Landing</Box>
      <Link to={"/signin"}>Sign In</Link>
      <Box>
        <Link to={"/dashboard"}>Dashboard</Link>
      </Box>
    </>
  );
};

export default Home;

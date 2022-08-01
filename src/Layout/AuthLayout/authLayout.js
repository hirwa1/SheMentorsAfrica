import { Navigate, Outlet } from "react-router-dom";
import { Backdrop, Container } from "@material-ui/core";
import Navbar from "../../Components/Navbar";
import useStyles from "./authLayoutStyles";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import { useEffect, useState } from "react";
import SetUpForm from "../../Components/SetupFom";
const pages = [
  {
    text: "DASHBOARD",
    path: "/dashboard",
  },
  {
    text: "MENTORS",
    path: "/mentors",
  },
  {
    text: "DISCUSSIONS",
    path: "/discussion",
  },
  {
    text: "OPPORTUNITIES",
    path: "/opportunities",
  },
  {
    text: "BOOKINGS",
    path: "/bookings",
  },
];

const settings = [
  {
    text: "Profile",
    path: "/profile/me",
    icon: <AccountCircleIcon />,
  },
  {
    text: "Logout",
    path: "/login",
    icon: <LogoutIcon />,
  },
];
export default function AuthLayout({ user, loading, setLoading, url, profile, setProfile }) {
  const classes = useStyles();
  console.log(profile)
  const [isFormOpen, setFormOpen] = useState(false)
  
  useEffect(() => {
    if(user != null && profile == null){
      setFormOpen(true)
    }
    // eslint-disable-next-line
  },[profile]) 


  return loading ? (
    <Box className={classes.loading}>
      <CircularProgress />
    </Box>
  ) : user !== null ? (
    <Container className={classes.parent}>
      <Navbar user={user} pages={pages} settings={settings} className={classes.navbar} userImage={url} />

      <Container className={classes.childrenBox}>
        <Outlet context={[profile, url, user, setFormOpen]}/>
      </Container>
      <Backdrop
      className={classes.backdrop}
      open={isFormOpen} >
        <SetUpForm user={user}  profile={profile} setProfile={setProfile}/>
    </Backdrop>
    </Container>
  ) : (
    <Navigate to="/login" />
  );
}

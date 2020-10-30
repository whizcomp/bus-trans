import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box } from "@material-ui/core";
import jwt from "jwt-decode";
import Bus from "./components/bus";
import Booking from "./components/booking";

import Login from "./components/login";
import Register from "./components/register";
import Travel from "./components/travel";
import Receipt from "./components/receipt";
import Logout from "./logout";
import Footer from "./components/footer";
import Histry from "./components/history";
import PayMpesa from "./components/payMpesa";

export default class App extends Component {
  state = {};
  componentDidMount() {
    try {
      const token = localStorage.getItem("token");
      const user = jwt(token);
      this.setState({ user });
    } catch (error) {}
  }
  render() {
    const { user } = this.state;
    return (
      <div>
        <AppBar
          color="transparent"
          position="relative"
          elevation={3}
          style={{ backgroundColor: "30145A" }}
        >
          <Toolbar>
            <Typography style={{ flex: 1 }}> Home</Typography>
            {user && (
              <Box component="span">
                <Box component="span" style={{ paddingRight:"3px"}}>{user.fullname}</Box>
                <Link to="/logout" style={{textDecoration:"none",color:"blue",paddingLeft:"3px"}}>Log out</Link>
              </Box>
            )}
            {!user && (
              <Box component="span">
                <Link to="/register"style={{textDecoration:"none",color:"blue",paddingRight:"3px"}}>register</Link>
                <Link to="/login" style={{textDecoration:"none",color:"blue",paddingLeft:"3px"}}>login</Link>
              </Box>
            )}
          </Toolbar>
        </AppBar>
        <Switch>
          <Route path="/receipt/:id"  render={props => <Receipt {...props} user={user} />} />
          <Route path="/payment/:id"  render={props => <PayMpesa {...props} user={user} />} />
          
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/bus" component={Bus} />
          <Route path="/travel" component={Travel} />
          <Route path="/logout" component={Logout} />
          <Route path="/history" component={ Histry} />

          <Route
            path="/"
            render={props => <Booking {...props} user={user} />}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

import React from "react";
import { Grid, Typography, List, ListItemText, Paper } from "@material-ui/core";

export default function Footer({ data }) {
  const routes = [
    { id: 1, route: "Nairobi - Nakuru" },
    { id: 2, route: "Eldoret - kericho" },
    { id: 3, route: "marsabit - isiolo" },
    { id: 4, route: "nanyuki - meru" },
    { id: 5, route: "wajir - turkan" },
    { id: 6, route: "kisumu - Nakuru" },
    { id: 7, route: "kisumu - kakamega" }
  ];
  return (
    <Paper elevation={8} style={{ minHeight: "140px", paddingLeft: "5px"}}>
      <Grid container style={{ paddingLeft: "7px" }}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <Typography variant="h6" style={{ color: "orange" }}>
            {" "}
            Routes
          </Typography>
          <List>
            {routes.map(route => (
              <ListItemText key={route.id}>{route.route} </ListItemText>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <Typography variant="h6" style={{ color: "orange" }}>
            {" "}
            contact us{" "}
          </Typography>

          <ListItemText>Facebook-</ListItemText>
          <ListItemText>Twitter-</ListItemText>
          <ListItemText>whatsapp</ListItemText>
          <ListItemText>Email-</ListItemText>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <Typography variant="h5" style={{ color: "orange" }}>
            About us
          </Typography>
          <ListItemText>Over 1400 vehicles</ListItemText>
          <ListItemText>3+ years of service</ListItemText>
          <ListItemText> Kenya's number one Transport</ListItemText>
        </Grid>
      </Grid>
    </Paper>
  );
}

import React, { Component } from "react";
import { getTravels } from "./api/backend";
import Car from '../media/aINmBZ.jpg';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import {Button,Paper }from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { submitBooking } from "./api/backend";
const styles = theme => ({

  root: {
    maxWidth: 275,
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    borderTop: '6px  solid red',
    borderLeft:'2px  solid red',
    
  },
  show: {
    display: "flex",
    flexWrap: "wrap",
    overflow: "auto",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  landingPage: {
    minHeight:'400px',
    display: "flex",
    justifyContent:"center",
    alignItems:"center",
    
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});
class Booking extends Component {
  state = {
    travels: [],
    
  };
  
  handleBook = async travel => {
    try {
      const { data: book } = await submitBooking(travel);
      console.log(book._id);
      this.props.history.push(`/payment/${book._id}`);
    } catch (error) {
      alert("try again");
    }
  };
  async componentDidMount() {
    const { data: travels } = await getTravels();
    this.setState({ travels });
    console.log(travels);
  }

  render() {
    const { classes, user } = this.props;
    const { travels } = this.state;
    return (
      <div>
        <Paper className={classes.landingPage} style={{backgroundImage:`url(${Car})`,backgroundSize:'cover'}}>
      <Typography variant="h2" style={{color:"orange"}}>
        Travel with one simple Click
      </Typography>
    </Paper>
      <div className={classes.show}>
        
        {travels.map(travel => (
          <Card
            className={classes.root}
            elevation={8}
            variant="outlined"
            key={travel._id}
          >
            <CardContent>
              

              <Typography variant="h5"style={{color:"orange"}}  >
                {travel.depart.place}--{travel.depart.destination}
              </Typography>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {travel.bus.plate}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {travel.depart.time}
              </Typography>
              {travel.bus.seats ?
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  seats:{travel.bus.seats}
              </Typography>:null
              }
            </CardContent>
            <CardActions>
              {user && (
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => this.handleBook(travel)}
                >
                  book now
                </Button>
              )}
            </CardActions>
          </Card>
        ))}
      </div>
      </div>
    );
  }
}
export default withStyles(styles)(Booking);

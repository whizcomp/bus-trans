import React from "react";
import { submitBus } from "./api/backend";
import Joi from "joi-browser";
import Form from "./Reuseable/form";
import Input from "./Reuseable/input";
import { Button, Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const style = theme => ({
  root: {
    margin: theme.spacing(1)
  },
  changeTop: {
    marginTop: theme.spacing(5)
  }
});
class Bus extends Form {
  state = {
    data: {
      driver: "",
      plate: "",
      seats: 0
    },
    errors: {}
  };

  schema = {
    driver: Joi.string()
      .min(1)
      .max(255)
      .required(),
    plate: Joi.string()
      .min(6)
      .max(255)
      .required(),
    seats: Joi.number()
      .min(0)
      .max(200)
      .required()
  };

  doSubmit = async () => {
    try {
      const { data } = await submitBus(this.state.data);
      console.log(data);
      this.props.history.push("/travel");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.plate = error.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    const { data, errors } = this.state;
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item xs={12} md={3} lg={2} xl={2}></Grid>
        <Grid item xs={12} md={6} lg={7} xl={7} className={classes.root}>
          <div className={classes.changeTop}>
            <Typography variant="h4">Add a new Bus</Typography>
            <form onSubmit={this.handleSubmit}>
              <Input
                name="driver"
                value={data.driver}
                label="Drivers"
                type="text"
                onChange={this.handleChange}
                errors={errors.driver}
              />
              <Input
                name="plate"
                value={data.plate}
                label="number plate"
                type="plate"
                onChange={this.handleChange}
                errors={errors.plate}
              />
              <Input
                name="seats"
                value={data.seats}
                label="no of seats"
                type="number"
                onChange={this.handleChange}
                errors={errors.seats}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginTop: "12px" }}
              >
                Submit
              </Button>
            </form>
          </div>
        </Grid>
        <Grid item xs={12} md={3} lg={7} xl={7}></Grid>
      </Grid>
    );
  }
}
export default withStyles(style)(Bus);

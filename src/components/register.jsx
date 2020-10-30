import React from "react";
import { submitRegister } from "./api/backend";
import jwt from "jwt-decode";
import Joi from "joi-browser";
import Input from "./Reuseable/input";
import {
  Button,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel
} from "@material-ui/core";
import Form from "./Reuseable/form";
import { withStyles } from "@material-ui/core/styles";

const style = theme => ({
  root: {
    margin: theme.spacing(1)
  }
});
class Register extends Form {
  state = {
    data: {
      email: "",
      password: "",
      tel: "",
      full_name: "",
      isClient: true
    },
    errors: {}
  };
  schema = {
    email: Joi.string()
      .min(3)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .max(255)
      .required(),
    tel: Joi.string()
      .min(7)
      .max(200)
      .required(),
    full_name: Joi.string()
      .min(5)
      .max(255)
      .required(),
    isClient: Joi.boolean()
  };

  doSubmit = async () => {
    try {
      const { data } = await submitRegister(this.state.data);
      localStorage.setItem("token", data);
      const user = jwt(data);
      console.log(user);
      if (user.isClient === true) {
        window.location = "/";
      } else {
        window.location = "/bus";
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = error.response.data;
        this.setState({ errors });
      }
    }
  };
  handleCheck = e => {
    const data = { ...this.state.data };
    data.isClient = !data.isClient;
    this.setState({ data });
    console.log(data);
  };
  render() {
    const { data, errors } = this.state;
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item xs={12} md={3} lg={2} xl={2}></Grid>
        <Grid item xs={12} md={6} lg={8} xl={8} className={classes.root}>
          <div>
            <form onSubmit={this.handleSubmit}>
              <Typography variant="h4">Register</Typography>
              <Input
                name="email"
                value={data.email}
                label="Email"
                type="text"
                onChange={this.handleChange}
                errors={errors.email}
              />
              <Input
                name="password"
                value={data.password}
                label="Password"
                type="password"
                onChange={this.handleChange}
                errors={errors.password}
              />
              <Input
                name="tel"
                value={data.tel}
                label="Phone number"
                type="text"
                onChange={this.handleChange}
                errors={errors.tel}
              />
              <Input
                name="full_name"
                value={data.full_name}
                label="Full name"
                type="text"
                onChange={this.handleChange}
                errors={errors.full_name}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!data.isClient}
                    onChange={this.handleCheck}
                  />
                }
                label="driver"
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginTop: "7px" }}
              >
                Submit
              </Button>
            </form>
          </div>
        </Grid>
        <Grid item xs={12} md={3} lg={2} xl={2}></Grid>
      </Grid>
    );
  }
}
export default withStyles(style)(Register);

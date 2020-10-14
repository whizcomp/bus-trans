import React from "react";
import jwt from "jwt-decode";
import { submitLogin } from "./api/backend";
import Joi from "joi-browser";
import Input from "./Reuseable/input";
import { Button, Grid, Typography } from "@material-ui/core";
import Form from "./Reuseable/form";
import { withStyles } from "@material-ui/core/styles";

const style = theme => ({
  root: {
    margin: theme.spacing(1)
  },
  changeTop: {
    marginTop: theme.spacing(5)
  }
});
class Login extends Form {
  state = {
    data: {
      email: "",
      password: ""
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
      .required()
  };
  doSubmit = async () => {
    try {
      const { data } = await submitLogin(this.state.data);
      localStorage.setItem("token", data);
      const user = jwt(data);
      console.log(user);
      if (user.isClient === true) {
        window.location = "/";
      } else {
        window.location = "/travel";
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = error.response.data;
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
            <Typography variant="h4">Login</Typography>
            <form onSubmit={this.handleSubmit}>
              <Input
                name="email"
                value={data.email}
                label="email"
                type="text"
                onChange={this.handleChange}
                errors={errors.email}
              />
              <Input
                name="password"
                value={data.password}
                label="password"
                type="password"
                onChange={this.handleChange}
                errors={errors.password}
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
export default withStyles(style)(Login);

import React from "react";
import Input from "./Reuseable/input";
import { Button } from "@material-ui/core";
import Joi from "joi-browser";
import { pay, getReceipt } from "./api/backend";
import Form from "./Reuseable/form";

export default class PayMpesa extends Form {
  state = {
    data: {
      phone: "",
      bookId: ""
    },

    errors: {}
  };
  schema = {
    phone: Joi.string()
      .min(7)
      .max(20)
      .required(),
    bookId: Joi.string()
  };
  async componentDidMount() {
    const data = { ...this.state.data };
    data.bookId = this.props.match.params.id;
    this.setState({ data });
  }
  doSubmit = async () => {
    const { data: payment } = await pay(this.state.data);
    console.log(payment);

    this.props.history.push(`/receipt/${this.state.data.bookId}`);
  };
  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <h1>Pay Mpesa</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="phone"
            value={data.phone}
            label="Phone"
            type="text"
            onChange={this.handleChange}
            errors={errors.phone}
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
    );
  }
}

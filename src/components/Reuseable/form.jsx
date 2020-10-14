import  { Component } from 'react'
import Joi from 'joi-browser';
export default class Form extends Component {
    state = { 
        data: {},
        errors: {}
    }
    handleChange = ({currentTarget:input})=> {
        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return console.log(errors);
        this.doSubmit();
      };
      validate = () => {
        const { error } = Joi.validate(this.state.data, this.schema, {
          abortEarly: false,
        });
        if (!error) return null;
        const errors = {};
        for (let item of error.details) {
          errors[item.path[0]] = item.message;
        }
        return errors;
      };
}

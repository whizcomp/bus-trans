import React from 'react'
import {submitTravel} from './api/backend'
import Form from './Reuseable/form'
import Input from './Reuseable/input'
import { Button,Grid ,Typography} from '@material-ui/core'
import Joi from 'joi-browser'
import http from './Reuseable/http'
import { withStyles } from "@material-ui/core/styles";

const style = theme => ({
  root: {
    margin: theme.spacing(1)
  },
  changeTop: {
    marginTop: theme.spacing(5)
  }
});
  class Travel extends Form {
    state = {
        data: {
             
            plate: "",
            destination:"",
            from: "",
            time:"",
            fare:0
        },
        errors:{}
    }
    schema = {
         
        plate: Joi.string().min(6).max(255).required(),
        destination: Joi.string().min(3).max(25).required(),
        from: Joi.string().min(3).max(25).required(),
        time:Joi.date().required(),
        fare:Joi.number().min(1).max(10000).required()
        
    }
    doSubmit = async() => {
    const endPoint="http://localhost:5000/api"
    console.log(this.state.data)
        try {
       
            const { data  } = await http.get(`${endPoint}/bus/${this.state.data.plate}`);
            const plateId = data._id
               await submitTravel(this.state.data,plateId)
             this.props.history.push(`/history`)
         
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.plate = error.response.data;
                this.setState({errors})
            }
            else  if (error.response && error.response.status === 404) {
                const errors = { ...this.state.errors };
                errors.plate = error.response.data;
                this.setState({errors})
            }
    }
  
    }
    render() {
        const { data, errors } = this.state;
    const { classes } = this.props;
        return (
            <Grid container>
            <Grid item xs={12} md={3} lg={2} xl={2}></Grid>
            <Grid item xs={12} md={6} lg={7} xl={7} className={classes.root}>
                    <div>
                        <Typography variant="h4">Next Route</Typography>
                <form onSubmit={this.handleSubmit}>
                    <Input name="plate" label="Number Plate" type="text" errors={errors.plate} value={data.plate} onChange={this.handleChange} />

                    <Input name="destination" label="Destination" type="text" errors={errors.destination}value={data.destination} onChange={this.handleChange}/>

                    <Input name="from" label="from" type="text" errors={errors.from}value={data.from} onChange={this.handleChange}/>

                    <Input name="fare" label="Fare price" type="number" errors={errors.fare} value={data.fare} onChange={this.handleChange} />
                    
                    <Input name="time"   type="datetime-local" errors={errors.time}value={data.time} onChange={this.handleChange}/>

                    <Button type="submit"style={{ marginTop: "12px" }} color="primary" variant="contained"  >Submit</Button>
                </form>
                    </div>
                    </Grid>
        <Grid item xs={12} md={3} lg={7} xl={7}></Grid>
      </Grid>
        )
    }
}
export default withStyles(style)(Travel);
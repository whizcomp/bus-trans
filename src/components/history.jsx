import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import { getTravelList ,deleteTravel} from "./api/backend";
import {
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Paper,
  Button
} from "@material-ui/core";
export default class Histry extends Component {
  state = {
    records:[]
  }
  handleDelete =async (record) => {
     
    try {
      await deleteTravel(record._id);
    const records = this.state.records.filter(rec => rec._id !== record._id);
    this.setState({records})
    } catch (error) {
      alert('an error occured')
    } 
    
  }
  async componentDidMount() {
    const { data: records } = await getTravelList();
    this.setState({records})
  }
  render() {
    return (
      <div>
        <Typography variant="h5">Bus Travelling records </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Number Plate </TableCell>
                <TableCell> Depart</TableCell>
                <TableCell> Destination</TableCell>
                <TableCell>Fare </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.records.map(record => <TableRow key={record._id}>
                <TableCell>{record.bus.plate} </TableCell>
                <TableCell> {record.depart.place}</TableCell>
                <TableCell> {record.depart.destination}</TableCell>
                <TableCell>{record.depart.fare} </TableCell>
                <TableCell><Button color="secondary" variant="contained" onClick={()=>this.handleDelete(record)}> Delete</Button> </TableCell>
                
              </TableRow>)}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

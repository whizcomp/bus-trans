import React, { Component } from "react";
import { getReceipt, getBooking } from "./api/backend";
import {
  Table,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  TableCell
  ,Typography
} from "@material-ui/core";
export default class Receipt extends Component {
  state={
    info: {},
    user: {},
    isLoading:true
  }
  async componentDidMount() {
    try {
      const { data: details } = await getReceipt(this.props.match.params.id);
      const {data:info} = await getBooking(details.travel._id)
      const user = this.props.user;
      this.setState({ info,user ,isLoading:false})
      console.log(info)
      console.log(user)

    } catch (error) {
      alert("an error occurred");
    }
  }
  render() {
    const { user,info,isLoading } = this.state;
     
     
    return (
      isLoading?<h1>Loading...</h1>:
      <div  style={{ display:"flex",justifyContent:'center',alignItems:"center" , margin: "15px"}} >
        <TableContainer component={Paper}elevation={3} style={{ margin: "15px",maxWidth:'400px' }}>
          {/* hey */}
            
              <Table  >
                <TableHead>
                <TableRow >
                  <TableCell align="center">
                    <Typography variant="h5" >Receipt </Typography>
                  </TableCell>    
                </TableRow>
                </TableHead>
              <TableRow>
                <TableCell align="center">Number Plate</TableCell>                
                  <TableCell align="left">{info.bus.plate}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell align="center">Customer Name</TableCell>                
                  <TableCell align="left">{user.fullname}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell align="center">Destination</TableCell>                
                  <TableCell align="left">{info.depart.destination}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">From</TableCell>                
                  <TableCell align="left">{info.depart.place}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell align="center">Fare</TableCell>                
                  <TableCell align="left">{info.depart.fare}</TableCell>
                </TableRow>
               </Table>
             
          
        </TableContainer>
      </div>
    );
  }
}

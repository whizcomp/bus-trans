import React, { useEffect } from "react";
import { Paper, Card } from "@material-ui/core";
import {callTravels} from './api/backend'
export default function Cover() {
  const [travel, setTravel] = React.useState([]);
  useEffect(() => {
       async function callApi()  {
           const { data } = await callTravels();
           setTravel(data)
           console.log(data)
       }
      callApi();
  },[]);
  return (
    <div>
      <Paper>
        <Card>hey</Card>
      </Paper>
    </div>
  );
}

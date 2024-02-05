import {
  Box,
  Tab,
  Tabs,
  Typography,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import { useState, useEffect } from "react";

import { w3cwebsocket } from "websocket";
import { addBTCValue } from "./reducers/btcSlice";
import { addETHValue } from "./reducers/ethSlice";
import { addEURValue } from "./reducers/eurSlice";
import { addCHFValue } from "./reducers/chfSlice";

import "./App.css";

const API_KEY = "oOGwAk0TM1mkC68cqgSFcxpZdPHn2NS3";
// const API_KEY = "vMDs602Ovnal_xHreYXXtxYtfB4oMJsQ";

const SOCKET_URL = "wss://socket.polygon.io/";

const FOREX = "forex";
const CRYPTO = "crypto";

const leftTableStyle = {
  "margin-right": "50px",
};

function App() {
  const [tabIndex, setTabIndex] = useState(0);
  const [webSocket, setWebSocket] = useState(null);
  const btcValues = useSelector((state) => state.btc);
  const ethValues = useSelector((state) => state.eth);
  const eurValues = useSelector((state) => state.eur);
  const chfValues = useSelector((state) => state.chf);

  const dispatch = useDispatch();

  useEffect(() => {
    const ws = new w3cwebsocket(SOCKET_URL + CRYPTO);

    ws.onopen = () => {
      ws.send(JSON.stringify({ action: "auth", params: API_KEY }));
      ws.send(JSON.stringify({ action: "subscribe", params: "XT.X:BTC-USD" }));
      ws.send(JSON.stringify({ action: "subscribe", params: "XT.X:ETH-USD" }));
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data)[0];
      const date = data.t ? new Date(data.t) : "";
      const dateStr = date ? date.toISOString() : "";
      data.timeStamp = dateStr;
      if (data.pair === "BTC-USD") {
        dispatch(addBTCValue(data));
      }
      if (data.pair === "ETH-USD") {
        dispatch(addETHValue(data));
      }
    };

    setWebSocket(ws);

    return () => ws.close();
  }, []);

  useEffect(() => {
    const ws = new w3cwebsocket(SOCKET_URL + FOREX);

    ws.onopen = () => {
      ws.send(JSON.stringify({ action: "auth", params: API_KEY }));
      ws.send(
        JSON.stringify({
          action: "subscribe",
          params: "C.C:EUR-USD,C.C:CHF-USD",
        })
      );
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data)[0];
      const date = data.t ? new Date(data.t) : "";
      const dateStr = date ? date.toISOString() : "";
      data.timeStamp = dateStr;
      if (data.p === "CHF/USD") {
        dispatch(addCHFValue(data));
      }
      if (data.p === "EUR/USD") {
        dispatch(addEURValue(data));
      }
    };

    return () => ws.close();
  }, []);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  useEffect(() => {}, [btcValues]);

  return (
    <Box>
      <Box>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label="Crypto" />
          <Tab label="Forex" />
        </Tabs>
      </Box>
      <Box sx={{ padding: 2 }}>
        {tabIndex === 0 && (
          <div className="tables-container">
            <TableContainer sx={leftTableStyle}>
              <Table>
                <TableHead>
                  <TableRow>BTC/USD</TableRow>
                  <TableRow>
                    <TableCell> Price</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>TimeStamp</TableCell>{" "}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {btcValues.map((elem, i) => {
                    return (
                      <TableRow key={`btc${i}`}>
                        <TableCell>{elem.p}</TableCell>
                        <TableCell>{elem.s}</TableCell>
                        <TableCell>{elem.timeStamp}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>ETH/USD</TableRow>
                  <TableRow>
                    <TableCell> Price</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>TimeStamp</TableCell>{" "}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ethValues.map((elem, i) => {
                    return (
                      <TableRow key={`eth${i}`}>
                        <TableCell>{elem.p}</TableCell>
                        <TableCell>{elem.s}</TableCell>
                        <TableCell>{elem.timeStamp}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
        {tabIndex === 1 && (
          <div className="tables-container">
            <TableContainer sx={leftTableStyle}>
              <Table>
                <TableHead>
                  <TableRow>CHF/USD</TableRow>
                  <TableRow>
                    <TableCell>Ask Price</TableCell>
                    <TableCell>Bid Price</TableCell>
                    <TableCell>TimeStamp</TableCell>{" "}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {chfValues.map((elem, i) => {
                    return (
                      <TableRow key={`chf${i}`}>
                        <TableCell>{elem.a}</TableCell>
                        <TableCell>{elem.b}</TableCell>
                        <TableCell>{elem.timeStamp}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>EUR/USD</TableRow>
                  <TableRow>
                    <TableCell>Ask Price</TableCell>
                    <TableCell>Bid Price</TableCell>
                    <TableCell>TimeStamp</TableCell>{" "}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {eurValues.map((elem, i) => {
                    return (
                      <TableRow key={`eur${i}`}>
                        <TableCell>{elem.a}</TableCell>
                        <TableCell>{elem.b}</TableCell>
                        <TableCell>{elem.timeStamp}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </Box>
    </Box>
  );
}

export default App;

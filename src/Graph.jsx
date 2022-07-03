import React, { PureComponent } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './Graph.css'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Graph() {
  const url = useParams();
  const [items, setitems] = useState([]);

  useEffect(() => {
    const chart = () => {
      axios
        .get(
          "https://collatorstats.brightlystake.com/api/" +
            url.type +
            "/getDailyBlockCount/" +
            url.collatorId.toLowerCase()
        )
        .then((res) => {
          setitems(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    chart();
  }, []);

  return (
    <div className="charts">
      <div className="chart-1">
        <h3 className="chart-Header">Day-wise Blocks Count</h3>
        <ResponsiveContainer width="100%" aspect="3">
          <AreaChart
            width={500}
            height={400}
            data={items}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 30,
            }}
          >
            <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
            <XAxis dataKey="date"
            angle={45}
            dx={15}
            dy={20}
            minTickGap={-275}
            fontSize={7}
            axisLine={true}/>
            <YAxis dataKey="block_count" domain={[0, 300]}/>
            <Tooltip color="black"/>
            <Area
              type="monotone"
              dataKey="block_count"
              stroke="#fffff"
              fill="#33007b"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-2">
      <h3 className="chart-Header">Rank Day-wise Blocks Count</h3>
        <ResponsiveContainer width="100%" aspect="3">
          <AreaChart
            width={500}
            height={400}
            data={items}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 30,
            }}
          >
            <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
            <XAxis dataKey="date" angle={45}
            dx={15}
            dy={20}
            minTickGap={-275}
            fontSize={7}
            axisLine={false}/>
            <YAxis dataKey="rank_blocks"  domain={[0, 64]}/>
            <Tooltip />
            <Area
              type="monotone"
              dataKey="rank_blocks"
              stroke="#fffff"
              fill="#33007b"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Graph;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
function RightSide(props) {
  const chrtData = [
    {
      name: "Mo",
      views: 6000,
    },
    {
      name: "2o",
      views: 6000,
    },
    {
      name: "3o",
      views: 6000,
    },

    {
      name: "Sun",
      views: 7800,
    },
  ];
  const [chartData, setChartData] = useState([]);
  const options = {
    method: "GET",
    url: "https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/history",
    params: { referenceCurrencyUuid: "yhjMzLPhuIDl", timePeriod: "7d" },
    headers: {
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      "X-RapidAPI-Key": "43c9555146msh7dd4385cbd2445dp120095jsn8d879ac137bc",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function(response) {
        console.log("CHART:", response.data);
        setChartData(response.data.data.history);
        console.log("CHART2:", chartData);
      })
      .catch(function(error) {
        console.error(error);
      });
  }, []);

  return (
    <Container>
      <SharedStatistics>
        <h1>Statistics</h1>
        <SharedStatisticsCardContainer>
          <SharedStatisticsCard>
            <h2>Card Title </h2>
            <div>
              <h1>|</h1>
              <h1>50</h1>
            </div>
          </SharedStatisticsCard>
          <SharedStatisticsCard>
            <h2>Card Title</h2>
            <div>
              <h1>|</h1>
              <h1>50</h1>
            </div>
          </SharedStatisticsCard>
          <SharedStatisticsCard>
            <h2>Card Title</h2>
            <div>
              <h1>|</h1>
              <h1>50</h1>
            </div>
          </SharedStatisticsCard>
          <SharedStatisticsCard>
            <h2>Card Title</h2>
            <div>
              <h1>|</h1>
              <h1>50</h1>
            </div>
          </SharedStatisticsCard>
        </SharedStatisticsCardContainer>
      </SharedStatistics>
      {/* //////////////////////////////////////////// */}
      <SharedActivity>
        <SharedACtivityHeader>
          <h1>Activity</h1>
        </SharedACtivityHeader>
        <SharedActivityContent>
          <BarChart
            width={400}
            height={300}
            data={chartData}
            margin={{ top: 0, right: 0, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis interval={50} />
            <YAxis />
            <Tooltip />

            <Bar
              dataKey="price"
              fill="#369FFF"
              radius={[25, 25, 25, 25]}
              barSize={10}
            />
          </BarChart>
        </SharedActivityContent>
      </SharedActivity>
    </Container>
  );
}

export default RightSide;

const Container = styled.div`
  grid-area: rightside;
  width: 100%;
  height: 100%;
  padding: 0 20px;
`;
const UserHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  /* background-color: rgba(0, 0, 0, 0.5); */
`;
const SharedStatistics = styled.div`
  h1 {
    font-size: 30px;
    font-weight: 700;
  }
`;
const SharedActivity = styled.div``;

const UserMenu = styled.div`
  background-color: rgba(54, 159, 255, 0.3);
  border-radius: 15px;
  display: flex;
  align-items: center;
  line-height: 3px;
  h1 {
    font-size: 14px;
  }
  h6 {
    font-size: 10px;
  }
  margin: 10px;
`;
const UserMenuAvatar = styled.div`
  background: url("/images/account_circle.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  height: 30px;
  width: 30px;
  margin: 5px;
`;
const UserMenuButton = styled.div``;

const SharedStatisticsCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: rgba(54, 159, 255, 0.3);
  padding: 30px;
  border-radius: 20px;
  min-height: 150px;
  min-width: 150px;
  h2 {
    color: rgba(0, 0, 0, 0.3);
    max-width: fit-content;
  }
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #006ed3;
    font-size: 30px;
  }
`;
const SharedStatisticsCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 15px;
  justify-content: center;
`;
const SharedACtivityHeader = styled.div`
  padding-top: 20px;
  h1 {
    font-size: 30px;
    font-weight: 700;
  }
`;
const SharedActivityContent = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  padding-right: 15px;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
`;

import React, { useEffect } from "react";
import styled from "styled-components";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import axios from "axios";
import ItemCard from "./MiddleComponents/ItemCard";
import PlanItemCard from "./MiddleComponents/PlanItemCard";
function MiddleSide(props) {
  const axios = require("axios").default;
  const [value, setValue] = useState(new Date());
  const [courseSearchValue, setCourseSearchValue] = useState("");
  const [itemCardData, setItemCardData] = useState([]);
  const [popItemCardData, setPopItemCardData] = useState([]);
  ////AXIOS OPTIONS
  const options = {
    method: "GET",
    url: "https://opensea-data-query.p.rapidapi.com/api/v1/assets",
    params: { limit: "8" },
    headers: {
      "X-RapidAPI-Host": "opensea-data-query.p.rapidapi.com",
      "X-RapidAPI-Key": "43c9555146msh7dd4385cbd2445dp120095jsn8d879ac137bc",
    },
  };

  ////
  useEffect(() => {
    axios
      .request(options)
      .then(function(response) {
        console.log(response.data);
        setItemCardData(response.data.assets);
      })
      .catch(function(error) {
        console.error(error);
      });
  }, []);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container>
        <TopContent>
          <TopContentHeader>
            <div>
              <h1>MyCourses</h1>
              <span>View All</span>
            </div>

            <div>
              <img src="/images/search 1.svg" alt="" />
              <TextField
                id="standard-search"
                label="Search"
                type="search"
                variant="standard"
              />
            </div>
          </TopContentHeader>

          <CardContainer>
            {itemCardData &&
              itemCardData.map((item) => (
                <ItemCard key={item.name} data={item} />
              ))}
          </CardContainer>
        </TopContent>
        <BottomContent>
          <BottomHeader>
            <div>
              <h1>Planning</h1>
              <a>View All</a>
            </div>

            <DatePicker
              label="Date"
              openTo="year"
              views={["year", "month", "day"]}
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </BottomHeader>
          <BottomCardCotainer>
            <PlanCard>
              <PlanCardIcon />
              <span>
                <h1>PlanCard Title</h1>
                <h2>Plan Card Subtitle</h2>
              </span>
              <Button>...</Button>
            </PlanCard>
            <PlanItemCard />
          </BottomCardCotainer>
        </BottomContent>
      </Container>
    </LocalizationProvider>
  );
}

export default MiddleSide;

const Container = styled.div`
  grid-area: middle;
  height: 100%;
  padding: 0 20px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  @media (max-width: 760px) {
    border: none;
  }
`;
const Header = styled.div`
  font-size: 18px;
  color: rgba(54, 159, 255, 1);
  line-height: 2;
  letter-spacing: 1.5px;
  padding-top: 25px;
  /* background-color: rgba(0, 0, 0, 0.5); */
`;
const TopContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;
const TopContentHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  max-width: 100%;
  div {
    display: flex;
    align-items: baseline;
    :last-child {
      color: rgba(54, 159, 255, 1);
    }
  }
  h1 {
    font-size: 30px;
    font-weight: 700;
    padding-right: 10px;
  }
  span {
    font-size: 14px;
    color: rgba(54, 159, 255, 1);
  }
  img {
    height: 15px;
    padding-right: 10px;
  }
  @media (max-width: 760px) {
    flex-direction: column;

    row-gap: 10px;
  }
`;
const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
  grid-gap: 25px;
  justify-content: center;
`;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  height: 100%;
  border-radius: 20px;
  min-height: 100px;
  min-width: 300px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;
const Background = styled(Card)`
  background: url("/images/cards/background/Group 1.png");
  background-position: center;
  position: absolute;
  background-size: auto;
  height: 100%;
  width: 100%;
  z-index: -1;
`;
const Info = styled.div`
  padding: 10px 30px 20px 20px;
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 14px;
    font-weight: 700;
  }
  h2 {
    font-size: 10px;
    font-weight: 400;
  }
`;
const Logo = styled.div`
  display: flex;
  padding: 10px 20px 10px 50px;
  height: 110px;
`;

const BottomContent = styled.div``;
const BottomCardCotainer = styled(CardContainer)`
  padding-top: 20px;
  grid-gap: 20px;
`;
const BottomHeader = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  div {
    color: rgba(54, 159, 255, 1);
    :first-child {
      display: flex;
      align-items: baseline;
    }
  }
  h1 {
    font-size: 30px;
    font-weight: 700;
    padding-right: 10px;
    color: black;
  }
  h2 {
    text-align: right;
  }
  @media (max-width: 760px) {
    flex-direction: column;
    row-gap: 10px;
  }
`;
const PlanCard = styled.div`
  background-color: #f7f7f7;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  min-width: 300px;
  border-radius: 15px;
  span {
    align-items: center;
    letter-spacing: 1px;
  }
  h1 {
    color: #303030;
    font-size: 14px;
  }
  h2 {
    font-size: 12px;
    color: #bdbdbd;
  }
`;
const PlanCardIcon = styled.div`
  background-image: URL("/images/cards/icon/Rectangle 25.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 45px;
  width: 45px;
  border-radius: 10px;
`;
const Button = styled.div``;

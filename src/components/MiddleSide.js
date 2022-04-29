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
  const [dateValue, setDateValue] = useState(new Date());
  const [itemCardData, setItemCardData] = useState([]);
  const [popItemCardData, setPopItemCardData] = useState([]);
  const [collectionSearchValue, setCollectionSearchValue] = useState(
    "bored-apes-by-famous-artists-official"
  );
  const [limit, setLimit] = useState(10);
  ////AXIOS OPTIONS

  ////
  useEffect(() => {
    getItemCardData("bored-apes-by-famous-artists-official", limit);
    getPopItemData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setCollectionSearchValue(e.target.value);
    setItemCardData([]);
    getItemCardData(e.target.value, limit);
    console.log("SEARCH:", collectionSearchValue);
  };
  const handleLimit = (e) => {
    setLimit(20);
    getItemCardData(collectionSearchValue, 20);
    // setItemCardData([]);
  };
  const getItemCardData = (search, limit) => {
    const options = {
      method: "GET",
      url: "https://opensea-data-query.p.rapidapi.com/api/v1/assets",
      params: {
        // collection_slug: "bored-apes-by-famous-artists-official",
        // limit: "10",
        collection_slug: search,
        limit: limit,
      },
      headers: {
        "X-RapidAPI-Host": "opensea-data-query.p.rapidapi.com",
        "X-RapidAPI-Key": "e66bc3e1fcmsh60c77263fae2954p151943jsn5fda1677bfa2",
      },
    };
    axios
      .request(options)
      .then(function(response) {
        console.log(response.data);
        setItemCardData(response.data.assets);
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  const getPopItemData = () => {
    const options = {
      method: "GET",
      url: "https://opensea-data-query.p.rapidapi.com/api/v1/assets",
      params: { limit: "10" },
      headers: {
        "X-RapidAPI-Host": "opensea-data-query.p.rapidapi.com",
        "X-RapidAPI-Key": "e66bc3e1fcmsh60c77263fae2954p151943jsn5fda1677bfa2",
      },
    };
    axios
      .request(options)
      .then(function(response) {
        // console.log(response.data);
        setPopItemCardData(response.data.assets);
      })
      .catch(function(error) {
        console.error(error);
      });
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container>
        <TopContent>
          <TopContentHeader>
            <div>
              <h1>Collections</h1>
              <button
                onClick={(e) => handleLimit(e)}
                style={{
                  border: "none",

                  backgroundColor: "transparent",
                  color: "rgba(54, 159, 255, 1)",
                }}
              >
                View All
              </button>
            </div>

            <div>
              <img src="/images/search 1.svg" alt="" />
              <TextField
                id="standard-search"
                label="Search"
                type="search"
                variant="standard"
                onChange={(e) => handleSearch(e)}
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
              <h1>Random NFT</h1>
              <a>View All</a>
            </div>

            <DatePicker
              label="Date"
              openTo="year"
              views={["year", "month", "day"]}
              value={dateValue}
              onChange={(newValue) => {
                setDateValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </BottomHeader>
          <BottomCardCotainer>
            {popItemCardData &&
              popItemCardData.map((item) => (
                <PlanItemCard data={item} key={item.name} />
              ))}
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

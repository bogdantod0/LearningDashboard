import React, { useEffect } from "react";
import styled from "styled-components";
import { useState, useRef } from "react";
import { storage } from "../../firebase";
import {
  ref,
  uploadBytes,
  listAll,
  getMetadata,
  getDownloadURL,
  getBytes,
} from "firebase/storage";
import { connect } from "react-redux";
///
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import UploadFileIcon from "@mui/icons-material/UploadFile";
////
import ListItem from "./ListItem";
///
const UploaderPage = (props) => {
  const [fileUpload, setFileUpload] = useState(null);
  const [value, setValue] = useState("1");
  const inputFileref = useRef(null);
  const listRef = ref(storage, `${props.user.displayName}/files`);
  const [storageItems, setStorageItems] = useState([]);
  ////

  // useEffect(() => {
  //   listStorageItems();
  // }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const onClickUpl = (e) => {
    inputFileref.current.click();
  };

  const uploadFile = () => {
    if (fileUpload == null) {
      alert("File not selected");
      return;
    }
    const fileRef = ref(
      storage,
      `${props.user.displayName}/files/${fileUpload.name}`
    );
    uploadBytes(fileRef, fileUpload).then(() => {
      alert("file uploaded");
    });
    setFileUpload(null);
  };

  const listStorageItems = () => {
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
        });
        res.items.forEach((itemRef) => {
          getMetadata(
            ref(storage, `${props.user.displayName}/files/${itemRef.name}`)
          ).then((metadata) => {
            console.log("CONSOLE ITEM:", itemRef, "metadata:", metadata);
            setStorageItems((prev) => [...prev, metadata]);
          });
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  };
  const clickDownload = (itemRef) => {
    getDownloadURL(ref(storage, itemRef.fullPath)).then((url) => {
      console.log("URL:", url);
      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open("GET", url);
      xhr.send();
    });
  };
  const handleCLick = (e, itemRef) => {
    e.preventDefault();
    clickDownload(itemRef);
  };
  return (
    <>
      {props.showUploaderPage && (
        <Container>
          <Box
            sx={{
              typography: "body1",
            }}
          >
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div> </div>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="New Upload" value="1" />
                  <Tab label="Recent" value="2" />
                </TabList>
                <button
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    fontSize: "20px",
                    fontWeight: 600,
                  }}
                  onClick={(e) => {
                    props.handleClick(e);
                  }}
                >
                  x
                </button>
              </Box>
              <TabPanel
                value="1"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "400px",
                  marginTop: "5px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button
                  style={{
                    color: "gray",
                    backgroundColor: "transparent",
                    borderRadius: "25px",
                    borderStyle: "dashed",
                    borderColor: "gray",
                  }}
                  onClick={onClickUpl}
                >
                  <UploadFileIcon
                    sx={{
                      height: "100%",
                      width: "100%",
                      minHeight: "50px",
                      minWidth: "50px",
                      backgroundColor: "transparent",
                    }}
                  />
                  <h1>Click to upload new file</h1>
                  <input
                    type="file"
                    id="file"
                    ref={inputFileref}
                    style={{ display: "none" }}
                    onChange={(e) => setFileUpload(e.target.files[0])}
                  />
                </button>
                <UplSubmitBtn onClick={uploadFile}>UPLOAD</UplSubmitBtn>
              </TabPanel>
              <TabPanel
                value="2"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "400px",
                  marginTop: "5px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FilesList>
                  {storageItems &&
                    storageItems.map((item) => (
                      <ListItem
                        key={item.fullPath}
                        data={item}
                        onClick={(e) => handleCLick(e, item)}
                      />
                    ))}
                </FilesList>

                <Bottom>
                  <button onClick={listStorageItems}>View All</button>
                </Bottom>
              </TabPanel>
            </TabContext>
          </Box>
        </Container>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};
export default connect(mapStateToProps)(UploaderPage);

const Container = styled.div`
  background-color: rgba(255, 255, 255, 1);
  max-height: 550px;
  min-height: 400px;

  width: 500px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99999;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  padding: 5px;
  box-shadow: -1px 3px 21px 1px rgba(0, 0, 0, 0.25);
  -webkit-box-shadow: -1px 3px 21px 1px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: -1px 3px 21px 1px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Bottom = styled.div`
  position: relative;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  button {
    height: 30px;
    background-color: transparent;
    border-radius: 25px;
    border: 1px solid gray;
    font-size: 16px;
    font-weight: 600;
  }
`;
const Content = styled.div`
  background-color: antiquewhite;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;
const UplFile = styled.input`
  height: 200px;
  width: 200px;
`;
const UplSubmitBtn = styled.button`
  margin-top: 5px;
  background-color: transparent;
  border: 1px dashed rgba(0, 0, 0, 0.5);
  border-radius: 25px;
  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
const FilesList = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  list-style-type: none;
  row-gap: 15px;
`;

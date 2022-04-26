import React, { useEffect } from "react";
import styled from "styled-components";
import { useState, useRef } from "react";
import { storage } from "../../firebase";
import { saveAs } from "file-saver";
import {
  ref,
  uploadBytes,
  listAll,
  getMetadata,
  getDownloadURL,
  getBytes,
} from "firebase/storage";
import { connect } from "react-redux";
import { FileUploader } from "react-drag-drop-files";
///IMPORTS///
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
////MUI IMPORTS////
import ListItem from "./ListItem";
import { style } from "@mui/material/node_modules/@mui/system";
///COMPONENTS IMPORTS///

const UploaderPage = (props) => {
  const [fileUpload, setFileUpload] = useState(null);
  const [value, setValue] = useState("1");
  const inputFileref = useRef(null);
  const listRef = ref(storage, `${props.user.displayName}/files`);
  const [storageItems, setStorageItems] = useState([]);
  const [showAllStorage, setShowAllStorage] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const fileTypes = ["JPG", "PNG", "GIF", "PDF"];
  ///
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  ////

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  ////
  var FileSaver = require("file-saver");

  const dropHandleChange = (file) => {
    setFileUpload(file);
  };

  useEffect(() => {
    listStorageItems();
  }, []);
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
    setShowSpinner(true);
    uploadBytes(fileRef, fileUpload).then(() => {
      getMetadata(fileRef).then((metadata) => {
        setStorageItems((prev) => [...prev, metadata]);
      });
      // alert("file uploaded");
      setShowSpinner(false);
      setOpen(true);
    });
    setFileUpload(null);
  };

  const listStorageItems = () => {
    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          getMetadata(
            ref(storage, `${props.user.displayName}/files/${itemRef.name}`)
          ).then((metadata) => {
            // console.log("CONSOLE ITEM:", itemRef, "metadata:", metadata);
            setStorageItems((prev) => [...prev, metadata]);
          });
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  };

  const clickDownload = (itemRef) => {
    getDownloadURL(ref(storage, itemRef.fullPath))
      .then((url) => {
        setDownloadUrl(url);
        // console.log("URL:", url);
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
          FileSaver.saveAs(blob, itemRef.name);
        };
        xhr.open("GET", url);
        xhr.send();
      })
      .catch((error) => {
        // Handle any errors
        console.log("ERR:", error);
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
                  minHeight: "300px",
                  marginTop: "5px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <button
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
                      height: "75%",
                      width: "75%",
                      minHeight: "50px",
                      minWidth: "50px",
                      backgroundColor: "transparent",
                    }}
                  />
                  <h1>Click to select file</h1>
                  <input
                    type="file"
                    id="file"
                    ref={inputFileref}
                    style={{ display: "none" }}
                    onChange={(e) => {
                      setFileUpload(e.target.files[0]);
                    }}
                  />
                </button> */}
                <FileUploader
                  multiple={false}
                  handleChange={dropHandleChange}
                  name="file"
                  label={"Select or drop file here"}
                />
                <p>
                  {fileUpload
                    ? `File to upload: ${fileUpload.name}`
                    : "No files selected"}
                </p>
                <div>
                  <UplSubmitBtn onClick={uploadFile}>
                    Click to upload
                  </UplSubmitBtn>

                  {showSpinner && (
                    <div
                      class="spinner-border spinner-border-sm "
                      role="status"
                      style={{
                        marginLeft: "5px",
                        height: "15px",
                        width: "15px",
                      }}
                    >
                      <span class="sr-only"></span>
                    </div>
                  )}
                </div>
              </TabPanel>
              <TabPanel
                value="2"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "200px",
                  maxHeight: "370px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FilesList>
                  {storageItems && showAllStorage
                    ? storageItems.map((item) => (
                        <ListItem
                          key={item.fullPath}
                          data={item}
                          downloadUlr={downloadUrl}
                          onClick={(e) => handleCLick(e, item)}
                        />
                      ))
                    : storageItems
                        .slice(0, 4)
                        .map((item) => (
                          <ListItem
                            key={item.fullPath}
                            data={item}
                            downloadUlr={downloadUrl}
                            onClick={(e) => handleCLick(e, item)}
                          />
                        ))}
                </FilesList>

                <Bottom>
                  <button onClick={() => setShowAllStorage(true)}>
                    View All
                  </button>
                </Bottom>
              </TabPanel>
            </TabContext>
          </Box>
          <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              File Uploaded!
            </Alert>
          </Snackbar>
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
  @media (max-width: 760px) {
    width: 100%;
    top: 0;
    right: 0;
    height: 400px;
  }
`;
const Bottom = styled.div`
  position: fixed;
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
  @media (max-width: 760px) {
    position: relative;
    button {
      border-radius: 25px;
    }
  }
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
  height: fit-content;
  display: flex;
  flex-direction: column;
  width: 100%;
  list-style-type: none;
  row-gap: 15px;
  overflow-y: auto;
  max-height: 350px;
  margin-bottom: 15px;
  @media (max-width: 760px) {
    position: relative;
    height: fit-content;
    overflow-y: auto;
  }
`;

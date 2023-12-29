import {
  Button,
  Card,
  CardContent,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import "./App.css";
import QRCode from "qrcode";
import { useState, useRef } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import QrReader from "react-qr-reader";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";
// import DoneIcon from '@mui/icons-material/Done';

function App() {
  const [text, setText] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [scanResultFile, setScanResultFile] = useState("");
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  const qrRef = useRef(null);
  const generateQRCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageURL(response);
    } catch (error) {
      console.log(error);
    }
  };
  const clearText = () => {
    setText("");
    setImageURL("");
  };

  const clearQr = () => {
    setScanResultFile("");
  };

  const onScanFile = () => {
    qrRef.current.openImageDialog();
  };

  const handleErrorFile = (error) => {
    console.log(error);
  };

  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile(result);
    }
  };

  const handleErrorWebCam = (error) => {
    console.log(error);
  };
  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
    }
  };

  // const CopyText = (scanResultWebCam) => {

  //   var text = scanResultWebCam;
  //   text.select();
  //   CopyToClipboard(text.value);
  //   // document.getSelection().removeAllRange();
  // };

  const str = scanResultFile;
  const str1 = scanResultWebCam;
  return (
    <>
      <Container style={{ marginTop: "2%" }}>
        <Card>
          <Typography
            variant="h4"
            textAlign="center"
            style={{
              backgroundColor: "coral",
              color: "#000",
              padding: "10px",
            }}
          >
            Generate Download & Scan QR Code
          </Typography>
          <CardContent style={{ backgroundColor: "beige" }}>
            <Grid container spacing={2}>
              <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                <TextField
                  label="Enter Text Here"
                  value={text}
                  variant="standard"
                  onChange={(e) => setText(e.target.value)}
                />
                <ClearIcon onClick={() => clearText()} style={{cursor:'pointer'}}/>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "10px", marginBottom: "20px" }}
                  onClick={() => generateQRCode()}
                >
                  Generate
                </Button>

                {imageURL && (
                  <>
                    <img
                      src={imageURL}
                      alt="img"
                      width="200px"
                      style={{ magrin: "auto", textAlign: "center" }}
                    />
                    <br />
                    <Button
                      download
                      style={{ cursor: "pointer", margin: "10px" }}
                      size="small"
                      variant="outlined"
                      href={imageURL}
                    >
                      Download
                    </Button>
                  </>
                )}
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginTop: "10px", marginBottom: "20px" }}
                  onClick={onScanFile}
                >
                  Scan QR Code
                </Button>
                <Button
                  style={{
                    marginTop: "10px",
                    marginBottom: "20px",
                    marginLeft: "10px",
                  }}
                  
                  onClick={() => ( window.location.reload())}
                >
                  Clear
                </Button>
                <QrReader
                  ref={qrRef}
                  delay={300}
                  style={{ width: "100%" }}
                  onError={handleErrorFile}
                  onScan={handleScanFile}
                  legacyMode
                />
                <div style={{display:'flex'}}>
                <Typography variant="h6">Scanned Code:</Typography>
                <Button>
                <CopyToClipboard text={scanResultFile}>
                  <ContentCopyIcon />
                </CopyToClipboard>
                </Button>
                </div>
                {str.startsWith("http://") || str.startsWith("https://") ? (
                  <Link href={scanResultFile} target="_blank">{scanResultFile}</Link>
                ) : (
                  <Typography>{scanResultFile}</Typography>
                )}
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                <Typography
                  variant="h6"
                  style={{ marginTop: "10px", marginBottom: "20px" }}
                >
                  Qr Code Scan by Web Cam
                  <Button
                    onClick={() => clearQr()}
                    style={{ marginLeft: "10px" }}
                  >
                    Clear
                  </Button>
                </Typography>

                <QrReader
                  delay={300}
                  style={{ width: "100%" }}
                  onError={handleErrorWebCam}
                  onScan={handleScanWebCam}
                />
                <br />
                <div style={{display:'flex'}}>
                <Typography variant="h6">Scanned By WebCam Code:</Typography>
                <Button >
                <CopyToClipboard text={scanResultWebCam}>
                  <ContentCopyIcon />
                </CopyToClipboard>
                </Button>
                </div>
                {str1.startsWith("http://")|| str1.startsWith("https://") ? (
                  <Link href={scanResultWebCam}target="_blank">{scanResultWebCam}</Link>
                ) : (
                  <Typography>{scanResultWebCam}</Typography>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default App;

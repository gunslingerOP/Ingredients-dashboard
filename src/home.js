import { Button } from "@material-ui/core";
import { useState, useRef, useEffect } from "react";

import { Dialog } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";

import { DialogContent } from "@material-ui/core";
import { DialogContentText } from "@material-ui/core";
import { DialogTitle } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Snackbar from "@material-ui/core/Snackbar";

import {
  addIngredient,
  getAllItems,
  getFood,
  getFoodNutrients,
  getUrl,
  uploadImg,
} from "./api";
import IngredientRow from "./components/tableRow";
import MakeTable from "./components/table";
import MuiAlert from "@material-ui/lab/Alert";

export default function Home() {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const [errmsg, seterrmsg] = useState();
  const [errAlert, setErrAlert] = useState(false);

  const [data, setData] = useState([]);
  const [addNew, setAddNew] = useState(false);
  const [file, setFile] = useState();

  const [url, setUrl] = useState("");
  const [analyz, setanalyz] = useState(false);
  const [title, setTitle] = useState();
  const [analyzerr, setanalyzerr] = useState(false);
  const [snackbar, setSnackBar] = useState(false);
  const [submit, setSubmit] = useState(false);

  const [car, setCar] = useState("-");
  const [fat, setFat] = useState("-");
  const [prot, setProt] = useState("-");

  const inputRef = useRef();
  const router = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("id_token")) {
      return router.push("/");
    }
  });

  useEffect(() => {
    getAllItems((err, result) => {
      if (err) throw err;

      if (result.status !== "Success") {
        if (result.message) seterrmsg(result.message);
        setErrAlert(true);
      } else {
        setData(result.data.Items);

        console.log(result);
      }
    });
  }, []);

  const handleSubmit = () => {
    if (file) {
      setSubmit(true);
      getUrl((err, result) => {
        if (err) throw err;

        if (result.status !== "Success") {
          if (result.message) seterrmsg(result.message);
          setErrAlert(true);
          console.log(result);
        } else {
          console.log(result.data);
          setUrl(result.data);

          //uploading image to s3 bucket
          uploadImg(result.data, file);

          addIngredient(
            { title, image: result.data.split("?")[0] },
            (error, response) => {
              if (error) throw error;
              setSnackBar(true);
              setAddNew(false);
              setSubmit(false);
              getAllItems((err, result) => {
                if (err) throw err;

                if (result.status !== "Success") {
                  if (result.message) seterrmsg(result.message);
                  setErrAlert(true);
                } else {
                  setData(result.data.Items);

                  console.log(result);
                }
              });
            }
          );
        }
      });
    } else {
      seterrmsg("Add a file");
      setanalyzerr(true);
    }
  };

  useEffect(() => {
    if (url) {
      console.log("Image url", url);
      setUrl(url.split("?")[0]);
    }
  }, [url]);

  const handleClose = () => {
    setErrAlert(false);
    setAddNew(false);
    setanalyz(false);
    setTitle();
    setCar("-");
    setFat("-");
    setSubmit(false);

    setProt("-");
    setFile();
    setSnackBar(false);
  };

  const fileClick = () => {
    inputRef.current?.click();
  };

  const handleDisplayFileDetails = () => {
    inputRef.current?.files && setFile(inputRef.current.files[0]);
  };

  const handleAnalysis = () => {
    setanalyz(true);

    getFood(title, (err, res) => {
      if (err) throw err;
      if (res.results.length === 0) {
        seterrmsg("No result found!");
        return setanalyzerr(true);
      }
      if (res.status === 400 || res.status === 404) {
        console.log(res);
        seterrmsg(res.message);
        return setanalyzerr(true);
      }
      console.log("results", res);

      getFoodNutrients(res.results[0].id, (failure, data) => {
        if (failure) throw failure;
        if (data.status === 400 || data.status === 404) {
          seterrmsg(data.message);
          setanalyzerr(true);
        }
        let macros = data.nutrition.nutrients;
        console.log(data.nutrition.nutrients);

        macros.forEach((el) => {
          if (el.title === "Carbohydrates") {
            setCar(el.amount);
          }

          if (el.title === "Fat") {
            setFat(el.amount);
          }

          if (el.title === "Protein") {
            setProt(el.amount);
          }
        });
        setanalyz(false);
      });
    });
  };

  const handleAnalysisClose = () => {
    setanalyzerr(false);
  };

  return (
    <body
      id="kt_body"
      className="header-fixed header-mobile-fixed subheader-enabled subheader-fixed aside-enabled aside-fixed aside-minimize-hoverable page-loading"
    >
      {snackbar ? (
        <Snackbar open={snackbar} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Item created successfully
          </Alert>
        </Snackbar>
      ) : null}

      {addNew ? (
        <Dialog
          open={addNew}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add an ingredient</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Click on the analyze button below to check the nutritional
              information of the ingredient you're adding!
            </DialogContentText>
            <TextField
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              margin="dense"
              id="name"
              label="Title"
              fullWidth
            />
            <Button variant="contained" onClick={fileClick} color={"primary"}>
              <CloudUploadIcon />
              <input
                ref={inputRef}
                onChange={handleDisplayFileDetails}
                style={{ display: "none" }}
                type="file"
              />
            </Button>
            {file ? <p>File:{file.name}</p> : null}

            <MakeTable title={title} carbs={car} fat={fat} protein={prot} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={submit}
              onClick={handleSubmit}
              color="primary"
            >
              Add
            </Button>
            <Button
              variant="contained"
              disabled={analyz}
              onClick={handleAnalysis}
              color="green"
            >
              Analyze
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}

      <div>
        {analyzerr ? (
          <Dialog
            open={analyzerr}
            maxWidth={"md"}
            fullWidth={true}
            onClose={handleAnalysisClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Error occured!"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {errmsg}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAnalysisClose} color="primary" autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        ) : null}
      </div>

      <div>
        {errAlert ? (
          <Dialog
            open={errAlert}
            maxWidth={"md"}
            fullWidth={true}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Error occured!"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {errmsg}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        ) : null}
      </div>

      <div className="card card-custom">
        <div className="card-header flex-wrap border-0 pt-6 pb-0">
          <div className="card-title">
            <h3 className="card-label">Your ingredients</h3>
          </div>

          <div className="card-toolbar">
            <a
              href="# "
              onClick={() => setAddNew(true)}
              className="btn btn-primary font-weight-bolder"
            >
              Add an Ingredient
            </a>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="datatable datatable-bordered datatable-head-custom datatable-default datatable-primary datatable-loaded">
          <table className="datatable-table" style={{ display: "block" }}>
            <th className="datatable-head">
              <tr className="datatable-row" style={{ left: "0px" }}>
                <th className="datatable-cell-center datatable-cell datatable-cell-sort datatable-cell-sorted">
                  <span style={{ width: "30px" }}>#</span>
                </th>
                <th className="datatable-cell datatable-cell-sort">
                  <span style={{ width: "108px" }}>Title</span>
                </th>
                <th className="datatable-cell datatable-cell-sort">
                  <span style={{ width: "108px" }}>Image</span>
                </th>
                <th className="datatable-cell datatable-cell-sort">
                  <span style={{ width: "108px" }}>ACTIONS</span>
                </th>
              </tr>
            </th>

            <tbody className="datatable-body">
              {data.map((el, index) => (
                <IngredientRow
                  IngredientId={el.IngredientId}
                  Title={el.Title}
                  count={index}
                  key={index}
                  image={el.Image}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </body>
  );
}

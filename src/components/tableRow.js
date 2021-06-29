import { Button } from "@material-ui/core";
import {
  addIngredient,
  deleteIngredient,
  editIngredient,
  getFood,
  getFoodNutrients,
  getUrl,
  uploadImg,
} from "../api";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
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
import MakeTable from "./table";

export default function IngredientRow(props) {
  const { Title, count, image, IngredientId } = props;
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const inputRef = useRef();
  const [title, setTitle] = useState();
  const [submit, setSubmit] = useState(false);

  const [snackbar, setSnackBar] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [file, setFile] = useState();
  const [url, setUrl] = useState("");
  const [analyz, setanalyz] = useState(false);
  const [analyzerr, setanalyzerr] = useState(false);
  const [car, setCar] = useState("-");
  const [fat, setFat] = useState("-");
  const [prot, setProt] = useState("-");
  const [loading, setLoading] = useState(true);
  const [errmsg, seterrmsg] = useState();
  const [errAlert, setErrAlert] = useState(false);
  const [deleteSnack, setDeleteSnack] = useState(false);

  const refreshPage = () => {
    window.location.reload();
  };

  const handleClose = () => {
    setDeleteModal(false);
    setErrAlert(false);
    setEdit(false);
    setanalyz(false);
    setTitle();
    setCar("-");
    setFat("-");
    setProt("-");
    setFile();
    setEdit(false);
  };

  const handleSnack = () => {
    setSnackBar(false);
    setDeleteSnack(false);
  };

  const handleDeletion = () => {
    setDeleteModal(false);
    deleteIngredient(IngredientId, (err, res) => {
      if (err) throw err;
      console.log(res);
      setDeleteSnack(true);
      refreshPage();
    });
  };

  const fileClick = () => {
    inputRef.current?.click();
  };

  const handleDisplayFileDetails = () => {
    inputRef.current?.files && setFile(inputRef.current.files[0]);
  };

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
        }
      });
    } else {
      seterrmsg("Add a file");
      setanalyzerr(true);
    }
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
      });
    });

    setanalyz(false);
  };

  const handleAnalysisClose = () => {
    setanalyzerr(false);
  };

  useEffect(() => {
    if (url) {
      console.log("Image url", url);
      setUrl(url.split("?")[0]);

      if (!title || !url) {
        seterrmsg("Please provide a title and an image");
        setanalyzerr(true);
      } else {
        editIngredient(
          { title, image: url },
          IngredientId,
          (error, response) => {
            if (error) throw error;
            setSnackBar(true);
            setEdit(false);
            refreshPage();
          }
        );
      }
    }
  }, [url]);

  return (
    <>
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

      {snackbar ? (
        <Snackbar open={snackbar} autoHideDuration={6000} onClose={handleSnack}>
          <Alert onClose={handleSnack} severity="success">
            Item edited successfully
          </Alert>
        </Snackbar>
      ) : null}

      {deleteSnack ? (
        <Snackbar
          open={deleteSnack}
          autoHideDuration={6000}
          onClose={handleSnack}
        >
          <Alert onClose={handleSnack} severity="error">
            Item removed successfully
          </Alert>
        </Snackbar>
      ) : null}

      <div>
        {deleteModal ? (
          <Dialog
            open={deleteModal}
            maxWidth={"md"}
            fullWidth={true}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to delete this Ingredient?"}
            </DialogTitle>

            <DialogActions>
              <Button onClick={handleDeletion} color="primary" autoFocus>
                Yes
              </Button>
              <Button onClick={handleClose} color="primary" autoFocus>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        ) : null}
      </div>

      {edit ? (
        <Dialog
          open={edit}
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

      <tr
        data-row="0"
        className="datatable-row datatable-row-even"
        style={{ left: "0px" }}
      >
        <td
          className="datatable-cell-sorted datatable-cell-center datatable-cell"
          aria-label="1"
        >
          <span style={{ width: "30px" }}>{count + 1}</span>
        </td>

        <td
          data-field="title"
          className="datatable-cell"
          aria-label="64616-103"
        >
          <span style={{ width: "108px" }}>{Title}</span>
        </td>

        <td
          data-field="title"
          className="datatable-cell"
          aria-label="64616-103"
        >
          <span style={{ width: "108px" }}>
            <a target="_blank" href={image}>
              View image
            </a>
          </span>
        </td>
        <td
          data-field="title"
          className="datatable-cell"
          aria-label="64616-103"
        >
          <span
            style={{
              overflow: "visible",
              position: "relative",
              width: "125px",
              display: "flex",
            }}
          >
            <Button
              onClick={() => setDeleteModal(true)}
              variant="outlined"
              size="small"
              color="primary"
            >
              <DeleteIcon />
            </Button>
            <Button
              style={{ marginLeft: "5px" }}
              variant="contained"
              size="small"
              onClick={() => setEdit(true)}
              color="primary"
            >
              <EditIcon />
            </Button>
          </span>
        </td>
      </tr>
    </>
  );
}

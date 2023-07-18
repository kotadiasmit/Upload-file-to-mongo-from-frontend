import "./index.css";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const Form = (props) => {
  const {
    onAddUserDetails,
    lastUserId,
    onUpdateUserDetails,
    userDetailObj,
    onUpdateFormShow,
    onclickUpdateDetails,
  } = props;

  let userLocationInput = "";
  let userNameInput = "";
  let formUserId = lastUserId + 1;

  //userDetailsObj & onUpdateFormShow taken when user clicks on updateBtn
  //onAddUserDetails & lastUserId taken when user clicks on Add Location
  if (userDetailObj) {
    const { userId, name, location } = userDetailObj;
    userNameInput = name;
    userLocationInput = location;
    formUserId = userId;
  }

  const [show, setShow] = useState(onUpdateFormShow ? true : false);
  const [userName, setUserName] = useState(userNameInput);
  const [userLocation, setUserLocation] = useState(userLocationInput);
  const [errorMsg, setErrorMsg] = useState("");

  const showErrorMsg = (trimmedUserName, trimmedUserLocation) => {
    if (trimmedUserName === "" && trimmedUserLocation !== "") {
      setErrorMsg("please enter valid Name");
    } else if (trimmedUserName !== "" && trimmedUserLocation === "") {
      setErrorMsg("please enter valid Location");
    } else if (trimmedUserName === "" && trimmedUserLocation === "") {
      setErrorMsg("please enter valid Name & Location");
    }
  };
  const modalClose = () => {
    setShow(false);
    setUserName("");
    setUserLocation("");
    setErrorMsg("");
    onUpdateFormShow && onclickUpdateDetails(false);
  };
  const modalShow = () => setShow(true);
  const nameInputChanged = (event) => {
    const { value } = event.target;
    setUserName(value);

    setErrorMsg("");
  };
  const locationInputChanged = (event) => {
    const { value } = event.target;
    setUserLocation(value);
    setErrorMsg("");
  };
  const modalCloseOnAdd = (event) => {
    event.preventDefault();
    const trimmedUserName = userName.trim();
    const trimmedUserLocation = userLocation.trim();
    if (trimmedUserName && trimmedUserLocation) {
      setShow(false);
      let addUpdateUserDetails = {
        userId: formUserId,
        name: trimmedUserName,
        location: trimmedUserLocation,
      };
      if (onUpdateFormShow) {
        onclickUpdateDetails(false);
        onUpdateUserDetails(addUpdateUserDetails);
        toast.success(
          `${addUpdateUserDetails.name.toUpperCase()}'s Details Updated`,
          { autoClose: 3000, theme: "dark" }
        );
      } else {
        onAddUserDetails(addUpdateUserDetails);
        toast.success(
          `${addUpdateUserDetails.name.toUpperCase()}'s Details Added`,
          {
            autoClose: 3000,
            theme: "dark",
          }
        );
      }
      setUserName("");
      setUserLocation("");
    } else {
      showErrorMsg(trimmedUserName, trimmedUserLocation);
    }
  };

  useEffect(() => {
    const nameInput = document.getElementById("username");
    show && nameInput?.focus();
  }, [show]);

  const showUpdateAddBtn = () => {
    if (onUpdateFormShow) {
      return (
        <Button variant="primary" onClick={modalCloseOnAdd}>
          Update
        </Button>
      );
    }
    return (
      <Button variant="primary" onClick={modalCloseOnAdd}>
        Add
      </Button>
    );
  };

  const modelTitle = onUpdateFormShow ? "Update" : "Add";

  return (
    <>
      {!onUpdateFormShow && (
        <Button variant="primary" onClick={modalShow}>
          Add Location
        </Button>
      )}

      <Modal centered show={show} onHide={modalClose} autoFocus={false}>
        <Modal.Header closeButton>
          <Modal.Title>{`${modelTitle} your location`}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form className="form-container" onSubmit={modalCloseOnAdd}>
            <label className="label" htmlFor="username">
              User Name
            </label>
            <input
              className="input"
              type="text"
              id="username"
              placeholder="your name"
              maxLength="40"
              value={userName}
              onChange={nameInputChanged}
              autoFocus
            />
            <label className="label" htmlFor="textarea">
              Location
            </label>
            <textarea
              className="textarea"
              row="5"
              maxLength="200"
              placeholder="your location"
              value={userLocation}
              onChange={locationInputChanged}
              id="textarea"
            ></textarea>
            {errorMsg && (
              <p className="error-msg">
                <sup>*</sup>
                {errorMsg}
              </p>
            )}
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={modalClose}>
            Close
          </Button>
          {showUpdateAddBtn()}
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Form;

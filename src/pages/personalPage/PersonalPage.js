import { useState, useRef } from "react";
import styles from "./PersonalPage.module.css";
import line from "../../images/line.png";

function PersonalPage() {
  const inputRef = useRef(null);

  const [personal, setPersonal] = useState({
    name: localStorage.getItem("name") || "",
    surname: localStorage.getItem("surname") || "",
    picture: localStorage.getItem("picture") || "",
    // about: false,
    // emai: false,
    // phone: false,
  });

  const [pictureName, setPictureName] = useState("");

  const [nameValid, setNameValid] = useState("");
  const [surnameValid, setSurnameValid] = useState("");
  const [pictureValid, setPictureValid] = useState("");

  function handleName(e) {
    const updatedPersonal = { ...personal };
    updatedPersonal.name = e.target.value;
    setPersonal(updatedPersonal);
    localStorage.setItem("name", `${e.target.value}`);
    if (e.target.value.length < 2) {
      setNameValid("სახელი ძალზე მოკლეა");
    } else if (!/^[ა-ჰ\s!@#$%^&*()_+=]+$/.test(e.target.value)) {
      setNameValid("გამოიყენე ქართული ასოები");
    } else {
      setNameValid("");
    }
    return true;
  }

  function handleSurname(e) {
    const updatedPersonal = { ...personal };
    updatedPersonal.surname = e.target.value;
    setPersonal(updatedPersonal);
    localStorage.setItem("surname", `${e.target.value}`);
    if (e.target.value.length < 2) {
      setSurnameValid("გვარი ძალზე მოკლეა");
    } else if (!/^[ა-ჰ\s!@#$%^&*()_+=]+$/.test(e.target.value)) {
      setSurnameValid("გამოიყენე ქართული ასოები");
    } else {
      setSurnameValid("");
    }
    return true;
  }

  function handleImageCapture(e) {
    e.preventDefault();
    const file = e.target.files[0];
    if (e.target.files && file) {
      //   handleFile(e.target.files);
      const pickReader = new FileReader();

      pickReader.addEventListener("load", function (e) {
        const picFile = e.target;
        const updatedPersonal = { ...personal };
        updatedPersonal.picture = picFile.result;
        localStorage.setItem("picture", picFile.result);
        setPersonal(updatedPersonal);

        console.log(999, picFile.result);
      });
      pickReader.readAsDataURL(file);

      setPictureValid("");
      setPictureName(file.name);
      localStorage.setItem("pictureName", file.name);

      //   window.location.reload(true);
    }
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.row}>
          <div className={styles.leftColumn}>
            <p className={styles.title}>ᲞᲘᲠᲐᲓᲘ ᲘᲜᲤᲝ</p>
            <p className={styles.pageCount}>1/3</p>
            <img src={line} className={styles.divider} alt="divider" />

            <div className={styles.nameSection}>
              <p style={nameValid ? { color: "red" } : null}>სახელი</p>
              <input
                className={styles.inputItem}
                placeholder="ანზორი"
                value={personal.name || localStorage.getItem("name") || ""}
                type="text"
                onChange={handleName}
                style={nameValid ? { borderColor: "red" } : null}
              />
              <p
                style={nameValid ? { color: "red" } : null}
                className={styles.hint}
              >
                {nameValid || "მინიმუმ 2 ასო, ქართული ასოები"}
              </p>
            </div>

            <div className={styles.lastNameSection}>
              <p>გვარი</p>
              <input
                className={styles.inputItem}
                placeholder="მუმლაძე"
                type="text"
                value={
                  localStorage.getItem("surname") || personal.surname || ""
                }
                onChange={handleSurname}
                style={surnameValid ? { borderColor: "red" } : null}
              />
              <p
                className={styles.hint}
                style={surnameValid ? { color: "red" } : null}
              >
                {surnameValid || "მინიმუმ 2 ასო, ქართული ასოები"}
              </p>
            </div>

            <div>
              <p className={styles.photoText}>პირადი ფოტოს ატვირთვა</p>

              <input
                ref={inputRef}
                type="file"
                id="input-file-upload"
                multiple={true}
                onChange={handleImageCapture}
              />
              <label htmlFor="input-file-upload">
                <button
                  onClick={() => inputRef.current.click()}
                  className={styles.photoButton}
                >
                  ატვირთვა
                </button>
                <p className={styles.photoName}>
                  {pictureName || localStorage.getItem("pictureName")}
                </p>
              </label>

              <p className={styles.aboutMeLabel}>
                ჩემ შესახებ (არასავალდებულო)
              </p>
              <textarea
                className={styles.textArea}
                placeholder="ზოგადი ინფო შენ შესახებ"
                value={localStorage.getItem("about") || personal.about || ""}
                onChange={(e) => {
                  localStorage.setItem("about", e.target.value);
                  const updatedPersonal = { ...personal };
                  updatedPersonal.about = e.target.value;
                  setPersonal(updatedPersonal);
                  console.log(personal);
                }}
              />
            </div>

            <button
              className={styles.submit}
              disabled={
                !localStorage.getItem("name") ||
                !localStorage.getItem("surname") ||
                !localStorage.getItem("picture") ||
                pictureValid.length > 1 ||
                nameValid.length > 1 ||
                surnameValid.length > 1
              }
            >
              ᲨᲔᲛᲓᲔᲒᲘ
            </button>
          </div>
          <div className={styles.rightColumn}>
            {localStorage.getItem("picture")?.length > 1 && (
              <>
                {console.log(200000, personal.picture)}
                <br />
                <img
                  src={localStorage.getItem("picture")}
                  style={{ height: "200px" }}
                  alt="avatar "
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PersonalPage;

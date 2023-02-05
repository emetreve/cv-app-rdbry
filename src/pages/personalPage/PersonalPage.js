import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cv from "../../components/cv/Cv";
import styles from "./PersonalPage.module.css";
import back from "../../images/back.png";
import line from "../../images/line.png";
import valid from "../../images/valid.png";
import invalid from "../../images/invalid.png";
import logoFoot from "../../images/logoFoot.png";

function PersonalPage() {
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const [personal, setPersonal] = useState({
    name: localStorage.getItem("name") || "",
    surname: localStorage.getItem("surname") || "",
    picture: localStorage.getItem("picture") || "",
    about: localStorage.getItem("about") || "",
    email: localStorage.getItem("email") || "",
    phone: localStorage.getItem("phone") || "",
  });

  useEffect(() => {
    if (localStorage.getItem("name")) {
      if (localStorage.getItem("name").length < 2) {
        setNameValid("სახელი ძალზე მოკლეა");
      } else if (
        !/^[ა-ჰ\s!@#$%^&*()_+=]+$/.test(localStorage.getItem("name"))
      ) {
        setNameValid("გამოიყენე ქართული ასოები");
      } else {
        setNameValid("");
      }
    }
    if (localStorage.getItem("surname")) {
      if (localStorage.getItem("surname").length < 2) {
        setSurnameValid("გვარი ძალზე მოკლეა");
      } else if (
        !/^[ა-ჰ\s!@#$%^&*()_+=]+$/.test(localStorage.getItem("surname"))
      ) {
        setSurnameValid("გამოიყენე ქართული ასოები");
      } else {
        setSurnameValid("");
      }
    }

    if (localStorage.getItem("email")) {
      if (localStorage.getItem("email").length < 2) {
        setEmailValid("იმეილი სავალდებულოა");
      } else if (localStorage.getItem("email").slice(-12) !== "@redberry.ge") {
        setEmailValid("უნდა მთავრდებოდეს @redberry.ge-ით");
      } else if (localStorage.getItem("email") < 13) {
        setEmailValid("იმეილი ძალზე მოკლეა");
      } else {
        setEmailValid("");
      }
    }

    if (localStorage.getItem("phone")) {
      if (localStorage.getItem("phone").length < 2) {
        setPhoneValid("მობილურის ნომერი სავალდებულოა");
      } else if (localStorage.getItem("phone").slice(0, 4) !== "+995") {
        setPhoneValid("მობილურის ნომერი უნდა იწყებოდეს +995-ით");
      } else if (localStorage.getItem("phone").length !== 13) {
        setPhoneValid("მობილურის ნომერი უნდა იყოს 13 ნიშნა");
      } else if (!/^[0-9\s+]+$/.test(localStorage.getItem("phone"))) {
        setPhoneValid("მობილურის ნომერში ჩაწერეთ მხოლოდ ციფრები");
      } else if (/\s/g.test(localStorage.getItem("phone"))) {
        setPhoneValid("მობილურის ნომერში ჩაწერეთ მხოლოდ ციფრები");
      } else {
        setPhoneValid("");
      }
    }

    if (!localStorage.getItem("picture")) {
      let othersPresent =
        localStorage.getItem("name") &&
        localStorage.getItem("surname") &&
        localStorage.getItem("about") &&
        localStorage.getItem("email") &&
        localStorage.getItem("phone");
      if (othersPresent) {
        setPictureValid("სურათი დაგრჩა");
      }
    }
  }, [personal]);

  const [pictureName, setPictureName] = useState("");

  const [nameValid, setNameValid] = useState("");
  const [surnameValid, setSurnameValid] = useState("");
  const [pictureValid, setPictureValid] = useState("");
  const [emailValid, setEmailValid] = useState("");
  const [phoneValid, setPhoneValid] = useState("");

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

  function handleEmail(e) {
    const updatedPersonal = { ...personal };
    updatedPersonal.email = e.target.value;
    setPersonal(updatedPersonal);
    localStorage.setItem("email", `${e.target.value}`);
    if (e.target.value.length < 2) {
      setEmailValid("იმეილი სავალდებულოა");
    } else if (e.target.value.slice(-12) !== "@redberry.ge") {
      setEmailValid("უნდა მთავრდებოდეს @redberry.ge-ით");
    } else if (e.target.value.length < 13) {
      setEmailValid("იმეილი ძალზე მოკლეა");
    } else {
      setEmailValid("");
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
      });
      pickReader.readAsDataURL(file);

      setPictureValid("");
      setPictureName(file.name);
      localStorage.setItem("pictureName", file.name);

      //   window.location.reload(true);
    }
  }

  function handlePhone(e) {
    const updatedPersonal = { ...personal };
    updatedPersonal.phone = e.target.value;
    setPersonal(updatedPersonal);
    localStorage.setItem("phone", `${e.target.value}`);

    if (e.target.value.length < 2) {
      setPhoneValid("მობილურის ნომერი სავალდებულოა");
    } else if (e.target.value.slice(0, 4) !== "+995") {
      setPhoneValid("მობილურის ნომერი უნდა იწყებოდეს +995-ით");
    } else if (e.target.value.length !== 13) {
      setPhoneValid("მობილურის ნომერი უნდა იყოს 13 ნიშნა");
    } else if (!/^[0-9\s+]+$/.test(e.target.value)) {
      setPhoneValid("მობილურის ნომერში ჩაწერეთ მხოლოდ ციფრები");
    } else if (/\s/g.test(e.target.value)) {
      setPhoneValid("მობილურის ნომერში ჩაწერეთ მხოლოდ ციფრები");
    } else {
      setPhoneValid("");
    }

    return true;
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.row}>
          <div className={styles.leftColumn}>
            <img
              src={back}
              onClick={() => navigate("/")}
              className={styles.goBack}
              alt="go back"
            />
            <p className={styles.title}>ᲞᲘᲠᲐᲓᲘ ᲘᲜᲤᲝ</p>
            <p className={styles.pageCount}>1/3</p>
            <img src={line} className={styles.divider} alt="divider" />

            <div className={styles.nameSection}>
              <p style={nameValid ? { color: "red" } : null}>სახელი</p>
              <input
                className={styles.inputItem}
                placeholder="ელენე"
                value={personal.name || localStorage.getItem("name") || ""}
                type="text"
                onChange={handleName}
                style={nameValid ? { borderColor: "red" } : null}
              />

              {nameValid === "" && personal.name !== "" ? (
                <img
                  src={valid}
                  className={styles.checkMarkShort}
                  alt="validated icon"
                />
              ) : null}

              {nameValid !== "" && (
                <img
                  src={invalid}
                  className={styles.checkMarkShort}
                  alt="validated icon"
                />
              )}

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
                placeholder="მეტრეველი"
                type="text"
                value={
                  localStorage.getItem("surname") || personal.surname || ""
                }
                onChange={handleSurname}
                style={surnameValid ? { borderColor: "red" } : null}
              />
              {surnameValid === "" && personal.surname !== "" ? (
                <img
                  src={valid}
                  className={styles.checkMarkShort}
                  alt="validated icon"
                />
              ) : null}

              {surnameValid !== "" && (
                <img
                  src={invalid}
                  className={styles.checkMarkShort}
                  alt="validated icon"
                />
              )}
              <p
                className={styles.hint}
                style={surnameValid ? { color: "red" } : null}
              >
                {surnameValid || "მინიმუმ 2 ასო, ქართული ასოები"}
              </p>
            </div>

            <div>
              <p
                className={styles.photoText}
                // style={pictureValid ? { color: "red" } : null}
              >
                პირადი ფოტოს ატვირთვა
              </p>

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
                }}
                style={
                  personal.about !== "" ? { borderColor: "#98E37E" } : null
                }
              />
              <div className={styles.emailSection}>
                <p style={emailValid ? { color: "red" } : null}>ელ.ფოსტა</p>

                <input
                  className={styles.inputItemLong}
                  placeholder="emetreve@redberry.ge"
                  value={personal.email || localStorage.getItem("email") || ""}
                  type="text"
                  onChange={handleEmail}
                  style={emailValid ? { borderColor: "red" } : null}
                />

                {emailValid === "" && personal.email !== "" ? (
                  <img
                    src={valid}
                    className={styles.checkMarkLong}
                    alt="validated icon"
                  />
                ) : null}

                {emailValid !== "" && (
                  <img
                    src={invalid}
                    className={styles.checkMarkLong}
                    alt="validated icon"
                  />
                )}
                <p
                  style={emailValid ? { color: "red" } : null}
                  className={styles.hint}
                >
                  {emailValid || "მინიმუმ 2 ასო, ქართული ასოები"}
                </p>
              </div>

              <div className={styles.phoneSection}>
                <p style={phoneValid ? { color: "red" } : null}>
                  მობილურის ნომერი
                </p>

                <input
                  className={styles.inputItemLong}
                  placeholder="+995551123456"
                  value={personal.phone || localStorage.getItem("phone") || ""}
                  type="text"
                  onChange={handlePhone}
                  style={phoneValid ? { borderColor: "red" } : null}
                />
                {phoneValid === "" && personal.phone !== "" ? (
                  <img
                    src={valid}
                    className={styles.checkMarkLong}
                    alt="validated icon"
                  />
                ) : null}

                {phoneValid !== "" && (
                  <img
                    src={invalid}
                    className={styles.checkMarkLong}
                    alt="validated icon"
                  />
                )}
                <p
                  style={phoneValid ? { color: "red" } : null}
                  className={styles.hint}
                >
                  {phoneValid || "მინიმუმ 2 ასო, ქართული ასოები"}
                </p>
              </div>
            </div>

            <button
              className={styles.submit}
              onClick={() => {
                navigate("/experience");
                window.scrollTo(0, 0);
              }}
              disabled={
                !localStorage.getItem("name") ||
                !localStorage.getItem("surname") ||
                !localStorage.getItem("picture") ||
                !localStorage.getItem("email") ||
                !localStorage.getItem("phone") ||
                phoneValid.length > 1 ||
                emailValid.length > 1 ||
                pictureValid.length > 1 ||
                nameValid.length > 1 ||
                surnameValid.length > 1
              }
            >
              ᲨᲔᲛᲓᲔᲒᲘ
            </button>
          </div>
          <div className={styles.rightColumn}>
            <Cv
              hidePersonal={
                !localStorage.getItem("name") ||
                !localStorage.getItem("surname") ||
                !localStorage.getItem("picture") ||
                !localStorage.getItem("email") ||
                emailValid.length > 1 ||
                pictureValid.length > 1 ||
                nameValid.length > 1 ||
                surnameValid.length > 1
              }
            />
            <img src={logoFoot} className={styles.footLogo} alt="foot logo" />
          </div>
        </div>
      </div>
    </>
  );
}

export default PersonalPage;

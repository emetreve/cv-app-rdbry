import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cv from "../../components/cv/Cv";
import styles from "./PersonalPage.module.css";
import back from "../../images/back.png";
import line from "../../images/line.png";
import valid from "../../images/valid.png";
import invalid from "../../images/invalid.png";

function PersonalPage() {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const phoneRef = useRef();

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
      } else if (!/^[ა-ჰ]+$/.test(localStorage.getItem("name"))) {
        setNameValid("გამოიყენე ქართული ასოები");
      } else if (/[\s]/.test(localStorage.getItem("name"))) {
        setNameValid("სფეისების გარეშე შეიყვანეთ");
      } else {
        setNameValid("");
      }
    }
    if (localStorage.getItem("surname")) {
      if (localStorage.getItem("surname").length < 2) {
        setSurnameValid("გვარი ძალზე მოკლეა");
      } else if (!/^[ა-ჰ]+$/.test(localStorage.getItem("surname"))) {
        setSurnameValid("გამოიყენე ქართული ასოები");
      } else if (/[\s]/.test(localStorage.getItem("surname"))) {
        setSurnameValid("სფეისების გარეშე შეიყვანეთ");
      } else {
        setSurnameValid("");
      }
    }

    if (localStorage.getItem("email")) {
      if (localStorage.getItem("email").length < 2) {
        setEmailValid("იმეილი სავალდებულოა");
      } else if (localStorage.getItem("email").slice(-12) !== "@redberry.ge") {
        setEmailValid("უნდა მთავრდებოდეს @redberry.ge-ით");
      } else if (localStorage.getItem("email").length < 13) {
        setEmailValid("იმეილი ძალზე მოკლეა");
      } else if (localStorage.getItem("email").includes(" ")) {
        setEmailValid("სფეისების გარეშე დაწერეთ");
      } else if (
        !/^[a-zA-Z0-9@._-]+$/.test(localStorage.getItem("email")) ||
        checkPatternEmail(localStorage.getItem("email"))
      ) {
        setEmailValid("იმეილი შეიყვანეთ სწორი ფორმატით");
      } else {
        setEmailValid("");
      }
    }

    if (localStorage.getItem("phone")) {
      if (localStorage.getItem("phone").length < 2) {
        setPhoneValid("მობილურის ნომერი სავალდებულოა");
      } else if (localStorage.getItem("phone").slice(0, 4) !== "+995") {
        setPhoneValid("მობილურის ნომერი უნდა იწყებოდეს +995-ით");
      } else if (localStorage.getItem("phone").length !== 17) {
        setPhoneValid("მობილურის ნომერი უნდა იყოს 13 ნიშნა");
      } else if (!/^[0-9\s+]+$/.test(localStorage.getItem("phone"))) {
        setPhoneValid("მობილურის ნომერში ჩაწერეთ მხოლოდ ციფრები");
      } else if (
        localStorage.getItem("phone").replace(/\s/g, "").length !== 13
      ) {
        setPhoneValid("მობილურის ნომერი არავალიდურია");
      } else {
        setPhoneValid("");
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personal]);

  const [pictureName, setPictureName] = useState("");

  const [nameValid, setNameValid] = useState("");
  const [surnameValid, setSurnameValid] = useState("");
  const [pictureValid, setPictureValid] = useState("");
  const [emailValid, setEmailValid] = useState("");
  const [phoneValid, setPhoneValid] = useState("");

  function handleName(e) {
    const { value } = e.target;
    const updatedPersonal = { ...personal };
    updatedPersonal.name = value;
    setPersonal(updatedPersonal);
    localStorage.setItem("name", `${value}`);
    if (value.length < 2) {
      setNameValid("სახელი ძალზე მოკლეა");
    } else if (!/^[ა-ჰ]+$/.test(value)) {
      setNameValid("გამოიყენე ქართული ასოები");
    } else if (/[\s]/.test(localStorage.getItem("name"))) {
      setNameValid("სფეისების გარეშე შეიყვანეთ");
    } else {
      setNameValid("");
    }
    return true;
  }

  function handleSurname(e) {
    const { value } = e.target;
    const updatedPersonal = { ...personal };
    updatedPersonal.surname = value;
    setPersonal(updatedPersonal);
    localStorage.setItem("surname", `${value}`);
    if (value.length < 2) {
      setSurnameValid("გვარი ძალზე მოკლეა");
    } else if (!/^[ა-ჰ]+$/.test(value)) {
      setSurnameValid("გამოიყენე ქართული ასოები");
    } else if (/[\s]/.test(localStorage.getItem("surname"))) {
      setSurnameValid("სფეისების გარეშე შეიყვანეთ");
    } else {
      setSurnameValid("");
    }
    return true;
  }

  //helper function for email validation
  function checkPatternEmail(str) {
    let lastAtIndex = str.lastIndexOf("@");
    let beforeAt = str.charAt(lastAtIndex - 1);
    let pattern = /[^a-zA-Z0-9]/;
    return pattern.test(beforeAt);
  }

  function handleEmail(e) {
    const { value } = e.target;
    const updatedPersonal = { ...personal };
    updatedPersonal.email = value;
    setPersonal(updatedPersonal);
    localStorage.setItem("email", `${value}`);
    if (value.length < 2) {
      setEmailValid("იმეილი სავალდებულოა");
    } else if (value.slice(-12) !== "@redberry.ge") {
      setEmailValid("უნდა მთავრდებოდეს @redberry.ge-ით");
    } else if (value.length < 13) {
      setEmailValid("იმეილი ძალზე მოკლეა");
    } else if (value.includes(" ")) {
      setEmailValid("სფეისების გარეშე დაწერეთ");
    } else if (
      !/^[a-zA-Z0-9@._-]+$/.test(localStorage.getItem("email")) ||
      checkPatternEmail(value)
    ) {
      setEmailValid("იმეილი შეიყვანეთ სწორი ფორმატით");
    } else {
      setEmailValid("");
    }
    return true;
  }

  function handleImageCapture(e) {
    const file = e.target.files[0];
    if (e.target.files && file) {
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
    }
  }

  function handlePhone() {
    let input = phoneRef.current;

    input.addEventListener("input", function (e) {
      if (e.data !== null) {
        if (
          phoneRef.current.value.length === 4 ||
          phoneRef.current.value.length === 8 ||
          phoneRef.current.value.length === 11 ||
          phoneRef.current.value.length === 14
        ) {
          phoneRef.current.value = phoneRef.current.value + " ";
        }
      }
    });
    // console.log(phoneRef.current.value);

    const updatedPersonal = { ...personal };
    updatedPersonal.phone = phoneRef.current.value;
    setPersonal(updatedPersonal);
    localStorage.setItem("phone", `${phoneRef.current.value}`);

    return true;
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.row}>
          <div className={styles.leftColumn}>
            <img
              src={back}
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
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
                placeholder="ანზორ"
                value={personal.name || localStorage.getItem("name") || ""}
                type="text"
                onChange={handleName}
                style={{
                  ...(nameValid ? { borderColor: "red" } : null),
                  ...(nameValid === "" &&
                  personal.name !== "" &&
                  localStorage.getItem("name") !== ""
                    ? { borderColor: "#98E37E" }
                    : null),
                }}
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
              <p style={surnameValid ? { color: "red" } : null}>გვარი</p>
              <input
                className={styles.inputItem}
                placeholder="მუმლაძე"
                type="text"
                value={
                  localStorage.getItem("surname") || personal.surname || ""
                }
                onChange={handleSurname}
                style={{
                  ...(surnameValid ? { borderColor: "red" } : null),
                  ...(surnameValid === "" &&
                  personal.surname !== "" &&
                  localStorage.getItem("surname") !== ""
                    ? { borderColor: "#98E37E" }
                    : null),
                }}
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
              <p className={styles.photoText}>პირადი ფოტოს ატვირთვა</p>

              {pictureValid === "" && personal.picture !== "" ? (
                <img
                  src={valid}
                  className={styles.checkMarkImage}
                  alt="validated icon"
                />
              ) : null}

              {pictureValid !== "" && (
                <img
                  src={invalid}
                  className={styles.checkMarkImage}
                  alt="validated icon"
                />
              )}

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
                  placeholder="anzorr666@redberry.ge"
                  value={personal.email || localStorage.getItem("email") || ""}
                  type="text"
                  onChange={handleEmail}
                  style={{
                    ...(emailValid ? { borderColor: "red" } : null),
                    ...(emailValid === "" &&
                    personal.email !== "" &&
                    localStorage.getItem("email") !== ""
                      ? { borderColor: "#98E37E" }
                      : null),
                  }}
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
                  {emailValid || "უნდა მთავრდებოდეს @redberry.ge-ით"}
                </p>
              </div>

              <div className={styles.phoneSection}>
                <p style={phoneValid ? { color: "red" } : null}>
                  მობილურის ნომერი
                </p>

                <input
                  ref={phoneRef}
                  if="phone"
                  className={styles.inputItemLong}
                  placeholder="+995 551 12 34 56"
                  value={personal.phone || localStorage.getItem("phone") || ""}
                  type="text"
                  onChange={handlePhone}
                  style={{
                    ...(phoneValid ? { borderColor: "red" } : null),
                    ...(phoneValid === "" &&
                    personal.phone !== "" &&
                    localStorage.getItem("phone") !== ""
                      ? { borderColor: "#98E37E" }
                      : null),
                  }}
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
                  {phoneValid ||
                    "უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს"}
                </p>
              </div>
            </div>

            <button
              className={styles.submit}
              onClick={() => {
                const allValid = !(
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
                );

                if (allValid) {
                  navigate("/experience");
                  window.scrollTo(0, 0);
                } else {
                  if (!localStorage.getItem("name")) {
                    setNameValid("სახელი აუცილებელია");
                  }
                  if (!localStorage.getItem("surname")) {
                    setSurnameValid("გვარი აუცილებელია");
                  }
                  if (!localStorage.getItem("picture")) {
                    setPictureValid("ფოტო აუცილებელია");
                  }
                  if (!localStorage.getItem("email")) {
                    setEmailValid("ელ.ფოსტა აუცილებელია");
                  }
                  if (!localStorage.getItem("phone")) {
                    setPhoneValid("მობილურის ნომერი აუცილებელია");
                  }
                }
              }}
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
              hideExperience={true}
              hideEducation={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default PersonalPage;

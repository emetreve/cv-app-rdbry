/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import getDegrees from "../../http/getDegrees";
import styles from "./Education.module.css";
import valid from "../../images/valid.png";
import invalid from "../../images/invalid.png";
import divider from "../../images/divider.png";

function Education({ id, ready, readyOthers, updateCv, updateCvSetter }) {
  const [experience, setExperience] = useState({
    institute: localStorage.getItem(`institute${id}`) || "",
    degree: localStorage.getItem(`degree${id}`) || "",
    graduation: localStorage.getItem(`graduation${id}`) || "",
    descriptionEdu: localStorage.getItem(`eduDescription${id}`) || "",
  });

  const [instituteValid, setInstituteValid] = useState("");
  const [degreeValid, setDegreeValid] = useState("");
  const [graduationValid, setGraduationValid] = useState("");
  const [descriptionEduValid, setDescriptionEduValid] = useState("");

  const [dataAPI, setDataAPI] = useState([]);

  useEffect(() => {
    getDegrees().then((returned) => {
      setDataAPI(returned);
    });
    if (ready === undefined) {
      if (
        !localStorage.getItem(`institute${id}`) ||
        localStorage.getItem(`institute${id}`).length < 2 ||
        !localStorage.getItem(`degree${id}`) ||
        localStorage.getItem(`degree${id}`).length < 2 ||
        !localStorage.getItem(`graduation${id}`) ||
        localStorage.getItem(`graduation${id}`).length < 2 ||
        !localStorage.getItem(`eduDescription${id}`) ||
        localStorage.getItem(`eduDescription${id}`).length < 2
      ) {
        readyOthers(false);
      } else {
        readyOthers(true);
        updateCvSetter(!updateCv);
      }
    }
    if (ready === undefined) {
      let noError =
        experience.institute === "" &&
        experience.graduation === "" &&
        experience.degree === "" &&
        experience.descriptionEdu === "";
      if (noError) {
        setInstituteValid("");
        setGraduationValid("");
        setDegreeValid("");
        setDescriptionEduValid("");
        //important part
        readyOthers(true);
        updateCvSetter(!updateCv);
      }
    }

    if (ready) {
      if (
        !localStorage.getItem(`institute${id}`) ||
        localStorage.getItem(`institute${id}`).length < 2 ||
        !localStorage.getItem(`graduation${id}`) ||
        !localStorage.getItem(`eduDescription${id}`) ||
        localStorage.getItem(`eduDescription${id}`).length < 2
      ) {
        ready(false);
        // console.log(111, "setting to false");
        // console.log(1000000, localStorage.getItem(`title${id}`).length);
      } else {
        ready(true);
        updateCvSetter(!updateCv);

        // console.log("setting to true");
        // console.log(100000, localStorage.getItem(`title${id}`).length);
      }
    }

    if (localStorage.getItem(`institute${id}`)) {
      if (localStorage.getItem(`institute${id}`).length < 2) {
        setInstituteValid("სასწავლებელი ძალზე მოკლეა");
        if (ready) {
          ready(false);
        }
        if (readyOthers) {
          readyOthers(false);
        }
      } else {
        setInstituteValid("");
        updateCvSetter(!updateCv);
      }
    }

    if (localStorage.getItem(`eduDescription${id}`)) {
      if (localStorage.getItem(`eduDescription${id}`).length < 2) {
        setDescriptionEduValid("აღწერა ძალზე მოკლეა");
        if (ready) {
          ready(false);
        }
        if (readyOthers) {
          readyOthers(false);
        }
      } else {
        setDescriptionEduValid("");
        updateCvSetter(!updateCv);
      }
    }

    if (localStorage.getItem(`graduation${id}`)) {
      if (localStorage.getItem(`graduation${id}`).length < 2) {
        setGraduationValid("დამთავრების რიცხვი აუცილებელია");
        if (ready) {
          ready(false);
        }
        if (readyOthers) {
          readyOthers(false);
        }
      } else {
        setGraduationValid("");
        updateCvSetter(!updateCv);
      }
    }
  }, [id, experience]);

  function handleInstitute(e) {
    const updatedExperience = { ...experience };
    updatedExperience.institute = e.target.value;
    setExperience(updatedExperience);
    localStorage.setItem(`institute${id}`, e.target.value);
    console.log(localStorage.getItem(`institute${id}`));
    if (e.target.value.length < 2) {
      setInstituteValid("სასწავლებელი ძალზე მოკლეა");
      if (ready) {
        ready(false);
      }
      if (readyOthers) {
        readyOthers(false);
      }
    } else {
      setInstituteValid("");
      updateCvSetter(!updateCv);
    }
    return true;
  }

  function handleGraduation() {
    const updatedExperience = { ...experience };
    updatedExperience.graduation = document.getElementById(
      `graduation${id}`
    ).value;
    setExperience(updatedExperience);
    localStorage.setItem(
      `graduation${id}`,
      `${document.getElementById(`graduation${id}`).value}`
    );

    if (String(document.getElementById(`graduation${id}`).value) < 2) {
      setGraduationValid("დამთავრების რიცხვი აუცილებელია");
      if (ready) {
        ready(false);
      }
      if (readyOthers) {
        readyOthers(false);
      }
    } else {
      setGraduationValid("");
      updateCvSetter(!updateCv);
    }
    return true;
  }

  function handleDegree(e) {
    const updatedExperience = { ...experience };
    updatedExperience.degree = e.target.value;
    setExperience(updatedExperience);
    localStorage.setItem(`degree${id}`, e.target.value);

    //get the IDs
    fetch("https://resume.redberryinternship.ge/api/degrees")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        const match = data.filter((item) => item.title === e.target.value);
        localStorage.setItem(`idDegree${id}`, match[0].id);
        console.log(300000, match[0]);
        return match;
      });
    //end of getting the IDs

    if (e.target.value.length < 2) {
      setDegreeValid("invalid");
    } else {
      setDegreeValid("");
    }
    return true;
  }

  function handleDescription(e) {
    localStorage.setItem(`eduDescription${id}`, e.target.value);

    const updatedExperience = { ...experience };
    updatedExperience.descriptionEdu = e.target.value;
    setExperience(updatedExperience);

    if (e.target.value.length < 2) {
      setDescriptionEduValid("გამოცდილება ძალზე მოკლეა");
      if (ready) {
        ready(false);
      }
      if (readyOthers) {
        readyOthers(false);
      }
    } else {
      setDescriptionEduValid("");
      updateCvSetter(!updateCv);
    }
    return true;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.institutelSection}>
        <p style={instituteValid ? { color: "red" } : null}>სასწავლებელი</p>

        <input
          className={styles.inputItemLong}
          placeholder="სასწავლებელი"
          value={
            experience.institute || localStorage.getItem(`institute${id}`) || ""
          }
          type="text"
          onChange={handleInstitute}
          style={instituteValid ? { borderColor: "red" } : null}
        />

        {instituteValid === "" && experience.institute !== "" ? (
          <img
            src={valid}
            className={styles.checkMarkLongEmployer}
            alt="validated icon"
          />
        ) : null}

        {instituteValid !== "" && (
          <img
            src={invalid}
            className={styles.checkMarkLongEmployer}
            alt="validated icon"
          />
        )}
        <p
          style={instituteValid ? { color: "red" } : null}
          className={styles.hint}
        >
          {instituteValid || "მინიმუმ 2 სიმბოლო"}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "row", gap: "54px" }}>
        <div className={styles.graduationDateSection}>
          <p style={degreeValid ? { color: "red" } : null}>ხარისხი</p>
          <select
            id="select"
            className={styles.select}
            onChange={handleDegree}
            value={
              experience.degree || localStorage.getItem(`degree${id}`) || ""
            }
            style={degreeValid ? { border: "2px red solid" } : null}
          >
            <option hidden>
              {experience.degree ||
                localStorage.getItem(`degree${id}`) ||
                "აირჩიეთ ხარისხი"}
            </option>
            {dataAPI.length > 0 &&
              dataAPI.map((each) => {
                return <option key={each.id}>{each.title}</option>;
              })}
          </select>

          {degreeValid === "" && experience.degree !== "" ? (
            <img
              src={valid}
              className={styles.checkMarkDegree}
              alt="validated icon"
            />
          ) : null}

          {degreeValid !== "" && (
            <img
              src={invalid}
              className={styles.checkMarkDegree}
              alt="validated icon"
            />
          )}
        </div>

        <div className={styles.graduationDateSection}>
          <p style={graduationValid ? { color: "red" } : null}>
            დამთავრების რიცხვი
          </p>
          <input
            id={`graduation${id}`}
            className={styles.inputDate}
            value={
              experience.graduation ||
              localStorage.getItem(`graduation${id}`) ||
              ""
            }
            type="date"
            onChange={handleGraduation}
            onClick={() => {
              document.getElementById(`graduation${id}`).showPicker();
            }}
            style={graduationValid ? { borderColor: "red" } : null}
          />

          {graduationValid === "" && experience.graduation !== "" ? (
            <img
              src={valid}
              className={styles.checkMarkDate}
              alt="validated icon"
            />
          ) : null}

          {graduationValid !== "" && (
            <img
              src={invalid}
              className={styles.checkMarkDate}
              alt="validated icon"
            />
          )}
        </div>
      </div>
      <div className={styles.descriptionWrapper}>
        <p className={styles.descriptionLabel}>აღწერა</p>
        <textarea
          className={styles.textArea}
          placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
          value={
            localStorage.getItem(`eduDescription${id}`) ||
            experience.descriptionEdu ||
            ""
          }
          onChange={handleDescription}
          style={descriptionEduValid ? { borderColor: "red" } : null}
        />
      </div>
      <img src={divider} className={styles.divider} alt="divider" />
    </div>
  );
}

export default Education;

import { useState } from "react";
import styles from "./Experience.module.css";
import valid from "../../images/valid.png";
import invalid from "../../images/invalid.png";
import divider from "../../images/divider.png";

function Experience() {
  const [experience, setExperience] = useState({
    title: localStorage.getItem("title") || "",
    employer: localStorage.getItem("employer") || "",
    startDate: localStorage.getItem("startDate") || "",
    endDate: localStorage.getItem("endDate") || "",
    description: localStorage.getItem("description") || "",
  });

  const [titleValid, setTitleValid] = useState("");
  const [employerValid, setEmployerValid] = useState("");
  //   const [startDateValid, setStartDateValid] = useState("");
  //   const [endDateValid, setEndDateValid] = useState("");
  //   const [descriptionValid, setDescriptionValid] = useState("");

  function handleTitle(e) {
    const updatedExperience = { ...experience };
    updatedExperience.title = e.target.value;
    setExperience(updatedExperience);
    localStorage.setItem("experience", JSON.stringify(updatedExperience));
    localStorage.setItem("title", e.target.value);
    if (e.target.value.length < 2) {
      setTitleValid("თანამდებობა ძალზე მოკლეა");
    } else {
      setTitleValid("");
    }
    return true;
  }

  function handleEmployer(e) {
    const updatedExperience = { ...experience };
    updatedExperience.employer = e.target.value;
    setExperience(updatedExperience);
    localStorage.setItem("experience", JSON.stringify(updatedExperience));
    localStorage.setItem("employer", e.target.value);
    console.log(localStorage.getItem("experience"));
    if (e.target.value.length < 2) {
      setEmployerValid("დამსაქმებელი ძალზე მოკლეა");
    } else {
      setEmployerValid("");
    }
    return true;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.titlelSection}>
        <p style={titleValid ? { color: "red" } : null}>თანამდებობა</p>

        <input
          className={styles.inputItemLong}
          placeholder="დეველოპერი, დიზაინერი, ა.შ."
          value={experience.title || localStorage.getItem("title") || ""}
          type="text"
          onChange={handleTitle}
          style={titleValid ? { borderColor: "red" } : null}
        />

        {titleValid === "" && experience.title !== "" ? (
          <img
            src={valid}
            className={styles.checkMarkLong}
            alt="validated icon"
          />
        ) : null}

        {titleValid !== "" && (
          <img
            src={invalid}
            className={styles.checkMarkLong}
            alt="validated icon"
          />
        )}
        <p style={titleValid ? { color: "red" } : null} className={styles.hint}>
          {titleValid || "მინიმუმ 2 სიმბოლო"}
        </p>
      </div>

      <div className={styles.employerlSection}>
        <p style={employerValid ? { color: "red" } : null}>დამსაქმებელი</p>

        <input
          className={styles.inputItemLong}
          placeholder="დამსაქმებელი"
          value={experience.employer || localStorage.getItem("employer") || ""}
          type="text"
          onChange={handleEmployer}
          style={employerValid ? { borderColor: "red" } : null}
        />

        {employerValid === "" && experience.employer !== "" ? (
          <img
            src={valid}
            className={styles.checkMarkLongEmployer}
            alt="validated icon"
          />
        ) : null}

        {employerValid !== "" && (
          <img
            src={invalid}
            className={styles.checkMarkLongEmployer}
            alt="validated icon"
          />
        )}
        <p
          style={employerValid ? { color: "red" } : null}
          className={styles.hint}
        >
          {employerValid || "მინიმუმ 2 სიმბოლო"}
        </p>
      </div>

      <img src={divider} className={styles.divider} alt="divider" />
    </div>
  );
}

export default Experience;

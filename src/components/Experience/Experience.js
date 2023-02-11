import { useEffect, useState } from "react";
import styles from "./Experience.module.css";
import valid from "../../images/valid.png";
import invalid from "../../images/invalid.png";
import divider from "../../images/divider.png";

function Experience({ id, ready, readyOthers, updateCv, updateCvSetter }) {
  const [experience, setExperience] = useState({
    title: localStorage.getItem(`title${id}`) || "",
    employer: localStorage.getItem(`employer${id}`) || "",
    startDate: localStorage.getItem(`startDate${id}`) || "",
    endDate: localStorage.getItem(`endDate${id}`) || "",
    description: localStorage.getItem(`description${id}`) || "",
  });

  const [titleValid, setTitleValid] = useState("");
  const [employerValid, setEmployerValid] = useState("");
  const [startDateValid, setstartDateValid] = useState("");
  const [endDateValid, setendDateValid] = useState("");
  const [descriptionValid, setDescriptionValid] = useState("");

  useEffect(() => {
    if (ready === undefined) {
      if (
        !localStorage.getItem(`title${id}`) ||
        localStorage.getItem(`title${id}`).length < 2 ||
        !localStorage.getItem(`employer${id}`) ||
        localStorage.getItem(`employer${id}`).length < 2 ||
        !localStorage.getItem(`startDate${id}`) ||
        !localStorage.getItem(`endDate${id}`) ||
        !localStorage.getItem(`description${id}`) ||
        localStorage.getItem(`description${id}`).length < 2
      ) {
        readyOthers(false);
      } else {
        readyOthers(true);
        updateCvSetter(!updateCv);
      }
    }
    if (ready === undefined) {
      let noError =
        experience.title === "" &&
        experience.employer === "" &&
        experience.startDate === "" &&
        experience.endDate === "" &&
        experience.description === "";
      if (noError) {
        setTitleValid("");
        setEmployerValid("");
        setstartDateValid("");
        setendDateValid("");
        setDescriptionValid("");
        //important part
        readyOthers(true);
        updateCvSetter(!updateCv);
      }
    }

    if (ready) {
      if (
        !localStorage.getItem(`title${id}`) ||
        localStorage.getItem(`title${id}`).length < 2 ||
        !localStorage.getItem(`employer${id}`) ||
        localStorage.getItem(`employer${id}`).length < 2 ||
        !localStorage.getItem(`startDate${id}`) ||
        !localStorage.getItem(`endDate${id}`) ||
        !localStorage.getItem(`description${id}`) ||
        localStorage.getItem(`description${id}`).length < 2
      ) {
        ready(false);
      } else {
        ready(true);
        updateCvSetter(!updateCv);
      }
    }

    if (localStorage.getItem(`title${id}`)) {
      if (localStorage.getItem(`title${id}`).replace(/\s/g, "").length < 2) {
        setTitleValid("თანამდებობა ძალზე მოკლეა");
        if (ready) {
          ready(false);
        }
        if (readyOthers) {
          readyOthers(false);
        }
      } else {
        setTitleValid("");
      }
    }

    if (localStorage.getItem(`employer${id}`)) {
      if (
        localStorage.getItem(`employer${id}`).replace(/\s/g, "").length < 2 ||
        !/^[A-Za-z0-9 ა-ჰ]*$/.test(localStorage.getItem(`employer${id}`))
      ) {
        setEmployerValid(
          "დამსაქმებელი ძალზე მოკლეა, ან არასწორ სიმბოლოებს იყენებ"
        );
        if (ready) {
          ready(false);
        }
        if (readyOthers) {
          readyOthers(false);
        }
      } else {
        setEmployerValid("");
        updateCvSetter(!updateCv);
      }
    }

    if (localStorage.getItem(`description${id}`)) {
      if (
        localStorage.getItem(`description${id}`).replace(/\s/g, "").length < 2
      ) {
        setDescriptionValid("აღწერა ძალზე მოკლეა");
        if (ready) {
          ready(false);
        }
        if (readyOthers) {
          readyOthers(false);
        }
      } else {
        setDescriptionValid("");
        updateCvSetter(!updateCv);
      }
    }

    if (localStorage.getItem(`startDate${id}`)) {
      if (localStorage.getItem(`startDate${id}`).length < 2) {
        setstartDateValid("დაწყების რიცხვი აუცილებელია");
        if (ready) {
          ready(false);
        }
        if (readyOthers) {
          readyOthers(false);
        }
      } else {
        setstartDateValid("");
        updateCvSetter(!updateCv);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, experience]);

  function handleTitle(e) {
    const { value } = e.target;

    const updatedExperience = { ...experience };
    updatedExperience.title = value;
    setExperience(updatedExperience);
    localStorage.setItem(`title${id}`, value);

    if (value.replace(/\s/g, "").length < 2) {
      setTitleValid("თანამდებობა ძალზე მოკლეა");
      if (ready) {
        ready(false);
      }
      if (readyOthers) {
        readyOthers(false);
      }
    } else {
      setTitleValid("");
      updateCvSetter(!updateCv);
    }

    return true;
  }

  function handleEmployer(e) {
    const { value } = e.target;

    const updatedExperience = { ...experience };
    updatedExperience.employer = value;
    setExperience(updatedExperience);
    localStorage.setItem(`employer${id}`, value);
    if (
      value.replace(/\s/g, "").length < 2 ||
      !/^[A-Za-z0-9 ა-ჰ]*$/.test(value)
    ) {
      setEmployerValid(
        "დამსაქმებელი ძალზე მოკლეა, ან არასწორ სიმბოლოებს იყენებ"
      );
      if (ready) {
        ready(false);
      }
      if (readyOthers) {
        readyOthers(false);
      }
    } else {
      setEmployerValid("");
      updateCvSetter(!updateCv);
    }
    return true;
  }

  function handleDates(param) {
    const updatedExperience = { ...experience };
    updatedExperience[`${param}Date`] = document.getElementById(
      `${param}Date${id}`
    ).value;
    setExperience(updatedExperience);
    localStorage.setItem(
      `${param}Date${id}`,
      `${document.getElementById(`${param}Date${id}`).value}`
    );

    if (String(document.getElementById(`${param}Date${id}`).value) < 2) {
      if (param === "start") {
        setstartDateValid("თარიღი აუცილებელია");
        if (ready) {
          ready(false);
        }
        if (readyOthers) {
          readyOthers(false);
        }
      } else {
        setendDateValid("თარიღი აუცილებელია");
        if (ready) {
          ready(false);
        }
        if (readyOthers) {
          readyOthers(false);
        }
      }
    } else {
      if (param === "start") {
        setstartDateValid("");
        updateCvSetter(!updateCv);
      } else {
        setendDateValid("");
        updateCvSetter(!updateCv);
      }
    }
    return true;
  }

  function handleDescription(e) {
    const { value } = e.target;

    localStorage.setItem(`description${id}`, value);
    const updatedExperience = { ...experience };
    updatedExperience.description = value;
    setExperience(updatedExperience);

    if (value.replace(/\s/g, "").length < 2) {
      setDescriptionValid("გამოცდილება ძალზე მოკლეა");
      if (ready) {
        ready(false);
      }
      if (readyOthers) {
        readyOthers(false);
      }
    } else {
      setDescriptionValid("");
      updateCvSetter(!updateCv);
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
          value={experience.title || localStorage.getItem(`title${id}`) || ""}
          type="text"
          onChange={handleTitle}
          style={{
            ...(titleValid ? { borderColor: "red" } : null),
            ...(titleValid === "" &&
            experience.title !== "" &&
            localStorage.getItem(`title${id}`) !== ""
              ? { borderColor: "#98E37E" }
              : null),
          }}
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
          value={
            experience.employer || localStorage.getItem(`employer${id}`) || ""
          }
          type="text"
          onChange={handleEmployer}
          style={{
            ...(employerValid ? { borderColor: "red" } : null),
            ...(employerValid === "" &&
            experience.employer !== "" &&
            localStorage.getItem(`employer${id}`) !== ""
              ? { borderColor: "#98E37E" }
              : null),
          }}
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
      <div className={styles.startDateSection}>
        <p style={startDateValid ? { color: "red" } : null}>დაწყების რიცხვი</p>
        <input
          id={`startDate${id}`}
          className={styles.inputDate}
          value={
            experience.startDate || localStorage.getItem(`startDate${id}`) || ""
          }
          type="date"
          onChange={() => {
            handleDates("start");
          }}
          onClick={() => {
            document.getElementById(`startDate${id}`).showPicker();
          }}
          style={{
            ...(startDateValid ? { borderColor: "red" } : null),
            ...(startDateValid === "" &&
            experience.startDate !== "" &&
            localStorage.getItem(`startDate${id}`) !== ""
              ? { borderColor: "#98E37E" }
              : null),
          }}
        />

        {startDateValid === "" && experience.startDate !== "" ? (
          <img src={valid} className={styles.checkMark} alt="validated icon" />
        ) : null}

        {startDateValid !== "" && (
          <img
            src={invalid}
            className={styles.checkMark}
            alt="validated icon"
          />
        )}
      </div>
      <div className={styles.endDateSection}>
        <p style={endDateValid ? { color: "red" } : null}>დამთავრების რიცხვი</p>
        <input
          id={`endDate${id}`}
          className={styles.inputDate}
          value={
            experience.endDate || localStorage.getItem(`endDate${id}`) || ""
          }
          type="date"
          onChange={() => {
            handleDates("end");
          }}
          onClick={() => {
            document.getElementById(`endDate${id}`).showPicker();
          }}
          style={{
            ...(endDateValid ? { borderColor: "red" } : null),
            ...(endDateValid === "" &&
            experience.endDate !== "" &&
            localStorage.getItem(`endDate${id}`) !== ""
              ? { borderColor: "#98E37E" }
              : null),
          }}
        />

        {endDateValid === "" && experience.endDate !== "" ? (
          <img
            src={valid}
            className={styles.checkMarkEnd}
            alt="validated icon"
          />
        ) : null}

        {endDateValid !== "" && (
          <img
            src={invalid}
            className={styles.checkMarkEnd}
            alt="validated icon"
          />
        )}
      </div>
      <div className={styles.descriptionWrapper}>
        <p className={styles.descriptionLabel}>აღწერა</p>
        <textarea
          className={styles.textArea}
          placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
          value={
            localStorage.getItem(`description${id}`) ||
            experience.description ||
            ""
          }
          onChange={handleDescription}
          style={{
            ...(descriptionValid ? { borderColor: "red" } : null),
            ...(descriptionValid === "" &&
            experience.description !== "" &&
            localStorage.getItem(`description${id}`) !== ""
              ? { borderColor: "#98E37E" }
              : null),
          }}
        />
      </div>
      <img src={divider} className={styles.divider} alt="divider" />
    </div>
  );
}

export default Experience;

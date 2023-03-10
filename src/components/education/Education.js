/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import getDegrees from "../../http/getDegrees";
import styles from "./Education.module.css";
import valid from "../../images/valid.png";
import invalid from "../../images/invalid.png";
import divider from "../../images/divider.png";
import dropDown from "../../images/dropDown.png";

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

  const [open, setOpen] = useState(false);

  useEffect(() => {
    getDegrees().then((returned) => {
      setDataAPI(returned);
    });
  }, [id]);

  useEffect(() => {
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
      } else {
        ready(true);
        updateCvSetter(!updateCv);
      }
    }

    if (localStorage.getItem(`institute${id}`)) {
      if (
        localStorage.getItem(`institute${id}`).replace(/\s/g, "").length < 2
      ) {
        setInstituteValid("???????????????????????????????????? ??????????????? ??????????????????");
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
      if (
        localStorage.getItem(`eduDescription${id}`).replace(/\s/g, "").length <
        2
      ) {
        setDescriptionEduValid("?????????????????? ??????????????? ??????????????????");
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
      if (
        localStorage.getItem(`graduation${id}`).replace(/\s/g, "").length < 2
      ) {
        setGraduationValid("????????????????????????????????? ?????????????????? ?????????????????????????????????");
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
    const { value } = e.target;

    const updatedExperience = { ...experience };
    updatedExperience.institute = value;
    setExperience(updatedExperience);
    localStorage.setItem(`institute${id}`, value);
    if (value.replace(/\s/g, "").length < 2) {
      setInstituteValid("???????????????????????????????????? ??????????????? ??????????????????");
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

    if (
      String(
        document.getElementById(`graduation${id}`).value.replace(/\s/g, "")
          .length
      ) < 2
    ) {
      setGraduationValid("????????????????????????????????? ?????????????????? ?????????????????????????????????");
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

  //option's helper function
  const toggleDropdown = () => {
    setOpen(!open);
  };
  //option's helper function
  const handleDropdown = (idDegree, title) => {
    setOpen(false);
    handleDegree(idDegree, title);
  };
  //option's main handler
  function handleDegree(idDegree, title) {
    const updatedExperience = { ...experience };
    updatedExperience.degree = title;
    setExperience(updatedExperience);
    localStorage.setItem(`degree${id}`, title);

    localStorage.setItem(`idDegree${id}`, idDegree);

    if (title.replace(/\s/g, "").length < 2) {
      setDegreeValid("invalid");
    } else {
      setDegreeValid("");
    }
    return true;
  }

  function handleDescription(e) {
    const { value } = e.target;
    localStorage.setItem(`eduDescription${id}`, value);

    const updatedExperience = { ...experience };
    updatedExperience.descriptionEdu = value;
    setExperience(updatedExperience);

    if (value.replace(/\s/g, "").length < 2) {
      setDescriptionEduValid("????????????????????????????????? ??????????????? ??????????????????");
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
        <p style={instituteValid ? { color: "red" } : null}>????????????????????????????????????</p>

        <input
          className={styles.inputItemLong}
          placeholder="????????????????????????????????????"
          value={
            experience.institute || localStorage.getItem(`institute${id}`) || ""
          }
          type="text"
          onChange={handleInstitute}
          style={{
            ...(instituteValid ? { borderColor: "red" } : null),
            ...(instituteValid === "" &&
            experience.institute !== "" &&
            localStorage.getItem(`institute${id}`) !== ""
              ? { borderColor: "#98E37E" }
              : null),
          }}
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
          {instituteValid || "????????????????????? 2 ?????????????????????"}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "row", gap: "54px" }}>
        <div className={styles.graduationDateSection}>
          <p style={degreeValid ? { color: "red" } : null}>?????????????????????</p>

          <div
            className={styles.customSelect}
            onClick={toggleDropdown}
            style={{
              ...(degreeValid ? { borderColor: "red" } : null),
              ...(degreeValid === "" &&
              experience.degree !== "" &&
              localStorage.getItem(`degree${id}`) !== ""
                ? { borderColor: "#98E37E" }
                : null),
            }}
          >
            <div className={styles.selectedOption}>
              {experience.degree ||
                localStorage.getItem(`degree${id}`) ||
                "????????????????????? ?????????????????????"}
              <img src={dropDown} alt="dropdown" className={styles.dropDown} />
            </div>
            {open && (
              <div className={styles.optionsContainer}>
                {dataAPI.map((each) => {
                  return (
                    <div
                      key={each.id}
                      className={styles.option}
                      onClick={() => {
                        handleDropdown(each.id, each.title);
                      }}
                    >
                      {each.title}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

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
            ????????????????????????????????? ??????????????????
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
            style={{
              ...(graduationValid ? { borderColor: "red" } : null),
              ...(graduationValid === "" &&
              experience.graduation !== "" &&
              localStorage.getItem(`graduation${id}`) !== ""
                ? { borderColor: "#98E37E" }
                : null),
            }}
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
        <p className={styles.descriptionLabel}>??????????????????</p>
        <textarea
          className={styles.textArea}
          placeholder="?????????????????????????????? ??????????????????"
          value={
            localStorage.getItem(`eduDescription${id}`) ||
            experience.descriptionEdu ||
            ""
          }
          onChange={handleDescription}
          style={{
            ...(descriptionEduValid ? { borderColor: "red" } : null),
            ...(descriptionEduValid === "" &&
            experience.descriptionEdu !== "" &&
            localStorage.getItem(`eduDescription${id}`) !== ""
              ? { borderColor: "#98E37E" }
              : null),
          }}
        />
      </div>
      <img src={divider} className={styles.divider} alt="divider" />
    </div>
  );
}

export default Education;

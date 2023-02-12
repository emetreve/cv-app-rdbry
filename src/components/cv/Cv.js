import { useEffect, useState } from "react";
import styles from "./Cv.module.css";
import email from "../../images/email.png";
import phone from "../../images/phone.png";
import divider from "../../images/divider.png";
import logoFoot from "../../images/logoFoot.png";

function Cv({ hidePersonal, hideExperience, update, hideEducation }) {
  const [expData, setExpData] = useState([]);
  const [eduData, setEduData] = useState([]);

  //handling experience data
  useEffect(() => {
    let titles = [];
    let employers = [];
    let startDates = [];
    let endDates = [];
    let descriptions = [];
    Object.entries(localStorage).forEach(([key, value]) => {
      if (key.startsWith("title")) {
        titles.push([Number(key.slice(5)), value]);
      }
      if (key.startsWith("employer")) {
        employers.push([Number(key.slice(8)), value]);
      }
      if (key.startsWith("startDate")) {
        startDates.push([Number(key.slice(9)), value]);
      }
      if (key.startsWith("endDate")) {
        endDates.push([Number(key.slice(7)), value]);
      }
      if (key.startsWith("description")) {
        descriptions.push([Number(key.slice(11)), value]);
      }
    });

    const data = [titles, employers, startDates, endDates, descriptions];

    const exp = data.reduce((acc, curr) => {
      curr.forEach(([id, value]) => {
        acc[id] = acc[id] || {};
        acc[id][
          curr === titles
            ? "title"
            : curr === employers
            ? "employer"
            : curr === startDates
            ? "startDate"
            : curr === endDates
            ? "endDate"
            : "description"
        ] = value;
      });
      return acc;
    }, []);

    const result = Object.values(exp).map((person) => {
      return [
        person.title,
        person.employer,
        person.startDate,
        person.endDate,
        person.description,
      ];
    });

    setExpData(result);
  }, [update]);

  //handling education data
  useEffect(() => {
    let institutes = [];
    let degrees = [];
    let graduations = [];
    let eduDescriptions = [];

    Object.entries(localStorage).forEach(([key, value]) => {
      if (key.startsWith("institute")) {
        institutes.push([Number(key.slice(9)), value]);
      }
      if (key.startsWith("degree")) {
        degrees.push([Number(key.slice(6)), value]);
      }
      if (key.startsWith("graduation")) {
        graduations.push([Number(key.slice(10)), value]);
      }
      if (key.startsWith("eduDescription")) {
        eduDescriptions.push([Number(key.slice(14)), value]);
      }
    });

    const dataEdu = [institutes, degrees, graduations, eduDescriptions];

    const expEdu = dataEdu.reduce((acc, curr) => {
      curr.forEach(([id, value]) => {
        acc[id] = acc[id] || {};
        acc[id][
          curr === institutes
            ? "institute"
            : curr === degrees
            ? "degree"
            : curr === graduations
            ? "graduation"
            : "eduDescription"
        ] = value;
      });
      return acc;
    }, []);

    const resultEdu = Object.values(expEdu).map((person) => {
      return [
        person.institute,
        person.degree,
        person.graduation,
        person.eduDescription,
      ];
    });

    setEduData(resultEdu);
  }, [update]);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "900px",
      }}
    >
      {true ? (
        <div style={{ maxWidth: "600px" }}>
          <div
            style={{
              display: "inline-block",
              marginTop: "70px",
              marginLeft: "80px",
              lineBreak: "anywhere",
            }}
          >
            {localStorage.getItem("name") && (
              <p className={styles.name}>{`${localStorage
                .getItem("name")
                .toLocaleUpperCase()} `}</p>
            )}

            {localStorage.getItem("surname") &&
              !localStorage.getItem("name") && (
                <p className={styles.surname}>{`${localStorage
                  .getItem("surname")
                  .toLocaleUpperCase()} `}</p>
              )}
            {localStorage.getItem("surname") &&
              localStorage.getItem("name") && (
                <p className={styles.surname}>{`${localStorage
                  .getItem("surname")
                  .toLocaleUpperCase()} `}</p>
              )}
          </div>

          {localStorage.getItem("email") && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "20px",
              }}
            >
              <img src={email} className={styles.emailIcon} alt="email icon" />
              <p className={styles.email}>{`${localStorage.getItem(
                "email"
              )} `}</p>
            </div>
          )}
          {localStorage.getItem("phone") && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "20px",
              }}
            >
              <img src={phone} className={styles.phoneIcon} alt="phone icon" />
              <p className={styles.phone}>{`${localStorage.getItem(
                "phone"
              )} `}</p>
            </div>
          )}
          {localStorage.getItem("about") && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
                width: "600px",
              }}
            >
              <h2 className={styles.aboutTitle}>ᲩᲔᲛ ᲨᲔᲡᲐᲮᲔᲑ</h2>
              <p className={styles.about}>{`${localStorage
                .getItem("about")
                .toLocaleLowerCase()} `}</p>
            </div>
          )}

          {localStorage.getItem("picture")?.length > 1 && (
            <img
              src={localStorage.getItem("picture")}
              className={styles.image}
              alt="profile avatar "
            />
          )}
          <img
            style={{
              ...(hidePersonal ? { display: "none" } : null),
              ...(!localStorage.getItem("about") && { marginTop: "120px" }),
            }}
            src={divider}
            className={styles.divider}
            alt="divider"
          />

          <div className={styles.experienceWrapper}>
            {expData.length > 0 ? (
              <h2 className={styles.aboutTitle}>ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ</h2>
            ) : null}
            {expData &&
              expData.map((each, i) => {
                return (
                  <div key={i} style={{ width: "860px" }}>
                    <div
                      style={{
                        display: "inline-block",
                        lineBreak: "anywhere",
                        // display: "flex",
                        // flexDirection: "row",
                        marginTop: "20px",
                        marginLeft: "85px",
                      }}
                    >
                      <b>
                        <span className={styles.title}>
                          {each[0] && each[0].concat(", ")} &nbsp;{each[1]}
                        </span>
                      </b>
                    </div>
                    <p className={styles.dates}>
                      {each[2] && each[2].concat(" - ")} {each[3]}
                    </p>
                    <p className={styles.description}>{each[4]}</p>
                  </div>
                );
              })}
            {expData.length > 0 && (
              <img src={divider} className={styles.expDivider} alt="divider" />
            )}
          </div>

          <div className={styles.experienceWrapper}>
            {eduData.length > 0 ? (
              <h2 className={styles.aboutTitle} style={{ marginTop: "40px" }}>
                ᲒᲐᲜᲐᲗᲚᲔᲑᲐ
              </h2>
            ) : null}
            {eduData &&
              eduData.map((eachEdu, i) => {
                return (
                  <div key={i} style={{ width: "860px" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginLeft: "85px",
                        marginTop: "30px",
                      }}
                    >
                      <b>
                        <p className={styles.title}>
                          {eachEdu[0] && eachEdu[0].concat(", ")}
                        </p>
                      </b>
                      <b>
                        <p className={styles.employer}>&nbsp;{eachEdu[1]}</p>
                      </b>
                    </div>
                    <p className={styles.dates}>{eachEdu[2]}</p>
                    <p className={styles.description}>{eachEdu[3]}</p>
                  </div>
                );
              })}
          </div>
        </div>
      ) : null}
      <img src={logoFoot} className={styles.footLogo} alt="foot logo" />
    </div>
  );
}
export default Cv;

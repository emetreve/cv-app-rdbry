import { useEffect, useState } from "react";
import styles from "./Cv.module.css";
// import logoFoot from "../../images/logoFoot.png";
import email from "../../images/email.png";
import phone from "../../images/phone.png";

function Cv({ hidePersonal, update }) {
  const [expData, setExpData] = useState([]);
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

    console.log(result);
  }, [update]);

  return (
    <>
      {!hidePersonal ? (
        <div style={{}}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {localStorage.getItem("name") && (
              <p className={styles.name}>{`${localStorage
                .getItem("name")
                .toLocaleUpperCase()} `}</p>
            )}

            {localStorage.getItem("surname") &&
              !localStorage.getItem("name") && (
                <p
                  className={styles.surname}
                  style={{ marginLeft: "84px" }}
                >{`${localStorage.getItem("surname").toLocaleUpperCase()} `}</p>
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

          <div className={styles.experienceWrapper}>{console.log(expData)}</div>
        </div>
      ) : null}
    </>
  );
}
export default Cv;

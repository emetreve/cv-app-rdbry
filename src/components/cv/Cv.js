import styles from "./Cv.module.css";
// import logoFoot from "../../images/logoFoot.png";
import email from "../../images/email.png";
import phone from "../../images/phone.png";

function Cv({ hidePersonal }) {
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

          <div className={styles.experienceWrapper}>experience</div>
        </div>
      ) : null}
    </>
  );
}
export default Cv;

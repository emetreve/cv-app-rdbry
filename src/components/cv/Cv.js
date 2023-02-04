import styles from "./Cv.module.css";
import logoFoot from "../../images/logoFoot.png";
import email from "../../images/email.png";
import phone from "../../images/phone.png";

function Cv({ hidePersonal }) {
  return (
    <>
      {!hidePersonal ? (
        <>
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
            <>
              <img src={email} className={styles.emailIcon} alt="email icon" />
              <p className={styles.email}>{`${localStorage.getItem(
                "email"
              )} `}</p>
            </>
          )}
          {localStorage.getItem("phone") && (
            <>
              <img src={phone} className={styles.phoneIcon} alt="phone icon" />
              <p className={styles.phone}>{`${localStorage.getItem(
                "phone"
              )} `}</p>
            </>
          )}
          {localStorage.getItem("about") && (
            <>
              <h2 className={styles.aboutTitle}>ᲩᲔᲛ ᲨᲔᲡᲐᲮᲔᲑ</h2>
              <p className={styles.about}>{`${localStorage
                .getItem("about")
                .toLocaleLowerCase()} `}</p>
            </>
          )}

          {localStorage.getItem("picture")?.length > 1 && (
            <img
              src={localStorage.getItem("picture")}
              className={styles.image}
              alt="profile avatar "
            />
          )}

          <img src={logoFoot} className={styles.footLogo} alt="foot logo" />
        </>
      ) : null}
    </>
  );
}
export default Cv;

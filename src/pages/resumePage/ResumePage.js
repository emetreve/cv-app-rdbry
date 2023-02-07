import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import styles from "./ResumePage.module.css";
import closeBanner from "../../images/closeBanner.png";
import email from "../../images/email.png";
import phone from "../../images/phone.png";
import divider from "../../images/divider.png";
import logoFoot from "../../images/logoFoot.png";
import back from "../../images/backDark.png";

function ResumePage() {
  const { serverData, serverErrors } = useContext(AppContext);
  const [hide, setHide] = useState(false);
  const base = "https://resume.redberryinternship.ge";
  const navigate = useNavigate();

  return (
    <>
      <img
        src={back}
        className={styles.back}
        alt="back"
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      />
      {serverData.id && (
        <>
          <div className={styles.wrapper}>
            {!hide && (
              <div className={styles.banner}>
                <p>რეზიუმე წარმატებით გაიგზავნა 🎉</p>
                <img
                  src={closeBanner}
                  alt="close "
                  className={styles.close}
                  onClick={() => {
                    console.log("clicked");
                    setHide(true);
                  }}
                />
              </div>
            )}

            <div
              style={{
                position: "relative",
                minHeight: "900px",
                paddingTop: "60px",
              }}
            >
              <div
                style={{
                  border: "0.5px solid #000000",
                  width: "930px",
                  minHeight: "1100px",
                  position: "relative",
                  paddingBottom: "120px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <p className={styles.name}>
                    {serverData.name.toLocaleUpperCase()}
                  </p>

                  <p className={styles.surname}>
                    {serverData.surname.toLocaleUpperCase()}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "20px",
                  }}
                >
                  <img
                    src={email}
                    className={styles.emailIcon}
                    alt="email icon"
                  />
                  <p className={styles.email}>{serverData.email}</p>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "20px",
                  }}
                >
                  <img
                    src={phone}
                    className={styles.phoneIcon}
                    alt="phone icon"
                  />
                  <p className={styles.phone}>{serverData.phone_number}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "20px",
                    width: "600px",
                  }}
                >
                  <h2 className={styles.aboutTitle}>ᲩᲔᲛ ᲨᲔᲡᲐᲮᲔᲑ</h2>
                  <p className={styles.about}>
                    {serverData.about_me.toLocaleLowerCase()}
                  </p>
                </div>

                <img
                  src={`${base}${serverData.image}`}
                  className={styles.image}
                  alt="profile avatar "
                />
                <img src={divider} className={styles.divider} alt="divider" />

                <div className={styles.experienceWrapper}>
                  <h2 className={styles.aboutTitle}>ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ</h2>
                  {serverData.experiences.map((each, i) => {
                    return (
                      <div key={i} style={{ width: "860px" }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: "30px",
                          }}
                        >
                          <b>
                            <p className={styles.title}>
                              {each.position.concat(", ")}
                            </p>
                          </b>
                          <b>
                            <p className={styles.employer}>
                              &nbsp;{each.employer}
                            </p>
                          </b>
                        </div>
                        <p className={styles.dates}>
                          {each.start_date.concat(" - ")} {each.due_date}
                        </p>
                        <p className={styles.description}>{each.description}</p>
                      </div>
                    );
                  })}
                  <img
                    src={divider}
                    className={styles.expDivider}
                    alt="divider"
                  />
                </div>

                <div className={styles.experienceWrapper}>
                  <h2
                    className={styles.aboutTitle}
                    style={{ marginTop: "40px" }}
                  >
                    ᲒᲐᲜᲐᲗᲚᲔᲑᲐ
                  </h2>
                  {serverData.educations.map((eachEdu, i) => {
                    return (
                      <div key={i} style={{ width: "860px" }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: "30px",
                          }}
                        >
                          <b>
                            <p className={styles.title}>
                              {eachEdu.degree.concat(", ")}
                            </p>
                          </b>
                          <b>
                            <p className={styles.employer}>
                              &nbsp;{eachEdu.institute}
                            </p>
                          </b>
                        </div>
                        <p className={styles.dates}>{eachEdu.due_date}</p>
                        <p className={styles.description}>
                          {eachEdu.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <img
                  src={logoFoot}
                  className={styles.footLogo}
                  alt="foot logo"
                />
              </div>
            </div>
          </div>
        </>
      )}

      {serverErrors.message && <h1>ERRORRR</h1>}
    </>
  );
}
export default ResumePage;

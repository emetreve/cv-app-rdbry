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
import invalid from "../../images/invalid.png";

function ResumePage() {
  const { serverData, serverErrors, setServerData, setServerErrors } =
    useContext(AppContext);
  const [hide, setHide] = useState(false);
  const base = "https://resume.redberryinternship.ge";
  const navigate = useNavigate();

  function undoFormatNumber(number) {
    let array = number.split("");
    array.splice(4, 0, " ");
    array.splice(8, 0, " ");
    array.splice(11, 0, " ");
    array.splice(14, 0, " ");
    return array.join("");
  }

  return (
    <>
      <img
        src={back}
        className={styles.back}
        alt="back"
        onClick={() => {
          localStorage.clear();
          navigate("/");
          window.location.reload();
        }}
      />
      {serverData.id && (
        <>
          {localStorage.clear()}
          <div className={styles.wrapper}>
            {!hide && (
              <div className={styles.banner}>
                <p>რეზიუმე წარმატებით გაიგზავნა 🎉</p>
                <img
                  src={closeBanner}
                  alt="close "
                  className={styles.close}
                  onClick={() => {
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
                <div
                  style={{
                    display: "inline-block",
                    lineBreak: "anywhere",
                    marginTop: "70px",
                    marginLeft: "85px",
                    maxWidth: "480px",
                  }}
                >
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
                  <p className={styles.phone}>
                    {undoFormatNumber(serverData.phone_number)}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "20px",
                    width: "600px",
                  }}
                >
                  {
                    <h2
                      style={
                        !serverData.about_me
                          ? { color: "white", userSelect: "none" }
                          : null
                      }
                      className={styles.aboutTitle}
                    >
                      ᲩᲔᲛ ᲨᲔᲡᲐᲮᲔᲑ
                    </h2>
                  }
                  <p className={styles.about}>
                    {serverData.about_me &&
                      serverData.about_me.toLocaleLowerCase()}
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
                              {each.position.concat(", ")} &nbsp;{each.employer}
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
                              {eachEdu.degree.concat(", ")}&nbsp;
                              {eachEdu.institute}
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

      {/* This following section isn't supposed to be rendered at all, because
      all the validation errors are already handled when the user is filling the form.
      However, I've still put this section here, just in case something unexpected 
      goes wrong and the server throws any error. In which case, any error will 
      be shown to the user, or you, the tester */}
      {serverErrors.message && (
        <div className={styles.warning}>
          <img src={invalid} alt="warning" className={styles.invalid} />
          <h5>თქვენმა მონაცემებმა ვალიდაცია ვერ გაიარა</h5>
          <h5>გთხოვთ უკან დაბრუნდით და გადაამოწმეთ შეყვანილი ინფორმაცია</h5>
          <div className={styles.errorBox}>
            {Object.entries(serverErrors.response.data.errors).map(
              (each, i) => {
                return <p key={i}>{each[1]}</p>;
              }
            )}
          </div>
          <button
            className={styles.goBack}
            onClick={() => {
              setServerErrors([]);
              setServerData([]);
              navigate("/personal");
            }}
          >
            უკან
          </button>
        </div>
      )}
    </>
  );
}
export default ResumePage;

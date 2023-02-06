import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Education from "../../components/education/Education";
import styles from "./EducationPage.module.css";

import back from "../../images/back.png";
import line from "../../images/line.png";
import Cv from "../../components/cv/Cv";

function EducationPage() {
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [childReady, setChildReady] = useState(false);
  const [readyOthers, setReadyOthers] = useState(true);

  const [updateCv, setUpdateCv] = useState(false);

  if (!localStorage.getItem("eduCount")) {
    localStorage.setItem("eduCount", 1);
  }
  console.log(updateCv);
  useEffect(() => {}, [count, readyOthers]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.row}>
          <div className={styles.leftColumn}>
            <img
              src={back}
              onClick={() => navigate("/experience")}
              className={styles.goBack}
              alt="go back"
            />
            <p className={styles.title}>ᲒᲐᲜᲐᲗᲚᲔᲑᲐ</p>
            <p className={styles.pageCount}>3/3</p>
            <img src={line} className={styles.divider} alt="divider" />
            <div className={styles.educationComponentWrapper}>
              {console.log(888, Number(localStorage.getItem("eduCount")))}
              {Array.from(
                { length: Number(localStorage.getItem("eduCount")) || count },
                (_, i) => {
                  if (i === 0) {
                    return (
                      <Education
                        ready={setChildReady}
                        key={i}
                        value={i}
                        id={i + 1}
                        updateCvSetter={setUpdateCv}
                        updateCv={updateCv}
                      />
                    );
                  } else {
                    return (
                      <Education
                        readyOthers={setReadyOthers}
                        key={i}
                        value={i}
                        id={i + 1}
                        updateCvSetter={setUpdateCv}
                        updateCv={updateCv}
                      />
                    );
                  }
                }
              )}
            </div>

            <button
              className={styles.addButton}
              onClick={() => {
                const current = Number(localStorage.getItem("eduCount"));
                localStorage.setItem("eduCount", current + 1);
                setCount((prev) => prev + 1);
              }}
            >
              სხვა სასწავლებლის დამატება
            </button>

            <button
              onClick={() => {
                navigate("/experience");
                window.scrollTo(0, 0);
              }}
              className={styles.backBtn}
            >
              ᲣᲙᲐᲜ
            </button>
            <button
              disabled={!childReady || !readyOthers}
              //   onClick={() => {
              //     navigate("/education");
              //     window.scrollTo(0, 0);
              //   }}
              className={styles.nextBtn}
            >
              ᲓᲐᲡᲠᲣᲚᲔᲑᲐ
            </button>
          </div>
          <div className={styles.rightColumn}>
            <Cv hidePersonal={false} update={updateCv} hideEducation={false} />
          </div>
        </div>
      </div>
    </>
  );
}

export default EducationPage;

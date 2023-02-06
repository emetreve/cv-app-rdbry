import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

  //handling experience
  let titles = [];
  let employers = [];
  let startDates = [];
  let endDates = [];
  let descriptions = [];
  Object.entries(localStorage).forEach(([key, value]) => {
    if (key.startsWith("title") && value !== "") {
      titles.push([Number(key.slice(5)), value]);
    }
    if (key.startsWith("employer") && value !== "") {
      employers.push([Number(key.slice(8)), value]);
    }
    if (key.startsWith("startDate") && value !== "") {
      startDates.push([Number(key.slice(9)), value]);
    }
    if (key.startsWith("endDate") && value !== "") {
      endDates.push([Number(key.slice(7)), value]);
    }
    if (key.startsWith("description") && value !== "") {
      descriptions.push([Number(key.slice(11)), value]);
    }
  });

  const data = [titles, employers, startDates, endDates, descriptions];

  const exp = data.reduce((acc, curr) => {
    curr.forEach(([id, value]) => {
      acc[id] = acc[id] || {};
      acc[id][
        curr === titles
          ? "position"
          : curr === employers
          ? "employer"
          : curr === startDates
          ? "start_date"
          : curr === endDates
          ? "due_date"
          : "description"
      ] = value;
    });
    return acc;
  }, []);

  //handling education
  let institutes = [];
  let degrees = [];
  let graduations = [];
  let eduDescriptions = [];

  Object.entries(localStorage).forEach(([key, value]) => {
    if (key.startsWith("institute") && value !== "") {
      institutes.push([Number(key.slice(9)), value]);
    }
    if (key.startsWith("idDegree") && value !== "") {
      degrees.push([Number(key.slice(8)), value]);
    }
    if (key.startsWith("graduation") && value !== "") {
      graduations.push([Number(key.slice(10)), value]);
    }
    if (key.startsWith("eduDescription") && value !== "") {
      eduDescriptions.push([Number(key.slice(14)), value]);
    }
  });

  const dataEdu = [institutes, degrees, graduations, eduDescriptions];

  const edu = dataEdu.reduce((acc, curr) => {
    curr.forEach(([id, value]) => {
      acc[id] = acc[id] || {};
      acc[id][
        curr === institutes
          ? "institute"
          : curr === degrees
          ? "degree_id"
          : curr === graduations
          ? "due_date"
          : "description"
      ] = value;
    });
    return acc;
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    function dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    }

    var file = dataURLtoFile(localStorage.getItem("picture"));

    let data = {
      name: localStorage.getItem("name"),
      surname: localStorage.getItem("surname"),
      email: localStorage.getItem("email"),
      phone_number: localStorage.getItem("phone"),
      experiences: [...Object.values(exp)],
      educations: [...Object.values(edu)],
      image: file,
      about_me: localStorage.getItem("about")
        ? localStorage.getItem("about")
        : "",
    };

    //transform data into FormData() in order to POST it to the server
    let formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          Object.entries(item).forEach(([subKey, subValue]) => {
            formData.append(`${key}[${index}][${subKey}]`, subValue);
          });
        });
      } else {
        formData.append(key, value);
      }
    });

    //request using axios with error handling
    axios
      .post("https://resume.redberryinternship.ge/api/cvs", formData)
      .then((response) => {
        console.log("response: ", response);
      })
      .catch((error) => {
        console.error("There was an error!", error.response.data);
      });
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.row}>
          <div className={styles.leftColumn}>
            <img
              src={back}
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
              className={styles.goBack}
              alt="go back"
            />
            <p className={styles.title}>ᲒᲐᲜᲐᲗᲚᲔᲑᲐ</p>
            <p className={styles.pageCount}>3/3</p>
            <img src={line} className={styles.divider} alt="divider" />
            <div className={styles.educationComponentWrapper}>
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
              onClick={handleSubmit}
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

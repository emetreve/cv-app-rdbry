import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

function ResumePage() {
  const { serverData, serverErrors } = useContext(AppContext);

  const [data, setData] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (serverData.status === 201) {
      setData(serverData.data);
    } else {
      setErrors(serverErrors.response.data.errors);
    }
  }, []);

  return (
    <>
      <div>Resume</div>
      {console.log("data", data)}
      {console.log("errors", errors)}

      {serverData.length > 0 && <div></div>}
    </>
  );
}
export default ResumePage;

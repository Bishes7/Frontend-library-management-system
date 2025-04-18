import React, { useEffect, useRef, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { activateUserApi } from "../../services/authApiConnector";

const VerifyUser = () => {
  const [isPending, setIsPending] = useState(true);

  // Hook to excess sessionid and token
  const [searchParams] = useSearchParams();
  const [response, setResponse] = useState({});
  const navigate = useNavigate();

  // useRef to evoid rendering twice
  const shouldFetchRef = useRef(true);

  const sessionid = searchParams.get("sessionid");
  const t = searchParams.get("t");

  // using useEffect to render the page twice
  useEffect(() => {
    // call api

    if (sessionid && t && shouldFetchRef.current) {
      (async () => {
        const result = await activateUserApi({ sessionid, t });

        setResponse(result);
        setIsPending(false);
      })();
      shouldFetchRef.current = false;
    }

    response.status === "success" && navigate("/login");
  }, [sessionid, t, response.status, navigate]);

  return (
    <div className="py-5">
      {isPending && (
        <div style={{ width: "100%" }}>
          <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="info" />
          </div>

          <div className="text-center"> Please wait...</div>
        </div>
      )}

      {response?.message && (
        <Alert
          variant={response.status === "success" ? "success" : "danger"}
          className="text-center"
        >
          {response.message}
        </Alert>
      )}
    </div>
  );
};

export default VerifyUser;

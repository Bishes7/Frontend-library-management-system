import React, { useState } from "react";
import { Spinner } from "react-bootstrap";

const VerifyUser = () => {
  const [isPending, setIsPending] = useState(true);

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
    </div>
  );
};

export default VerifyUser;

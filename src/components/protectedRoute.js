import { getAuth } from "firebase/auth";
import React, { Fragment } from "react";
import { Navigate, Route } from "react-router-dom";

function ProtectedRoute({ element, ...rest }) {
    const auth = getAuth(); // Replace with your authentication context or logic

    return (
        <Fragment>
            <Route
                {...rest}
                element={auth.user ? element : <Navigate to="/login" />}
            />
        </Fragment>
    );
}

export default ProtectedRoute;

import React, { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
    const [count, setCount] = useState(5);
    let navitgate = useNavigate()

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        }, 1000);
        count === 0 && navitgate("/");
        return () => clearInterval(interval);
    }, [count, navitgate]);

    return (
        <div className="container fs-4 text-muted mt-5 fst-italic text-center">
            <p>Redirecting you in {count} seconds</p>
        </div>
    );
};

export default LoadingToRedirect;

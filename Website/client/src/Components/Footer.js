import React from "react";
import { AppConstants } from "../Constants/CommonConstants";

const Footer = () => (
    <footer className="page-footer mt-4 pt-2 bg-light">
        <div className="footer-copyright text-center py-3">
        &copy; 2022 Copyright:
            <span className="fw-bold"> {AppConstants.APP_NAME}</span>
        </div>
    </footer>
);

export default Footer;

import React from 'react';
import { AppConstants } from '../../../Constants/CommonConstants';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="text-center py-3">
      &copy; 2022 Copyright:
      <span className="fw-bold"> {AppConstants.APP_NAME}</span>
    </div>
  </footer>
);

export default Footer;

import React from 'react';
import { AppConstants } from '../../../Constants/CommonConstants';
import './Footer.css';

const Footer = () => (
  <footer style={{ position: 'fixed', bottom: '0', left: '0', right: '0' }}>
    <div className="footer text-center py-3">
      &copy; 2022 Copyright:
      <span className="fw-bold"> {AppConstants.APP_NAME}</span>
    </div>
  </footer>
);

export default Footer;

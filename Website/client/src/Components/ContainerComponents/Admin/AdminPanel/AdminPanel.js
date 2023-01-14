import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { NavbarConstants } from '../../../../Constants/CommonConstants';
import './AdminPanel.css';

const AdminPanel = () => {
  return (
    <Container>
      <h4 className="text-center enhanced-div">Admin Panel</h4>
      <div className="d-flex justify-content-center align-items-center flex-wrap">
        <Link
          to="/admin/create-or-update-vehicle"
          className="admin-panel-item btn btn-primary"
        >
          {NavbarConstants.CREATE_VEHICLE}
        </Link>

        <Link
          to="/admin/create-or-update-category"
          className="admin-panel-item btn btn-primary"
        >
          {NavbarConstants.CREATE_CATEGORY}
        </Link>

        <Link to="/admin/user-list" className="admin-panel-item btn btn-info">
          List of All Users
        </Link>

        <Link
          to="/admin/booking-list"
          className="admin-panel-item btn btn-info"
        >
          {NavbarConstants.BOOKING_LIST}
        </Link>

        <Link
          to="/admin/successful-booking-list"
          className="admin-panel-item btn btn-success"
        >
          Successful Booking History
        </Link>

        <Link
          to="/admin/cancled-booking-list"
          className="admin-panel-item btn btn-danger"
        >
          Canceled Booking History
        </Link>
      </div>
    </Container>
  );
};

export default AdminPanel;

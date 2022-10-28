import { React, Component, useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AppConstants, ColorConstants } from '../../Constants/CommonConstants';
import { getAllVehicleList } from '../../Services/VehicleDataService';
import HomeItem from '../Item/HomeItem/HomeItem';

const HomeContainer = () => {
  const [allItems, setAllItems] = useState([]);

  const loadAllVehicles = () => {
    getAllVehicleList().then((response) => {
      setAllItems(response.data.data);
    });
  }

  useEffect(() => {
    loadAllVehicles();
  }, []);

  return (
    <Container fluid>
      <div className="d-flex flex-wrap">
        {allItems.map((item) => (
          !item.isTrashed && ( <HomeItem item={item} loadAllVehicles={loadAllVehicles}></HomeItem> )
        ))}
      </div>
    </Container>
  );
};

export default HomeContainer;

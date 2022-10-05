import { React, Component, useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { AppConstants, ColorConstants } from "../../Constants/CommonConstants";
import { getAllVehicleList } from "../../Services/VehicleDataService";
import HomeItem from "../Item/HomeItem";

const HomeContainer = () => {

    const [allItems, setAllItems] = useState([]);

    useEffect(() => {
        getAllVehicleList().then((response) => {
            setAllItems(response.data.data);
        });
    }, []);

    return (
        <Container fluid style={{ backgroundColor: ColorConstants.HOMEPAGE_BACKGROUND_COLOR }}>
            <div className="d-flex flex-wrap"> {
                allItems.map(item => ( <HomeItem item={item}></HomeItem> ))
            }
            </div>
        </Container>
    )

}

export default HomeContainer;

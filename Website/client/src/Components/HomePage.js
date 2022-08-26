import { React, Component, useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { AppConstants } from "../Constants/CommonConstants";
import { getAllVehicleList } from "../Services/VehicleDataService";
import Item from "./Item";

const HomePage = () => {

    const [allItems, setAllItems] = useState([]);

    useEffect(() => {
        getAllVehicleList().then((response)=>{
            setAllItems(response.data.data);
        });
    });

    return (
        <>
            <Row>
            {
                allItems.map(item=>(
                    <Col sm={23} md={6} lg={4} xl={3}>
                        <Item item={item}></Item>
                    </Col>
                    )
                    
                )
            }
            </Row>
        </>
    )

}

export default HomePage;

import React from 'react';
import { Container } from 'react-bootstrap';
import './About.css';

const AboutUs = () => {
  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center justify-content-center mt-auto p-5"
    >
      <h2 className="text-primary" style={{ marginBottom: '30px' }}>
        About GetVehicle
      </h2>

      <p className="style-paragraph">
        Welcome to GetVehicle, your one-stop destination for renting vehicles
        for personal use. Our platform offers a wide variety of vehicles, from
        cars and motorcycles to RVs and boats, to meet your individual needs and
        preferences.{' '}
      </p>

      <p className="style-paragraph">
        Our mission is to provide an easy and seamless rental experience,
        allowing you to focus on the excitement and joy of driving and
        exploring. Whether you're planning a weekend getaway, a road trip with
        friends, or simply need a reliable vehicle to get around town,
        GetVehicle has got you covered.
      </p>

      <p className="style-paragraph">
        We take pride in our commitment to exceptional customer service,
        providing you with the highest level of support throughout the entire
        rental process. Our team of experienced professionals is available 24/7
        to assist you with any questions or concerns you may have.{' '}
      </p>

      <p className="style-paragraph">
        At GetVehicle, we prioritize safety and reliability above all else. We
        thoroughly inspect and maintain all of our vehicles to ensure they meet
        the highest standards of quality and safety. Plus, our transparent
        pricing and user-friendly platform make it easy to find and book the
        perfect vehicle for your needs.{' '}
      </p>

      <p className="style-paragraph">
        Thank you for choosing GetVehicle as your trusted partner in vehicle
        rental. We look forward to helping you find your next adventure on the
        road.
      </p>
    </Container>
  );
};

export default AboutUs;

import { React, Component, useState, useEffect } from 'react';
import { Container, Row, Col, Form, Dropdown, Button } from 'react-bootstrap';
import { AppConstants, CategoryInfoConstants, ColorConstants, HomePageFilterConstants, NavbarConstants } from '../../../Constants/CommonConstants';
import { getAllVehicleList } from '../../../Services/VehicleDataService';
import './HomeContainer.css'
import HomeItem from '../../Item/HomeItem/HomeItem';
import { getAllCategories } from '../../../Services/CategoryDataService';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

const HomeContainer = () => {
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const loadAllVehicles = () => {
    getAllVehicleList().then((response) => {
      setAllItems(response.data.data);
      setFilteredItems(response.data.data);
    });
  }

  const loadAllCategories = () => {
    getAllCategories().then((response) => {
      setCategories(response.data.data);
    });
  }

  const resetFilters = (e) => {
    document.getElementById("search").value = "";
    document.getElementById("category-filter").selectedIndex = 0;
    setSearchedItems();
  }

  const setSearchedItems = (e) => {
    let searchField = document.getElementById("search").value;
    let isSearchFilterApplied = searchField !== "";
    let categoryFilterField = document.getElementById("category-filter").value;
    let isCategoryFilterApplied = categoryFilterField !== CategoryInfoConstants.ALL_CATEGORIES;
    let filteredItems = allItems;

    if(isCategoryFilterApplied) {
       filteredItems = filteredItems.filter((item) => {
        return (
            item
            .category
            .name === categoryFilterField
          )
      });
    }

    if(isSearchFilterApplied) {
      filteredItems = filteredItems.filter((item) => {
        return (
          item
          .model
          .toLowerCase()
          .includes(searchField.toLowerCase())
        )
      });
    }

    setFilteredItems(filteredItems);
  }

  useEffect(() => {
    loadAllVehicles();
    loadAllCategories();
  }, []);

  return (
    <Container fluid>
      <div className="filters-div">
        <div className='filters-lable'>Filters: </div>
        <Form.Group className="category-filter-form-group">
          <Form.Select id="category-filter" size='sm' className="category-filter" onChange={setSearchedItems}>
            <option value={CategoryInfoConstants.ALL_CATEGORIES}>{CategoryInfoConstants.ALL_CATEGORIES}</option>
            {categories.map((category) => (<option value={category.name}>{category.name}</option>))}
          </Form.Select>
        </Form.Group>
        <Form.Control onChange={setSearchedItems} id="search" className="search-input" size="sm" type="search" placeholder={NavbarConstants.SEARCH} aria-label="Search"/>
        <Button className="reset-filters-button" variant="light" size="sm" onClick={resetFilters}>Reset Filters</Button>
      </div>
      <div className="d-flex flex-wrap">
        {filteredItems.map((item) => (
          !item.isTrashed && ( <HomeItem item={item} loadAllVehicles={loadAllVehicles}></HomeItem> )
        ))}
      </div>
    </Container>
  );
};

export default HomeContainer;

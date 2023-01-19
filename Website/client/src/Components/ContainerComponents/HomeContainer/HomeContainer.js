import { React, useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { CategoryInfoConstants, FilterConstants, NavbarConstants, RatingFilterOptionsConstant } from '../../../Constants/CommonConstants';
import { getAllCategories } from '../../../Services/CategoryDataService';
import { getAllVehicleList } from '../../../Services/VehicleDataService';
import HomeItem from '../../Item/HomeItem/HomeItem';
import { FcClearFilters, FcFilledFilter } from 'react-icons/fc';
import './HomeContainer.css';

const HomeContainer = () => {
  const ratingFilterOptions = RatingFilterOptionsConstant;
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
    document.getElementById("rating-filter").selectedIndex = 0;
    setSearchedItems();
  }

  const getAverageRatingFromItem = (currentItem) => {
    let ratingsArray = currentItem && currentItem?.ratings;
    let totalRating = [];
    let length = ratingsArray.length;
    ratingsArray.map((rat) => totalRating.push(rat.star));
    let totalReduced = totalRating.reduce((p, n) => p + n, 0);
    let heighest = length * 5;
    return (totalReduced * 5) / heighest;
  }

  const setSearchedItems = (e) => {
    let searchFieldValue = document.getElementById("search").value;
    let isSearchFilterApplied = searchFieldValue !== "";
    let categoryFilterFieldValue = document.getElementById("category-filter").value;
    let ratingFilterFieldValue = document.getElementById("rating-filter").value;
    let isCategoryFilterApplied = categoryFilterFieldValue !== CategoryInfoConstants.ALL_CATEGORIES;
    let isRatingFilterApplied = ratingFilterFieldValue !== FilterConstants.ANY_RATING;
    let filteredItems = allItems;

    if(isCategoryFilterApplied) {
       filteredItems = filteredItems.filter((item) => {
        return (
            item
            .category
            .name === categoryFilterFieldValue
          )
      });
    }

    if(isSearchFilterApplied) {
      filteredItems = filteredItems.filter((item) => {
        return (
          item
          .model
          .toLowerCase()
          .includes(searchFieldValue.toLowerCase())
        )
      });
    }

    if(isRatingFilterApplied) {
      filteredItems = filteredItems.filter((item) => {
        return (
          getAverageRatingFromItem(item) >= ratingFilterFieldValue
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
      
        <div className='filters-lable'><FcFilledFilter size={20}/> Filters </div>
        <Form.Group className="filter-form-group">
          <Form.Select id="category-filter" size='sm' style={{color: '#FF8B13'}} className="filter-enhancement" onChange={setSearchedItems}>
            <option value={CategoryInfoConstants.ALL_CATEGORIES}>{CategoryInfoConstants.ALL_CATEGORIES}</option>
            {categories.map((category) => (<option value={category.name}>{category.name}</option>))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="filter-form-group">
          <Form.Select id="rating-filter" size='sm' style={{color: '#FF8B13'}} className="filter-enhancement" onChange={setSearchedItems}>
            <option value={CategoryInfoConstants.ANY_RATING}>{FilterConstants.ANY_RATING}</option>
            {ratingFilterOptions.map((ratingFilterOption) => (<option value={ratingFilterOption.star}>{ratingFilterOption.label}</option>))}
          </Form.Select>
        </Form.Group>
        <Form.Control onChange={setSearchedItems} id="search" className="search-input" size="sm" type="search" placeholder={NavbarConstants.SEARCH} aria-label="Search"/>
        <Button className="reset-filters-button d-flex" variant="outline-danger" size="sm" onClick={resetFilters}><FcClearFilters className='mx-auto' size={17}/></Button>
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

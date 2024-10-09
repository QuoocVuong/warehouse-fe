// src/store/actions.js
import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE
  } from './actionTypes';
  import api from '../services/api';
  
  export const fetchData = () => async dispatch => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    try {
      const response = await api.get('/products'); // Replace with your actual API endpoint
      dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error });
    }
  };
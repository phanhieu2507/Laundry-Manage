/**
 * Services API Service
 * 
 * This file contains all API calls related to laundry services information.
 * TODO: Replace placeholder URLs with actual backend API endpoints
 */

import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

/**
 * Get all available services
 * @returns {Promise} API response with list of services
 */
export const getAllServices = async () => {
  try {
    // TODO: Implement actual API call
    const response = await axios.get(`${API_BASE_URL}/services`);
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

/**
 * Get service details by ID
 * @param {string} serviceId - The service ID
 * @returns {Promise} API response with service details
 */
export const getServiceById = async (serviceId) => {
  try {
    // TODO: Implement actual API call
    const response = await axios.get(`${API_BASE_URL}/services/${serviceId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching service details:', error);
    throw error;
  }
};

/**
 * Get additional services (alterations, shoe cleaning, etc.)
 * @returns {Promise} API response with additional services
 */
export const getAdditionalServices = async () => {
  try {
    // TODO: Implement actual API call
    const response = await axios.get(`${API_BASE_URL}/services/additional`);
    return response.data;
  } catch (error) {
    console.error('Error fetching additional services:', error);
    throw error;
  }
};

/**
 * Get service FAQs
 * @returns {Promise} API response with FAQs
 */
export const getServiceFAQs = async () => {
  try {
    // TODO: Implement actual API call
    const response = await axios.get(`${API_BASE_URL}/services/faqs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    throw error;
  }
};

/**
 * Submit service inquiry
 * @param {Object} inquiryData - Inquiry information
 * @param {string} inquiryData.name - Customer name
 * @param {string} inquiryData.email - Customer email
 * @param {string} inquiryData.phone - Customer phone
 * @param {string} inquiryData.serviceType - Type of service inquiring about
 * @param {string} inquiryData.message - Inquiry message
 * @returns {Promise} API response
 */
export const submitServiceInquiry = async (inquiryData) => {
  try {
    // TODO: Implement actual API call
    const response = await axios.post(`${API_BASE_URL}/services/inquiry`, inquiryData);
    return response.data;
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    throw error;
  }
};

export default {
  getAllServices,
  getServiceById,
  getAdditionalServices,
  getServiceFAQs,
  submitServiceInquiry
};

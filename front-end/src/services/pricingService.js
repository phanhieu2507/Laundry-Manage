/**
 * Pricing API Service
 * 
 * This file contains all API calls related to pricing, plans, and subscriptions.
 * TODO: Replace placeholder URLs with actual backend API endpoints
 */

import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

/**
 * Get all pricing plans
 * @param {string} type - Plan type: 'perBag' or 'subscription'
 * @returns {Promise} API response with pricing plans
 */
export const getPricingPlans = async (type = 'perBag') => {
  try {
    // TODO: Implement actual API call
    const response = await axios.get(`${API_BASE_URL}/pricing/plans`, {
      params: { type }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching pricing plans:', error);
    throw error;
  }
};

/**
 * Get special services pricing
 * @returns {Promise} API response with special services
 */
export const getSpecialServices = async () => {
  try {
    // TODO: Implement actual API call
    const response = await axios.get(`${API_BASE_URL}/pricing/special-services`);
    return response.data;
  } catch (error) {
    console.error('Error fetching special services:', error);
    throw error;
  }
};

/**
 * Calculate total price for a booking
 * @param {Object} params - Calculation parameters
 * @param {string} params.planType - Plan type (basic, premium, vip)
 * @param {number} params.bagCount - Number of bags
 * @param {boolean} params.isSameDay - Whether same-day service is requested
 * @returns {Promise} API response with calculated price
 */
export const calculatePrice = async ({ planType, bagCount, isSameDay }) => {
  try {
    // TODO: Implement actual API call
    const response = await axios.post(`${API_BASE_URL}/pricing/calculate`, {
      planType,
      bagCount,
      isSameDay
    });
    return response.data;
  } catch (error) {
    console.error('Error calculating price:', error);
    throw error;
  }
};

/**
 * Subscribe to a monthly plan
 * @param {Object} subscriptionData - Subscription information
 * @param {string} subscriptionData.planId - Plan ID
 * @param {Object} subscriptionData.paymentMethod - Payment method details
 * @returns {Promise} API response
 */
export const subscribeToMonthlyPlan = async (subscriptionData) => {
  try {
    // TODO: Implement actual API call
    const response = await axios.post(`${API_BASE_URL}/pricing/subscribe`, subscriptionData);
    return response.data;
  } catch (error) {
    console.error('Error subscribing to plan:', error);
    throw error;
  }
};

/**
 * Get user's current subscription
 * @returns {Promise} API response with subscription details
 */
export const getUserSubscription = async () => {
  try {
    // TODO: Implement actual API call
    const response = await axios.get(`${API_BASE_URL}/pricing/subscription`);
    return response.data;
  } catch (error) {
    console.error('Error fetching subscription:', error);
    throw error;
  }
};

/**
 * Cancel subscription
 * @returns {Promise} API response
 */
export const cancelSubscription = async () => {
  try {
    // TODO: Implement actual API call
    const response = await axios.post(`${API_BASE_URL}/pricing/subscription/cancel`);
    return response.data;
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
};

/**
 * Apply promo code
 * @param {string} promoCode - Promo code to apply
 * @param {number} totalAmount - Total amount before discount
 * @returns {Promise} API response with discount details
 */
export const applyPromoCode = async (promoCode, totalAmount) => {
  try {
    // TODO: Implement actual API call
    const response = await axios.post(`${API_BASE_URL}/pricing/promo-code/apply`, {
      promoCode,
      totalAmount
    });
    return response.data;
  } catch (error) {
    console.error('Error applying promo code:', error);
    throw error;
  }
};

export default {
  getPricingPlans,
  getSpecialServices,
  calculatePrice,
  subscribeToMonthlyPlan,
  getUserSubscription,
  cancelSubscription,
  applyPromoCode
};

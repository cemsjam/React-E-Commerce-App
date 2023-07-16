export const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
  // Calculate the discount amount
  const discountAmount = (discountPercentage / 100) * originalPrice;

  // Calculate the discounted price
  const discountedPrice = originalPrice - discountAmount;

  // Return the discounted price
  return discountedPrice.toFixed(2);
};

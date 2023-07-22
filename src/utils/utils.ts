export const calculateDiscountedPrice = (originalPrice: number, discountPercentage: number) => {
  // Calculate the discount amount
  const discountAmount = (discountPercentage / 100) * originalPrice;

  // Calculate the discounted price
  const discountedPrice = originalPrice - discountAmount;

  // Return the discounted price
  return discountedPrice.toFixed(2);
};

export const filterByTitle = (arr: any[], query: string) => {
  const filteredArr = arr.filter((item) => item.title.toLowerCase() === query);
  return filteredArr;
};

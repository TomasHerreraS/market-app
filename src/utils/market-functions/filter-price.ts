const filterPrice = (firstPrice: number, secondPrice: number, productPrice: number): boolean => {
    if (firstPrice === 0 && secondPrice === 0) {
      // "All Prices" case, include all products
      return true;
    }
  
    return productPrice >= firstPrice && productPrice <= secondPrice;
  };
  
  export default filterPrice;
  
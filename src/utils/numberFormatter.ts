export function formatNumber(value: number) {
    if (!value) return '';

    return new Intl.NumberFormat('en-US', {
        // style: 'currency',
        // currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
  }

  // Format input value as currency
  export const formatCurrency = (value: string) => {
      const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
      if (!numericValue) return ''; // Handle empty or invalid inputs
      return Intl.NumberFormat('en-US').format(parseInt(numericValue)); // Format the number
  };

  
// Parse the formatted value (with commas) back into a number before form submission
export const parseFormattedAmount = (formattedAmount: string) => {
    const numericValue = formattedAmount.replace(/,/g, ''); // Remove commas
    return parseFloat(numericValue);
};


export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

 export const formatPrice = (price: string | number): { integerPart: number; decimalPart: number } => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  
    if (isNaN(numericPrice)) {
      return { integerPart: 0, decimalPart: 0 };
    }
  
    const [integerPart, decimalPart] = numericPrice.toFixed(2).split('.');
  
    return { 
      integerPart: parseInt(integerPart, 10), 
      decimalPart: parseInt(decimalPart, 10) 
    };
  };

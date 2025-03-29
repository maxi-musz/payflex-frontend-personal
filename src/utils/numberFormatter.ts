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
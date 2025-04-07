export function formatNumber(value: number) {
  if (!value) return '';

  return new Intl.NumberFormat('en-US', {
    // style: 'currency',
    // currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/** 
 * Format input value(amount) as number
*/
export const parseAmountIntoNumberFormat = (value: string) => {
  const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
  if (!numericValue) return ''; // Handle empty or invalid inputs
  return Intl.NumberFormat('en-US').format(parseInt(numericValue)); // Format the number
};

/**
 * Parse the formatted value (with commas) back into a number(just digits) before form submission
*/ 
export const parseFormattedAmountToNumber = (formattedAmount: string) => {
  const numericValue = formattedAmount.replace(/,/g, ''); // Remove commas
  const updatedNumericValue = numericValue.replace(/₦/g, ''); // Remove ₦
  return parseFloat(updatedNumericValue);
};

/**
 * Format date as: Long(full/word) month day(number), year(number)
*/
export const parseDateIntoMonthDayYear = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Divide a floating number into 2: interger part and floating/decimal part
 * (parsePriceIntoIntegerAndDecimal.integerPart and parsePriceIntoIntegerAndDecimal.decimalPart)
*/ 
export const parsePriceIntoIntegerAndDecimal = (price: string | number): { integerPart: number; decimalPart: number } => {
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

/**
 * Divide an item into an array of the different separated parts of the item
 * The separator could be any character, usually, fullstop, comma, space, slash, etc
*/ 
export const parseItemIntoArray = (item: string, divider: string) => {
  const itemArray = item.split(divider).map(item => item.trim()).filter(item => item !== '');
  return itemArray;
};

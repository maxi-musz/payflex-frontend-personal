
export interface Product {
    id: string;
    title: string;
    description: string;
    category: string;
    price: string;
    discountPercentage: string;
    rating: string;
    stock: string;
    quantity?: number;
    thumbnail: string;
    images: string[];
    dimensions: {
      width: string;
      height: string;
      depth: string;
    };
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    tags: string[];
    sku: string;
    weight: string;
    returnPolicy: string;
    minimumOrderQuantity: string;
    reviews: {
      date: string;
      rating: string;
      comment: string;
      reviewerName: string;
      reviewerEmail: string;
    }[];
    meta: {
      createdAt: string;
      updatedAt: string;
      barcode: string;
      qrCode: string;
    };
  }
  
  export type GeneralDataProps = {
    currentTab: string,
}
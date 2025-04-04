import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

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

export interface UserDataProps {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: {
    country: string;
    state: string;
    city: string;
    home_address: string;
  };
  gender: string;
  date_of_birth: string;
  password: string;
  confirm_password: string;
}

export interface LocalStorateUserDataProps {
  id: string,
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: {
    country: string;
    state: string;
    city: string;
    home_address: string;
  };
  gender: string;
  date_of_birth: string;
  password: string;
  confirm_password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface WalletBalanceInfoProps {
  item: {
    id: number;
    currency: string;
    currencyFlag: string;
    currencyInitials: string;
    balance: string;
  };
}

export interface QuickActionsProps {
  item: {
    id: number;
    icon: OverridableComponent<SvgIconTypeMap<object, "svg">>;
    text: string;
  };
}

export interface DecodedToken {
  userId: string;
  first_name: string;
  last_name: string;
  email: string;
  exp: number; // token expiration time (optional)
  iat: number; // token issued at time (optional)
}

import gql from "graphql-tag";

export const PRODUCTS = gql`
  query products($currency: Currency) {
    products {
      id
      image_url
      title
      price(currency: $currency)
    }
  }
`;

export const USD_PRODUCTS = gql`
  query UsdProducts {
    products {
      id
      image_url
      title
      price(currency: USD)
    }
  }
`;

export const GET_CURRENCIES = gql`
  query GetCurrencies {
    currency
  }
`;

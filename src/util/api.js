import axios from "axios";
import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL } from './config.js';
import gql from 'graphql-tag';

export const URI = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/graphql' : 'https://api-dot-yourdesk.wl.r.appspot.com/graphql';

export const GET_DESKS = gql`
{
    deskMany {
      user {
          name
          user_id
          picture
      }
      _id
      favorite
      hashtags
      use
      img
      date_created
      name
    }
}
`

export const GET_DESK = gql`
query GetDesk($filter: FilterFindOneDeskInput!) {
  deskOne(filter: $filter) {
    _id
    date_created
    img
    name
    favorite
    hashtags
    use
    user {
			name
    }
    desk_products {
      pros
      cons
      coordX
      coordY
			product {
				title
        image
        prices {
          raw
          currency
          value
        }
      }
    }
  }
}
`

export const GET_PRODUCTS = gql`
{
    productMany {
      _id
      link
      title
      prices {
        symbol
        value
      }
      image
    }
  }
`

export const CREATE_PRODUCT_OLD = gql`
mutation CreateProduct($newDeskProducts: CreateOneProductInput!) {
    productCreateOne(record: $newDeskProducts) {
      record {
              brand
        model
      }
      recordId
    }
  }  
`

export const CREATE_DESK_PRODUCTS = gql`
mutation CreateDeskProducts($newDeskProducts: [CreateManyDeskProductInput!]!) {
    deskProductCreateMany(records: $newDeskProducts) {
      recordIds
    }
  }
`

export const CREATE_DESK = gql`
mutation CreateDesk($newDesk: CreateOneDeskInput!) {
    deskCreateOne(record: $newDesk) {
      recordId
    }
  }
`

// --------------- IMAGE ---------------

export function uploadImage(file) {
  var bodyFormData = new FormData();
  bodyFormData.set('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  bodyFormData.append('file', file);

  return axios({
    method: 'post',
    url: CLOUDINARY_UPLOAD_URL,
    data: bodyFormData,
    headers: { 'Content-Type': 'multipart/form-data' }
  });
}

// --------------- PRODUCT ---------------


export function productSearch(search_term) {
  // set up the request parameters
  const params = {
    api_key: process.env.REACT_APP_RAINFOREST_API_KEY,
    type: "search",
    amazon_domain: "amazon.com",
    search_term: search_term
  }

  // make the http GET request to Rainforest API
  return axios.get('https://api.rainforestapi.com/request', { params })
}

export const CREATE_PRODUCT = gql`
mutation CreateProduct($newProduct: CreateOneProductInput!) {
    productCreateOne(record: $newProduct) {
      recordId
    }
  }
`


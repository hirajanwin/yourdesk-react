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
				brand
        model
        img
        price
      }
    }
  }
}
`

export const GET_PRODUCTS = gql`
{
    productMany {
      _id
      category
      brand
      model
      price
      img
    }
  }
`

export const CREATE_PRODUCT = gql`
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

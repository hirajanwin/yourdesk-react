import axios from "axios";
import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL } from './config.js';
import gql from 'graphql-tag';

export const URI = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/graphql' : 'https://api-dot-yourdesk.wl.r.appspot.com/graphql';

// ======================================== DESK ========================================

export const GET_DESKS = gql`
{
    deskMany {
      _id
      date_created
      img
      name
      favorite
      hashtags
      likes
      use
      user {
        user_id
        picture
        name
      }
      desk_products {
        pros
        cons
        coordX
        coordY
        product {
          title
          _id
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

export const GET_DESKS_BY_USER = gql`
query DesksByUser($userId: String!) {
  deskMany(filter: {user: $userId}) {
    _id
    date_created
    img
    name
    hashtags
    likes
    user {
      user_id
      picture
      name
    }
    desk_products {
      _id
    }
  }
}
`

export const GET_DESKS_WITH_PRODUCTS = gql`
query {
  deskMany {
    user {
      name
      user_id
      picture
    }
    desk_products {
      product {
        _id
      }
      pros
      cons
    }
    likes
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
    comments {
      date
      comment
      user {
        user_id
        name
        picture
      }
    }

    hashtags
    likes
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
        _id
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

export const TOGGLE_LIKE_DESK = gql`
mutation deskToggleLike($id: String!, $user: String!) {
	deskToggleLike(id: $id, user: $user) {
    name
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

export const DELETE_DESK = gql`
mutation DeleteDesk($deskId: MongoID!, $deskProductIds: [MongoID]!) {
    deskRemoveOne(filter:{_id:$deskId}) {
      recordId
    }

    deskProductRemoveMany(filter:{_ids: $deskProductIds}) {
      numAffected
    }
  }
`

// ======================================== PRODUCT ========================================


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

export const GET_PRODUCT = gql`
query GetDesk($filter: FilterFindOneProductInput!) {
    productOne(filter:$filter) {
      title
      asin
      link
      _id
      categories {
        name
      }
      image
      rating
      ratings_total
      prices {
        symbol
        value
      }
    }
}
`
// ======================================== DESK PRODUCT ========================================

export const CREATE_DESK_PRODUCTS = gql`
mutation CreateDeskProducts($newDeskProducts: [CreateManyDeskProductInput!]!) {
    deskProductCreateMany(records: $newDeskProducts) {
      recordIds
    }
  }
`


// ======================================== COMMENT ========================================


export const CREATE_COMMENT = gql`
mutation createComment($userId: String!, $deskId: String!, $comment: String!, $date: Date!) {
  commentCreateOne(record: {
    userId: $userId, deskId: $deskId, comment: $comment, date: $date
  }) {
    record {
      comment
    }
  }
}
`


// ======================================== IMAGE ========================================

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

// ======================================== PRODUCT ========================================


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


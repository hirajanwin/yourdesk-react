import { SHOW_DESK_PRODUCT_MODAL, HIDE_DESK_PRODUCT_MODAL, SET_CURRENT_DESK_PRODUCT } from '../actionTypes';

const initialState = {
    show: false,
    currentDeskProduct: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_DESK_PRODUCT_MODAL: {
        return {
            ...state,
            show: true
        }
    }
    case HIDE_DESK_PRODUCT_MODAL: {
        return {
            ...state,
            show: false
        }
    }
    case SET_CURRENT_DESK_PRODUCT: {
        const {deskProduct} = action.payload;
        return {
            ...state,
            currentDeskProduct: deskProduct
        }
    }
    
    default:
      return state;
  }
}



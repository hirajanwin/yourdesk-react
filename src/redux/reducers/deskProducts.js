import { ADD_DESK_PRODUCT, CLEAR_ALL_DESK_PRODUCTS, DELETE_DESK_PRODUCT, ADD_DESK_PRODUCT_PROPERTIES, TOGGLE_SELECTED_DESK_PRODUCT, TOGGLE_DESELECT_ALL_DESK_PRODUCTS, SET_ALL_DESK_PRODUCTS } from "../actionTypes";

const initialState = {
  allIds: [],
  byIds: {}
};

export default function(state = initialState, action) {
  switch (action.type) {

    case ADD_DESK_PRODUCT: {
      const { id, deskProduct, saved } = action.payload;
      let newState = {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            deskProduct,
            selected: true,
            saved: saved
          }
        }
      };
      return newState;
    }

    case CLEAR_ALL_DESK_PRODUCTS: {
      return {
          allIds: [],
          byIds: {}
        };
    }

    case ADD_DESK_PRODUCT_PROPERTIES: {
      const { deskProduct } = action.payload;
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [deskProduct.id]: {
            deskProduct: {
              ...state.byIds[deskProduct.id].deskProduct,
              product: deskProduct.product,
              productId: deskProduct.productId
            },
            saved: true,
          }
        }
      }
    }

    case DELETE_DESK_PRODUCT: {
      const { deskProduct } = action.payload;
      state.allIds = state.allIds.filter(x => x !== deskProduct.id);
      delete state.byIds[deskProduct.id];
      return {
        ...state
      };
    }

    case TOGGLE_SELECTED_DESK_PRODUCT: {
      const { deskProduct, selected } = action.payload;
      let otherProduct = state.byIds[deskProduct.id];
      otherProduct.selected = selected;
      return {
        ...state
      };
    }

    case TOGGLE_DESELECT_ALL_DESK_PRODUCTS: {
      for (let i = 0; i < state.allIds.length; i++) {
        let otherProduct = state.byIds[state.allIds[i]];
        otherProduct.selected = false;
      }
      return {
        ...state
      };
    }

    case SET_ALL_DESK_PRODUCTS: {
      let { deskProducts } = action.payload;
      return deskProducts;
    }

    default:
      return state;
  }
}

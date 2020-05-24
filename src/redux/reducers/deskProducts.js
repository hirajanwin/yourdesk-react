import { ADD_DESK_PRODUCT, CLEAR_ALL_DESK_PRODUCTS, DELETE_DESK_PRODUCT, ADD_DESK_PRODUCT_PROPERTIES, TOGGLE_SELECTED_DESK_PRODUCT, TOGGLE_DESELECT_ALL_DESK_PRODUCTS, SET_ALL_DESK_PRODUCTS } from "../actionTypes";

const initialState = {
  allIds: [],
  byIds: {}
};

function coordsMatch(a, b) {
  return a.coords.x === b.coords.x && a.coords.y === b.coords.y
}

export default function(state = initialState, action) {
  switch (action.type) {

    case ADD_DESK_PRODUCT: {
      const { id, deskProduct, saved } = action.payload;
      return {
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
      for (let i = 0; i < state.allIds.length; i++) {
        let otherProduct = state.byIds[state.allIds[i]].deskProduct;
        if (coordsMatch(deskProduct, otherProduct)) {
          let matchingId = state.allIds[i];
          state.allIds.splice(i, 1);
          delete state.byIds[matchingId];
          const newByIds = state.byIds;
          delete newByIds[matchingId];
          return {
            ...state,
            byIds: newByIds
          };
        }
      }
      break;
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

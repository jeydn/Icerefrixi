import createReducer from "./createReducer";
import * as types from "../actions/types";

export const boxes = createReducer([], {

    [types.ADD_ITEM](state, action) {
      return [...state, {
          boxes: [
            ...state,
            {
              "Id" : action.Id,
              "Name" : action.Name,
              "Temp" : action.Temp,
              "Openings": action.Openings,
              "Archived": action.Archived,
              "LastUpdated": new Date().getTime() //actual timestamp
            }
          ]
        }
      ]
    },

    [types.ARCHIVE_ITEM](state, action) {
      return state.map((box) => {
            if (box.Id === action.boxId) {
              return Object.assign({}, box, {
                Archived: true //Set archived to true
              })
            }
            return box
          })
    }

});

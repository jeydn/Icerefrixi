import createReducer from "./createReducer";
import * as types from "../actions/types";

export const boxes = createReducer([], {

    [types.ADD_ITEM](state, action) {
      return [...state,
            {
              "Id" : action.item.Id,
              "Name" : action.item.Name,
              "UUID" : action.item.UUID,
              "Description" : action.item.Description,
              "Temp" : action.item.Temp,
              "Openings": action.item.Openings,
              "Archived": action.item.Archived,
              "LastUpdated": new Date().getTime() //actual timestamp
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
    },

    [types.ADD_TEMP](state, action) {
      return state.map((box) => {
            if (box.Id === action.boxId) {
              return Object.assign({}, box, {
                "Temp": [...box.Temp, action.data],
                "LastUpdated": new Date().getTime() //actual timestamp
              })
            }
            return box
          })
    },

    [types.DELETE_ALL_ITEMS](state, action) {
      return Object.assign({}, {})
    }

});

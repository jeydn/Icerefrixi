import createReducer from "./createReducer";
import * as types from "../actions/types";
/*
const initialState = {
  "boxes": [
    {
      "Name" : null,
      "Temp" : [],
      "Openings": 0,
      "Archived": false,
      "LastUpdated": null
    }
  ]
}

const boxes = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
    return Object.assign({}, state, {
      boxes: [
        ...state.boxes,
        {
          "Name" : action.Name,
          "Temp" : action.Temp,
          "Openings": action.Openings,
          "Archived": action.Archived,
          "LastUpdated": new Date().getTime() //actual timestamp
        }
      ]
    })

    case GET_ITEM:
    return Object.assign({}, state, {
      boxes: state.boxes.map((box, boxId) => {
        if (box.Name === boxId) {
          return Object.assign({}, box, {})
        }
        return box
      })
    })

    case ARCHIVE_ITEM:
    return Object.assign({}, state, {
      boxes: state.boxes.map((box, boxId) => {
        if (box.Name === boxId) {
          return Object.assign({}, box, {
            Archived: true //Set archived to true
          })
        }
        return box
      })
    })

    default:
      return state
  }
}

*/
export const boxes = createReducer([], {

    [types.ADD_ITEM](state, action) {
      return [...state, {
          boxes: [
            ...state.boxes,
            {
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

    [types.GET_ITEM](state, action) {
      return [...state, {
          boxes: state.boxes.map((box, boxId) => {
            if (box.Name === boxId) {
              return Object.assign({}, box, {})
            }
            return box
          })
        }
      ]
    },

    [types.ARCHIVE_ITEM](state, action) {
      return [...state, {
          boxes: state.boxes.map((box, boxId) => {
            if (box.Name === boxId) {
              return Object.assign({}, box, {
                Archived: true //Set archived to true
              })
            }
            return box
          })
        }
      ]
    }

});

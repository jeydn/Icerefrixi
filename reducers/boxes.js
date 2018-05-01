import * as types from "../actions/types";

const initialState = {
  "Boxes": [
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
      Boxes: [
        ...state.Boxes,
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
      Boxes: state.Boxes.map((box, boxId) => {
        if (box.Name === boxId) {
          return Object.assign({}, box, {})
        }
        return box
      })
    })

    case ARCHIVE_ITEM:
    return Object.assign({}, state, {
      Boxes: state.Boxes.map((box, boxId) => {
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

export default boxes

import * as types from './types';

export function addItem(item){
  return {
    type: types.ADD_ITEM,
    item
  }
}


export function archiveItem(boxId){
  return {
    type: types.ARCHIVE_ITEM,
    boxId
  }
}

export function addTemp(boxId, data){
  return {
    type: types.ADD_TEMP,
    boxId,
    data
  }
}

export function deleteAllItems(){
  return {
    type: types.DELETE_ALL_ITEMS
  }
}

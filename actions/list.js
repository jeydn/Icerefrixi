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

export function deleteAllItems(){
  return {
    type: types.DELETE_ALL_ITEMS
  }
}

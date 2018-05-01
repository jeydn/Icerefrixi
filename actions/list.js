import * as types from './types';

export function addItem(item){
  return {
    type: types.ADD_ITEM,
    item
  }
}

export function getItem(boxId){
  return {
    type: types.GET_ITEM,
    boxId
  }
}

export function archiveItem(index){
  return {
    type: types.ARCHIVE_ITEM,
    index
  }
}

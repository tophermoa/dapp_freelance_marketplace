import type from 'core/types'
import {INCREMENT} from 'core/constants'

export function ambilData(newValue){
  return{
    type: type.GET_DATA,
    //baru: {newValue}
    newValue
  }
}

export const increment = (newValue) => ({
  type: INCREMENT,
  //newValue: 12
  // baru: {
    // mama: newValue,
    // momo: newValue,
    // mimi: newValue
  //   judul: newValue,
  //   deskripsi: newValue,
  //   estimasi: newValue,
  //   budget: newValue,
  //   kategori: newValue,
  //   level: newValue,
  //   owner: newValue
  // }
  //newValue
  baru: {newValue}

});



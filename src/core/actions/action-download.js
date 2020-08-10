import type from 'core/types'
import {INCREMENT} from 'core/constants'

export function ambilDataDownload(newValue){
  return{
    type: type.DOWNLOAD,
    //baru: {newValue}
    newValue
  }
}

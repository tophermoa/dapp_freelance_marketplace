import { combineReducers } from 'redux'
import { providerReducer } from 'core/reducers/reducer-provider'
import uiReducer           from 'core/reducers/reducer-ui'
import getData from 'core/reducers/reducer-dataproject'
import getDownloadData from 'core/reducers/reducer-download'

const rootReducer = combineReducers({
  provider: providerReducer,
  ui: uiReducer,
  ngegetData: getData,
  ngegetDataDownload: getDownloadData
})

export default rootReducer

import type from 'core/types';
import {INCREMENT} from 'core/constants'

const initialState = {
	// count: 5,
	// count2: 8
	// selected:{
		// mama: '',
		// momo: '',
		// mimi: ''
	// 	judul: "",
 //    	deskripsi: "",
 //    	estimasi: "",
	// 	budget: "",
	// 	kategori: "",
	// 	level: "",
	// 	owner: ""
	// }
	//selected: []
	selected:''
}

// function getDownloadData(state = initialState, action){
// 	//console.log(action)
// 	switch (action.type){
// 		case type.GET_DATA:
// 			 return{
				//state={...state}
				//...state,
				//count: state.count + action.newValue 
				//selected: action.newValue
				//state.selected.push(action.baru);
			 //}
		// case 'GET_DATAO':
		// 	return {
		// 		...state,
		// 		value: 'hanya testing'
		// 		//selected: action.dataDiGet
		// 	}
// 		default:
// 			return state;
// 	}
// }

function getDownloadData(state = initialState, action){
	if(action.type === type.DOWNLOAD){
		return action.newValue
	}
	return state;
}

export default getDownloadData;
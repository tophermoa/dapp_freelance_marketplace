import type from 'core/types';
import {INCREMENT} from 'core/constants'

const initialState = {
	// count: 5,
	// count2: 8
	// selectedData:{
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
	//selectedData: []
	selectedData: {}
}

// function getData(state = initialState, action){
// 	//console.log(action)
// 	switch (action.type){
// 		case type.GET_DATA:
// 			 return{
				//state={...state}
				//...state,
				//count: state.count + action.newValue 
				//selectedData: action.newValue
				//state.selectedData.push(action.baru);
			 //}
		// case 'GET_DATAO':
		// 	return {
		// 		...state,
		// 		value: 'hanya testing'
		// 		//selectedData: action.dataDiGet
		// 	}
// 		default:
// 			return state;
// 	}
// }

function getData(state = initialState, action){
	if(action.type === type.GET_DATA){
		return action.newValue
	}
	return state;
}

export default getData;
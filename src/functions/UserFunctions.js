import axios from 'axios';
import swal from 'sweetalert';

export const register = newUser =>{
	var that = this;
	return axios
		.post('/users/register', {
			firstName: newUser.firstName,
			lastName: newUser.lastName,
			email: newUser.email,
			password: newUser.password
		})
		.then((res) => {
			if(res.data.error){
				swal({
					title: "Email harus terisi!",
					icon: "error"
				})
				console.log("ada eror coy (email harus keisi)")
			} else if(res.data.errorjuga){
				swal({
					title: "Email sudah terpakai!",
					icon: "warning"
				})
				console.log("email sudah terpakai")
			} else if(res.data.status){
				swal({
					title: "Berhasil Registrasi!",
					icon: "success"
				})
				console.log("waw berhasil regis coy")
			}
			// console.log(res.data)
			// console.log(res.data.error)
			// console.log(res.data.errorjuga)
			// console.log(res.data.status)
		})
		.catch((err)=>{
			//err.response
			console.log(err.response)
			// if(err.response){
			// 	console.log("ada yang error")
			// } else if(!err.response){
			// 	console.log("gada eror")
			// }
			
		})
		

};


export const login = user =>{
	return axios
	.post('users/login', {
		email: user.email,
		password: user.password
	})
	.then(res => {
		//this.props.history.push('/cariproject')
		console.log(res.data)		//{error: "User belum mengisi"}
		console.log(res.data.error)		//User belum mengisi
		localStorage.setItem('usertoken', res.data)
		return res.data
	})
	.catch(err => {
		swal({
			title: "Ada Eror",
			icon: "error"
		})
		console.log(err)
	})
};


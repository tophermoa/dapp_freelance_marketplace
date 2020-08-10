import axios from 'axios';
import jwt from 'jwt-decode';

var token = localStorage.getItem('usertoken');

//Post project
export const projects = (buat) => {
	return axios.post('/projectsec/project', {
		judul: buat.judul,
		deskripsi: buat.deskripsi,
		estimasi: buat.estimasi,
		budget: buat.budget,
		kategori: buat.kategori,
		level: buat.level
	}, {
		headers: {'authorizationt': token}
	})
	.then(res =>{
		console.log("ini token dari post project = " + token)
		console.log("berhasil buat project")
	})
}

//Tampil semua project All
export const getProjects = () => {
	return axios.get('/projectsec/project', {
		headers : {'authorizationt': token, 'Content-Type': 'application/json'}
	})
	.then(res=>{
		return res.data
		console.log("berhasil get projectnya")
	})
}

//Menambahkan Komentar
export const commentss = (initext, projectId) =>{
	return axios.put('projectsec/comment',{
		initext: initext,
		projectId: projectId
	},{
		headers : {'authorizationt': token, "Content-Type": "application/json"}
	},{
		body: JSON.stringify({
			projectId,
			initext
		})
	})
	.then(result=>{
		console.log(result)
		console.log(token)
		console.log(initext)
		console.log(projectId)
		// const newData = data.map(item=>{
  //           if(item._id==result._id){
  //               return result
  //           }else{
  //               return item
  //           }
  //       })
	})
	.catch(err=>{
              console.log(err)
          })
		
	
}

//Menambahkan penawaran id + address
export const penawardb = (idtawar, owner, projectId) =>{
	return axios.put('projectsec/comment',{
		idtawar: idtawar,
		owner: owner,
		projectId: projectId
	},{
		headers : {'authorizationt': token, "Content-Type": "application/json"}
	},{
		body: JSON.stringify({
			idtawar,
			owner,
			projectId
		})
	})
	.then(result=>{
		console.log(result)
		console.log(token)
		console.log(initext)
		console.log(projectId)
	})
	.catch(err=>{
              console.log(err)
          })
}

//Tampil semua Komentar
export const getCommentss=()=>{
	return axios.get('projectsec/comment',{
		headers: {'authorizationt': token, 'Content-Type': 'application/json'}
	})
	.then(res=>{
		return res.data
		console.log('INI res.data (projectfunction) = ' + res.data)
		console.log("token pada getCommentss = " + token)
	})
}

//tampil project saya (myproject)
export const myProject = () => {
	return axios.get('/projectsec/myproject', {
		headers : {'authorizationt': token, 'Content-Type': 'application/json'}
	})
	.then(res=>{
		return res.data
		console.log("berhasil get myproject")
	})
}
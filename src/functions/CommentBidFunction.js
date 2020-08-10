import axios from 'axios';
import jwt from 'jwt-decode';
//const express = require('express');

process.env.SECRET_KEY = 'secret';

var secretKey = process.env.SECRET_KEY;

var token = localStorage.getItem('usertoken');
export const comments = komentar =>{
	//var tokenPost = localStorage.getItem('usertoken');
	return axios.post('',{
		userComment: komentar.userComment
	}, {
		headers: {'authorizationt': token}
	})
	.then(res =>{
		
		console.log("ini token dari post= " + token);
		console.log("Berhasil menambahkan komentar (commentbidfunction")
	})
}

export const getComments = () => {
	//var tokenGet = localStorage.getItem('usertoken');
	return axios.get('', {
		// headers: {'Content-Type': 'application/'}
		headers : {'authorizationt': token, 'Content-Type': 'application/json'}
	})
	.then(res=>{
		return res.data
		console.log('INI res.data (commentbidfunction) = ' + res.data)
		console.log("token pada getComments = " + token)
	})
}

const Movie=require('../models/movie')
const Game=require('../models/game')
const Webseries=require('../models/web-series')
const express = require('express');

exports.dashboard=async(req,res)=>{

    try {
        console.log(req.user.googleId);
        const games=await Game.find().limit(5).lean()
        const movies=await Movie.find().limit(5).lean()
        const webseries=await Webseries.find().limit(5).lean()
        res.render('home',{
            name: req.user.displayName,
            photo: req.user.image,
            title:"Dashboard",
            movies:movies,
            games:games,
            webseries:webseries
            
        })
        // res.status(200).json({
        //     message:"Success",
        //     games, 
        //     movies,
        //     webseries
        // })
        // res.render('login')
        
    } catch (error) {
        res.status(500).send(error)
    }
   
}
// exports.home=async (req,res) => {
    
//     try{
        
//     }
//     catch(err){
//         console.error(err)
//         // res.render('/500')
//     }
// }

exports.login=(req,res) => {
    res.render('login',{
        layout:'login',
        title:"Login",
        style:"style.css"
    })
}

exports.landingPage=(req,res) => {

    res.render('landing',{title:"Welcome",
style:"landingpage.css"})
}


exports.profilePage= async (req,res) => {
var movies = [];
     fav = req.user.favMovie;
    for (var i = 0; i < fav.length; i++) {
        var item =await Movie.findById({_id:fav[i]}).lean()
        movies.push(item)
    }
    res.render('profile-page',{
        title:"Profile",
        name: req.user.displayName,
        photo: req.user.image,
        time: req.user.createdAt,
        movies: movies
    })
}

exports.favRemove=async (req,res)=>{

    console.log("Inside favRemove");

    //Removal OF MOvie
    const id=req.query.id
    const user=req.user
    const movie=await Movie.findById(id)
    console.log(movie);
    await user.removeFav(id)

    var movies = [];
     fav = req.user.favMovie;
     console.log(fav)
    for (var i = 0; i < fav.length; i++) {
        var item =await Movie.findById({_id:fav[i]}).lean()
        console.log(item)
        movies.push(item)
    }

   
    res.render('profile-page',{
        title:"Profile",
        name: req.user.displayName,
        photo: req.user.image,
        time: req.user.createdAt,
        movies: movies
    })
}

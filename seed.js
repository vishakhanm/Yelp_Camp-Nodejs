const mongoose = require("mongoose"),
    Campground = require("./modules/campgrounds"),
    Comment = require("./modules/comment");

var data = [
    {
        name: "lake view",
        image:"https://i.pinimg.com/564x/8b/a7/a0/8ba7a05ef4703b4b1c1cd89d7508e2d3.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "high light",
        image:"https://i.pinimg.com/564x/90/d0/2c/90d02c98a867c9753008cb278eb3081a.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "the jungle ",
        image:"https://i.pinimg.com/236x/b1/ae/89/b1ae89779c7caaaa0dd7c012f8a7fed6.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
]

function seedDb(){
    //remove all campgrounds
    Campground.remove({}, (err)=>{
        if(err){
            console.log(err);
        }})
//         console.log("Campground removed!!");
//         //add campgrounds
//         data.forEach((seed) => {
//             Campground.create(seed, (err, created)=>{
//                 if(err){
//                     console.log(err);
//                 } else{
//                     console.log("Campground created!!");
//                     //create comment
//                     Comment.create(
//                         {
//                             text: "It is a beautiful place",
//                             author: "Max"
//                         }, (err, comment)=>{
//                             if(err){
//                                 console.log(err);
//                             } else{
//                                 created.comments.push(comment);
//                                 created.save();
//                                 console.log("Created comment");
//                             }
//                         }
//                     )
//                 }
//             })
//         });
//     })
}


module.exports = seedDb;
const {book,
    sequelize,
    author
} = require('../models');
const _ = require('lodash');

var books = [
    // {title: 'Gone with the wind', genre: 'Comedy', authorId: 1},
    // {title: 'Animal Farm', genre: 'Politics', authorId: 2},
    // {title: '1984', genre: 'Economy', authorId: 3},
    // {title: 'Game of thrones', genre: 'Science', authorId: 2},
    // {title: 'Mars and life', genre: 'Sci-fi', authorId: 4},
    // {title: 'Tom & Jerry', genre: 'Cartoon', authorId: 1},
    // {title: 'Coffee lake', genre: 'Sci-fi', authorId: 3},
    {title: 'Hero Of time', genre: 'Sci-fi', authorId: 4},
    {title: 'Color of magic', genre: 'Fantasy', authorId: 2},
    {title: 'The light and dark', genre: 'Drama', authorId: 1},
    {title: 'The fantastic age', genre: 'Politics', authorId: 3}



];

var authors = [
    {name: "Refork Stalon", age: 43, id: 1},
    {name: "Silverster Buing", age: 33, id: 2},
    {name: "Baki San", age: 23, id: 3},
    {name: "Riche Mac", age: 13, id: 4}
];

function syncDB () {
   return new Promise((resolve, reject) => {
       sequelize.sync({force: true})
           .then(() => {
               console.log("Database synchronized ");
               resolve();
           });


    })
}

async function init_author () {


        console.log("================= begin Authors===============");

        _.forEach(authors, (ele) => {
                   author.build({
                        name: ele.name,
                        age: ele.age,
                        id: ele.id
                    }).save();


                });
        console.log("================= end Authors===============");


}

async function init_book () {

        console.log("=================Initing the book==================");

        _.forEach(books, (ele) => {
            book.build({
                title: ele.title,
                genre: ele.genre,
                authorId: ele.authorId
            }).save()

        });
        console.log("=================Finish the book==================");



}
function close_conn() {
    return new Promise((resolve, reject) => {
        console.log("Now");
        //sequelize.close();
        resolve();
        //sequelize.close();


    })
}

async function init_db() {
    console.log("Before");
     await syncDB();
     await init_author();
    await init_book();
    await close_conn();
    console.log("After");




}
//init_db();
init_book();

const express = require('express');



const app = express();


const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true

    })
);



// _.forEach(books, (ele) => {
//    let building_book = book.build({
//        title: ele.name,
//        genre: ele.genre
//    });
//    building_book.save().then((saved) => {
//        console.log("Saved");
//    })
//
// });
// book1.save().then((book) => {
//     console.log("Created",book);
// });

// Without filter
// book.findOne().then(function (book) {
//     console.log("queried", book);
//
// });

// WIth filter
// book.findOne({where: { id: 12}}).then(function (book) {
//      console.log("queried", book['dataValues']);
//      sequelize.close();
//
// });
// book.findById(id= 13).then(function (book) {
//     console.log("queried id ", book['dataValues']);
//     sequelize.close();
//
// });
// Find all tasks
// book.findAll().then((tasks) => {
//    console.log(tasks);
// });


// delete book


app.get('/', (req, res) => {
   res.send({
       data: {
           message: "Hello world!"
       }
   })
});

app.listen(3000, () => {
    console.log("Listening on port 3000")
});
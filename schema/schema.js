const graphql = require('graphql');
const _ = require('lodash');
const {
    book,
    author
} = require('../models');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull


} = graphql;


function getAuthorById(id) {
    return author.findById(id)
        .then((author) => {
            if(author) {

                return author['dataValues'];

            }
            return {}
        })
}
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID},
        title: { type: GraphQLString},
        genre: { type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                return getAuthorById(parent.authorId);

            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString, required: true},
        age: { type: GraphQLInt, required: true},
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args) {

                return book.findAll({
                    where: {
                        authorId: parent.id
                    }
                })
                    .then( (books) => {
                        let res_arr =[];
                        if(books) {
                            _.forEach(books, (book) => {
                                res_arr.push(book['dataValues'])
                            });
                            return res_arr
                        }
                        return {}
                    })

            }
        },

    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parent, args) {
                // code here
                let id = parseInt(args.id);

                return book.findById(id).then( (book) => {

                    if(book) {
                        console.log(book['dataValues']);
                        return book['dataValues'];

                    }
                    return {}



                })
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parent, args) {
                // code here
                return getAuthorById(args.id);
            }
        },
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args) {
                return book.findAll()
                    .then( (books) => {
                        let res_arr =[];
                        if(books) {
                            _.forEach(books, (book) => {
                                res_arr.push(book['dataValues'])
                            });
                            return res_arr
                        }
                        return {}
                    })
            }
        },
        authors: {
            type: GraphQLList(AuthorType),
            resolve(parent, args) {
                return author.findAll()
                    .then( (authors) => {
                        let res_arr =[];
                        if(authors) {
                            _.forEach(authors, (author) => {
                                res_arr.push(author['dataValues'])
                            });
                            return res_arr
                        }
                        return {}
                    })
            }
        }

    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString), required: true},
                age: { type: new GraphQLNonNull(GraphQLInt), required: true}
            },
            resolve(parent, args) {
               
                return author.create(
                    {
                        name: args.name,
                        age: args.age
                    }

                )
                .then((item) => {
                    console.log(item);
                    return item;
                })
                .catch((err) => {
                    console.log(`Error ${err}`);
                })

                
            }
        },
        addBook: {
            type: BookType,
            args: {
                title: {type: GraphQLString, required: true},
                genre: {type: GraphQLString},
                authorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                return book.create({
                    title: args.title,
                    genre: args.genre,
                    authorId: args.authorId
                })
                .then((item) => {
                    return item;
                })
                .catch(err => {
                    console.log(`Error now ${err}`);
                })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
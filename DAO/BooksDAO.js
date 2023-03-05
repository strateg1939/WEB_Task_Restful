const Book = require("./Book.js");
const ObjectId = require('mongoose').Types.ObjectId;

const Books = {
    getAll: async () => {
        return await Book.find({});
    },
    getByTitle: async (title) => {
        return await Book.find({ title: title });
    },
    getById: async (id) => {
        return await Book.findById(id);
    },
    create: async (book) => {
        const newBook = new Book({
            title: book.title,
            description: book.description,
            author: book.author,
            publishedDate: book.publishedDate
        });
        await newBook.save();

        return newBook;
    },
    isIdValid: (id) => {
        if(ObjectId.isValid(id)){
            if((String)(new ObjectId(id)) === id)
                return true;
            return false;
        }
        return false;
    },
    delete: async (id) => {
        await Book.findByIdAndDelete(id);
    },
    update: async (book, body) => {
        book.title = body.title;
        book.description = body.description;
        book.author = body.author;
        book.publishedDate = body.publishedDate;

        await book.save();
        return book;
    },
    getByAuthor: async (author) => {
        return await Book.find({ author: author });
    }
};


module.exports = Books
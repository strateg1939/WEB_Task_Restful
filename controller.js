const Books = require("./DAO/BooksDAO.js");

exports.create = async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({ message: "Title can not be empty!" });
        }

        // check if title unique
        const sameTitle = await Books.getByTitle(req.body.title)
        if (sameTitle.length > 0) {
            res.status(400).send({ message: "Title must be unique" });
            return;
        }
        
        const book = await Books.create(req.body);
        return res.send(book) 
    } catch(err) {
        res.status(500).send({
            message: err.message
        });
    }
};

exports.findAll = async (req, res) => {
  return res.send(await Books.getAll());
};

exports.findById = async (req, res) => {
    if (!isIdValid(req)) {
        return res.status(404).send();
    }

    const book = await Books.getById(req.params.id)
    if (!book) {
        return res.status(404).send();
    }
    return res.send(book);
}

exports.delete = async (req, res) => {
    if (!isIdValid(req)) {
        return res.status(404).send();
    }

    const book = await Books.getById(req.params.id);
    if (!book) {
        return res.status(404).send();
    }

    await Books.delete(req.params.id);
    return res.send(book);
}

exports.put = async (req, res) => {
    try {
        if (!isIdValid(req)) {
            return res.status(404).send();
        }

        let book = await Books.getById(req.params.id);
        if (!book) {
            return res.status(404).send();
        }

    
        if (!req.body.title) {
            return res.status(400).send({ message: "Title can not be empty!" });
        }

        // check if title unique
        const sameTitle = await Books.getByTitle(req.body.title)
        if (sameTitle.length > 0 && book.title !== req.body.title) {
            res.status(400).send({ message: "Title must be unique" });
            return;
        }
        
        book = await Books.update(book, req.body);
        return res.send(book) 
    } catch(err) {
        res.status(500).send({
            message: err.message
        });
    }
}

exports.findByAuthor = async (req, res) => {
    return res.send(await Books.getByAuthor(req.params.author));
} 

function isIdValid(req) {
    return Books.isIdValid(req.params.id);
}
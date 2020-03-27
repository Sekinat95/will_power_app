const QuotesModel = require('../models/quotes.model')
//const crypto = require('crypto');

exports.insert = (req, res) => {
    QuotesModel.createQuote(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    QuotesModel.list(limit, page)
        .then((result) => {
            //res.status(200).send(result);
            res.render('home',{
                content: result.message
            }
            )
        })
};

exports.getById = (req, res) => {
    QuotesModel.findById(req.params.quoteId).then((result) => {
        res.status(200).send(result);
    });
 };

 exports.patchById = (req, res) => {
    QuotesModel.patchQuote(req.params.quoteId, req.body).then((result) => {
            res.status(204).send({});
    });
 };

 exports.removeById = (req, res) => {
        QuotesModel.removeById(req.params.quoteId)
        .then((result)=>{
            res.status(204).send({});
        });
 };
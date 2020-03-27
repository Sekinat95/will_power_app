const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const quoteSchema = new Schema({
    message: String,
    tags: Array
 });

 const Quote = mongoose.model('Quote', quoteSchema);

exports.createQuote = (quoteData) => {
    const quote = new Quote(quoteData);
    return quote.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Quote.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};

exports.findById = (id) => {
    return Quote.findById(id).then((result) => {
        result = result.toJSON();
        delete result._id;
        delete result.__v;
        return result;
    });
};

exports.patchQuote = (id, quoteData) => {
    return new Promise((resolve, reject) => {
            Quote.findById(id, function (err, quote) {
            if (err) reject(err);
            for (let i in quoteData) {
                quote[i] = quoteData[i];
            }
            quote.save(function (err, updatedQuote) {
                if (err) return reject(err);
                resolve(updatedQuote);
            });
        });
    })
};

exports.removeById = (quoteId) => {
    return new Promise((resolve, reject) => {
        Quote.remove({_id: quoteId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};
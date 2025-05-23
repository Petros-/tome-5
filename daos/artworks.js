// for defining the functions that will access the database of artworks

const mongoose = require('mongoose');

const Artwork = require('../models/artwork');

// create an artwork
module.exports.createArtwork = async (userId, artObject) => {
    if (!userId || !artObject) {
        throw new Error("missing some key details like the artwork details or the userId of the person posting this")
    }
    artObject.userId = userId;
    const createdArtwork = await Artwork.create({...artObject, userId});
    return createdArtwork;
};

// get all the artworks
module.exports.getArtworks = async () => {
    const artworks = await Artwork.find();
    return artworks;
}

// get a specific artwork
module.exports.getArtworkById = async (id) => {
    const artwork = await Artwork.findById(id);
    return artwork;
}
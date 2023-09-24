const mongoose = require("mongoose");
const cities = require('./cities');
const Campground = require('../models/campground');
const connectDb = require("../config/dbConnection");
const { places, descriptors } = require('./seedHelpers');
const dotenv = require("dotenv").config();

connectDb();

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0;i<50;i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*30) + 10;
        const camp = new Campground({
            author: '64f8c9ef3d2b20430e3b268c',
            location : `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)}, ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/daubbj5ix/image/upload/v1694373187/YelpCamp/jxebvripsher2h25mlys.png',
                  filename: 'YelpCamp/jxebvripsher2h25mlys',
                },
                {
                  url: 'https://res.cloudinary.com/daubbj5ix/image/upload/v1694373189/YelpCamp/edogjcslbkrwofe8tuv1.png',
                  filename: 'YelpCamp/edogjcslbkrwofe8tuv1',
                }
              ],
            description: 'Lorem ipsum',
            price: price
        });
        await camp.save();
    }
}

seedDB();

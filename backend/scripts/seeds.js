require("dotenv").config();
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
mongoose.connect(process.env.MONGODB_URI);

const User = require("../models/User");
const Item = require("../models/Item");
const Comment = require("../models/Comment");

const createUser = () => {
  return {
    username: faker.database.mongodbObjectId(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    bio: faker.lorem.paragraph(),
    image: faker.image.avatar(),
  };
};

const hundredUsers = faker.helpers.uniqueArray(createUser, 100);

const createItem = () => {
  return {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    image: faker.image.avatar(),
    price: faker.commerce.price(),
    category: faker.commerce.department(),
    user: faker.random.arrayElement(hundredUsers)._id,
  };
};

const hundredItems = faker.helpers.uniqueArray(createItem, 100);

const createComment = () => {
  return {
    body: faker.lorem.paragraph(),
    user: faker.random.arrayElement(hundredUsers)._id,
    item: faker.random.arrayElement(hundredItems)._id,
  };
};

const hundredComments = faker.helpers.uniqueArray(createComment, 100);

const seed = async () => {
  await User.deleteMany({});
  await Item.deleteMany({});
  await Comment.deleteMany({});
  await User.insertMany(hundredUsers);
  await Item.insertMany(hundredItems);
  await Comment.insertMany(hundredComments);

  mongoose.connection.close();
  console.log("Database seeded");
  process.exit();
};

seed();

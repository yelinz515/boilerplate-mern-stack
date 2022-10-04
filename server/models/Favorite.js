// Node.js와 MongoDB를 연결해주는 ODM
// **ODM(Object Document Mapping) : 객체와 문서를 1대1로 매칭하는 역할
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema(
  {
    // Schema.Types.ObjectId란 MongoDB에서는 데이터가 차곡차곡 쌓일 때, 그 데이터 하나하나를 document라고 하는데, 그 document를 가리키는 타입인 것
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User" // User의 id를 참조
    },
    movieId: {
      type: String
    },
    movieTitle: {
      type: String
    },
    moviePost: {
      type: String
    },
    movieRunTime: {
      type: String
    },
  },
  { timeStamps: true }
);

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = { Favorite };

const express = require("express");
const { Favorite } = require("../models/Favorite");
const router = express.Router();

// client에 있는 variables 데이터를 받기 위해 req, res 파라미터 생성
router.post("/favoriteNumber", (req, res) => {
  // *mongodb에서 favorite 숫자를 가져오기
  // find, findOne, findById, findOneAndUpdate 등의 메서드의 리턴값은 Query
  // exec()을 사용하여 query 돌리기. 온전한 프로미스를 반환값을 얻을 수 있음
  Favorite.find({"movieId": req.body.movieId })
    .exec((err, info) => {
        if (err) return res.status(400).send(err)

        // *그 다음 프론트에 다시 숫자 정보를 보내주기
        // info: [1,2,3]
        res.status(200).json({ success: true, favoriteNumber: info.length }); 
    })
})

router.post("/favorited", (req, res) => {
    // 해당 영화를 Favorite 리스트에 넣었는지 정보를 db에서 가져오기

    // mongodb에서 favorite 숫자를 가져오기
    Favorite.find({"movieId": req.body.movieId, "userFrom": req.body.userFrom })
      .exec((err, info) => {
          if (err) return res.status(400).send(err)
          // 그 다음 프론트에 다시 숫자 정보를 보내주기
          let result = false;
          if(info.length !== 0) return true;

          res.status(200).json({ success: true, favorited: result }); 
      })
  })

module.exports = router;

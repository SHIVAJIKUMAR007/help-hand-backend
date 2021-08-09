const router = require("express").Router();
const { bannedModel } = require("../models/banned");
const { provideModel } = require("../models/provide");
const { archiveProvideModel } = require("../models/archive");
const path = require("path");
const {addStrike} = require('./strick')
router.get("/", (req, res) => res.send("search api is sending"));

router.post("/postImage/:doerId", (req, res) => {
  if (req.files == null) {
    return res.status(400).json({ msg: "no file uploaded" });
  }
  // setting some variables
  const file = req.files.image;
  const time = Date.now();
  const fileName = `${time}_${req.params.doerId}${path.extname(file.name)}`;
  const destination = `./public/items/${fileName}`;

  //move file to destination
  file.mv(destination, (err) => {
    if (err) {
      return res.status(500).send({ msg: "transfer issue" });
    } else {
      res.send({ msg: "ok", imageUrl: `items/${fileName}` });
    }
  });
});
// add remaining details of providing item
router.post("/addProvidingItem", (req, res) => {
  const { name, image, _id, city, state, country, pincode, desc } = req.body;
  bannedModel.find({ name: name }).exec((err, data) => {
    if (err) throw err;
    if (data.length == 0) {
      provideModel.create(
        {
          name,
          image,
          providerId: _id,
          city,
          state,
          country,
          pincode,
          desc,
          time: Date.now(),
        },
        (err, data) => {
          if (err) throw err;
          res.send({
            msg: "ok",
            res: "Thank you to adding Your item.\n It will visible to all near you soon.\n",
          });
        }
      );
    } else {
      data = data[0];
      const user = addStrike(uid, data.name, "provide");
      res.send({
        msg: "banned",
        user : user,
        res: "This Item is banned on our platform, please learn terms and conditons.\n if you contineously voilate our policy then we have to block you from our platform.\n Hope you will understand.",
      });
    }
  });
});

// get all proving items by user of uid
router.get("/allProviding/:uid", (req, res) => {
  provideModel.find({ providerId: req.params.uid }).exec((err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

// delete item from providing list
router.post("/delete", (req, res) => {
  provideModel.findById(req.body.id, (err, data) => {
    if (err) throw err;
    const {
      name,
      providerId,
      desc,
      image,
      city,
      state,
      country,
      pincode,
      time,
    } = data;
    data = {
      name,
      providerId,
      desc,
      image,
      city,
      state,
      country,
      pincode,
      time,
    };
    archiveProvideModel.create(data, (err2, data2) => {
      if (err2) throw err2;
      provideModel.deleteOne({ _id: req.body.id }, (err3, data3) => {
        if (err3) throw err3;
        res.send({
          msg: "ok",
          res: "Item is removed from your commodity list.",
        });
      });
    });
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const video = require('../models/videoModel');

router.get('/', (req, res, next)=>{
  video.find({})
    .then((videos)=>{
      res.render('videos', {
        videos : videos
      });
    })
    .catch((err)=>{
      if (err) {
        res.end("ERROR!");
      }
    });
});

router.get('/:videoid', (req, res, next)=>{
  video.findOne({'_id': req.params.videoid})
    .then((video)=>{
      res.render('update-video', {
        video: video
      });
    }).catch((err)=>{
      if (err) console.log(err);
    });
});

router.get('/delete/:videoid', (req, res, next)=>{
    video.findOne({'_id': req.params.videoid})
        .then((video)=>{
            res.render('delete-video', {
                video: video
            });
        }).catch((err)=>{
        if (err) console.log(err);
    });
});

router.post('/:videoid', (req, res, next)=>{
    video.findOne({'_id': req.params.videoid})
    .then((video)=>{
      var data  = {
         title: req.body.title,
         description: req.body.description
      }
      video.set(data);
      video.save().then(()=>{
        res.redirect('/videos');
      });
    })
    .catch((err)=>{
      if (err) console.log(err);
  });
});

router.post('/delete/:videoid', (req, res, next)=>{
    video.findOne({'_id': req.params.videoid})
        .then((video)=>{
            video.delete()
                .then(()=>{
                    res.redirect('/videos');
                }).catch((err)=>{
                if (err){
                    console.log(err);
                    throw new Error("videoSaveError", video);
                }
            });
        })
});

router.post('/',(req, res, next)=>{

    const videoData  = {
        title: req.body.title,
        description: req.body.description,
        reviews : [{
            rating: req.body.rating,
            review: req.body.review
        }]
    }
    const videoTemp = new video(videoData);
        videoTemp.save()
        .then(()=>{
        res.redirect('/videos');
    })
   .catch((err)=>{
     if (err){
      console.log(err);
      throw new Error("videoSaveError", video);
    }
   });
});

module.exports = router;

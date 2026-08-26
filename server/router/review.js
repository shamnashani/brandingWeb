const express = require("express");
const router = express.Router();
const authMiddleware=require('../middleware/authMiddleware')
const review = require("../model/review");

//for public review posting

router.post("/add-review", async (req, res) => {
  try {
    const {name,email,service,message,rating,approved}=req.body
    if(!name || !email || !rating){
        return res.status(400).json({message:"Missing required field"})
    }
    const newReview= new review({
        name,
        email,
        service,
        message,rating
    })
    await newReview.save()
    res.json({message:"Review Submitted Successfully"})
  } catch (error) {
    res.status(500).json(error);
  }
});
//admin view all reviews
router.get('/all-review',authMiddleware,async(req,res)=>{
    try{
        const Review=await review.find().sort({createdAt:-1})
        res.json(Review)
    }catch(err){
        res.status(500).json({message:err.message})

    }
})

//  approved reviews by admin
router.put('/approve/:id',authMiddleware,async(req,res)=>{
    try{
       await review.findByIdAndUpdate(req.params.id,
        {approved:true,
          status:'approved'})
        res.json({ message: "Review approved" })

    }catch(err){
        res.status(500).json({message:err.message})
    }
})

//delete by admmin
router.delete('/delete/:id', authMiddleware, async (req, res) => {
  try {
    await review.findByIdAndDelete(req.params.id)
    res.json({ message: "Review deleted" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
router.get('/approved', async (req, res) => {
  try {
    const reviews = await review
      .find({ approved: true })
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//pending freview

router.get('/pending',async(req,res)=>{
  try{
    const count=await review.countDocuments({
      status:"pending"
    })
    res.json(count)

  }catch(err){
    res.status(500).json({message:err.message})
  }
})

router.get('/pending-reviews', async (req, res) => {
  try {
    const reviews = await review.find({
      status: "pending"
    });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/feature/:id", authMiddleware, async (req, res) => {
  try {
    const rev = await review.findById(req.params.id);

    if (!rev) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    rev.featured = !rev.featured;

    await rev.save();

    res.json({
      message: rev.featured
        ? "Review featured"
        : "Review removed from featured",
      review: rev,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/featured", async (req, res) => {
  try {
    const reviews = await review
      .find({
        approved: true,
        featured: true,
      })
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
module.exports=router

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req,res,next)=>{
    try{
        const allpost= await prisma.post.findMany();
        res.send(allpost)
    }catch(err){
        next(err)
    }
})

router.get('/:id', async (req,res,next)=>{
    try{
        const postid= await prisma.post.findUnique({
            where:{
                id:Number(req.params.id)
            }
        });
        res.send(postid)
    }catch(err){
        next(err)
    }
})

router.post('/', async (req,res,next)=>{
  if(!req.user) {
    res.status(401).send({message: "Not Authorized"})
    return
  }
    try{
        const createpost = await prisma.post.create({
            data:req.body
        })
        res.send(createpost)
    }catch(err){
        next(err)
    }
})

router.put("/:id", async (req, res, next) => {
  if(!req.user) {
    res.status(401).send({message: "Not Authorized"})
    return
  }
    try {
      const updatepost = await prisma.post.update({
        where:{
          id:Number(req.params.id)
        },
        data:req.body
      })
      
      res.send(updatepost);
    } catch (error) {
      next(error);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    if(!req.user) {
      res.status(401).send({message: "Not Authorized"})
      return
    }
    try {
      const deletepost= await prisma.post.delete({
        where:{
          id:Number(req.params.id)
        }
      })
  
      res.send(deletepost);
    } catch (error) {
      next(error);
    }
  });
module.exports = router;
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', async(req, res, next) => {
    const helpedAll = await prisma.helped.findMany();
    res.status(200).json(helpedAll);
});

router.get('/true', async(req, res, next) => {
    const helpedTrue = await prisma.helped.findMany({
        where: {
            check: true,
        },
        include: {
            helpList: true
        } 
    })
    res.status(200).json(helpedTrue);
});

router.get('/false', async(req, res, next) => {
    const helpedFalse = await prisma.helped.findMany({
        where: {
            check: false,
        },
        include: {
          helpList: true
        } 
    })
    res.status(200).json(helpedFalse);
});

router.post('/', async(req, res, next) => {
    const helped = await prisma.helped.create({
        data: req.body,
    });
    res.status(201).json(helped);
});

router.patch('/:id', async(req, res, next) => {
    logger.info('Info helpd patch start');
    const { id } = req.params
    const helped = await prisma.helped.update({
        where: {
          id: Number(id),
        },
        data: req.body
    })
    res.status(200).json(helped);
    logger.info('Info helpd patch end');
});

module.exports = router;
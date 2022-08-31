const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', async(req, res, next) => {
    const helpedAll = await prisma.helped.findMany();
    res.status(200).json(helpedAll);
});

router.get('/:true', async(req, res, next) => {
    const helpedTrue = await prisma.helped.findMany({
        where: {
            check: true,
        }
    })
    res.status(200).json(helpedTrue);
});

router.get('/:false', async(req, res, next) => {
    const helpedTrue = await prisma.helped.findMany({
        where: {
            check: false,
        }
    })
    res.status(200).json(helpedTrue);
});

router.post('/', async(req, res, next) => {
    const helped = await prisma.helped.create({
        data: req.body,
    });
    res.status(201).json(helped);
});

router.patch('/:id', async(req, res, next) => {
    const { id } = req.params
    const helped = await prisma.helped.update({
        where: {
          id: Number(id),
        },
        data: req.body
    })
    res.status(200).json(helped);
});

module.exports = router;
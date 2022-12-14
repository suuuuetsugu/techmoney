const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {
  const helpedAll = await prisma.helped.findMany();
  res.status(200).json(helpedAll);
});

router.get("/true", async (req, res, next) => {
  const helpedTrue = await prisma.helped.findMany({
    where: {
      check: true,
    },
    include: {
      helpList: true,
    },
  });
  res.status(200).json(helpedTrue);
});

router.get("/false", async (req, res, next) => {
  const helpedFalse = await prisma.helped.findMany({
    where: {
      check: false,
    },
    include: {
      helpList: true,
    },
  });
  res.status(200).json(helpedFalse);
});

router.post("/", async (req, res, next) => {
  const { check, listId, profileId } = req.body;
  const helped = await prisma.helped.create({
    data: {
      check,
      listId: Number(listId),
      profileId: Number(profileId),
    },
  });
  res.status(201).json(helped);
});

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const helped = await prisma.helped.update({
    where: {
      id: Number(id),
    },
    data: req.body,
  });
  res.status(200).json(helped);
});

module.exports = router;

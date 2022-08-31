const { PrismaClient } = require("@prisma/client");
const express = require("express");
const router = express.Router();

const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {
  const helps = await prisma.helpedList.findMany();
  res.status(200).json(helps);
});

router.post("/", async (req, res, next) => {
  const { name, money } = req.body;
  const createHelp = await prisma.helpedList.create({
    data: {
      name,
      money: Number(money),
    },
  });
  res.status(201).json(createHelp);
});

router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  const delHelp = await prisma.helpedList.delete({
    where: {
      id: Number(id),
    },
  });
  res.status(200).json(delHelp);
});

module.exports = router;

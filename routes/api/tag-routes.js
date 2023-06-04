const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// get all product tags
router.get("/", async (req, res) => {
  try {
    const tagsData = await Tag.findAll({
      include: [{ model: Product, ProductTag }],
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get product tag by id
router.get("/:id", async (req, res) => {
  try {
    const tagsData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, ProductTag }],
    });
    if (!tagsData) {
      res.status(404).json({ message: "No tags found with that id!" });
      return;
    }
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// creat new product tag
router.post("/", async (req, res) => {
  try {
    const tagsData = await Tag.create(req.body);
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
  tagsData;
});

// update product tag by id
router.put("/:id", async (req, res) => {
  try {
    const tagsData = await Tag.findByPk(req.params.id);
    if (!tagsData) {
      res.status(404).json({ message: "No Tags found with that ID" });
      return;
    }
    await tagsData.update(req.body);
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete tag by id
router.delete("/:id", async (req, res) => {
  try {
    const tagsData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagsData) {
      res.status(404).json({ message: "There are no tags with that ID" });
      return;
    }
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(tagsData);
  }
});

module.exports = router;

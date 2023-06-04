const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagsData = await Tag.findAll({
      include: [{ model: Product, ProductTag }],
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagsData = await Category.findByPk(req.params.id, {
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

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const tagsData = await Category.create(req.body);
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
  tagsData;
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
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

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;

const router = require("express").Router();
const { Blog } = require("../models");
const auth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll();

    const blogs = dbBlogData.map((gallery) => gallery.get({ plain: true }));

    res.render("homepage", {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/blogs/:id", auth, async (req, res) => {
  try {
    const dbBlogData = await Blog.findByPk(req.params.id, {});
    const blog = dbBlogData.get({ plain: true });
    res.render("blogs", { blog, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;

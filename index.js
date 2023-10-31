const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");

app.use(cors());

// categories data require/import from catagories.json
const categories = require("./data/categories.json");

// news data require/import from news.json
const news = require("./data/news.json");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// categories data from catagories.json
app.get("/categories", (req, res) => {
  res.send(categories);
});

//amra ekane 3type er news pabo. 1. all news 2. id wise news 3. category wise news
//1. all news data get
app.get("/news", (req, res) => {
  res.send(news);
});
//2. specific id wala news only
app.get("/news/:id", (req, res) => {
  const id = req.params.id;

  //ei news er id diye find kore, oi id er news ta pabo.
  const selectesNews = news.find((n) => n._id === id);
  res.send(selectesNews);
});
//3. category wise news
app.get("/categories/:id", (req, res) => {
  const id = parseInt(req.params.id);
  // console.log(id); //parse int kora hoise e karon, id gulu string.
  //category id=0 hole, se ketre all news dekabe. but news.json e category_id=0 nai. oijonno if condition er modde dekate hobe.
  if (id === 0) {
    res.send(news);
  } else {
    //eketre news er categories er id diye filter korbo news category_id gulu k, then category id related data sob pabo.
    const categoryNews = news.filter((n) => parseInt(n.category_id) === id);
    res.send(categoryNews);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

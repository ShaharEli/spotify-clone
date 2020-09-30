const { Router } = require("express");

const router = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../ORM/models");

router.post("/login", async (req, res) => {
  if (!req.body) {
    res.status(400).send("content missing");
  }
  const { body } = req;
  try {
    const result = await User.findOne({ email: body.email });
    await bcrypt.compare(body.password, result.password, (err, success) => {
      if (err) {
        res.json({ error: err.message });
      } else if (success) {
        const user = body.email;
        const newToken = {
          isAdmin: result.is_admin,
          remember_token: body.remember_token,
          user,
        };
        if (!body.remember_token) {
          newToken.exp = Math.floor(Date.now() / 1000) + 3600;
        } else {
          newToken.exp = "1y";
        }
        const token = jwt.sign(newToken, process.env.HASH);
        res.cookie("name", result.name);
        res.cookie("email", result.email);
        res.cookie("auth", true);
        res.cookie("isAdmin", result.isAdmin);
        res.cookie("token", token);
        res.json({ name: result.name });
      } else {
        res.json({ error: "wrong password" });
      }
    });
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.post("/register", async (req, res) => {
  if (!req.body) {
    res.status(400).send("content missing");
  }
  const { body } = req;
  body.password = await bcrypt.hash(body.password, 10);
  try {
    const result = await User.create(body);
    const user = body.email;
    const newToken = {
      isAdmin: result.is_admin,
      remember_token: body.remember_token,
      user,
    };
    if (!body.remember_token) {
      newToken.exp = Math.floor(Date.now() / 1000) + 3600;
    }
    const token = jwt.sign(newToken, process.env.HASH);
    res.cookie("name", result.name);
    res.cookie("email", result.email);
    res.cookie("auth", true);
    res.cookie("isAdmin", result.is_admin);
    res.cookie("token", token);
    res.json({ name: result.name });
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.get("/checkmail/:email", async (req, res) => {
  const { email } = req.params;
  if (!email) {
    res.status(400).send("content missing");
  }
  try {
    const result = await User.findOne({
      where: { email },
    });
    if (!result) {
      res.json({ emailOk: true });
    } else {
      res.json({ emailOk: false, name: result.name });
    }
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.post("/checktoken", async (req, res) => {
  jwt.verify(req.body.token, process.env.HASH, (error) => {
    if (error) {
      res.status(403).send(false);
    } else {
      res.send(true);
    }
  });
});

module.exports = router;

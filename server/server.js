const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
const pool = require("./db");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
// library for working with JSON Web Tokens (JWTs).
const jwt = require("jsonwebtoken");

const secretKey = "ZhQrZ951";

let generatedUserId





// Get All Records
app.post("/records", async function (req, res) {
  try {
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;
    const checkEmail = await pool.query(
      "SELECT email FROM users where email = $1  ",
      [email]
    );

    if (checkEmail.rows.length == 0) {
      const all_records = await pool.query(
        "INSERT INTO users (username,phone_number, email, password,type_id,flags) VALUES($1, $2, $3 , $4 , $5, $6) RETURNING *",
        [name, phone, email, password, 0, 1]
      );
      res.json(all_records.rows);
    } else {
      res.json("taken");
    }
  } catch (err) {
    console.log(err.message);
  }
});

// Get All Records
app.get("/records", async function (req, res) {
  try {
    const all_records = await pool.query(
      "SELECT * FROM users where flags=1 and type_id=0 or type_id=1 "
    );
    res.json(all_records.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// Get a Specific Record
app.get("/records/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const record = await pool.query("SELECT * FROM users WHERE userid = $1", [
      id,
    ]);
    res.json(record.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// Update a Specific Record
app.put("/records/:userid", async function (req, res) {
  try {
    const { userid } = req.params;
    let id0 = req.body.id;
    if (id0 == 0) {
      id0 = 1;
    } else {
      id0 = 0;
    }

    const record = await pool.query(
      "UPDATE users SET type_id = $1 WHERE userid = $2",
      [id0, userid]
    );
    res.send("Updated Successfully");
  } catch (err) {
    console.log(err.message);
  }
});
let useremail = "";
let userpassword = "";

app.post("/recordp", async function (req, res) {
  try {
    const email = req.body.email;
    useremail = email;
    const password = req.body.password;
    userpassword = password;

    const all_records = await pool.query("SELECT * FROM users");
    let persons0 = all_records.rows;
    persons0.map((e) => {
      if (e.email == email) {
        if (e.password == password) {
          const token = jwt.sign(
            { email: e.email, password: e.password },
            secretKey,
            { expiresIn: "9weeks" }
          ); // Generate JWT
          generatedUserId = e.userid;
          res.json([token, e.type_id, e]);
          role000 = e.type_id;
        }
      }
    });

    //   res.json({email,password});
  } catch (err) {
    console.log(err.message);
  }
});


let generatedId;
app.post("/restaurants", async function (req, res) {
  try {
    const name = "";
    const phone = "";
    const email = req.body.email;
    const password = "aaa";
    const all_records = await pool.query(
      "INSERT INTO users (username,phone_number, email, password,type_id,flags) VALUES($1, $2, $3 , $4 , $5,$6) RETURNING userid",
      [name, phone, email, password, 2, 1]
    );

    generatedId = all_records.rows[0].userid;

    // res.json(all_records.rows);

    const restaurant_name = email;
    const contact_number = "";
    const user_id = generatedId;
    const all_records0 = await pool.query(
      "INSERT INTO restaurant (restaurant_name ,contact_number, user_id) VALUES($1, $2, $3) RETURNING *",
      [restaurant_name, contact_number, user_id]
    );

    const all = { user: all_records.rows, restaurant: all_records0.rows };
    res.json(all);
  } catch (err) {
    console.log(err.message);
  }
});

// Get All reporters
app.get("/reporters", async function (req, res) {
  try {
    const all_records = await pool.query("SELECT * FROM contacts");
    res.json(all_records.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// Update a Specific Record
app.put("/aboutEdit/:about_id", async function (req, res) {
  try {
    const { about_id } = req.params;
    const about_title = req.body.content;
    const record = await pool.query(
      "UPDATE aboutus SET about_title = $1  WHERE about_id = $2",
      [about_title, about_id]
    );
    res.send("Updated Successfully");
  } catch (err) {
    console.log(err.message);
  }
});

app.put("/contactus00/:about_id", async function (req, res) {
  try {
    const { about_id } = req.params;
    const { about_title, about_us } = req.body;

    const user = await pool.query(
      "UPDATE aboutus SET about_title = $1 ,about_us = $2  WHERE about_id = $3 ",
      [about_title, about_us, about_id]
    );
    res.json(user.rows);
  } catch (err) {
    console.log(err.message);
  }
});
app.post("/contacts", async function (req, res) {
  try {
    console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const message = req.body.message;
    const all_records = await pool.query(
      "INSERT INTO contacts (name,email, phone, message ,user_id) VALUES($1, $2, $3 , $4 ,$5) RETURNING *",
      [name, email, phone, message, generatedUserId]
    );
    res.json(all_records.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// -------------razan res ----------------//

// in home page of the user when I try to get the restaurants based on the food type from the restaurant table and render them in another page
app.get("/ServicePage/:category", (req, res) => {
  const { category } = req.params; // Updated variable name

  pool.query(
    "SELECT * FROM products WHERE category = $1",
    [category],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.json(results.rows);
      }
    }
  );
});




app.get("/Prod/:product_id", (req, res) => {
  const { product_id } = req.params; // Updated variable name
console.log(product_id)
  pool.query(
    "SELECT * FROM products WHERE product_id = $1",
    [product_id],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.json(results.rows);
        console.log(results.row)
      }
    }
  );
});


// -------------razan contacts ----------------//
// app.post("/contacts", async function (req, res) {
//   console.log(req.body);
//   try {
//       const name = req.body.name;
//       const email = req.body.email;
//       const phone = req.body.phone;
//       const message = req.body.message;

//       const newRecord = await pool.query(
//           "INSERT INTO contacts (name, phone, email, message) VALUES ($1, $2, $3, $4) RETURNING *",
//           [name, phone, email, message]
//       );

//       res.json(newRecord.rows);
//   } catch (err) {
//       console.log(err.message);
//   }
// });

// -------------razan about ----------------//
// in the about page will get the content from the database
app.get("/aboutus", async (req, res) => {
  try {
    const query = "SELECT about_title, about_us FROM aboutus";
    const { rows } = await pool.query(query);
    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Update the about us section in the database
app.put("/aboutus", async (req, res) => {
  const { about_title, about_us } = req.body;

  try {
    const query = "UPDATE aboutus SET about_title = $1, about_us = $2";
    await pool.query(query, [about_title, about_us]);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

///----------------------------- amani -----------------------//
// Add a new restaurant
app.post("/restaurant", async function (req, res) {
  try {
    const {
      restaurant_name,
      address,
      contact_number,
      type_food,
      des,
      img,
      food_image,
    } = req.body;
    const newRecord = await pool.query(
      "INSERT INTO restaurant (restaurant_name, address, contact_number, type_food, des, img, food_image) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        restaurant_name,
        address,
        contact_number,
        type_food,
        des,
        img,
        food_image,
      ]
    );

    res.json(newRecord.rows);
  } catch (err) {
    console.log(err.message);
  }
});



app.put("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const table_status = await pool.query(
      "UPDATE products SET flags = 1 WHERE product_id = $1",
      [ id]
    );
    res.json(table_status.rows);
  } catch (err) {
    console.log(err.message);
  }
})

// ---------------- issa --------------------//
// Add a new payment
app.post("/payment", async function (req, res) {
  console.log(req.body);
  try {
    const username = req.body.username;
    const cardnumber = req.body.cardnumber;
    const hashedCardNumber = bcrypt.hashSync(cardnumber, 10);
    const datecard = req.body.datecard;
    const cvc = req.body.cvc;
    const userid = req.body.userid;
    const newPayment = await pool.query(
      "INSERT INTO payment (username, cardnumber, datecard, cvc, userid) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [username, hashedCardNumber, datecard, cvc, userid]
    );

    res.json(newPayment.rows);
  } catch (err) {
    console.log(err.message);
  }
});



app.post("/neworder", async function (req, res) {
  console.log(req.body);
  try {
    const category = req.body.category;
    const count = req.body.count;
    const description = req.body.description;
    const name = req.body.name;
    const photo = req.body.photo;
    const price = req.body.price;
    const product_id = req.body.product_id;
    const userid = req.body.userid;
    const neworder = await pool.query(
      "INSERT INTO orders (user_id, category, count, description, name,photo,price,product_id) VALUES($1, $2, $3, $4, $5,$6,$7,$8) RETURNING *",
      [userid, category, count, description, name,photo,price,product_id]
    );

    res.json(neworder.rows);
  } catch (err) {
    console.log(err.message);
  }
});






app.get("/paymentData", async (req, res) => {
  try {
    const paymentData = await pool.query(
      "SELECT * FROM payment "
    );

    res.json(paymentData.rowCount);
  } catch (err) {
    console.log(err.message);
  }
});


app.get("/ordersData", async (req, res) => {
  try {
    const ordersData = await pool.query(
      "SELECT * FROM orders "
    );

    res.json(ordersData.rows);
  } catch (err) {
    console.log(err.message);
  }
});


// ------------------farah ------------------------//

// get user data
app.get("/user/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE userid = $1 ", [
      id,
    ]);
    res.json(user.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// update user details
app.put("/user/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const { username, email, phone_number, password } = req.body;

    const user = await pool.query(
      "UPDATE users SET username = $1 ,email = $2 ,phone_number = $3 , password = $4 WHERE userid = $5 ",
      [username, email, phone_number, password, id]
    );
    res.json(user.rows);
  } catch (err) {
    console.log(err.message);
  }
});
// get prev. orders ********
app.get("/oldOrders/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const order = await pool.query(
      "SELECT * FROM orders WHERE user_id = $1",

      [id]
    );
    res.json(order.rows);
  } catch (err) {
    console.log(err.message);
  }
});


//  user id

app.get("/getId", async function (req, res) {
  try {
    const email = useremail;
    const password = userpassword;
    const currentRecord = await pool.query(
      "SELECT * FROM users WHERE email = '" +
        email +
        "' AND password = '" +
        password +
        "'"
    );
    let person0 = currentRecord.rows;
    res.json(person0);
  } catch (err) {
    console.log(err.message);
  }
});




app.get("/productsAll", (req, res) => {
  pool.query("SELECT * FROM products where flags =0 ", (error, results) => {
    if (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.log(results);
      res.json(results.rows);
    }
  });
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


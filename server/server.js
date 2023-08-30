const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
const pool = require("./db");
const bcrypt = require("bcrypt");
const path = require("path");
const multer = require('multer');
const nodemailer = require('nodemailer');

const jwt = require("jsonwebtoken");
app.use("/public", express.static(path.join(__dirname, "public")));

const secretKey = "ZhQrZ951";




let generatedUserId

app.post("/records", async function (req, res) {
  try {
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;
    const checkEmail = await pool.query(
      "SELECT * FROM users where email = $1  ",
      [email]
    );
    console.log(checkEmail)

    if (checkEmail.rows.length == 0) {
      const all_records = await pool.query(
        "INSERT INTO users (username,phone_number, email, password,type_id,flags) VALUES($1, $2, $3 , $4 , $5, $6) RETURNING *",
        [name, phone, email, password, 0, 1]
      );

      const token = jwt.sign(
        { email: email, password: password },
        secretKey,
        { expiresIn: "9weeks" }
      ); // Generate JWT
      // generatedUserId = e.userid;
      const user = await pool.query(
        "SELECT * FROM users where email = $1  ",
        [email]
      );
      res.json([token, 0, user.rows[0]]);
      role000 = 0;
    } else {
      res.json("taken");
    }
  } catch (err) {
    console.log(err.message);
  }
});


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

app.get("/deleterecords", async function (req, res) {
  try {
    const all_records = await pool.query(
      "SELECT * FROM users where flags=0  "
    );
    res.json(all_records.rows);
  } catch (err) {
    console.log(err.message);
  }
});




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



app.put("/recordss/:userid", async function (req, res) {
  try {
    const { userid } = req.params;


    const record = await pool.query(
      "UPDATE users SET flags = 0 WHERE userid = $1",
      [userid]
    );
    res.send("Updated Successfully");
  } catch (err) {
    console.log(err.message);
  }
});



app.put("/recoverrecordss/:userid", async function (req, res) {
  try {
    const { userid } = req.params;


    const record = await pool.query(
      "UPDATE users SET flags = 1 WHERE userid = $1",
      [userid]
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


app.get("/reporters", async function (req, res) {
  try {
    const all_records = await pool.query("SELECT * FROM contacts");

    res.json(all_records.rows);
  } catch (err) {
    console.log(err.message);
  }
});

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



app.post("/addToCart", async function (req, res) {
  try {
    const id = req.body.user_id;
    const quantity = req.body.quantity;
    const product_id = req.body.product.product_id;
    const name = req.body.product.name;
    const category = req.body.product.category;
    const price = req.body.product.price;
    const photo = req.body.product.photo;
    const description = req.body.product.description;
    const addcart = await pool.query(
      "INSERT INTO cart (user_id,product_id, category, description ,price,name,photo,quantity) VALUES($1, $2, $3 , $4 ,$5,$6,$7,$8) RETURNING *",
      [id, product_id, category, description, price, name, photo, quantity]
    );
    res.json(addcart.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/countdata/:product_id", async function (req, res) {
  try {
    const { product_id } = req.params;
    const { value } = req.body;

    const user = await pool.query(
      "UPDATE cart SET quantity  = $1  WHERE product_id = $2   ",
      [value, product_id]
    );
    res.json(user.rows);

  } catch (err) {
    console.log(err.message);
  }
});



app.post("/addTowishlist", async function (req, res) {
  try {
    const id = req.body.user_id;
    const product_id = req.body.product.product_id;
    const name = req.body.product.name;
    const category = req.body.product.category;
    const price = req.body.product.price;
    const photo = req.body.product.photo;
    const description = req.body.product.description;
    const addTowishlist = await pool.query(
      "INSERT INTO wishlist (user_id,product_id, category, description ,price,name,photo) VALUES($1, $2, $3 , $4 ,$5,$6,$7) RETURNING *",
      [id, product_id, category, description, price, name, photo]
    );
    res.json(addTowishlist.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/addsalesTowishlist", async function (req, res) {
  try {
    const id = req.body.user_id;
    const product_id = req.body.product.product_id;
    const name = req.body.product.name;
    const category = req.body.product.category;
    const price = req.body.product.new_price;
    const photo = req.body.product.photo;
    const description = req.body.product.description;
    const addTowishlist = await pool.query(
      "INSERT INTO wishlist (user_id,product_id, category, description ,price,name,photo) VALUES($1, $2, $3 , $4 ,$5,$6,$7) RETURNING *",
      [id, product_id, category, description, price, name, photo]
    );
    res.json(addTowishlist.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/addsaleToCart", async function (req, res) {
  try {
    const id = req.body.user_id;
    const quantity = req.body.quantity;
    const product_id = req.body.product.product_id;
    const name = req.body.product.name;
    const category = req.body.product.category;
    const price = req.body.product.new_price;
    const photo = req.body.product.photo;
    const description = req.body.product.description;
    const addcart = await pool.query(
      "INSERT INTO cart (user_id,product_id, category, description ,price,name,photo,quantity) VALUES($1, $2, $3 , $4 ,$5,$6,$7,$8) RETURNING *",
      [id, product_id, category, description, price, name, photo, quantity]
    );
    res.json(addcart.rows);
  } catch (err) {
    console.log(err.message);
  }
});


app.put("/updatequa/", async function (req, res) {
  try {
    const id = req.body.user_id;
    const product_id = req.body.product_id;
    const quantity = req.body.quantity;
    console.log(quantity)
    const record = await pool.query(
      "UPDATE cart set quantity=$1 WHERE user_id =$2 and product_id=$3 ",
      [quantity, id, product_id]
    );
    res.send("Updated Successfully");
  } catch (err) {
    console.log(err.message);
  }
});

app.delete("/deletecartdata", async function (req, res) {
  try {
    const cartId = req.body.product.cart_id;
    console.log(req.body.product.cart_id);
    const record = await pool.query(
      "DELETE FROM cart WHERE cart_id= $1",
      [cartId]
    );
    res.send("Deleted Successfully");
  } catch (err) {
    console.log(err.message);
  }
});


app.delete("/deletewishlistdata", async function (req, res) {
  try {
    const cartId = req.body.product.wishlist_id;
    const record = await pool.query(
      "DELETE FROM wishlist WHERE wishlist_id= $1",
      [cartId]
    );
    res.send("Deleted Successfully");
  } catch (err) {
    console.log(err.message);
  }
});




app.get("/getusercart/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const record = await pool.query("SELECT * FROM cart WHERE user_id = $1  ORDER BY name ASC ", [id]);
    res.json(record.rows);
  } catch (err) {
    console.log(err.message);
  }
});



app.get("/getuserwishlist/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const record = await pool.query("SELECT * FROM wishlist WHERE user_id = $1", [id]);
    res.json(record.rows);
  } catch (err) {
    console.log(err.message);
  }
});



app.get("/ServicePage/:category", (req, res) => {
  const { category } = req.params; // Updated variable name

  pool.query(
    "SELECT * FROM products WHERE category = $1 AND flags = 0 and (disflag=0  or disflag= 2 )   ",
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
  const { product_id } = req.params;
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




app.put("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const table_status = await pool.query(
      "UPDATE products SET flags = 1 WHERE product_id = $1",
      [id]
    );
    res.json(table_status.rows);
  } catch (err) {
    console.log(err.message);
  }
})


app.put("/sales/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const table_status = await pool.query(
      "UPDATE products SET disflag ='2 'WHERE product_id = $1",
      [id]
    );
    res.json(table_status.rows);
  } catch (err) {
    console.log(err.message);
  }
})


app.get("/sales/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const table_status = await pool.query(
      "select * from products WHERE product_id = $1",
      [id]
    );
    res.json(table_status.rows);
  } catch (err) {
    console.log(err.message);
  }
})




app.put("/recoverproduct/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const table_status = await pool.query(
      "UPDATE products SET flags = 0 WHERE product_id = $1",
      [id]
    );
    res.json(table_status.rows);
  } catch (err) {
    console.log(err.message);
  }
})


app.put("/recoversales/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const table_status = await pool.query(
      "UPDATE products SET disflag = 1 WHERE product_id = $1",
      [id]
    );
    res.json(table_status.rows);
  } catch (err) {
    console.log(err.message);
  }
})

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
      [userid, category, count, description, name, photo, price, product_id]
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


app.get("/ordersData/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const record = await pool.query("SELECT * FROM orders WHERE user_id = $1", [
      id,
    ]);
    res.json(record.rows);
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


app.get("/datauserorders", async function (req, res) {
  try {
    const { id } = req.params;
    const user = await pool.query("SELECT DISTINCT users.* FROM users JOIN orders ON users.userid = orders.user_id  ");
    res.json(user.rows);
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
  pool.query("SELECT * FROM products where flags =0  and   (user_id is null )   and  ( disflag=0  or disflag= 2 ) ", (error, results) => {
    if (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.log(results);
      res.json(results.rows);
    }
  });
});



app.get("/saleAll", (req, res) => {
  pool.query("SELECT * FROM products where disflag=1  ", (error, results) => {
    if (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.log(results);
      res.json(results.rows);
    }
  });
});



app.get("/deletedproducts", (req, res) => {
  pool.query("SELECT * FROM products where flags =1 ", (error, results) => {
    if (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.log(results);
      res.json(results.rows);
    }
  });
});


app.get("/deleteDrawing", (req, res) => {
  pool.query("SELECT * FROM products where flags =1 and(user_id is not null) ", (error, results) => {
    if (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.log(results);
      res.json(results.rows);
    }
  });
});


app.get("/deletedsales", (req, res) => {
  pool.query("SELECT * FROM products where disflag =2 and (user_id is null) ", (error, results) => {
    if (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.log(results);
      res.json(results.rows);
    }
  });
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images"); // Specify the destination folder for saving the images
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    ); // Generate a unique filename
  },


});

const upload = multer({
  storage: storage,
});

app.post("/newproduct", upload.single('image'), async function (req, res) {
  try {
    const { name, category, price, description } = req.body

    const imagePath = req.file.path;

    const all_records = await pool.query(
      "INSERT INTO products (name,category, price, description,photo) VALUES($1, $2, $3 , $4 , $5) RETURNING *",
      [name, category, price, description, imagePath]
    );
    res.json(all_records.rows);
  }


  catch (err) {
    console.log(err.message);
  }
});





app.post("/newDrawing", upload.single('image'), async function (req, res) {
  try {
    const { name, category, price, description, userid } = req.body
    const imagePath = req.file.path;
    const all_records = await pool.query(
      "INSERT INTO products (name,category, price, description,photo,user_id ,drawingflag) VALUES($1, $2, $3 , $4 , $5,$6, $7) RETURNING *",
      [name, category, price, description, imagePath, userid, 1]
    );
    res.json(all_records.rows);
  }


  catch (err) {
    console.log(err.message);
  }
});




app.put("/newsale/:id", async function (req, res) {
  try {
    const { new_price } = req.body;
    const { id } = req.params;

    const all_records = await pool.query(
      "UPDATE products SET new_price = $1, disflag = 1 WHERE product_id = $2 RETURNING *",
      [new_price, id]
    );

    res.json(all_records.rows);
  } catch (err) {
    console.log(err.message);
  }
});




app.get("/usercount", (req, res) => {
  pool.query("SELECT count(userid) FROM users ", (error, results) => {
    if (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.log(results);
      res.json(results.rows);
    }
  });
});

app.get("/Productcount", (req, res) => {
  pool.query("SELECT count(product_id) FROM products where user_id is null ", (error, results) => {
    if (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.log(results);
      res.json(results.rows);
    }
  });
});



app.get("/drawingscount", (req, res) => {
  pool.query("SELECT COUNT(*) FROM products WHERE user_id IS NOT NULL", (error, results) => {
    if (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.log(results);
      res.json(results.rows);
    }
  });
});




app.get("/salescount", (req, res) => {
  pool.query("SELECT price FROM orders ", (error, results) => {
    if (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results.rows);
    }
  });
});



app.get("/DrawingAllHome", (req, res) => {
  pool.query(
    "SELECT * FROM products WHERE flags = 0 AND (user_id IS NOT NULL)   order by name DESC  LIMIT 3 ",
    (error, results) => {
      if (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.json(results.rows);
      }
    }
  );
});





app.get("/PendingDrawing", (req, res) => {
  pool.query(
    "SELECT * FROM products WHERE drawingflag = 1 AND (user_id IS NOT NULL) ",
    (error, results) => {
      if (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.json(results.rows);
      }
    }
  );
});



app.get("/DrawingAll/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allDrawing = await pool.query(
      "SELECT * FROM products WHERE flags = 0 AND (user_id !=$1)", [id])
      console.log(allDrawing.rows);
      res.status(200).json(allDrawing.rows)
  } catch (error) {
    res.status(500).json(`server error ${error}`)
    console.error(error)
  }

});



app.get("/salescount", (req, res) => {
  pool.query("SELECT COUNT(*) FROM products WHERE  disflag= 1 ", (error, results) => {
    if (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.log(results);
      res.json(results.rows);
    }
  });
});








app.get("/ALLusers", (req, res) => {
  pool.query(
    "SELECT * FROM users where type_id=0 ",
    (error, results) => {
      if (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.json(results.rows);
      }
    }
  );
});





app.get("/getuserDrawings/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const record = await pool.query("SELECT * FROM Products WHERE user_id = $1  ORDER BY name ASC  ", [id]);
    res.json(record.rows);
  } catch (err) {
    console.log(err.message);
  }
});



app.get("/issale/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const record = await pool.query("SELECT * FROM products  INNER JOIN orders  ON products.product_id = orders.product_id WHERE products.user_id = $1 ;",[id]);
    res.json(record.rows);
    console.log(record.rows)
  } catch (err) {
    console.log(err.message);
  }
});



app.put("/Drawing/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const table_status = await pool.query(
      "UPDATE products SET drawingflag = 0 WHERE product_id = $1",
      [id]
    );
    res.json(table_status.rows);
  } catch (err) {
    console.log(err.message);
  }
})




const port = 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


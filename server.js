// Use Express
var express = require("express");
// Use body-parser
var bodyParser = require("body-parser");
// Use MongoDB
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
// The database variable
var database;
// The admins collection
var ADMINS_COLLECTION = "admins";
// The products collection
var PRODUCTS_COLLECTION = "products";
// The users collection
var USERS_COLLECTION = "users";

// Create new instance of the express server
var app = express();

// Define the JSON parser as a default way 
// to consume and produce data through the 
// exposed APIs
app.use(bodyParser.json());

// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Local database URI.
const LOCAL_DATABASE = "mongodb+srv://jerry:1234567890@cluster0.lf19s.mongodb.net/tcsdb?retryWrites=true&w=majority";
// Local port.
const LOCAL_PORT = 8080;

// Init the server
mongodb.MongoClient.connect(process.env.MONGODB_URI || LOCAL_DATABASE,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }, function (error, client) {

        // Check if there are any problems with the connection to MongoDB database.
        if (error) {
            console.log(error);
            process.exit(1);
        }

        // Save database object from the callback for reuse.
        database = client.db();
        console.log("Database connection done.");

        // Initialize the app.
        var server = app.listen(process.env.PORT || LOCAL_PORT, function () {
            var port = server.address().port;
            console.log("App now running on port", port);
        });
    });

/*  "/api/status"
 *   GET: Get server status
 *   PS: it's just an example, not mandatory
 */
app.get("/api/status", function (req, res) {
    res.status(200).json({ status: "UP" });
});

/*  "/api/admins"
 *  GET: finds all admins
 */
app.get("/api/admins", function (req, res) {
    database.collection(ADMINS_COLLECTION).find({}).toArray(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get admins.");
        } else {
            res.status(200).json(data);
        }
    });
});

/*  "/api/admins"
 *  GET: finds an admin with the given username.
 */
app.get("/api/admins/:username", function (req, res) {
    database.collection(ADMINS_COLLECTION).findOne({username:req.params.username},function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get admin.");
        } else {
            res.status(200).json(data);
        }
    });
});

/*  "/api/admins/:username/:password"
 *  GET: validates an admin with the given username and password.
 */
app.get("/api/admins/:username/:password", function (req, res) {
    database.collection(ADMINS_COLLECTION).findOne({username:req.params.username, password:req.params.password},function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to validate admin.");
        } else {
            res.status(200).json(data);
        }
    });
});

/*  "/api/admins"
 *   POST: creates a new admin
 */
app.post("/api/admins", function (req, res) {
    var admin = req.body;

    if (!admin.name) {
        manageError(res, "Invalid admin input", "Name is mandatory.", 400);
    } else if (!admin.brand) {
        manageError(res, "Invalid admin input", "Brand is mandatory.", 400);
    } else {
        database.collection(ADMINS_COLLECTION).insertOne(admin, function (err, doc) {
            if (err) {
                manageError(res, err.message, "Failed to create new admin.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });
    }
});

/*  "/api/admins/:id"
 *   DELETE: deletes admin by id
 */
app.delete("/api/admins/:id", function (req, res) {
    if (req.params.id.length > 24 || req.params.id.length < 24) {
        manageError(res, "Invalid admin id", "ID must be a single String of 12 bytes or a string of 24 hex characters.", 400);
    } else {
        database.collection(ADMINS_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
            if (err) {
                manageError(res, err.message, "Failed to delete admin.");
            } else {
                res.status(200).json(req.params.id);
            }
        });
    }
});

/*  "/api/products"
 *  GET: finds all products
 */
app.get("/api/products", function (req, res) {
    database.collection(PRODUCTS_COLLECTION).find({}).toArray(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(data);
        }
    });
});

/*  "/api/products/:id"
 *  GET: finds all products
 */
app.get("/api/products/:id", function (req, res) {
    database.collection(PRODUCTS_COLLECTION).findOne({_id: new ObjectID(req.params.id)},function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(data);
        }
    });
});

/*  "/api/products"
 *   PATCH: updates a product
 */
app.patch("/api/products/:id", function (req, res) {
    var product = req.body;

    if (!product.name) {
        manageError(res, "Invalid product input", "Name is mandatory.", 400);
    } else if (!product.brand) {
        manageError(res, "Invalid product input", "Brand is mandatory.", 400);
    } else {
        database.collection(PRODUCTS_COLLECTION).updateOne({ _id: new ObjectID(product._id) }, {$set: { name:product.name, brand:product.brand, price:product.price } }, function (err, doc) {
            if (err) {
                manageError(res, err.message, "Failed to update product.");
            } else {
                res.status(201).json(doc);
            }
        });
    }
});

/*  "/api/products"
 *   POST: creates a new product
 */
app.post("/api/products", function (req, res) {
    var product = req.body;

    if (!product.name) {
        manageError(res, "Invalid product input", "Name is mandatory.", 400);
    } else if (!product.brand) {
        manageError(res, "Invalid product input", "Brand is mandatory.", 400);
    } else {
        database.collection(PRODUCTS_COLLECTION).insertOne(product, function (err, doc) {
            if (err) {
                manageError(res, err.message, "Failed to create new product.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });
    }
});

/*  "/api/products/:id"
 *   DELETE: deletes product by id
 */
app.delete("/api/products/:id", function (req, res) {
    if (req.params.id.length > 24 || req.params.id.length < 24) {
        manageError(res, "Invalid product id", "ID must be a single String of 12 bytes or a string of 24 hex characters.", 400);
    } else {
        database.collection(PRODUCTS_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
            if (err) {
                manageError(res, err.message, "Failed to delete product.");
            } else {
                res.status(200).json(req.params.id);
            }
        });
    }
});

/*  "/api/users"
 *  GET: finds all users
 */
app.get("/api/users", function (req, res) {
    database.collection(USERS_COLLECTION).find({}).toArray(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(data);
        }
    });
});

/*  "/api/users/:username"
 *  GET: finds a user with the given username
 */
app.get("/api/users/:username", function (req, res) {
    database.collection(USERS_COLLECTION).findOne({username:req.params.username},function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to find user.");
        } else {
            res.status(200).json(data);
        }
    });
});


/*  "/api/users/:username/:password"
 *  GET: validates a user with the given username and password.
 */
app.get("/api/users/:username/:password", function (req, res) {
    database.collection(USERS_COLLECTION).findOne({username:req.params.username, password:req.params.password},function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to validate user.");
        } else {
            console.log(data);
            res.status(200).json(data);
        }
    });
});

/*  "/api/users"
 *   PATCH: updates a user's username and password
 */
app.patch("/api/users/:id", function (req, res) {
    var user = req.body;
    console.log(user)
    if (!user.username) {
        manageError(res, "Invalid user input Dork", "Username is mandatory.", 400);
    } else if (!user.password) {
        manageError(res, "Invalid user input", "Password is mandatory.", 400);
    } else {
        database.collection(USERS_COLLECTION).updateOne({ _id: new ObjectID(req.params.id) }, {$set: { username:user.username, password:user.password } }, function (err, doc) {
            console.log(req.params)
            if (err) {
                manageError(res, err.message, "Failed to update user username and password.");
            } else {
                res.status(201).json(doc);
            }
        });
    }
});

/*  "/api/users/:id"
 *   PUT: updates a user's cart and wishlist
 */
app.put("/api/users/:id", function (req, res) {
    var user = req.body;
    console.log(user)
    if (!user.username) {
        manageError(res, "Invalid user input Dork", "Username is mandatory.", 400);
    } else if (!user.password) {
        manageError(res, "Invalid user input", "Password is mandatory.", 400);
    } else {
        if (!user.cart)
            user.cart = [];
        if (!user.wishlist)
            user.wishlist = [];
        database.collection(USERS_COLLECTION).updateOne({ _id: new ObjectID(req.params.id) }, {$set: { cart:user.cart, wishlist:user.wishlist } }, function (err, doc) {
            console.log(req.params)
            if (err) {
                manageError(res, err.message, "Failed to update user cart and wishlist.");
            } else {
                res.status(201).json(doc);
            }
        });
    }
});

/*  "/api/users"
 *   POST: creates a new user
 */
app.post("/api/users", function (req, res) {
    var user = req.body;
    console.log(user)
    if (!user.username) {
        manageError(res, "Invalid user input Duncecap", "Name is mandatory.", 400);
    } else if (!user.password) {
        manageError(res, "Invalid user input", "Brand is mandatory.", 400);
    } else {
        database.collection(USERS_COLLECTION).insertOne(user, function (err, doc) {
            if (err) {
                manageError(res, err.message, "Failed to create new user.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });
    }
});

/*  "/api/users/:id"
 *   DELETE: deletes user by id
 */
app.delete("/api/users/:id", function (req, res) {
    if (req.params.id.length > 24 || req.params.id.length < 24) {
        manageError(res, "Invalid user id", "ID must be a single String of 12 bytes or a string of 24 hex characters.", 400);
    } else {
        database.collection(USERS_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
            if (err) {
                manageError(res, err.message, "Failed to delete user.");
            } else {
                res.status(200).json(req.params.id);
            }
        });
    }
});

// Errors handler.
function manageError(res, reason, message, code) {
    console.log("Error: " + reason);
    res.status(code || 500).json({ "error": message });
}
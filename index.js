const express = require("express");
const companys = require("./companys");
const products = require("./products");
const sallers = require("./sallers");
const app = express();
const port = 3000;
const { router } = require("express").Router();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API is working",
  });
});

/* -------------- PRODUCTS MODULE -------------- */
/** Products GET request handling */
app.get("/api/products", (req, res) => {
  res.json({
    products,
  });
});

/** Products POST/ADD product request handling */
app.post("/api/products", (req, res) => {
  /** If title not found then display error */
  if (!req.body.title) {
    res.send(400);
    return res.json({
      error: "Title is Required",
    });
  }
  /** Save data into 'details' object */
  const details = {
    id: products.length + 1,
    title: req.body.title,
    price: req.body.price,
    category: req.body.category,
    companyid: req.body.companyid,
    sellerid: req.body.sellerid,
  };
  /** PUSH/ADD into original JSON data file on products */
  products.push(details);
  /** Display appropriate message and data to end user */
  res.json(details);
});

/** Products PUT/Update product by its name */
app.put("/api/products/:name", (req, res) => {
  const name = req.params.name;
  const newName = req.body.title;
  console.log(name);

  const index = products.findIndex((product) => {
    return product.title == name;
  });
  console.log(index);

  if (index >= 0) {
    const prd = products[index];
    prd.title = newName;
    res.json(prd);
  } else {
    res.status(404);
  }
  res.json(name);
});

/** Delete product */
app.delete("/api/products/:id", (req, res) => {
  let id = req.params.id;
  let index = products.findIndex((product) => {
    return product.id == Number.parseInt(id);
  });
  console.log(id);
  if (index >= 0) {
    let prd = products[index];
    products.splice(index, 1);
    res.json(prd);
  } else {
    res.status(404);
  }
});

/* -------------- COMPANY MODULE -------------- */
/** Fetch company details based on product name */
app.get("/api/company/product/:name", (req, res) => {
  const name = req.params.name;

  const index = products.findIndex((product) => {
    return product.title == name;
  });
  console.log(index);

  if (index >= 0) {
    const prd = products[index];
    const companyid = prd.companyid;
    const companyIndex = companys.findIndex((company) => {
      return company.companyid == companyid;
    });
    console.log(companyIndex);
    if (companyIndex >= 0) {
      res.json(companys[companyIndex]);
    } else {
      res.status(404);
    }
  } else {
    res.status(404);
  }
});

/** Fetch all companies data */
app.get("/api/company", (req, res) => {
  res.json({
    companys,
  });
});

/** Delete company by ID */
app.delete("/api/company/:id", (req, res) => {
  let id = req.params.id;
  let index = companys.findIndex((company) => {
    return company.companyid == Number.parseInt(id);
  });
  console.log(id);
  if (index >= 0) {
    let prd = companys[index];
    companys.splice(index, 1);
    res.json(prd);
  } else {
    res.status(404);
  }
});

/** Fetch all products of a company:localhost:3000/api/company/allproducts */
app.get("/api/company/allproducts", (req, res) => {
  const allproducts = products;
  const copanies = companys;
  const data = [];
  for (var i = 0; i < copanies.length; i++) {
    var name = copanies[i].name;
    var productNames = "";
    for (var j = 0; j < copanies[i].productid.length; j++) {
      const index = products.findIndex((product) => {
        return product.id == copanies[i].productid[j];
      });

      productNames += products[index].title + ",";
    }
    var jsonData = {
      "Company Name": name,
      "Product Names": productNames,
    };
    data.push(jsonData);
  }
  res.json(data);
});

/** Delete Company */
app.delete("/api/company/:id", (req, res) => {
  let id = req.params.id;
  let index = companys.findIndex((company) => {
    return company.companyid == Number.parseInt(id);
  });
  console.log(id);
  if (index >= 0) {
    let prd = companys[index];
    companys.splice(index, 1);
    res.json(prd);
  } else {
    res.status(404);
  }
});

/* -------------- Saller MODULE -------------- */
/** Fetch Saller details based on product name : localhost:3000/api/saller/Portable Projector*/
app.get("/api/saller/products/:name", (req, res) => {
  const name = req.params.name;
  const index = products.findIndex((product) => {
    return product.title == name;
  });

  if (index >= 0) {
    const prd = products[index];
    const a = [];
    var id = prd.sellerid;
    // const prd
    for (var i = 0; i < id.length; i++) {
      const Sindex = sallers.findIndex((saller) => {
        return saller.sallerid == id[i];
      });
      a.push(sallers[index]);
    }
    res.json(a);
  } else {
    res.status(404);
  }
});

/** Fetch all products of a seller */
app.get("/api/saller/allproducts", (req, res) => {
  const allproducts = products;
  // const sallers = sallers
  const data = [];
  for (var i = 0; i < sallers.length; i++) {
    var name = sallers[i].name;
    var productNames = "";
    for (var j = 0; j < sallers[i].productid.length; j++) {
      const index = products.findIndex((product) => {
        return product.id == sallers[i].productid[j];
      });

      productNames += products[index].title + ",";
    }
    var jsonData = {
      "Company Name": name,
      "Product Names": productNames,
    };
    data.push(jsonData);
  }
  res.json(data);
});

/** Delete saller by ID */
app.delete("/api/saller/:id", (req, res) => {
  let id = req.params.id;
  let index = sallers.findIndex((saller) => {
    return saller.sellerid == Number.parseInt(id);
  });
  console.log(index);
  if (index >= 0) {
    let prd = sallers[index];
    sallers.splice(index, 1);
    res.json(prd);
  } else {
    res.status(404);
  }
});

/** Fetch all companies data */
app.get("/api/saller", (req, res) => {
  res.json({
    sallers,
  });
});

// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

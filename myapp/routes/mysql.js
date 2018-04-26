var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "ilab.engr.utk.edu",
  user: "awimber1",
  password: "awimber1@IE421"
});

con.connect(function(err) {
    if (err) {
      // throw err;
    }
    console.log("Connected!");
    //res.send('MySQL::Connected!');
  });

/* GET users listing. */
router.get('/member', function(req, res, next) {
	con.query("SELECT * FROM awimber1.member order by f_name", function (err, result, fields) {
    if (err) {
      // throw err;
    }
    // console.log(result);
    res.send(result);
    //res.send('MySQL::Got Data!');
  });
});


/* Post student data. */
router.post('/member', function(req, res, next) {
  var sql = con.query("INSERT INTO awimber1.member set ? ", req.body, function (err, result, fields) {
    if (err) {
      //throw err;
      res.send(400); // send an error 
    } else {      
      console.log(sql);
      // res.send(result);
      res.json({"status": "OK"}); // your own code
    }
  });
});

/* Search */
router.post('/search_venue', function(req, res, next) {  
  var venue = '%' + (req.body.v_name) + '%'; // add % 
  // console.log("stu: " + stu);
  var sql = con.query("SELECT v_name,city FROM awimber1.venue where vname,city like ? ", venue, function (err, result, fields) {
    if (err) {
      // throw err;
    }
    
    console.log(sql);
    res.send(result);
  });
});

/* login */
router.post('/login', function(req, res, next) {
  var utid =  req.body.utid;
  var name =  req.body.student_name;
  var stmt =  "SELECT * FROM awimber1.student where  utid =  " + utid + " and student_name='" + name + "'";
  var sql = con.query( stmt, function (err, result, fields) {
    if (err) {
      // throw err;
      res.sendStatus(401); // send an error 
    } else{
      console.log(sql);
      
      if (result.length >0) {
        if (result)
          res.send(result);
        else
          res.sendStatus(401);
        // res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }
    }    
    // res.send(result);
  });
});


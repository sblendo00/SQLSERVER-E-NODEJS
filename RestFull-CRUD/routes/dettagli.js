var express = require('express');
var router = express.Router();
const sql = require('mssql');

const config = {
    user: 'sblendorio.christian',  //Vostro user name
    password: 'xxx123#', //Vostra password
    server: "213.140.22.237",  //Stringa di connessione
    database: 'sblendorio.christian', //(Nome del DB)
}

let executeQuery = function (res, query, next) {
  sql.connect(config, function (err) {
    if (err) { //Display error page
      console.log("Error while connecting database :- " + err);
      res.status(500).json({success: false, message:'Error while connecting database', error:err});
      return;
    }
    var request = new sql.Request(); // create Request object
    request.query(query, function (err, result) { //Display error page
      if (err) {
        console.log("Error while querying database :- " + err);
        res.status(500).json({success: false, message:'Error while querying database', error:err});
        sql.close();
        return;
      }
      MandaPug(res, result.recordset);
      return;
    });
    
  });
}

        function MandaPug(res, recordset) {
            let re = recordset[0];
            res.render('dettagli', {
                title: `${re.Unit}`,
                re: re,
            });
            
        }

        /* GET home page. */
        router.get('/:unit', function (req, res, next) {
              let sqlQuery = `select * from dbo.[cr-unit-attributes] where Unit = '${req.params.unit}'`;
            executeQuery(res, sqlQuery, next);
    });

    module.exports = router;

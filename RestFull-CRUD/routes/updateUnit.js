var createError = require('http-errors'); //Importo la libreria per la gestione degli errori
var express = require('express');
var router = express.Router();
const sql = require('mssql');

const config = {
    user: 'sblendorio.christian',  //Vostro user name
    password: 'xxx123#', //Vostra password
    server: "213.140.22.237",  //Stringa di connessione
    database: 'sblendorio.christian', //(Nome del DB)
}

//Function to connect to database and execute query
let executeQuery = function (res, query, next) {
    sql.connect(config, function (err) {
        if (err) { //Display error page
            console.log("Error while connecting database :- " + err);
            res.status(500).json({ success: false, message: 'Error while connecting database', error: err });
            return;
        }
        var request = new sql.Request(); // create Request object
        request.query(query, function (err, result) { //Display error page
            if (err) {
                console.log("Error while querying database :- " + err);
                res.status(500).json({ success: false, message: 'Error while querying database', error: err });
                sql.close();
                return;
            }
           res.status(300).json({ success: true, message: 'aggiornamento riuscito'}); 
        });

    });
}



router.post('/up', function (req, res, next) {
    // Add a new Unit  
    let unit = req.body; // risultato della form in ADDUNIT.PUG 
    if (!unit) {  //Qui dovremmo testare tutti i campi della richiesta
        res.status(500).json({ success: false, message: 'Error while connecting database', error: err });
        return;
    }
    // oggetto che contiene la insert
    let sqlUpdate = `UPDATE dbo.[cr-unit-attributes] SET ${unit.Attr} = '${unit.Value}' WHERE Unit = '${unit.Unit}'`;
    executeQuery(res, sqlUpdate, next,);
});

router.get('/', function (req, res, next) {
    res.render('updateUnit', {
        title: 'Aggiorna una unità.',
    })
})

module.exports = router;
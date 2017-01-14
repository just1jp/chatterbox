var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

exports.connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'chat'
});

// exports.usersTB = dbConnection.users;
// exports.friendsTB = dbConnection.friends;
// exports.messagesTB = dbConnection.messages;





// dbConnection.query('truncate ' + tablename, done);
// var queryString = 'SELECT * FROM messages';
        // var queryArgs = [];
/*
dbConnection.query(queryString, queryArgs, function(err, results) {
    // Should have one result:
    expect(results.length).to.equal(1);

    // TODO: If you don't have a column named text, change this test.
    expect(results[0].text).to.equal('In mercy\'s name, three days is all I need.');

    done();
  });
*/
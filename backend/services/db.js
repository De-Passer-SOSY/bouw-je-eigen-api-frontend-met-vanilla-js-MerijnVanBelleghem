const knex = require("knex");
const db = knex ({
    client: "mysql2",
    connection: {
        host: "web0164.zxcs.be",
        user: "adb_merijn",
        password: "fvKVdWMa6fStT7fx5Jmy",
        database: "adb_project_merijn",
    }
});

module.exports = db;
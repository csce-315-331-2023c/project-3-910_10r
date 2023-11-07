const pool = require('../db')
const queries = require('./queries')

const getExcessReport = (req, res) => {
    const {begin_date, end_date} = req.body;
    let excessItems = [];

    pool.query(queries.excessReport, [begin_date, end_date], (error, results) => {
        if (error) {
            // Handle the error gracefully, e.g., by sending an error response
            console.error("Error fetching excess report:", error);
            res.status(500).json({ error: "An error occurred while fetching the excess report." });
        } else {
            for (let i = 0; i < results.rowCount; i++) {
                excessItems.push(results.rows[i].item_name);
            }
            res.send(excessItems);
        }
    });
}

module.exports = {
    getExcessReport,
}
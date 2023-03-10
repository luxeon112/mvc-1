module.exports = {

    getAll: function (props, db) {

        // Build the query WHERE clause dynamically from the props object using db.q
        let whereClause = '';
        let whereClauseValues = [];
        for (const prop in props) {

            // Add WHERE
            if (whereClause === '') {
                whereClause = 'WHERE ';
            }

            if (props.hasOwnProperty(prop)) {
                whereClause += `\`${prop}\` = ? AND `;
                whereClauseValues.push(props[prop]);
            }

            // Remove the last AND
            whereClause = whereClause.slice(0, -5);


        }

        // Build the query
        const query = `SELECT DISTINCT *
                       FROM Courses
                                LEFT JOIN UsersCourses ON Courses.id = UsersCourses.courseId
                           ${whereClause}
                       ORDER BY Courses.title`;


        // Run the query and return the result
        return db.qa(query, whereClauseValues).catch((err) => {
            console.error(err.message);
        })

    }

}

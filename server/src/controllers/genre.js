export const useGenreController = (app, conn) => {
    app.get('/api/genre', (req, res) => {
        const query = "SELECT * FROM genre";
      
        conn.query(query, (err, results) => {
          if (err) {
            console.error("Error fetching genres:", err);
            res.status(500).send("Database query error");
            return;
          }
      
          const genres = results.map(genre => ({
            ID_Genre: genre.ID_Genre,
            name: genre.title,
          }));
      
          res.json(genres);
        });
      });
}
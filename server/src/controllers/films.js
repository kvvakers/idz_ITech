
export const useFilmController = (app, conn) => {

    app.get('/api/films', (req, res) => {
        const { actor, genre, date_start, date_end } = req.query;
      
        let query = `
          SELECT DISTINCT f.* 
          FROM film f
          LEFT JOIN film_actor fa ON f.id_film = fa.fid_film
          LEFT JOIN actor a ON fa.fid_actor = a.id_actor
          LEFT JOIN film_genre fg ON f.id_film = fg.fid_film
          LEFT JOIN genre g ON fg.fid_genre = g.id_genre
          WHERE 1=1`;
      
        const params = [];
        if (actor) {
          query += " AND a.name = ?";
          params.push(actor);
        }
        if (genre) {
          query += " AND g.title = ?";
          params.push(genre);
        }
        if (date_start) {
          query += " AND f.date >= ?";
          params.push(new Date(date_start).toISOString().split('T')[0]); 
        }
        if (date_end) {
          query += " AND f.date <= ?";
          params.push(new Date(date_end).toISOString().split('T')[0]); 
        }
      
        conn.query(query, params, (err, results) => {
          if (err) {
            console.error("Error fetching films:", err);
            res.status(500).send("Database query error");
            return;
          }
          
          res.json(results);
        });
      });
}
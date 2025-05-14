export const useActorController = (app, conn) => {
  app.get("/api/actor", (req, res) => {
    const query = "SELECT * FROM actor";

    conn.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching actors:", err);
        res.status(500).send("Database query error");
        return;
      }
      res.json(results);
    });
  });
};

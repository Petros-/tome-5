// for the routes which CRUD the artworks database

// get all artworks
router.get("/", (req, res, next) => {

});

// create a new artwork
router.post("/", (req, res, next) => {

});

// edit an artwork
router.put("/:id", (req, res, next) => {

});

// view a single artwork
router.get(":id", (req, res, next) => {

});

// delete an artwork
router.delete("/artwork/:id", (req, res, next) => {

});

// view all artworks by tag
// why do I have this in both places?
router.get("/tags/:id", (req, res, next) => {

});
function getComponents(req, res) {
    res.json({
        components: [],
    });
}

function postComponents(req, res) {
    res.json({});
}

function setup(app) {
    app.get('/api/components', getComponents);
    app.post('/api/components/:id', postComponents);
}

module.exports = {
    setup,
};

module.exports = function (app, models) {
    app.get('/', (req, res) => {
        models.Event.findAll({ order: [['createdAt', 'DESC']] }).then(events => {
            res.render('events-index', { events:events });
        })
    })

    app.get('/events/:id', (req, res) => {
        models.Event.findByPk(req.params.id, { include: [{ model: models.Rsvp }] }).then(event => {
            res.render('events-show', { event: event });
        }).catch((err) => {
            console.log(err.message);
        })
    });
}
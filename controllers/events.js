module.exports = function (app, models) {
    const moment=require('moment');
    
    app.get('/', async (req, res) => {
        let events = await models.Event.findAll({ order: [['createdAt', 'DESC']] });
        res.render('events-index', { events:events });
    })

    app.get('/events/:id', async (req, res) => {
        let event = await models.Event.findByPk(req.params.id, { include: [{ model: models.Rsvp }] })
        let createdAt = event.createdAt;
        createdAt = moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
        event.createdAtFormatted = createdAt;
        res.render('events-show', { event: event });
    });
}

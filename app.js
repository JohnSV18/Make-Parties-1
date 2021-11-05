const models = require('./db/models')
const express = require('express');
const app = express();

//require handlebars
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
// Initialize body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true}));
//use main as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars)}));
// use handlebars to render
app.set('view engine', 'handlebars');

// GETS ALL EVENTS AND DISPLAYS THEM
app.get('/', (req, res) => {
    models.Event.findAll({ order: [['createdAt', 'DESC']] }).then(events => {
      res.render('events-index', { events: events});
    })
  })

app.get('/events/new', (req, res) => {
  res.render('events-new', {})
})
//Create
app.post('/events', (req, res) => {
  models.Event.create(req.body).then(event => {
    res.redirect(`/events/${event.id}`);
  }).catch((err) => {
    console.log(err)
  });
})
// SHOW
app.get('/events/:id', (req, res) => {
  // find an event by it's id that was passed through req.params
  models.Event.findByPk(req.params.id).then((event) => {
    res.render("events-show", { event:event })
  }).catch((err) => {
    console.log(err.message)
  })
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server listening on port 3000!')
})
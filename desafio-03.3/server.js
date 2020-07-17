const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const cards = require('./data-pages')
const about = {
    photo_url: "https://avatars0.githubusercontent.com/u/28929274?s=200&v=4",
    title: "Rocketseat",
    description: "Mais do que uma plataforma de educação em tecnologia, somos uma comunidade incrível de programadores em busca do próximo nível 🚀",
    main_technologies: [
        { name: "NodeJs" },
        { name: "ReactJs" },
        { name: "React Native" },
        { name: "C#" },
        { name: "Xamarin" }
    ],
    links: [
        { name: "Github", url: "https://github.com/Rocketseat" },
        { name: "Instagram", url: "https://www.instagram.com/rocketseat_oficial/?hl=pt-br" },
        { name: "Facebook", url: "https://www.facebook.com/rocketseat" }
    ]
}

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
})
server.get('/', (req, res) => {
    return res.render('content', { cards, about })

})
server.get('/about', (req, res) => {

    return res.render('about', { about })

})
server.get('/course/:id', (req, res) => {
    const id = req.params.id

    const course = cards.find((card) => {
        return card.title == id
    })
    if (!course)
        return res.status(404).render("not-found", { video: "Curso não encontrado" })

    return res.render('course', { card: course, about })
})
server.use((req, res) => {
    res.status(404).render("not-found", { video: "Página não encontrada" });
});

server.listen(3001, () => {
    console.log('server desafio running')
})
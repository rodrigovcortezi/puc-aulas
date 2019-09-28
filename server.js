const path = require('path')
const LRU  = require('lru-cache')
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const routes = require('./routes')
const { createBundleRenderer } = require('vue-server-renderer')
const devServer = require('./setup-dev-server')

const app = express()
const port = process.env.PORT || 3000

const resolve = file => path.resolve(__dirname, file)

const templatePath = resolve('./vue/index.template.html')

let renderer, readyPromise

function createRenderer(bundle, options) {
	renderer = createBundleRenderer(bundle, Object.assign(options, {
		runInNewContext: false // recommended
	}))
}

readyPromise = devServer(app, templatePath, createRenderer)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger('dev'))

// app.use('/classes', routes.collegeClass)

function render(req, res) {
	const s = Date.now()

	res.setHeader("Content-Type", "text/html")

	const handleError = err => {
		if (err.url) {
			res.redirect(err.url)
		} else if(err.code === 404) {
			res.status(404).send('404 | Page Not Found')
		} else {
			// Render Error Page or Redirect
			res.status(500).send('500 | Internal Server Error')
			console.error(`error during render : ${req.url}`)
			console.error(err.stack)
		}
	}

	const context = {
		title: 'Vue HN 2.0', // default title
		url: req.url
	}
	renderer.renderToString(context, (err, html) => {
		if (err) {
			return handleError(err)
		}
		res.send(html)
	})
}

app.get('*', (req, res) => {
	readyPromise.then(() => render(req, res))
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

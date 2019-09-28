const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
	res.send('collegeClass [index]')
})

router.get('/:id', (req, res) => {
	res.send('collegeClass [show]')
})

router.post('/', (req, res) => {
	res.send('collegeClass [create]')
})

router.get('/:id/edit', (req, res) => {
	res.send('collegeClass [edit]')
})

router.patch('/:id', (req, res) => {
	res.send('collegeClass [update]')
})

router.delete('/:id', (req, res) => {
	res.send('collegeClass [delete]')
})

module.exports = router

import app from './app'

if (process.env.NODE_ENV !== 'test') {
	app()
		.then(app => {
			const PORT = app.get('PORT')
			app.listen(PORT, () => console.log(`server listening on port ${PORT}`))
		})
		.catch(err => console.error(`An error ocurred initializing the app`, app))
}

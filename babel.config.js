'use strict'

module.exports = function(api) {
	api.cache.never()

	return {
		presets: [['@babel/preset-env'], ['@babel/preset-typescript']],
		plugins: [
			[
				'module-resolver',
				{
					root: ['./'],
					alias: {
						Src: './src'
					}
				}
			]
		],
		env: {
			test: {
				presets: [['@babel/preset-env']]
			}
		}
	}
}

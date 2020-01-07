'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostsSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.string('title')
      // title adında bir kolon ve string
      table.string('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostsSchema

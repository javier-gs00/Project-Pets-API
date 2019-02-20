const { backup } = require('./product_backup')
const { deleteById } = require('./product_delete_by_id')
const { deleteByStoreAndCategory } = require('./product_delete_by_store_and_category')
const { findByCategory } = require('./product_find_by_category')
const { findById } = require('./product_find_by_id')
const { findByName } = require('./product_find_by_name')
const { findByStoreAndCategory } = require('./product_find_by_store_and_category')
const { save } = require('./product_save')
const { updateById } = require('./product_update_by_id')

module.exports = {
  backup,
  deleteById,
  deleteByStoreAndCategory,
  findByCategory,
  findById,
  findByName,
  findByStoreAndCategory,
  save,
  updateById
}

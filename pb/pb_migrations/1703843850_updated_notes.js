/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6zlivh7qpkyrcyj")

  collection.createRule = "@request.auth.id != \"\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6zlivh7qpkyrcyj")

  collection.createRule = "@request.auth.id != \"\" && user.id ?= @request.auth.id"

  return dao.saveCollection(collection)
})

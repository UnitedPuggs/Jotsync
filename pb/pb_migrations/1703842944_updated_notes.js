/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6zlivh7qpkyrcyj")

  collection.listRule = "@request.auth.id != \"\" && user.id ?= @request.auth.id"
  collection.viewRule = ""
  collection.createRule = "@request.auth.id != \"\" && user.id ?= @request.auth.id"
  collection.updateRule = "@request.auth.id != \"\" && user.id ?= @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6zlivh7qpkyrcyj")

  collection.listRule = "user.id = @request.auth.id"
  collection.viewRule = "@request.auth.id != \"\" && user.id ?= @request.auth.id"
  collection.createRule = "user.id = @request.auth.id"
  collection.updateRule = "user.id = @request.auth.id"

  return dao.saveCollection(collection)
})

/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6zlivh7qpkyrcyj")

  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6zlivh7qpkyrcyj")

  collection.viewRule = "@request.auth.id != \"\""

  return dao.saveCollection(collection)
})

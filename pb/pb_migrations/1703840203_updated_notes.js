/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6zlivh7qpkyrcyj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i8nfmtgy",
    "name": "user",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6zlivh7qpkyrcyj")

  // remove
  collection.schema.removeField("i8nfmtgy")

  return dao.saveCollection(collection)
})

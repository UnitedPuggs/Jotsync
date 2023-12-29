/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6zlivh7qpkyrcyj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0qtv2fj4",
    "name": "title",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6zlivh7qpkyrcyj")

  // remove
  collection.schema.removeField("0qtv2fj4")

  return dao.saveCollection(collection)
})

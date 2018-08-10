import { schema, Type as t } from 'lovefield';

const schemaBuilder = schema.create('db', 1);

schemaBuilder.createTable('Poll')
  .addColumn('id', t.INTEGER)
  .addColumn('name', t.STRING)
  .addPrimaryKey(['id'], true);

schemaBuilder.createTable('Option')
  .addColumn('id', t.INTEGER)
  .addColumn('name', t.STRING)
  .addColumn('pollId', t.INTEGER)
  .addForeignKey('fk_PollId', {
    local: 'pollId',
    ref: 'Poll.id'
  })
  .addPrimaryKey(['id'], true);

export function connect() {
  return schemaBuilder.connect();
}

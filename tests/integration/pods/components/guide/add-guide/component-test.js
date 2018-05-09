import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('guide/add-guide', 'Integration | Component | guide/add guide', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{guide/add-guide}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#guide/add-guide}}
      template block text
    {{/guide/add-guide}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

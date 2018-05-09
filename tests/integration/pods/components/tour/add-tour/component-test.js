import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tour/add-tour', 'Integration | Component | tour/add tour', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{tour/add-tour}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tour/add-tour}}
      template block text
    {{/tour/add-tour}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

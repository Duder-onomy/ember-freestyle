import { A } from '@ember/array';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import freestyleGuide from '../pages/freestyle-guide';

moduleForAcceptance('Acceptance | collection rendering', {
  beforeEach() {
    freestyleGuide.visit();
  }
});

test('verifying freestyle collection', (assert) => {
  assert.expect(19);
  andThen(() => {
    let sectionFooThings = freestyleGuide.content.sections.objectAt(0);
    assert.equal(sectionFooThings.subsections.objectAt(0).collections.length, 1);

    let fooCollection = sectionFooThings.subsections.objectAt(0).collections.objectAt(0);
    assert.equal(fooCollection.title, 'Foo Collection');

    // variantListItems have all variants plus an 'all' choice at he front of the list
    assert.equal(fooCollection.variantListItems.length, 7);
    assert.equal(fooCollection.variantListItems.objectAt(0).text, 'all');
    assert.equal(fooCollection.variantListItems.objectAt(1).text, 'normal');
    assert.equal(fooCollection.variantListItems.objectAt(2).text, 'special');
    assert.equal(fooCollection.variantListItems.objectAt(3).text, 'hyper');
    assert.equal(fooCollection.variantListItems.objectAt(4).text, 'classic');
    assert.equal(fooCollection.variantListItems.objectAt(5).text, 'elegant');
    assert.equal(fooCollection.variantListItems.objectAt(6).text, 'tasteful');

    // we start with 'normal' as the default key
    assert.ok(fooCollection.activeVariantListItemLabel('normal'));
    assert.equal(fooCollection.variants.length, 6);

    // which displays only the (first) normal variant
    assert.ok(fooCollection.variants.objectAt(0).annotationContains('A Note About Normal'));
    assert.equal(fooCollection.variants.objectAt(0).usageTitle, 'Normal');

    // and all others are empty
    A([1,2,3,4,5]).forEach((idx) => {
      assert.equal(fooCollection.variants.objectAt(idx).text, '');
    });
  });
});

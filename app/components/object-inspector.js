import Component from '@ember/component';
import { computed, get } from '@ember/object';
export default Component.extend({
  tagName: '',

  propDisplayType: 'grouped',

  trail: computed('model.[]', function () {
    let nested = this.get('model').slice(1);
    if (nested.length === 0) { return ""; }
    return `.${nested.mapBy('property').join(".")}`;
  }),

  isNested: computed('model.[]', function () {
    return this.get('model.length') > 1;
  }),

  actions: {
    popStack() {
      if (this.get('isNested')) {
        this.popMixinDetails();
      }
    },

    sendObjectToConsole(obj) {
      let objectId = get(obj, 'objectId');
      this.get('port').send('objectInspector:sendToConsole', {
        objectId
      });
    },

    setPropDisplay(type) {
      this.set('propDisplayType', type);
    },

    traceErrors() {
      this.get('port').send('objectInspector:traceErrors', {
        objectId: this.get('mixinDetails.objectId')
      });
    }
  }
});

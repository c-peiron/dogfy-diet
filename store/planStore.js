import { defineStore } from 'pinia'

export const usePlanStore = defineStore('plan', {
  state: () => ({
    currentStep: 1,
    testABVariant: null,
    stepsData: {
      step1: { name_dog: ''},
      step2: { name: '' },
      step3: { surname: '' },
      step4: { email: ''},
      step5: { phone: '' },
      step6: { address: '' },
    }
  }),
  actions: {
    cleanData() {
      this.currentStep = 1;
      this.testABVariant = null;
      this.stepsData = {
        step1: { name_dog: '' },
        step2: { name: '' },
        step3: { surname: '' },
        step4: { email: '' },
        step5: { phone: '' },
        step6: { address: '' },
      };
    },
    forceTestABVariant(variant) {
      this.testABVariant = variant;
      this.currentStep = 1;
    }
  },
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
  },
});
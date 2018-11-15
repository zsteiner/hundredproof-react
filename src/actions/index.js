export const saveDilute = diluteData => {
  console.log('dilute action!', diluteData);
  return {
    type: 'SAVE_DILUTE',
    diluteData
  }
}
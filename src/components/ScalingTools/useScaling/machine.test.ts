import { createActor } from 'xstate';

import { scalingMachine } from './machine';

describe('scalingMachine', () => {
  describe('initial context', () => {
    it('should have correct default values', () => {
      const actor = createActor(scalingMachine);
      actor.start();
      const { context } = actor.getSnapshot();

      expect(context.ingredients).toEqual([{ id: 0, value: '' }]);
      expect(context.scalingFactor).toBe(2);
      expect(context.error).toBeUndefined();
      expect(context.showResults).toBe(false);
      expect(context.processedIngredients).toEqual([]);
      expect(context.results).toEqual([]);

      actor.stop();
    });
  });

  describe('SET_INGREDIENTS event', () => {
    it('should update ingredients and recompute derived values', () => {
      const actor = createActor(scalingMachine);
      actor.start();

      actor.send({
        type: 'SET_INGREDIENTS',
        ingredients: [
          { id: 0, value: '2 oz bourbon' },
          { id: 1, value: '' },
        ],
      });
      const { context } = actor.getSnapshot();

      expect(context.ingredients).toHaveLength(2);
      expect(context.processedIngredients).toHaveLength(1);
      expect(context.processedIngredients[0].amount).toBe(2);
      expect(context.processedIngredients[0].unit).toBe('ounce');
      expect(context.processedIngredients[0].ingredient).toBe('bourbon');

      actor.stop();
    });

    it('should auto-append empty row when single item has value', () => {
      const actor = createActor(scalingMachine);
      actor.start();

      actor.send({
        type: 'SET_INGREDIENTS',
        ingredients: [{ id: 0, value: '1 oz rum' }],
      });
      const { context } = actor.getSnapshot();

      expect(context.ingredients).toHaveLength(2);
      expect(context.ingredients[1].value).toBe('');

      actor.stop();
    });

    it('should not auto-append when single item is empty', () => {
      const actor = createActor(scalingMachine);
      actor.start();

      actor.send({
        type: 'SET_INGREDIENTS',
        ingredients: [{ id: 0, value: '' }],
      });
      const { context } = actor.getSnapshot();

      expect(context.ingredients).toHaveLength(1);

      actor.stop();
    });

    it('should compute scaled results based on scaling factor', () => {
      const actor = createActor(scalingMachine);
      actor.start();

      actor.send({
        type: 'SET_INGREDIENTS',
        ingredients: [
          { id: 0, value: '2 oz bourbon' },
          { id: 1, value: '' },
        ],
      });
      const { context } = actor.getSnapshot();

      // Default scaling factor is 2
      expect(context.results).toHaveLength(1);
      expect(context.results[0].amount).toBe(4); // 2 * 2

      actor.stop();
    });
  });

  describe('SET_SCALING_FACTOR event', () => {
    it('should update scaling factor and recompute results', () => {
      const actor = createActor(scalingMachine);
      actor.start();

      actor.send({
        type: 'SET_INGREDIENTS',
        ingredients: [
          { id: 0, value: '2 oz bourbon' },
          { id: 1, value: '' },
        ],
      });

      actor.send({ type: 'SET_SCALING_FACTOR', factor: 3 });
      const { context } = actor.getSnapshot();

      expect(context.scalingFactor).toBe(3);
      expect(context.results[0].amount).toBe(6); // 2 * 3

      actor.stop();
    });
  });

  describe('SET_ERROR event', () => {
    it('should set error code', () => {
      const actor = createActor(scalingMachine);
      actor.start();

      actor.send({ type: 'SET_ERROR', code: 7 });
      expect(actor.getSnapshot().context.error).toBe(7);

      actor.stop();
    });

    it('should clear error', () => {
      const actor = createActor(scalingMachine);
      actor.start();

      actor.send({ type: 'SET_ERROR', code: 7 });
      actor.send({ type: 'SET_ERROR', code: undefined });
      expect(actor.getSnapshot().context.error).toBeUndefined();

      actor.stop();
    });
  });

  describe('SET_SHOW_RESULTS event', () => {
    it('should toggle showResults', () => {
      const actor = createActor(scalingMachine);
      actor.start();

      expect(actor.getSnapshot().context.showResults).toBe(false);

      actor.send({ type: 'SET_SHOW_RESULTS', show: true });
      expect(actor.getSnapshot().context.showResults).toBe(true);

      actor.send({ type: 'SET_SHOW_RESULTS', show: false });
      expect(actor.getSnapshot().context.showResults).toBe(false);

      actor.stop();
    });
  });
});

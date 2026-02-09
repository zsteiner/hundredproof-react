import { createActor } from 'xstate';

import { dilutionMachine } from './machine';

describe('dilutionMachine', () => {
  describe('initial context', () => {
    it('should have correct default values', () => {
      const actor = createActor(dilutionMachine);
      actor.start();
      const { context } = actor.getSnapshot();

      expect(context.amount).toBe(1);
      expect(context.measure).toBe('proof');
      expect(context.unit).toBe('teaspoon');
      expect(context.volume).toBe('start');
      expect(context.startingABV).toBe(100); // convertABV('proof', 50) = 100
      expect(context.desiredABV).toBe(50); // convertABV('proof', 25) = 50
      expect(context.displayMeasure).toBe(50);
      expect(context.displayMeasureUnit).toBe('proof');
      expect(context.error).toBeNull();
      expect(context.showResults).toBe(false);
      expect(context.results).toBeDefined();

      actor.stop();
    });

    it('should compute initial results', () => {
      const actor = createActor(dilutionMachine);
      actor.start();
      const { context } = actor.getSnapshot();

      expect(context.results.resultsOz).toBeDefined();
      expect(typeof context.results.resultsOz).toBe('number');

      actor.stop();
    });
  });

  describe('SET_VOLUME event', () => {
    it('should update volume and recompute results', () => {
      const actor = createActor(dilutionMachine);
      actor.start();

      actor.send({ type: 'SET_VOLUME', volume: 'end' });
      const { context } = actor.getSnapshot();

      expect(context.volume).toBe('end');
      expect(context.results).toBeDefined();

      actor.stop();
    });

    it('should toggle back to start', () => {
      const actor = createActor(dilutionMachine);
      actor.start();

      actor.send({ type: 'SET_VOLUME', volume: 'end' });
      actor.send({ type: 'SET_VOLUME', volume: 'start' });
      const { context } = actor.getSnapshot();

      expect(context.volume).toBe('start');

      actor.stop();
    });
  });

  describe('SET_MEASURE event', () => {
    it('should convert ABV values when switching to abv', () => {
      const actor = createActor(dilutionMachine);
      actor.start();

      const beforeContext = actor.getSnapshot().context;
      const startingABVBefore = beforeContext.startingABV;
      const desiredABVBefore = beforeContext.desiredABV;

      actor.send({ type: 'SET_MEASURE', measure: 'abv' });
      const { context } = actor.getSnapshot();

      expect(context.measure).toBe('abv');
      expect(context.displayMeasureUnit).toBe('abv');
      // Proof to ABV divides by 2
      expect(context.startingABV).toBe(startingABVBefore / 2);
      expect(context.desiredABV).toBe(desiredABVBefore / 2);

      actor.stop();
    });
  });

  describe('SET_AMOUNT event', () => {
    it('should update amount and recompute results', () => {
      const actor = createActor(dilutionMachine);
      actor.start();

      actor.send({ type: 'SET_AMOUNT', amount: '5' });
      const { context } = actor.getSnapshot();

      expect(context.amount).toBe(5);
      expect(context.error).toBeNull();

      actor.stop();
    });

    it('should set error when amount is empty', () => {
      const actor = createActor(dilutionMachine);
      actor.start();

      actor.send({ type: 'SET_AMOUNT', amount: '' });
      const { context } = actor.getSnapshot();

      expect(context.error).toBe(1);
      expect(context.showResults).toBe(false);

      actor.stop();
    });

    it('should set error when amount is zero', () => {
      const actor = createActor(dilutionMachine);
      actor.start();

      actor.send({ type: 'SET_AMOUNT', amount: '0' });
      const { context } = actor.getSnapshot();

      expect(context.error).toBe(1);

      actor.stop();
    });

    it('should clear error when valid amount is set after error', () => {
      const actor = createActor(dilutionMachine);
      actor.start();

      actor.send({ type: 'SET_AMOUNT', amount: '' });
      expect(actor.getSnapshot().context.error).toBe(1);

      actor.send({ type: 'SET_AMOUNT', amount: '3' });
      expect(actor.getSnapshot().context.error).toBeNull();

      actor.stop();
    });
  });

  describe('SET_UNITS event', () => {
    it('should update unit and recompute results', () => {
      const actor = createActor(dilutionMachine);
      actor.start();

      actor.send({ type: 'SET_UNITS', unit: 'ounce' });
      const { context } = actor.getSnapshot();

      expect(context.unit).toBe('ounce');

      actor.stop();
    });
  });

  describe('SET_STARTING_ABV event', () => {
    it('should update startingABV and recompute results', () => {
      const actor = createActor(dilutionMachine);
      actor.start();

      actor.send({ type: 'SET_STARTING_ABV', value: '150' });
      const { context } = actor.getSnapshot();

      expect(context.startingABV).toBe(150);
      expect(context.error).toBeNull();

      actor.stop();
    });

    it('should set error when empty', () => {
      const actor = createActor(dilutionMachine);
      actor.start();

      actor.send({ type: 'SET_STARTING_ABV', value: '' });
      const { context } = actor.getSnapshot();

      expect(context.error).toBe(2);
      expect(context.showResults).toBe(false);

      actor.stop();
    });

    it('should set error 4 when desired >= starting', () => {
      const actor = createActor(dilutionMachine);
      actor.start();

      // Default desiredABV is 50 (proof), set starting to less
      actor.send({ type: 'SET_STARTING_ABV', value: '40' });
      const { context } = actor.getSnapshot();

      expect(context.error).toBe(4);

      actor.stop();
    });

    it('should set error when ABV exceeds max for proof', () => {
      const actor = createActor(dilutionMachine);
      actor.start();

      actor.send({ type: 'SET_STARTING_ABV', value: '250' });
      const { context } = actor.getSnapshot();

      expect(context.error).toBe(6);

      actor.stop();
    });
  });

  describe('SET_DESIRED_ABV event', () => {
    it('should update desiredABV and recompute results', () => {
      const actor = createActor(dilutionMachine);
      actor.start();

      actor.send({ type: 'SET_DESIRED_ABV', value: '30' });
      const { context } = actor.getSnapshot();

      expect(context.desiredABV).toBe(30);

      actor.stop();
    });

    it('should set error 4 when desired >= starting', () => {
      const actor = createActor(dilutionMachine);
      actor.start();

      // Default startingABV is 100 (proof), set desired higher
      actor.send({ type: 'SET_DESIRED_ABV', value: '120' });
      const { context } = actor.getSnapshot();

      expect(context.error).toBe(4);

      actor.stop();
    });
  });

  describe('SET_SHOW_RESULTS event', () => {
    it('should toggle showResults', () => {
      const actor = createActor(dilutionMachine);
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

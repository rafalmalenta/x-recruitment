import seatsReducer, {
  registerSeat,
} from './seatsSlice';

describe('seats reducer', () => {
  const initialState = {
    status: 'idle',
    seats: [
      {
        "id": "s02",
        "cords": {
          "x": 0,
          "y": 2
        },
        "reserved": false
      },
      {
        "id": "s03",
        "cords": {
          "x": 0,
          "y": 3
        },
        "reserved": false
      },
      {
        "id": "s04",
        "cords": {
          "x": 0,
          "y": 4
        },
        "reserved": false
      },
      {
        "id": "s06",
        "cords": {
          "x": 0,
          "y": 6
        },
        "reserved": false
      },]
  };
  it('should handle initial state', () => {
    expect(seatsReducer(undefined, { type: 'unknown' })).toEqual({
      seats: [],
      status: 'idle',
    });
  });

  it('should handle registering', () => {
    const actual = seatsReducer(initialState, increment());
    expect(actual.value).toEqual(4);
  });

  it('should handle decrement', () => {
    const actual = seatsReducer(initialState, decrement());
    expect(actual.value).toEqual(2);
  });

  it('should handle incrementByAmount', () => {
    const actual = seatsReducer(initialState, incrementByAmount(2));
    expect(actual.value).toEqual(5);
  });
});

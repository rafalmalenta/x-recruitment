import {fetchSeats} from "./fetchSeats";
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve([{
            "id": "s02",
            "cords": {
                "x": 0,
                "y": 2
            },
            "reserved": false
        },]),
    })
);

beforeEach(() => {
    fetch.mockClear();
});

test('fetchSeats ',() => {
    it(("works as expected"),async() =>{
        const resp = await fetchSeats();

        expect(fetchSeats).toHaveBeenCalledTimes(1);
        expect(resp[0].id).toBe("s02");

    })
});
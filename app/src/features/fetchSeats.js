// A mock function to mimic making an async request for data
export function fetchSeats() {
    return new Promise((resolve) =>
        fetch('http://localhost:3000/seats').then(response => response.json())
            .then(data=>{
                resolve(data);
        })
    );
}

/* Global Variables */
// Personal API Key for OpenWeatherMap API
const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast?zip=';
const key = '&appid=65c3c175ab4928ffa8bafe2a87b1d3d4&units=metric';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

// Event listener to add function to existing HTML DOM element
let submitBtn = document.getElementById('generate');
submitBtn.addEventListener('click', e => {
	let zip = document.getElementById('zip').value;
	let feelings = document.getElementById('feelings').value;
	//GET Request
	get(baseUrl + zip + key)
	.then(data => {
		// Post Request
		post('/post', {date: newDate, temperature: data.list[0].main.temp, userResponse: feelings});
		updateUITemplate();
	});
});

/* Function to POST data */
  const post = async ( url = '', data = {}) => {

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),     
  });

    try {
        return await response.json();
    } catch(error) {
	console.log("error", error);
    }
}

/* Function to GET Project Data */
const get = async (url = '') => { 
  const request = await fetch(url);
  try {
	  // Transform into JSON
      return await request.json();
  }
  catch(error) {
	  console.log("error", error);
  }
}

const updateUITemplate = async () => {
  const request = await fetch('/get');
  try {
	  document.getElementById('app').style.background = `#${Math.floor(Math.random()*16777215).toString(16)}`;
	  const allData = await request.json();
      document.getElementById('date').innerHTML = `Date: ${allData.date}`;
      document.getElementById('temp').innerHTML = `Temperature: ${allData.temperature} C`;
      document.getElementById('content').innerHTML = `Feeling: ${allData.userResponse}`;
  } catch(error){
	  console.log("error", error);
  }
}

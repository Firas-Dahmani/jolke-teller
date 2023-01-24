const audioElement = document.getElementById('audio');
const button = document.getElementById('button');

// Enable/Disable button
function toggleButton() {
  button.disabled = !button.disabled;
}

// VoiceRSS Speech Function
function tellMe(joke) {
    const jokeString = joke.trim().replace(/ /g, '%20');
    // VoiceRSS Speech Parameters
    VoiceRSS.speech({
      key: '3eb0bae341364e63955ba81accd1d7ab',
      src: jokeString,
      hl: 'en-us',
      r: 0,
      c: 'mp3',
      f: '44khz_16bit_stereo',
      ssml: false,
    });
  }

// Get Jokes from Joke API
async function getJoke () {
  let joke = ''
  const apiUrl = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,racist,sexist,explicit"
  try {
      const getJokeResponse = await fetch(apiUrl)
      const data = await getJokeResponse.json()
      // Check the response
      if(data.setup){
        joke = `${data.setup} ... ${data.delivery} `
      } else {
        joke = data.joke
      }
      // Run Text to speech 
      tellMe(joke)
      // Disable button 
      toggleButton()   
  } catch (error) {
      console.log(error)
  }
}

// Play the joke on clicking the play button
button.addEventListener('click', getJoke)

// Enable the button when the audio complete
audioElement.addEventListener('ended', toggleButton)
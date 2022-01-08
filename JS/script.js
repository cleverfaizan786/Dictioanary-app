//eslint disable
console.log("This is a Dictionary app");

// Declaring variables
const inputText = document.querySelectorAll(".form-control")[0];
const searchBtn = document.getElementById("search");
const partsOfspeech = document.querySelector(".partsOfSpeech");
const spinnerContainer = document.querySelector(".spinnerContainer");
const meaning = document.querySelector(".meaning");
const similar = document.querySelector(".synonyms");
const synonym = document.querySelector(".titleSynonyms");
const display = document.querySelector(".displayEverything");
const speakerIcon = document.querySelector(".speaker");
const alertDisplay = document.querySelector(".alertSection");

//Fetching data
async function fetchData() {
  const responseData = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${inputText.value}`
  );
  return responseData.json();
}

//Return to multiple event listeners
function returndata() {
  if (inputText.value == "") {
    alertDisplay.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Error!</strong> Please enter a keyword
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
    return;
  }

  const getData = async () => {
    spinnerContainer.innerHTML = `<div class="d-flex justify-content-center">
    <div class="spinner-border text-danger" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>
    </div>`;

    const data = await fetchData();
    spinnerContainer.innerHTML = "";
    
    const { meanings } = data[0];
    const { partOfSpeech, definitions } = meanings[0];
    display.setAttribute(
      "style",
      "border:2px solid rgba(0, 0, 0, 0.422);border-radius:3px; height:220px; padding:30px 10px 15px 10px;"
    );
    speakerIcon.classList.add("visible");
    partsOfspeech.textContent = partOfSpeech;
    meaning.textContent = definitions[0].definition;
    similar.innerText = `${definitions[0].synonyms[0]}, ${definitions[0].synonyms[1]}`;
    synonym.textContent = "Similar: ";

    //JSON METHOD:
    // console.log(JSON.stringify(data,null,' '));
  };

  return getData();

}

// Adding Event Listener to button
window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {

   return returndata();
  }
});

searchBtn.addEventListener('click', ()=>{
  return returndata();
})

async function pronounce() {
  let data = await fetchData();
  try {
    if (data[0].phonetics[0] == undefined) {
      alertDisplay.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Not found!</strong> Sorry, no audio available for this query
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;
    } else {
      window.location = data[0].phonetics[0].audio;
      console.clear();
    }
  } catch (e) {
    console.log(e.message);
  }
  inputText.value = "";
}

// select form element, assert type HTMLFormElement
const form = document.querySelector<HTMLFormElement>('#defineform');
// select result container element, assert type HTMLElement
const resultContainer = document.querySelector<HTMLElement>('#definition-result');

// add submit event listener for form
form.addEventListener('submit', async (event: Event) => {
  event.preventDefault(); // prevent form reloading

  // create FormData object from form
  const formData = new FormData(form);
  // get 'defineword' value, assert as string, trim whitespace
  const word = (formData.get('defineword') as string)?.trim();

  try {
    // fetch definition from dictionary API
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
    if (!response.ok) {
      // throw error if response not ok
      throw new Error('word not found. please check spelling and try again.');
    }

    // parse JSON response
    const data = await response.json();
    resultContainer.innerHTML = `<h2>definitions for "${word}":</h2>`;

    // check data is array with meanings
    if (Array.isArray(data) && data[0]?.meanings) {
      // iterate meanings
      data[0].meanings.forEach((meaning: any) => {
        const partOfSpeech = document.createElement('h3');
        partOfSpeech.textContent = meaning.partOfSpeech;
        resultContainer.appendChild(partOfSpeech);

        const definitionList = document.createElement('ul');
        meaning.definitions.forEach((definition: any) => {
          const listItem = document.createElement('li');
          listItem.textContent = definition.definition;
          definitionList.appendChild(listItem);
        });
        resultContainer.appendChild(definitionList);
      });
    } else {
      // show no definitions found message
      resultContainer.innerHTML = `<p class="text-warning">no definitions found.</p>`;
    }
  } catch (error) {
    // show error message
    resultContainer.innerHTML = `<p class="text-danger">error: ${(error as Error).message}</p>`;
  }
});

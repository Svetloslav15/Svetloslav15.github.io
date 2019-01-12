const API_URL = "https://pacific-retreat-49548.herokuapp.com/mews";
const form = document.querySelector('form');
let loadingElement = document.querySelector('.loading');
let mewsElement = document.querySelector('.mews');

loadingElement.style.display = "none";
listAllMews();

form.addEventListener('submit', (event) => {
   event.preventDefault();
   let formData = new FormData(form);
   let name = formData.get('name');
   let content = formData.get('content');
   let mew = {
      name, content
   };

   form.style.display = "none";
   loadingElement.style.display = "";
    fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(mew),
        headers:{
           "content-type": "application/json"
        }
    }).then(res => res.json())
        .then(createdMew => {
            form.reset();
            loadingElement.style.display = "none";
            form.style.display = "";
            mewsElement.textContent = "";
            listAllMews();
        });
});

function listAllMews() {
    fetch(API_URL)
        .then(res => res.json())
        .then(mews => {
            mews.reverse();
            for (let mew of mews) {
                let div = document.createElement('div');
                let header = document.createElement('h3');
                header.textContent = mew.name;
                let contentDiv = document.createElement('p');
                contentDiv.textContent = mew.content;
                let date = document.createElement('p');
                date.textContent = mew.created;
                div.appendChild(header);
                div.appendChild(contentDiv);
                div.appendChild(date);
                div.className = "mew";
                mewsElement.appendChild(div);
            }
        });
}
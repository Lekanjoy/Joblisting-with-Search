const searchBar = document.getElementById("search");
const cardContainer = document.getElementById("card-container");
let jobLists = [];

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredJobs = jobLists.filter((job) => {
    const jobLangString = job.languages.toString().toLowerCase();
    const jobToolString = job.tools.toString().toLowerCase();

    return (
      job.role.toLowerCase().includes(searchString) ||
      job.level.toLowerCase().includes(searchString) ||
      job.location.toLowerCase().includes(searchString) ||
      jobLangString.includes(searchString) ||
      jobToolString.includes(searchString)
    );
  });

  //Displaying only jobs that matches the search text (filtered)
  displayJobLists(filteredJobs);
});

async function loadJobLists() {
  try {
    const response = await fetch("data.json");
    jobLists = await response.json();

    // Displaying the data from the API
    displayJobLists(jobLists);
  } catch (err) {
    console.error(`AN ERROR OCCURRED: ${err} `);
  }
}

loadJobLists(); //Loading the API data by calling the function.

function displayJobLists(jobs) {

  const htmlString = jobs .map((job) => {
    
      return `

 <div class="cards">
          <div class="details">
        
            <div class="logo">
              <img src="${job.logo}" alt="${job.company}">
            </div>
        
            <div class="flex-desk">
              <div class="features">
                <h4>${job.company}</h4>
                <div class="time">
                ${createNewFeatured(job)}
                </div>
              </div>
              <h4>${job.position}</h4>
              <div class="preferences">
                <ul>
                  <li style="list-style: none;">${job.postedAt}</li>
                  <li>${job.contract}</li>
                  <li>${job.location}</li>
                </ul>
              </div>
            </div>
        
          </div>
        
          <div class="roles">
            <p>${job.role}</p>
            <p>${job.level}</p>
            ${langTools(job)}

          </div>
        
 </div>
        
        `;
    })
    .join("");

  cardContainer.innerHTML = htmlString;
}

// Function to loop and display languages and tools
function langTools(job) {
  let outputString = "";

  job.languages.forEach((item) => {
    outputString += `<p>${item}</p>`;
  });

  job.tools.forEach((item) => {
    outputString += `<p>${item}</p>`;
  });

  return outputString;
}

// Function to display new and featured for only boolean true Jobcards
function createNewFeatured(data){
     let outputString = "";
     if (data.new) outputString += '<p class="new" id="new">New!</p>';
     if (data.featured) outputString += '<p>featured</p>';

     return outputString;
 
}





















/* function displayJobLists(jobs) {
  jobs.map((jobCard) => {
    
        function returnCards() {
      const cards = document.createElement("div");
      cards.className = "cards";
      const details = document.createElement("div");
      details.className = "details";
      //1//Details section child starts here
      const logo = document.createElement("div");
      let img = document.createElement("img");
      const flexDesk = document.createElement("div");
      // flexDesk section child here
      const features = document.createElement("div");
      let time = document.createElement("div");
      let new1 = document.createElement("p");
      new1.className = "new";
      let featured = document.createElement("p");

      const h4 = document.createElement("h4");
      const h4Desk = document.createElement("h4");
      const preferences = document.createElement("div");
      let ul = document.createElement("ul");
      let postedAt = document.createElement("li");
      let contract = document.createElement("li");
      let location = document.createElement("li");
      // Details section child ends here

      //2// Roles section child here
      const roles = document.createElement("div");
      roles.className = "roles";

      // Appending all element to their Parent
      const cardContainer = document.getElementById("card-container");
      cardContainer.appendChild(cards);
      cards.appendChild(details);
      cards.appendChild(roles);
      details.appendChild(logo).className = "logo";
      details.appendChild(flexDesk).className = "flex-desk";
      flexDesk.appendChild(features).className = "features";
      flexDesk.appendChild(h4);
      flexDesk.appendChild(preferences).className = "preferences";
      features.appendChild(h4Desk);
      features.appendChild(time).className = "time";
      time.appendChild(new1).className = "new";
      time.appendChild(featured);
      preferences.appendChild(ul);
      ul.appendChild(postedAt);
      ul.appendChild(contract);
      ul.appendChild(location);

      // Appending the textcontent
      logo.appendChild(img).src = jobCard.logo;
      h4Desk.textContent = jobCard.company;

      if (jobCard.new === true) {
        new1.textContent = "NEW!";
      } else {
        new1.style.display = "none";
      }
      if (jobCard.featured === true) {
        featured.textContent = "FEATURED";
      } else {
        featured.style.display = "none";
      }

      h4.textContent = jobCard.position;
      postedAt.textContent = jobCard.postedAt;
      postedAt.style.listStyle = "none";
      contract.textContent = jobCard.contract;
      location.textContent = jobCard.location;

      // Roles, Levels
      let paraRole = document.createElement("p");
      paraRole.textContent = jobCard.role;
      roles.appendChild(paraRole);
      let paraLevel = document.createElement("p");
      paraLevel.textContent = jobCard.level;
      roles.appendChild(paraLevel);

      // Languages
      const languages = jobCard.languages;
      // Looping through all Languagues
      for (const lang of languages) {
        let langPara = document.createElement("p");
        langPara.textContent = lang;
        roles.appendChild(langPara);
      }
      // Tools
      const tools = jobCard.tools;
      // Looping through all Tools
      for (const tool of tools) {
        let toolPara = document.createElement("p");
        toolPara.textContent = tool;
        roles.appendChild(toolPara);
      }
    }

    return returnCards();
  });

};
 */

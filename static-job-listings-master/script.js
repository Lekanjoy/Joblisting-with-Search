const searchBar = document.getElementById('search');
let cardContainer = document.getElementById("card-container");
let jobLists = new Array();

searchBar.addEventListener('keyup', (e) => {
    let searchString = e.target.value.toLowerCase();

   const filteredJobs = jobLists.filter(job => {

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
   
} catch(err) {
        console.error(`AN ERROR OCCURRED: ${err}`);
      };
      
    //   const url = 'data.json';

    //   let response = await fetch(url);
    //   let data = await response.json();

    //    displayJobLists(data)    
};
   
 loadJobLists();//Loading the API data by calling the function.

function displayJobLists(jobs) {

    const htmlString = jobs.map(job => {


        if(job.new === true){
            job.new = 'New'
        };
        
        if (job.new === false) {
            job.new = '';

        };


        return `

        <div class="cards">
        <div class="details">

          <div class="logo">
            <img src="${job.logo}" alt="${job.company}">
          </div>

          <div class="features">
            <h4>${job.company}</h4>
            <p class="new">${job.new}</p>
            <p>${job.featured}</p>
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

        <div class="roles">
          <p>${job.role}</p>
          <p>${job.level}</p>
          <p>${job.languages[0]}</p>
          <p>${job.languages[1]}</p>
          <p>${job.languages[2]}</p>
          <p>${job.tools[0]}</p>
          <p>${job.tools[1]}</p>
        </div>

      </div>
        
        `;
    })
    

    cardContainer.innerHTML = htmlString;
};
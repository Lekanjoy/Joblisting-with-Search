const searchBar = document.getElementById('search');
let cardContainer = document.getElementById("card-container");
let jobLists = new Array();

searchBar.addEventListener('keyup', (e) => {
    let searchString = e.target.value.toLowerCase();

   const filteredJobs = jobLists.filter(job => {

    //    jobLists.forEach(lang => {
    //     let lang1 = lang.languages
    //     console.log(lang1[1]);

    //    })
  

     return (
       job.role.toLowerCase().includes(searchString) ||
       job.level.toLowerCase().includes(searchString) ||
       job.location.toLowerCase().includes(searchString)
    //    job.languages[0].toLowerCase().includes(searchString) ||
    //    job.languages[1].toLowerCase().includes(searchString) ||
    //    job.languages[2].toLowerCase().includes(searchString)
     ); 

   });

    displayJobLists(filteredJobs);
});




async function loadJobLists() {

try {
    const response = await fetch("data.json");
    jobLists = await response.json();
    displayJobLists(jobLists); 



    
} catch(err) {
        console.error(`AN ERROR OCCURRED: ${err}`);
      };
      

};
   
 loadJobLists();//The json data is automatically loaded as window is opened

function displayJobLists(jobs) {

    const htmlString = jobs.map(job => {

        if(job.new === true){
            job.new = 'New'
        };
        
        if (job.new === false) {
          job.new = ''
        };

        if (job.featured === true) {
          job.featured = "Featured";
        };

        if (job.featured === false) {
          job.featured = "";
        };


        return  `

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
        </div>

      </div>
        
        `;
    })
    

    cardContainer.innerHTML = htmlString;
};
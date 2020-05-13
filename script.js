// 1. Add code that runs on the window load event.
// This is done because we can't interact with the HTML elements until the page has loaded.
window.addEventListener('load',function(){
    function getSortOrder(hoursInspace) {    
        return function(currentValue, nextValue) {  
            //if current value is greater than next value return 1  
            if (currentValue[hoursInspace] > nextValue[hoursInspace]) {    
                return 1;    
            }
            //if current value is less than the next value return -1 
            else if (currentValue[hoursInspace] < nextValue[hoursInspace]) {    
                return -1;    
            }    
            return 0;    
        }    
    } 
    // 2. Make a GET request using fetch to the astronauts API https://handlers.education.launchcode.org/static/astronauts.json
    // Do this part inside the load event handler.   
    fetch("https://handlers.education.launchcode.org/static/astronauts.json").then(function(response){
    return response.json();
    }).then(function(json){
        console.log(json);
        //Display the astronauts sorted from most to least time in space.
        json.sort(getSortOrder('hoursInSpace'));
        const container = document.getElementById('container');
        let people = '';
        //Add a count of astronauts to the page.
        let count=0;
        // 3. Add each astronaut returned to the web page.
        for (let person of json){
        //Make the "Active: true" text green, for astronauts that are still active (active is true).
            let isActive=person.active;
            let liClass='';
            if(isActive){
                liClass='class="active"';
            }
            people += 
            `<div class="astronaut">
                <div class="bio">
                    <h3>${person.firstName} ${person.lastName}</h3>
                        <ul>
                            <li>Hours in space: ${person.hoursInSpace}</li>
                            <li><span ${liClass}>Active: ${person.active}</span></li>
                            <li>Skills: ${person.skills.join(', ')} </li>
                        </ul>
                </div>
                <img class="avatar" src="${person.picture}">
            </div>`;
            count++;
        }
        
        container.innerHTML = `<h5 class="astronaut-count">Total Astronauts: ${count}</h5>`+people;

    });


});
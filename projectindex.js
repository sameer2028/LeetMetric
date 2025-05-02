document.addEventListener("DOMContentLoaded",function(){
    const searchButton=document.getElementById("search-button");
    const usernameInput=document.getElementById("user-input");
    const statsContainer=document.querySelector(".stats-container");
    const easyProgressCircle=document.querySelector(".easy-progress");
    const mediumProgressCircle=document.querySelector(".medium-progress");
    const hardProgressCircle=document.querySelector(".hard-progress");
    const easyLabel=document.getElementById("easy-label");
    const mediumLabel=document.getElementById("medium-label");
    const hardLabel=document.getElementById("hard-label");
    const cardsStatsContainer=document.querySelector(".stats-cards");

    //return true or false based on regex
    function validateUsername(username){
        if(username.trim()===""){
            alert("Enter username");
            return false;
        }
        const regex=/^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching=regex.test(username);
        if(!isMatching){
            alert("Invalid username");
        }
        return isMatching;
    }

    async function fetchUserDetails(username) {
      
        try{
            searchButton.textContent="Searching...";
            searchButton.disabled=true;
            

            const url=`https://leetcode-stats-api.herokuapp.com/${username}`;

            const response=await fetch(url);

            if(!response.ok){
                throw new Error("Internal Server error");
            }
            const data = await response.json();
            console.log("Logging data: ",data);
            displayUserData(data);

        }
        catch(error){
            statsContainer.innerHTML=`<p> ${error.message}</p>`
        }
        finally{
            searchButton.textContent="Search";
            searchButton.disabled=false;
        }
    }

    function updateProgress(solved,total,label,circle){
        const progressDegree=(solved/total)*100;
        circle.style.setProperty("--progress-degree",`${progressDegree}%`);
        label.textContent=`${solved}/${total}`;
    }


        function displayUserData(data){
           const totalQuestion=data.totalQuestions;
           const totalSolve=data.totalSolved;
           const hardsolve=data.hardSolved;
           const easysolve=data.easySolved;
           const mediumsolve=data.mediumSolved;
           const totalhard=data.totalHard;
           const totalmedium=data.totalMedium;
           const totaleasy=data.totalEasy;
           const acceptance=data.acceptanceRate;
           const rank=data.ranking;
           const contribution=data.contributionPoints;

           updateProgress(easysolve,totaleasy,easyLabel,easyProgressCircle);
           updateProgress(mediumsolve,totalmedium,mediumLabel,mediumProgressCircle);
           updateProgress(hardsolve,totalhard,hardLabel,hardProgressCircle);


        const cardData=[
            {label: "Overall Submissions", value:totalSolve },
            {label: " Easy Submissions", value:easysolve },
            {label: " Medium Submissions", value:mediumsolve },
            {label: " Hard Submissions", value:hardsolve },
            {label: "Ranking", value:rank },
            {label: "Acceptance rate", value:acceptance+"%" }
             
        ];

        cardsStatsContainer.innerHTML = cardData.map(
            data => {
                return `<div class="card">
                <h4>${data.label}</h4>
                <p>${data.value}</p>
                </div> `
            }
        ).join("")
}
    

  


    searchButton.addEventListener('click',function(){
        const username=usernameInput.value;
        console.log("hii",username);
        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    })
})
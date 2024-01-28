
let rowData = document.getElementById('rowData');
let categ = document.getElementById('categ');
let area = document.getElementById('area');
let ingredients = document.getElementById('ingredients');
let searchLink = document.getElementById('searchLink');
let searchContainer = document.getElementById('searchContainer')
let contactLink = document.getElementById('contactLink');
let submitBtn;

$(document).ready(()=>{

    searchByName('').then(()=>{
        
        $('.loading').fadeOut(500)
        $('body').css('overflow' , 'visible')

    })

})

function openSideBar(){

    $('.side-nav-bar').animate({left :'0px'} , 500 )
    
    $('.open-close-icon').removeClass('fa-align-justify');
    $('.open-close-icon').addClass('fa-x');

    for(let i = 0 ; i < 5 ; i++ ){

        $('.links li').eq(i).animate({top : '0px'} 
        
        ,(i+5)*150 )


    }



}


function closeSideBar(){

    let navBodyWidth = $('.nav-body').outerWidth()
    
    $('.side-nav-bar').animate({left : -navBodyWidth } , 500 )

    $('.open-close-icon').addClass('fa-align-justify');
    $('.open-close-icon').removeClass('fa-x');

    
    $('.links li').animate({top : '300px'} , 500)

    
}

$('.side-nav-bar i.open-close-icon').on('click' , function(){

 
 if($('.side-nav-bar').css('left') == '0px'){

 
   closeSideBar()
    

 }

else{

   openSideBar();

}

})


closeSideBar();


async function searchByName(item){

let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
 
finalResponse = await response.json();


displayMeals(finalResponse.meals)


}

// searchByName('')



function displayMeals(arr){

    let cartona = '';

    for( let i = 0 ; i < arr.length ; i++ ){

       cartona += `
             
       <div class="col-md-3">
                    
       <div onclick="getMealsDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">

           <img class="w-100" src="${arr[i].strMealThumb}" alt="">

           <div class="meal-layer position-absolute d-flex align-items-center p-2">
                   
               <h3>${arr[i].strMeal}</h3>

           </div>


       </div>

   </div>
       
       `

    }


    rowData.innerHTML = cartona;


}



async function getCategories(){

    searchContainer.innerHTML = ''


   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
   finalResponse = await response.json()
   displayCategories(finalResponse.categories)


}

 categ.addEventListener('click' , function(){

    getCategories();


 })



 function displayCategories(arr){


    let cartona = '';

    for( let i = 0 ; i < arr.length ; i++ ){

       cartona += `
             
       <div class="col-md-3">
                    
       <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">

           <img class="w-100" src="${arr[i].strCategoryThumb}" alt="">

           <div class="meal-layer position-absolute text-center p-2">
                   
               <h3>${arr[i].strCategory}</h3>

               <p>${arr[i].strCategoryDescription.split(' ').slice(0,20).join(' ')}</p>

           </div>


       </div>

   </div>
       
       `

    }


    rowData.innerHTML = cartona;

       

 }


 async function getArea(){

    searchContainer.innerHTML = ''


   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
   finalResponse = await response.json();
//    console.log(finalResponse.meals);
   displayArea(finalResponse.meals)


 }


 area.addEventListener('click' , function(){

    getArea();
 })


 function displayArea(arr){


    let cartona = '';

    for( let i = 0 ; i < arr.length ; i++ ){

       cartona += `
             
       <div class="col-md-3">
                    
       <div onclick="getAreaMeals('${arr[i].strArea}')" class="meal rounded-2 text-center cursor-pointer">


           <i class="fa-solid fa-house-laptop fa-5x"></i>
                   
           <h3>${arr[i].strArea}</h3>


        </div>

   </div>
       
       `

    }


    rowData.innerHTML = cartona;



 }



 async function getIngredients(){

    searchContainer.innerHTML = ''

     let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
     finalResponse = await response.json();
    //  console.log(finalResponse.meals);
     displayIngredients(finalResponse.meals.slice(0,20))


 }

 ingredients.addEventListener('click' , function(){

    getIngredients();
 })


 function displayIngredients(arr){

    let cartona = '';

    for( let i = 0 ; i < arr.length ; i++ ){

       cartona += `
             
       <div class="col-md-3">
                    
       <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="meal rounded-2 text-center cursor-pointer">


          <i class="fa-solid fa-drumstick-bite fa-5x"></i>

           <h3>${arr[i].strIngredient}</h3>

           <p>${arr[i].strDescription.split(' ').slice(0,20).join(' ')}</p>


        </div>

   </div>
       
       `

    }


    rowData.innerHTML = cartona;




 }

async function getCategoryMeals(category){
   
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    finalResponse = await response.json();
    // console.log(finalResponse);
    displayMeals(finalResponse.meals.slice(0,20))

}



async function getAreaMeals(area){
   
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    finalResponse = await response.json();
    // console.log(finalResponse);
    displayMeals(finalResponse.meals.slice(0,20))

}



async function getIngredientsMeals(ingredient){

   
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    finalResponse = await response.json();
    // console.log(finalResponse);
    displayMeals(finalResponse.meals.slice(0,20))

}


async function getMealsDetails(mealId){

    searchContainer.innerHTML = ''

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);

    finalResponse = await response.json();

    displayMealsDetalis(finalResponse.meals[0])


}


function displayMealsDetalis(meal){

    searchContainer.innerHTML = ''



    let ingredients = ``

    for(let i = 1 ; i <= 20 ; i++){

     if(meal[`strIngredient${i}`]){

        ingredients+= `
        
        <li class="alert alert-secondary m-2"> ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]} </li>

        `
              

     }

    }

    let tags = meal.strTags?.split( "," )


    if(!tags) tags = [];

    let tagsStr = ''



    for(let i = 0 ; i< tags.length ; i++){

          tagsStr += `
                
          <li class="alert alert-danger">${tags[i]}</li>
          
          `


    }

    
    let cartona = `
    
    
    
    <div class="col-md-4">

    <img class="w-100 rounded-2" src="${meal.strMealThumb}" alt="">

    <h2>${meal.strMeal}</h2>


   </div>

   <div class="col-md-8">

    <h2>Instructions</h2>

    <p>${meal.strInstructions}</p>

     
    <h3> <span class="fw-bold">Area :</span> ${meal.strArea} </h3>

    <h3> <span class="fw-bold">Category :</span> ${meal.strCategory} </h3>

    <h3>Recipes : </h3>

    <ul class="list-unstyled d-flex flex-wrap g-4">

        ${ingredients}


    </ul>


    <h3> Tags : </h3>

    <ul class="list-unstyled">

        ${tagsStr}

    </ul>

      <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>

      <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>



   </div>
    
    
    
    `


    rowData.innerHTML=cartona;


}


searchLink.addEventListener('click' , function(){

  showSearchInputs();

})




function showSearchInputs(){

    searchContainer.innerHTML = `



        <div class="row py-4">

            <div class="col-md-6">

                <input oninput="searchByNameInput(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">

            </div>

            <div class="col-md-6">

                <input oninput="searchByFirstLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">

            </div>

        </div>
    


`


rowData.innerHTML=""

}


async function searchByNameInput(term){

let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)

finalResponse =await response.json()

finalResponse.meals ? displayMeals(finalResponse.meals) : displayMeals([])



}


async function searchByFirstLetter(term){

    if(term == ''){

            term = 'a';
    }

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    
    finalResponse =await response.json()
    
    finalResponse.meals ? displayMeals(finalResponse.meals) : displayMeals([])
    
    
    
    }




    contactLink.addEventListener('click' , function(){

    showContact();


    })



    function showContact(){

     rowData.innerHTML = `
     
     
     
    <div class="contact min-vh-100 d-flex justify-content-center align-items-center">

    <div class="container w-75 text-center">

     <div class="row g-4">

         <div class="col-md-6">

             <input id="nameInput" oninput="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">

             <div id="alertName" class="alert alert-danger mt-1 w-100 d-none">

             Special characters and numbers not allowed

             
             </div>


         </div>

         <div class="col-md-6">

             <input id="emailInput" oninput="inputsValidation()" type="email" class="form-control" placeholder="Enter Your Email">


             <div id="alertEmail" class="alert alert-danger mt-1 w-100 d-none">

             Email not valid *exemple@yyy.zzz

             
             </div>


         </div>

         <div class="col-md-6">

             <input id="phoneInput" oninput="inputsValidation()" type="number" class="form-control" placeholder="Enter Your Phone">
              
             <div id="alertPhone" class="alert alert-danger mt-1 w-100 d-none">

             Enter valid Phone Number

             
             </div>



         </div>

         <div class="col-md-6">

             <input id="ageInput" oninput="inputsValidation()" type="number" class="form-control" placeholder="Enter Your Age">

             <div id="alertAge" class="alert alert-danger mt-1 w-100 d-none">

             Enter valid age

             
             </div>


         </div>

         <div class="col-md-6">

             <input id="passwordInput" oninput="inputsValidation()" type="password" class="form-control" placeholder="Enter Your Password">
            
             <div id="alertPassword" class="alert alert-danger mt-1 w-100 d-none">

             Enter valid password *Minimum eight characters, at least one letter and one number:*

             
             </div>

         </div>

         <div class="col-md-6">

             <input id="repasswordInput" oninput="inputsValidation()" type="password" class="form-control" placeholder="Repassword">
           
             <div id="alertRepassword" class="alert alert-danger mt-1 w-100 d-none">

             Enter valid repassword
             
             </div>


         </div>


     </div>

     <button id="submitBtn" disabled class="btn btn-outline-danger mt-3">Submit</button>

          
    </div>

</div>

     
    
     
     
     `

   submitBtn = document.getElementById('submitBtn')



   document.getElementById('nameInput').addEventListener('focus' , function(){
       
    nameInputFocus = true;


})



document.getElementById('emailInput').addEventListener('focus' , function(){
  
   emailInputFocus = true;

})



document.getElementById('phoneInput').addEventListener('focus' , function(){
  
phoneInputFocus = true;

})



document.getElementById('ageInput').addEventListener('focus' , function(){
  
ageInputFocus = true;

})



document.getElementById('passwordInput').addEventListener('focus' , function(){
  
passwordInputFocus = true;

})



document.getElementById('repasswordInput').addEventListener('focus' , function(){
  
repasswordInputFocus = true;
})




    }


    let nameInputFocus = false;
    let emailInputFocus = false;
    let phoneInputFocus = false;
    let ageInputFocus = false;
    let passwordInputFocus = false;
    let repasswordInputFocus = false;



function inputsValidation(){

  if(nameInputFocus){

    if( nameValidation() == true  ){

        document.getElementById('alertName').classList.add('d-none')
 
 
     }
 
     else{
 
         document.getElementById('alertName').classList.remove('d-none')
 
 
     }

  }
   
  if(emailInputFocus){
         
     
    if( emailValidation() == true  ){

        document.getElementById('alertEmail').classList.add('d-none')
 
 
     }

    else{
          
        document.getElementById('alertEmail').classList.remove('d-none')


    }


  }

    
   if(phoneInputFocus){
       
    if( phoneValidation() == true  ){

        document.getElementById('alertPhone').classList.add('d-none')
 
 
     }

    else{
          
        document.getElementById('alertPhone').classList.remove('d-none')


    }



   }
   
   if(ageInputFocus){
          
    
    if( ageValidation() == true  ){

        document.getElementById('alertAge').classList.add('d-none')
 
 
     }

    else{
          
        document.getElementById('alertAge').classList.remove('d-none')


    }

   }

  if(passwordInputFocus){
    
     
    if( passwordValidation() == true  ){

        document.getElementById('alertPassword').classList.add('d-none')
 
 
     }

    else{
          
        document.getElementById('alertPassword').classList.remove('d-none')


    }


  }
  
  if(repasswordInputFocus){
    
    
    if( repasswordValidation() == true  ){

        document.getElementById('alertRepassword').classList.add('d-none')
 
 
     }

    else{
          
        document.getElementById('alertRepassword').classList.remove('d-none')


    }

  }



   if( nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation() )

    {
           submitBtn.removeAttribute('disabled')
    }

    else{
       
        submitBtn.setAttribute('disabled' , true)


    }



    }


function nameValidation(){

return  (/^[a-zA-Z ]+$/.test(document.getElementById('nameInput').value))

    }


function emailValidation(){

 return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById('emailInput').value))


    }


    
function phoneValidation(){

return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById('phoneInput').value))
   
}


function ageValidation(){

    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById('ageInput').value))

   }


   
function passwordValidation() {

    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById('passwordInput').value))

}


function repasswordValidation() {

    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value

}

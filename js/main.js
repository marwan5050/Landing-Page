// check local storage color

let colorPick = localStorage.getItem("color-pick");

if(colorPick !== null){
    
 document.documentElement.style.setProperty("--main-color" , colorPick);
 

// remove active class from elment

document.querySelectorAll(".colors-list li").forEach(elment => {
    elment.classList.remove("active");


    // add active class
if(elment.dataset.color === colorPick){

    elment.classList.add("active");
}
});
}




// {[start golbal variables after local storage]}

// custom background images

let randomBackImg = true;

// variable to control random images to stop or work

let backImageInterval;

// [[global variables of light box]]
let imgList =Array.from( document.getElementsByClassName("img-select"));
let lightContainer = document.querySelector(".light-container");
let lightItem = document.querySelector(".light-item");
let nextBut = document.getElementById("next");
let prevBut = document.getElementById("prev");
let closeBut = document.getElementById("close");
let currentIndex;

// [[global variables of setting box]]
let myIcon = document.querySelector(".fa-gear");
let setBox = document.querySelector(".setting-box");
// setting box color
let colorLi = document.querySelectorAll(".colors-list li");
// setting box random img
let randomGround = document.querySelectorAll(".random-back span");

// {landing head images variables}

// get the section wich has bg image
let land = document.querySelector(".landing-page");

// array of images
let images = ["1.jpg" , "2.jpg" , "3.jpg" , "4.jpg" , "5.jpg"];

// rest options variable
let restBut = document.querySelector(".rest");

// [circle bullet variables]

// select all bullets
let allBullets =  document.querySelectorAll(".nav-bullets .bullet");
// select all nav links
let navLinks = document.querySelectorAll(".header-list li a");


// [toggle menu navlinks in responsive variables]

let toggleMenu = document.querySelector(".toggel-icon i ");
let tlinks = document.querySelector(".header-list");

// button scroll to top

let upBut = document.querySelector(".up");




// check local storage random image

let chooseImage = localStorage.getItem("imgPick");

// check localstorage if it not empty

if(chooseImage !== null){

    if(chooseImage === "true"){

        randomBackImg = true;
    } else {

        randomBackImg = false;
    }


 // remove class active from span
 
 document.querySelectorAll(".random-back span").forEach(elment =>{

    elment.classList.remove("active");
 });

if(chooseImage === "true"){

    document.querySelector(".random-back .yes").classList.add("active");

} else {

document.querySelector(".random-back .no").classList.add("active");
}

}


// start box setting

myIcon.addEventListener("click" , function(){
    myIcon.classList.toggle("fa-spin");
});

// close and open sidbar => setting box
myIcon.addEventListener("click" , function(){
    setBox.classList.toggle("open");
});


// change color from sidebar

for(let i = 0; i < colorLi.length; i++){

    colorLi[i].addEventListener("click" , function(e){
        
        chooseC = e.target.getAttribute("data-color");
        document.documentElement.style.setProperty("--main-color" , chooseC)
        
        // set colorPick on local storage
        localStorage.setItem("color-pick" , chooseC);
        

        // remove active class from elment

        e.target.parentElement.querySelectorAll(".active").forEach(elment => {
            elment.classList.remove("active");
        });
        
        // make picked color active

        e.target.classList.add("active");
    });
};



// change random background images

for(let i = 0; i < randomGround.length; i++){

    randomGround[i].addEventListener("click" , function(e){
        
        e.target.parentElement.querySelectorAll(".active").forEach(elment => {
            elment.classList.remove("active");
        });
        
        // make picked color active

        e.target.classList.add("active");

        if(e.target.dataset.background === "yes"){

            randomBackImg = true;
            
            customBack ();

            localStorage.setItem("imgPick" , true);

        } else {
            
            randomBackImg = false;
            
            clearInterval(backImageInterval);

            localStorage.setItem("imgPick" , false);
        }
    });
};


// start random images

// start random image from array

function customBack (){

    if(randomBackImg === true){

        backImageInterval  =  setInterval(() => {

            randomImage = Math.floor(Math.random() * images.length);
            
            
                land.style.backgroundImage = `url(images/${images[randomImage]})`;
                
            }, 5000);
    }
}

customBack ();

// start rest button option

restBut.addEventListener("click" , function(){

    // clear localstorage from every item
    localStorage.clear();

    // reload the page
    document.location.reload();
})


// start light box 

for(let i = 0; i < imgList.length ; i++){
   
    imgList[i].addEventListener("click" , function(e){

        // get index of item to use it in next and prev func
        currentIndex = imgList.indexOf(e.target);
        
        // get src of img to change it with background elment
        imgSrc = e.target.getAttribute("src");

        // make the item block when i click on img
        lightContainer.style.display = 'block';

        // replace background img src
        lightItem.style.backgroundImage = `url(${imgSrc})`;
    })
}

function next(){

    currentIndex++;

    if(currentIndex == imgList.length){

        currentIndex = 0;
    }

    let imgSrc = imgList[currentIndex].getAttribute("src");

    lightItem.style.backgroundImage = `url(${imgSrc})`;
}


function prev(){

    currentIndex--;

    if(currentIndex < 0){

        currentIndex = imgList.length -1;
    }

    let imgSrc = imgList[currentIndex].getAttribute("src");

    lightItem.style.backgroundImage = `url(${imgSrc})`;

}

function close(){

    lightContainer.style.display = 'none';

}

nextBut.addEventListener("click" , next);
prevBut.addEventListener("click" , prev);
closeBut.addEventListener("click" , close);

document.addEventListener("keydown", function(e){

    if(e.key == "ArrowRight"){

        next();
    } else if(e.key == "ArrowLeft"){

        prev();
    } else if(e.key == "Escape"){

        close();
    }
})


// start circle bullet section
// i use one dynamic function for nav and bullets




// dynamic function take one argument 
// once this aygument will be bullets and another will be navlinks

function smothSection(elments){

    for(let i = 0 ; i < elments.length; i++){

        elments[i].addEventListener("click" , function(e){

            // preventDefalult to stop links reload page and go to other pages
            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({
    
                behavior:"smooth"
            })
        })
    }

}


smothSection(allBullets);
smothSection(navLinks);


// toggle menu links

toggleMenu.addEventListener("click" , function(){

    toggleMenu.classList.toggle("menu-active");

    tlinks.classList.toggle("open");
})


document.addEventListener("click" , function(e){

    if(e.target !== toggleMenu && e.target !== tlinks){

        if(tlinks.classList.contains("open")){
            toggleMenu.classList.toggle("menu-active");

            tlinks.classList.toggle("open");
        }               
    }

})

tlinks.addEventListener("click" , function(e){
e.stopPropagation();
})

// start scroll button to top



window.addEventListener("scroll",function(){
    if(this.scrollY >= 500){
      upBut.classList.add("show");
    } else{

        upBut.classList.remove("show");
    }
})

upBut.addEventListener("click" , function(){
    window.scrollTo({
        top:0,
        behavior:"smooth",
    });
});
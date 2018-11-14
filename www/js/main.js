// this is an array of cat names which match the names of the images inside the
// images directory of this project, we'll use it inside the newCatImg function
const catNames = [
    'grumpy-cat',
    'lil-bub',
    'surprise-cat',
    'unicorn-cat'
]

// this is a reference to the cat-pic img in our index page
const mainCat = document.querySelector('#cat-pic')

function newCatImg(){
    // this line creates a new image tag, ex: <img>
    let cat = document.createElement('img')
    // this creates a random number between 0 and 4, which is the length of the
    // catNames array, we floor the random number (round down) to make sure that
    // it's an integer (whole number) so we can use it as an array index value
    let ran = Math.floor( Math.random()*catNames.length )
    // this changes it's src to a random cat, ex: <img src="images/lil-bub.png">
    cat.src = 'images/'+catNames[ran]+'.png'
    // the setAttribute method can be used to set the value of any HTML element
    // attribute, here we use it to set the image's alt value to match the cat
    // name, for ex: <img src="images/lil-bub.png" alt="lil-bub">
    cat.setAttribute( 'alt', catNames[ran] )
    // now we'll change it's style (css) so that it is absolutely positioned
    // somewhere random on our page, with a random size
    cat.style.position = 'absolute'
    cat.style.left = Math.random()*innerWidth + 'px'
    cat.style.top = Math.random()*innerHeight + 'px'
    cat.style.width = Math.random()*200 + 'px'
    // lastly we'll add this new cat image element to our body element
    document.body.appendChild( cat )
}

// each time we click the mainCat img, we'll call the newCatImg() function
mainCat.addEventListener( 'click', newCatImg )

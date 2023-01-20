let wishButton = document.getElementsByClassName("addToWishlist");
let wishlist = [];
let contactForm = document.getElementById("contactForm")


// set a loop to lop through each wishlist button , and add the parent item to the saved list. 
for (let i = 0; i < wishButton.length; i++) {
    wishButton[i].addEventListener("click", function() {
        let parent = this.parentElement;
        let grandparent = parent.parentElement;
        let itemName = grandparent.querySelector('h3');
        console.log(itemName)
        let itemText = itemName.innerHTML

        // Check if the item the user is saving is already in the saved for later page. 
        // If it is, then notify the user.  if not, add item to the list.
        if (wishlist.indexOf(itemText) === -1) {
            wishlist.push(itemText)
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            let wishlistTotal = wishlist.length;
            alert(`${itemText} has been added to your wishlist. \nYour wishlist currently contains ${wishlistTotal} item(s). `)
        } 
        else {
            alert("This item is already saved to your wishlist.")
        }
    });
}

// Define a function to populate the wishlist array with data from localStorage,
// If there is no wishlist in localstorage then set wishlist array as a blank array. 
function arrayOnLoad() {
    let storedWishlist = localStorage.getItem("wishlist");
    if(storedWishlist) {
        wishlist = JSON.parse(storedWishlist);
    } else {
        let wishlist = [];
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
}

// Define a function that will populate the list of saved items in the saveforlater page. 
// Using the wishlist array pulled from localstorage. 
function populateWishlist(){
    wishlist = JSON.parse(localStorage.getItem("wishlist"));
    console.log(wishlist);
    let displayedWishlist = document.getElementById("wishlistUL");

    for (let i = 0; i < wishlist.length; i++) {
        let savedItem = document.createElement("li");
        let arrayItem = wishlist[i];
        savedItem.innerHTML = arrayItem;
        console.log(savedItem);
        savedItem.className = "savedListItem"
        displayedWishlist.appendChild(savedItem);
    }
}

// Define a function to add a comments section to each guitar item, and display any posted comments. 
function addComments() {
    let commentForms = document.getElementsByClassName('commentForm');

    // Loop through all commentform class elements, prevent the default event from happening, 
    for (let i = 0; i < commentForms.length; i++) {
        commentForms[i].addEventListener('submit', function(e) {
        e.preventDefault();

        // Get the comment input values and assign to variables 
        let comment = commentForms[i].querySelector('.comment-input').value;
        let userName = commentForms[i].querySelector('.userName').value;

        // Add defensive programming to ask a user to input a name before posting a comment. 
        if (userName == "") {
            alert("Please enter a user name to post a comment.")
            } else {
                // Define a container for the comments 
                let commentsContainer = commentForms[i].previousElementSibling;
                // Create a new list item for the comment
                let newComment = document.createElement('li');
                newComment.className = "postedComment"
                newComment.innerHTML = '"' + comment + '" - ' + userName;
                commentsContainer.appendChild(newComment);

                // Clear the inputs
                commentForms[i].querySelector('.comment-input').value = '';
                commentForms[i].querySelector('.userName').value = '';
            }
        });
    }
}

// Define a function that will change the value of the like button once clicked , and change it back if clicked again . 
  function likeFunction(likeButton){
    if(likeButton.value == "  Like"){
       likeButton.value = "Liked ❤️";
    }else{
        likeButton.value = "  Like";
    }
  }
  
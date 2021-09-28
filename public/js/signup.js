const signupForm = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#emailSignup').value.trim();
    const password = document.querySelector('#passwordSignup').value.trim();
    const verifyPassword = document.querySelector('#verifyPassword').value.trim(); //we will use this to verify password
    const username = document.querySelector('#nameSignup').value.trim();
    const birth = document.querySelector('#dobSignup').value.trim();

    //send user id to response
    if (email && password && username && birth) {
        console.log("we made it");
        fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ email, password, username, birth }),
            headers: { 'Content-Type': 'application/json' },

            
        }).then(response => {
            console.log(response.json())
            if (response.ok) {
                document.location.replace('/profile');
            } else {
                alert('Failed to sign-up :(');
            }
        })
    }
    if (password !== verifyPassword) {
        alert("Your passwords do not match!")
    }
};
document
    .querySelector('.signup-form')
    .addEventListener('submit', signupForm);
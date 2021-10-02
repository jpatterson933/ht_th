// should separate these so we can only have each one rendered when the user is either logged in then the logout script will work or vice versa
const logout = async () => {
    console.log("testing")
    // Make a POST request to destroy the session on the back end
    const response = await fetch('/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      // If successfully logged out, redirect to the login page
      document.location.replace('/login');
    } else {
      alert(response.statusText + "Please Login to Logout");
      document.location.replace('/login')
    }
  };
  document.querySelector('#logout').addEventListener('click', logout);
document
    .querySelector('.loginForm')
    .addEventListener('submit', loginForm);
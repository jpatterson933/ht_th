let loginForm = async (event) => {
    event.preventDefault();
    const email = document.querySelector('#emailLogin').value.trim();
    const password  = document.querySelector('#passwordLogin').value.trim();
    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password}),
            headers: {'Content-Type': 'application/json'},
        });
        if (!response.ok) {
          alert('FAIL TRY AGAIN!');
        } else {
          document.location.replace('/profile');
        }
    }
};

document.querySelector('.loginForm').addEventListener('submit', loginForm);
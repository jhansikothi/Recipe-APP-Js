document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorEl = document.getElementById('loginError');

    if (!email || !password) {
        errorEl.textContent = 'Both fields are required!';
        return;
    }

    const storedEmail = localStorage.getItem('storedEmail');
    const storedPassword = localStorage.getItem('storedPassword');

    if (email === storedEmail && password === storedPassword) {
        alert('Login successful!');
        window.location.href = '../Recipe/Recipe.html';
    } else {
        errorEl.textContent = 'Invalid email or password!';
    }
});
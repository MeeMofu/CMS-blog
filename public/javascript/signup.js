async function signupForm(event) {
    event.preventDefault();

    const username = $('#username').val().trim();
    const password =$('#password').val().trim();
  
    if (username && password) {
      const response = await fetch('/api/users/', {
        method: 'post',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/login/');
      } else {
          alert('Server error');
      }
    }
}
$('#form-input').submit(signupForm);
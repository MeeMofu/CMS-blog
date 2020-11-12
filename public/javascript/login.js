async function loginForm(event) {
    event.preventDefault();

    const username = $('#username').val().trim();
    const password =$('#password').val().trim();
  
    if (username && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        $('#alert').show();
      }
    }
}
$('#form-input').submit(loginForm);
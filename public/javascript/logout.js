async function logout(){
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            // return to homepage
            document.location.replace('/');
        } else {
            // Mainly for trouble shooting
            alert(response.statusText);
        }
    }

$('#logout').click(logout);
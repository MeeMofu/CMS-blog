async function newpost(event) {
    event.preventDefault();
  
    const title = $('#title').val().trim();
    const content = $('#content').val().trim();
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
async function deletepost(event) {
    const id = $(this).attr('data-post')
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

async function updatePost(event) {
    const content = $('textarea[data-post="'+$(this).attr('data-post')+'"]').val();
    const id = $(this).attr('data-post');
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }

$('#new-post').click(()=>{
    $('#new-post').hide();
    $('#new-field').show();
});

$('.edit').click(function(event){
    // console.log($(this).attr('data-post'));
    $('.edit[data-post="'+$(this).attr('data-post')+'"]').hide();
    $('.card-body[data-post="'+$(this).attr('data-post')+'"]').show();
});

$('#publish').click(newpost);

$('.delete').click(deletepost);

$('.update').click(updatePost);
async function newpost(event) {
    event.preventDefault();
  
    const title = $('#title').val();
    const content = $('#content').val();
  
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

$('#new-post').click(()=>{
    $('#new-post').hide();
    $('#new-field').show();
})

$('.edit').click(function(event){
    // console.log($(this).attr('data-post'));
    $('.edit[data-post="'+$(this).attr('data-post')+'"]').hide();
    $('.card-body[data-post="'+$(this).attr('data-post')+'"]').show();
})

$('#publish').click(newpost)
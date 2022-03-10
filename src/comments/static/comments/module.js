const handleDeleteComment = function(commentId){
  const postId = requestPath.slice(6, -1)

  const xhr = new XMLHttpRequest()
  const method = 'POST'
  const url = '/api/comments/'+ postId +'/del/'+ String(commentId)

  xhr.open(method, url)
  xhr.setRequestHeader('HTTP_X_REQUESTED_WITH', 'XMLHttpRequest')
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  // xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'))
  // xhr.setRequestHeader('HTTP_X_CSRFTOKEN', getCookie('csrftoken'))
  xhr.onload = function(){
    const commentElement = document.getElementById('comment-section')
    loadComments(commentElement)
  }
  xhr.send()
}

const loadComments = function(commentElement){
  const postId = requestPath.slice(6, -1)

  const xhr = new XMLHttpRequest()
  const method = 'GET'
  const url = '/api/comments/'+ postId + '/get'
  const responseType = 'json'

  xhr.responseType = responseType
  xhr.open(method, url)
  xhr.onload = function(){
    var comments = xhr.response.comments
    var commentHtmlStr = ''
    for(var i=0; i<comments.length; i++){
      commentHtmlStr += formatComment(comments[i])
    }
    commentElement.innerHTML = commentHtmlStr
  }
 xhr.send()
}

const formatComment = function(comment){
  if(requestUserIsAuthenticated && requestUser == comment.user){
    var template = `
      <div class='card mb-2'>
        <div class='card-body'>
          <h5 class='card-title'><a href='/users/${comment.user}'>${comment.user}</a></h5>
          <h6 class='card-subtitle'><small class='text-muted'>${comment.created}</small></h6>
          <p class='card-text'>${comment.text.toLowerCase()}</p>
          <button type='button' class='btn btn-danger btn-sm' id='delete-button' onclick='handleDeleteComment(${comment.id})'>delete</button>
        </div>
      </div>`
  }
  else{
    var template = `
      <div class='card mb-2'>
        <div class='card-body'>
          <h5 class='card-title'><a href='/users/${comment.user}'>${comment.user}</a></h5>
          <h6 class='card-subtitle'><small class='text-muted'>${comment.created}</small></h6>
          <p class='card-text'>${comment.text.toLowerCase()}</p>
        </div>
      </div>`
  }
  return template
}

const handleFormDidSubmit = function(event){
  event.preventDefault()

  const postId = requestPath.slice(6, -1)

  const formData = new FormData(event.target)
  const xhr = new XMLHttpRequest()
  const method = event.target.getAttribute('method')
  const url = '/api/comments/'+ postId +'/new'



  xhr.open(method, url)
  xhr.setRequestHeader('HTTP_X_REQUESTED_WITH', 'XMLHttpRequest')
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  xhr.onload = function(){
    const commentElement = document.getElementById('comment-section')
    loadComments(commentElement)
    event.target.reset()
  }
  xhr.send(formData)
}

export { handleDeleteComment, loadComments, formatComment, handleFormDidSubmit }

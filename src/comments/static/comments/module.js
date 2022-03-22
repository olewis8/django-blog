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
    for(var i=0; i<comments.length; i++){
      commentElement.append(formatComment(comments[i]))
    }
  }
 xhr.send()
}

const formatComment = function(comment){
  var commentCard = document.createElement('div')
  var commentCardBody = document.createElement('div')
  var commentCardTitle = document.createElement('h5')
  var commentUserProfileLink = document.createElement('a')
  var commentCreatedDate = document.createElement('h6')
  var commentCreatedDateSmall = document.createElement('small')
  var commentCardText = document.createElement('p')
  var commentDeleteButton = document.createElement('button')

  commentCard.classList.add('card', 'mb-2')
  commentCardBody.classList.add('card-body')
  commentCardTitle.classList.add('card-title')
  commentCreatedDate.classList.add('card-subtitle')
  commentCreatedDateSmall.classList.add('text-muted')
  commentCardText.classList.add('card-text')
  commentDeleteButton.classList.add('btn', 'btn-danger', 'btn-sm')

  commentCard.setAttribute('id', 'comment-' + String(comment.id))
  commentUserProfileLink.setAttribute('href', '/users/' + comment.user)
  commentDeleteButton.setAttribute('type', 'button')

  commentDeleteButton.addEventListener('click', function(){handleDeleteComment(comment.id)})

  commentUserProfileLink.innerText = comment.user
  commentCreatedDateSmall.innerText = comment.created
  commentCardText.innerText = String(comment.text).toLowerCase()
  commentDeleteButton.innerText = 'delete'

  commentCreatedDate.append(commentCreatedDateSmall)
  commentCardTitle.append(commentUserProfileLink)
  commentCardBody.append(commentCardTitle, commentCreatedDate, commentCardText)

  if(requestUserIsAuthenticated && requestUser == comment.user){
    commentCardBody.append(commentDeleteButton)
  }

  commentCard.append(commentCardBody)

  return commentCard
}

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
    const removedComment = document.getElementById('comment-' + String(commentId))
    // loadComments(commentElement)
    commentElement.removeChild(removedComment)
  }
  xhr.send()
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

    const newComment = formatComment(JSON.parse(xhr.response))
    commentElement.prepend(newComment)

    event.target.reset()
  }
  xhr.send(formData)
}

export { handleDeleteComment, loadComments, formatComment, handleFormDidSubmit }

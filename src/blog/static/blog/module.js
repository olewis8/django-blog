const loadPostPreviews = function(postElement, page){
  const xhr = new XMLHttpRequest()
  const method = 'GET'
  const url = '/api/blog/' + page + '/get-posts'
  const responseType = 'json'

  xhr.responseType = responseType
  xhr.open(method, url)
  xhr.onload = function(){
    var listedItems = xhr.response.response
    var postHtmlStr = ''
    for(var i=listedItems.length-1; i>=0; i--){
      postHtmlStr += formatPostPreview(listedItems[i])
    }
    var titleElement = document.getElementById('title')

    titleElement.innerHTML = formatTitle(page)
    postElement.innerHTML = postHtmlStr
  }
 xhr.send()
}

const loadBlogPost = function(blogPostElement){
  const xhr = new XMLHttpRequest()
  const method = 'GET'
  const url = '/api' + requestPath + 'get'
  const responseType = 'json'

  xhr.responseType = responseType
  xhr.open(method, url)
  xhr.onload = function(){
    var post = formatBlogPost(xhr.response)
    blogPostElement.append(post)
  }
  xhr.send()
}

const formatPostPreview = function(post){
  var template = `
    <div class='card mb-2' id='post-${post.id}'>
      <div class='card-body'>
        <h4 class='card-title'>${post.title.toLowerCase()}</h4>
        <h6 class='card-title'>by ${post.author}</h6>
        <h6 class='card-title'><small class='text-muted'>${post.created}</small></h6>
        <p>${post.content.substring(0, 280).toLowerCase()}...</p>
        <a class='stretched-link' href='/blog/${post.id}'></a>
      </div>
    </div>`

  return template
}

const formatTitle = function(page){
  if(page == 'disc'){
    return '<h1>discover</h1>'
  }
  else if(page == 'fy'){
    return '<h1>for you</h1>'
  }
}

const formatBlogPost = function(post){
  var postContainer = document.createElement('div')
  var postCard = document.createElement('div')
  var postCardBody = document.createElement('div')
  var postCardTitle = document.createElement('h1')
  var postCreatedDate = document.createElement('h6')
  var postCreatedDateSmall = document.createElement('small')
  var postUser = document.createElement('h5')
  var postUserProfileLink = document.createElement('a')
  var postCardText = document.createElement('p')
  var postControlButtonGroup = document.createElement('div')
  var postLikeButton = document.createElement('button')
  var postEditButton = document.createElement('a')
  var postDeleteButton = document.createElement('a')

  postContainer.classList.add('container', 'py-3')
  postCard.classList.add('card')
  postCardBody.classList.add('card-body')
  postCardTitle.classList.add('card-title')
  postCreatedDate.classList.add('card-title')
  postCreatedDateSmall.classList.add('text-muted')
  postUser.classList.add('card-title')
  postUserProfileLink.classList.add()
  postCardText.classList.add('card-text')
  postControlButtonGroup.classList.add('btn-group')
  postLikeButton.classList.add('btn', 'btn-primary')
  postEditButton.classList.add('btn', 'btn-secondary', 'mx-1')
  postDeleteButton.classList.add('btn', 'btn-danger')

  postUserProfileLink.setAttribute('href', '/users/' + post.author)
  postControlButtonGroup.setAttribute('id', 'post-control-buttons')
  postLikeButton.setAttribute('type', 'button')
  postLikeButton.setAttribute('id', 'post-like-button')
  postEditButton.setAttribute('href', 'edit/')
  postEditButton.setAttribute('type', 'button')
  postDeleteButton.setAttribute('href', 'delete/')
  postDeleteButton.setAttribute('type', 'button')

  postLikeButton.addEventListener('click', function(){handleDidLike(post.id); updateLikeButton(post.id)})

  postCardTitle.innerText = String(post.title).toLowerCase()
  postCreatedDateSmall.innerText = post.created
  postUserProfileLink.innerText = post.author
  postCardText.innerText = String(post.content).toLowerCase()
  postLikeButton.innerText = 'ε>' + post.like_count
  postEditButton.innerText = 'edit'
  postDeleteButton.innerText = 'delete'

  postControlButtonGroup.append(postLikeButton)
  postCreatedDate.append(postCreatedDateSmall)
  postUser.append(postUserProfileLink)

  if(requestUserIsAuthenticated && requestUser == post.author){
    postControlButtonGroup.append(postEditButton, postDeleteButton)
  }

  postCardBody.append(postCardTitle, postCreatedDate, postUser, postCardText, postControlButtonGroup)
  postCard.append(postCardBody)

  return postCard
}

const updateLikeButton = function(postId){
  const xhr = new XMLHttpRequest()
  const method = 'GET'
  const url = '/api' + requestPath + 'get'
  const responseType = 'json'

  xhr.responseType = responseType
  xhr.open(method, url)
  xhr.onload = function(){
    var likeButtonElement = document.getElementById('post-like-button')
    likeButtonElement.innerText = 'ε>' + String(xhr.response.like_count)
  }
  xhr.send()
}

const handleDidLike = function(postId){
  const xhr = new XMLHttpRequest()
  const method = 'POST'
  const url = '/api/blog/'+ postId +'/like'

  xhr.open(method, url)
  xhr.setRequestHeader('HTTP_X_REQUESTED_WITH', 'XMLHttpRequest')
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  xhr.send()
}

export { loadPostPreviews, formatPostPreview, formatTitle, handleDidLike, loadBlogPost, formatBlogPost }

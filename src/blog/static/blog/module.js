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
    blogPostElement.innerHTML = post
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
  if(requestUserIsAuthenticated && requestUser == post.author){
    var template = `
      <div class='container py-3'>
        <div class='card'>
          <div class='card-body'>
            <h1 class='card-title'>${post.title.toLowerCase()}</h1>
            <h6 class='card-title'><small class='text-muted'>${post.created}</small></h6>
            <h5 class='card-title'>by <a href='/users/${post.author}'>${post.author}</a></h5>
            <p class='card-text'>${post.content.toLowerCase().replace(/\n/g, '<br>\n')}</p>
            <div class='btn-group' id='post-control-buttons'>
              <button type='button' class='btn btn-primary' onclick='handleDidLike(${post.id})' id='post-like-button'>ε>${post.like_count}</button>
              <a type='button' class='btn btn-secondary mx-1' href='edit/'>edit</a>
              <a type='button' class='btn btn-danger' href='delete/'>delete</a>
            </div>
          </div>
        </div>
      </div>`
  }
  else {
    var template = `
      <div class='container py-3'>
        <div class='card'>
          <div class='card-body'>
            <h1 class='card-title'>${post.title.toLowerCase()}</h1>
            <h6 class='card-title'><small class='text-muted'>${post.created}</small></h6>
            <h5 class='card-title'>by <a href='/users/${post.author}'>${post.author}</a></h5>
            <p class='card-text'>${post.content.toLowerCase().replace(/\n/g, '<br>\n')}</p>
            <div class='btn-group' id='post-control-buttons'>
              <button type='button' class='btn btn-primary' onclick='handleDidLike(${post.id} id='post-like-button')'>ε>${post.like_count}</button>
            </div>
          </div>
        </div>
      </div>`
  }

  return template
}

const handleDidLike = function(postId){
  const xhr = new XMLHttpRequest()
  const method = 'POST'
  const url = '/api/blog/'+ postId +'/like'

  xhr.open(method, url)
  xhr.setRequestHeader('HTTP_X_REQUESTED_WITH', 'XMLHttpRequest')
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  xhr.onload = function(){
    postElement = document.getElementById('blog-post')
    loadBlogPost(postElement)
  }
  xhr.send()
}

export { loadPostPreviews, formatPostPreview, formatTitle, handleDidLike, loadBlogPost, formatBlogPost }

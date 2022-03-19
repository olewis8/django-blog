const loadPostPreviews = function(postListElement, page){
  const xhr = new XMLHttpRequest()
  const method = 'GET'
  const url = '/api/blog/' + page + '/get-posts'
  const responseType = 'json'

  xhr.responseType = responseType
  xhr.open(method, url)
  xhr.onload = function(){
    var titleElement = document.getElementById('title')
    var listedItems = xhr.response.response

    titleElement.innerHTML = ''
    titleElement.append(formatTitle(page))

    postListElement.innerHTML = ''
    for(var i=listedItems.length-1; i>=0; i--){
      postListElement.append(formatPostPreview(listedItems[i]))
    }
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

const loadSearchProfileResults = function(searchResultsElement, query){
  const xhr = new XMLHttpRequest()
  const method = 'GET'
  const url = '/api/blog/search/' + String(query)
  const responseType = 'json'

  xhr.responseType = responseType
  xhr.open(method, url)
  xhr.onload = function(){
    searchResultsElement.innerHTML = ''

    var searchResults = xhr.response.profiles
    searchResultsElement.append(formatSearchResultsPageToggleButton('profiles', searchResultsElement, query))

    if (searchResults.length === 0){
      var noResultsMessage = document.createElement('p')
      noResultsMessage.innerText = 'no results matching "'+ query + '" =('
      searchResultsElement.append(noResultsMessage)
    }
    else{
      for (var i=0; i<searchResults.length; i++){
        searchResultsElement.append(formatProfileCard(searchResults[i]))
      }
    }
  }
  xhr.send()
}

const loadSearchPostResults = function(searchResultsElement, query){
  const xhr = new XMLHttpRequest()
  const method = 'GET'
  const url = '/api/blog/search/' + String(query)
  const responseType = 'json'

  xhr.responseType = responseType
  xhr.open(method, url)
  xhr.onload = function(){
    searchResultsElement.innerHTML = ''

    var searchResults = xhr.response.posts
    searchResultsElement.append(formatSearchResultsPageToggleButton('posts', searchResultsElement, query))

    if (searchResults.length === 0){
      var noResultsMessage = document.createElement('p')
      noResultsMessage.innerText = 'no results matching "'+ query + '" =('
      searchResultsElement.append(noResultsMessage)
    }
    else{
      for (var i=0; i<searchResults.length; i++){
        searchResultsElement.append(formatPostPreview(searchResults[i]))
      }
    }
  }
  xhr.send()
}

const formatSearchResult = function(searchResult, current){
  if (current === 'profiles'){
    formatProfileCard(searchResult)
  }
  else if (current === 'pages'){
    formatPostPreview(searchResult)
  }
}

const formatPostPreview = function(post){
    // let N be the post id. creates this HTML in the DOM:
    //
    // <div class='card mb-2 preview-card' id='home-post-N'>
    //   <div class='card-body'>
    //     <h3 class='card-title'>post.title</h3>
    //     <h5 class='card-title'>by post.author</h5>
    //     <h6 class='card-title'>post.created</h6>
    //     <p class='card-text'>post.content<p>
    //     <a class='stretched-link' href='/blog/N'></a>
    //   </div>
    // </div>

  var postPreviewCard = document.createElement('div')
  var postPreviewCardBody = document.createElement('div')
  var postPreviewCardTitle = document.createElement('h3')
  var postPreviewCardUser = document.createElement('h5')
  var postPreviewCardCreatedDate = document.createElement('h6')
  var postPreviewCardText = document.createElement('p')
  var postPreviewCardLink = document.createElement('a')

  postPreviewCard.classList.add('card', 'mb-2', 'preview-card')
  postPreviewCardBody.classList.add('card-body')
  postPreviewCardTitle.classList.add('card-title')
  postPreviewCardUser.classList.add('card-title')
  postPreviewCardCreatedDate.classList.add('card-title')
  postPreviewCardText.classList.add('card-text')
  postPreviewCardLink.classList.add('stretched-link')

  postPreviewCard.setAttribute('id', 'home-post-' + String(post.id))
  postPreviewCardLink.setAttribute('href', '/blog/' + String(post.id))

  postPreviewCardTitle.innerText = String(post.title).toLowerCase()
  postPreviewCardUser.innerText = 'by ' + String(post.author).toLowerCase()
  postPreviewCardCreatedDate.innerText = String(post.created).toLowerCase()
  postPreviewCardText.innerText = String(post.content).length >= 280 ? String(post.content).substring(0, 280).toLowerCase() + '...' : String(post.content).toLowerCase()

  postPreviewCardBody.append(postPreviewCardTitle, postPreviewCardUser, postPreviewCardCreatedDate, postPreviewCardText, postPreviewCardLink)
  postPreviewCard.append(postPreviewCardBody)

  return postPreviewCard
}

const formatTitle = function(page){
  var titleH1 = document.createElement('h1')

  if(page == 'disc'){
    titleH1.innerText = 'discover'
  }
  else if(page == 'fy'){
    titleH1.innerText = 'for you'
  }

  return titleH1
}

const formatBlogPost = function(post){
  // let N be the post id. creates this HTML in the DOM:
  //
  // <div class='container py-3'>
  //   <div class='card'>
  //       <div class='card-body'>
  //         <h1 class='card-title'>post.title</h1>
  //         <h6 class='card-title'>post.created</h6>
  //         <h5 class='post-byline'>by <a href='/users/post.author'>post.author</a></h5>
             // <div>
             // </div>
  //         <p class='card-text'>post.text</p>
  //         <div class='btn-group post-controls'>
  //           <button class='btn btn-primary' type='button', id='post-like-button'>'ε>' + post.like_count</button>
  //           <a class='btn btn-secondary mx-1' type='button' href='/edit'>edit</a>
  //           <a class='btn btn-danger' type='button' href=/delete>delete</a>
  //       </div>
  //     </div>
  //   </div>
  // </div>

  var postContainer = document.createElement('div')
  var postCard = document.createElement('div')
  var postCardBody = document.createElement('div')
  var postCardTitle = document.createElement('h1')
  var postCreatedDate = document.createElement('h6')
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
  postUser.classList.add('card-byline')
  postCardText.classList.add('card-text')
  postControlButtonGroup.classList.add('btn-group', 'post-controls')
  postLikeButton.classList.add('btn', 'btn-primary')
  postEditButton.classList.add('btn', 'btn-secondary', 'mx-1')
  postDeleteButton.classList.add('btn', 'btn-danger')

  postUserProfileLink.setAttribute('href', '/users/' + post.author)
  postLikeButton.setAttribute('type', 'button')
  postLikeButton.setAttribute('id', 'post-like-button')
  postEditButton.setAttribute('href', 'edit/')
  postEditButton.setAttribute('type', 'button')
  postDeleteButton.setAttribute('href', 'delete/')
  postDeleteButton.setAttribute('type', 'button')

  postLikeButton.addEventListener('click', function(){handleDidLike(post.id); updateLikeButton(post.id)})

  postCardTitle.innerText = String(post.title).toLowerCase()
  postCreatedDate.innerText = post.created
  postUser.innerText = 'by '
  postUserProfileLink.innerText = post.author
  postCardText.innerText = String(post.content).toLowerCase()
  postLikeButton.innerText = 'ε>' + post.like_count
  postEditButton.innerText = 'edit'
  postDeleteButton.innerText = 'delete'

  postControlButtonGroup.append(postLikeButton)
  postUser.append(postUserProfileLink)

  if(requestUserIsAuthenticated && requestUser == post.author){
    postControlButtonGroup.append(postEditButton, postDeleteButton)
  }

  postCardBody.append(postCardTitle, postUser, postCreatedDate, postCardText, postControlButtonGroup)
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

// helpers

const formatSearchResultsPageToggleButton = function(current, searchResultsElement, query){
  // current must be set to 'profiles' or 'posts'

  var searchResultsButtonGroup = document.createElement('div')
  var searchResultsProfilesToggleButton = document.createElement('button')
  var searchResultsPostsToggleButton = document.createElement('button')

  searchResultsButtonGroup.classList.add('btn-group', 'py-2')
  searchResultsProfilesToggleButton.classList.add('btn', 'btn-primary')
  searchResultsPostsToggleButton.classList.add('btn', 'btn-primary')

  searchResultsButtonGroup.setAttribute('role', 'group')
  searchResultsProfilesToggleButton.setAttribute('type', 'button')
  searchResultsPostsToggleButton.setAttribute('type', 'button')

  if (current == 'profiles'){
    searchResultsProfilesToggleButton.classList.add('active')
  }
  else if (current == 'posts') {
    searchResultsPostsToggleButton.classList.add('active')
  }

  searchResultsProfilesToggleButton.innerText = 'profiles'
  searchResultsPostsToggleButton.innerText = 'posts'

  searchResultsProfilesToggleButton.addEventListener('click', function(){loadSearchProfileResults(searchResultsElement, query)})
  searchResultsPostsToggleButton.addEventListener('click', function(){loadSearchPostResults(searchResultsElement, query)})

  searchResultsButtonGroup.append(searchResultsPostsToggleButton, searchResultsProfilesToggleButton)

  return searchResultsButtonGroup
}

const formatProfileCard = function(profile){
  var profileCard = document.createElement('div')
  var profileCardBody = document.createElement('div')
  var profileCardTitle = document.createElement('h3')
  var profileCardLocation = document.createElement('h6')
  var profileCardBioText = document.createElement('p')
  var profileCardLink = document.createElement('a')

  profileCard.classList.add('card', 'mb-2')
  profileCardBody.classList.add('card-body')
  profileCardTitle.classList.add('card-title')
  profileCardLocation.classList.add('card-title')
  profileCardBioText.classList.add('card-text')
  profileCardLink.classList.add('stretched-link')

  profileCardLink.setAttribute('href', '/users/' + String(profile.username))

  profileCardTitle.innerText = profile.username
  profileCardLocation.innerText = profile.location
  profileCardBioText.innerText = profile.bio

  profileCardBody.append(profileCardTitle, profileCardLocation, profileCardBioText, profileCardLink)
  profileCard.append(profileCardBody)

  return profileCard
}

export { loadPostPreviews, formatPostPreview, formatTitle, handleDidLike, loadBlogPost, formatBlogPost, loadSearchProfileResults, loadSearchPostResults }

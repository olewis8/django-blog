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
  var postPreviewCard = document.createElement('div')
  var postPreviewCardBody = document.createElement('div')
  var postPreviewCardTitle = document.createElement('h3')
  var postPreviewCardUser = document.createElement('h5')
  var postPreviewCardCreatedDate = document.createElement('h6')
  // var postPreviewCardCreatedDateSmall = document.createElement('h6')
  var postPreviewCardText = document.createElement('p')
  var postPreviewCardLink = document.createElement('a')

  postPreviewCard.classList.add('card', 'mb-2')
  postPreviewCardBody.classList.add('card-body')
  postPreviewCardTitle.classList.add('card-title')
  postPreviewCardUser.classList.add('card-title')
  postPreviewCardCreatedDate.classList.add('card-title')
  // postPreviewCardCreatedDateSmall.classList.add('text-muted')
  postPreviewCardText.classList.add('card-text')
  postPreviewCardLink.classList.add('stretched-link')

  postPreviewCard.setAttribute('id', 'home-post-' + String(post.id))
  postPreviewCardLink.setAttribute('href', '/blog/' + String(post.id))

  postPreviewCardTitle.innerText = String(post.title).toLowerCase()
  postPreviewCardUser.innerText = 'by ' + String(post.author)
  // postPreviewCardCreatedDateSmall.innerText = String(post.created)
  postPreviewCardCreatedDate.innerText = String(post.created)
  postPreviewCardText.innerText = String(post.content).length >= 280 ? String(post.content).substring(0, 280).toLowerCase() + '...' : String(post.content)

  // postPreviewCardCreatedDate.append(postPreviewCardCreatedDateSmall)
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
  postCreatedDate.innerText = post.created
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

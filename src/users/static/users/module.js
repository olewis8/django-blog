const loadBioCard = function(bioElement){
  const xhr = new XMLHttpRequest()
  const method = 'GET'
  const url = '/api' + requestPath + 'bio-data/'
  const responseType = 'json'

  xhr.responseType = responseType
  xhr.open(method, url)
  xhr.onload = function(){
    var bioData = xhr.response

    var bioCardHtml = formatBioCard(bioData)
    bioElement.innerHTML = bioCardHtml
  }
 xhr.send()
}

const loadPostPreviews = function(postListElement, username){
  const xhr = new XMLHttpRequest()
  const method = 'GET'
  const url = '/api/blog/' + username + '/get-user-posts'
  const responseType = 'json'

  xhr.responseType = responseType
  xhr.open(method, url)
  xhr.onload = function(){
    var listedItems = xhr.response.response
    // var postHtmlStr = ''
    for(var i=listedItems.length-1; i>=0; i--){
      postHtmlStr += formatPostPreview(listedItems[i])
    }
    postListElement.innerHTML = postHtmlStr
  }
 xhr.send()
}

const loadUserFollows = function(userElement, page){
  const username = requestPath.slice(7, -11)

  const xhr = new XMLHttpRequest()
  const method = 'GET'
  const responseType = 'json'
  var url = ''
  var title = ''

  if (page === 'followers'){
    title = '<h1>people who follow '+ username +'</h1>'
    url = '/api/users/'+ username + '/retrieve_user_followers/'
  }
  else if (page === 'following'){
    title = '<h1>people '+ username +' follows</h1>'
    url = '/api/users/'+ username + '/retrieve_user_following/'
  }

  xhr.responseType = responseType
  xhr.open(method, url)
  xhr.onload = function(){
    var listedItems = xhr.response.response
    var bioHtmlStr = title
    for(var i=listedItems.length-1; i>=0; i--){
      bioHtmlStr += formatProfileCard(listedItems[i])
    }

    userElement.innerHTML = bioHtmlStr
  }
  xhr.send()
}

const formatPostPreview = function(post){
  var postPreviewCard = document.createElement('div')
  var postPreviewCardBody = document.createElement('div')
  var postPreviewCardTitle = document.createElement('h3')
  var postPreviewCardCreatedDate = document.createElement('h6')
  var postPreviewCardCreatedDateSmall = document.createElement('h6')
  var postPreviewCardText = document.createElement('p')
  var postPreviewCardLink = document.createElement('a')

  postPreviewCard.classList.add('card', 'mb-2')
  postPreviewCardBody.classList.add('card-body')
  postPreviewCardTitle.classList.add('card-title')
  postPreviewCardCreatedDate.classList.add('card-title')
  postPreviewCardCreatedDateSmall.classList.add('text-muted')
  postPreviewCardText.classList.add('card-text')
  postPreviewCardLink.classList.add('stretched-link')

  postPreviewCard.setAttribute('id', 'user-post-' + String(post.id))
  postPreviewCardLink.setAttribute('href', '/blog/' + String(post.id))

  postPreviewCardTitle.innerText = String(post.title).toLowerCase()
  postPreviewCardCreatedDateSmall.innerText = String(post.created)
  postPreviewCardText.innerText = String(post.content).length >= 280 ? String(post.content).substring(0, 280).toLowerCase() + '...' : String(post.content)

  postPreviewCardCreatedDate.append(postPreviewCardCreatedDateSmall)
  postPreviewCardBody.append(postPreviewCardTitle, postPreviewCardCreatedDate, postPreviewCardText, postPreviewCardLink)
  postPreviewCard.append(postPreviewCardBody)

  return postPreviewCard

  // var template = `
  //   <div class='card mb-2' id='post-${post.id}'>
  //     <div class='card-body'>
  //       <h4 class='card-title'>${post.title.toLowerCase()}</h4>
  //       <h6 class='card-title'><small class='text-muted'>${post.created}</small></h6>
  //       <p>${post.content.substring(0, 280).toLowerCase()}...</p>
  //       <a class='stretched-link' href='/blog/${post.id}'></a>
  //     </div>
  //   </div>`
  //
  // return template
}

const formatBioCard = function(bioData){
  var template = `
    <div class='card'>
      <div class='card-body'>
        <h1 class='card-title'>${bioData.username}</h1>
        <h5 class='card-subtitle'>${bioData.location}</h5>
        <p class='card-text'>${bioData.bio}</p>
        <button type='button' class='btn btn-primary' onclick='handleDidClickFollow()'>follow</button>
        <p class='card-text'>${bioData.followers_count} <a href='followers/'>followers</a></p>
        <p class='card-text'>${bioData.following_count} <a href='following/'>following</a></p>
      </div>
    </div>`

  return template
}

const formatProfileCard = function(profile){
  var template = `
    <div class='card mb-2'>
      <div class='card-body'>
        <h3 class='card-title'>${profile.username}</h3>
        <small class='card-subtitle'><p class='text-muted'>${profile.location}</p></small>
        <p class='card-text'>${profile.bio}</p>
        <a class='stretched-link' href='/users/${profile.username}'></a>
      </div>
    </div>`

    return template
}

const handleDidClickFollow = function(){
  const xhr = new XMLHttpRequest()
  const method = 'POST'
  const url = 'follow/'

  xhr.open(method, url)
  xhr.setRequestHeader('HTTP_X_REQUESTED_WITH', 'XMLHttpRequest')
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  xhr.onload = function(){
    bioElement = document.getElementById('bio-card')
    loadBioCard(bioElement)
  }
  xhr.send()
}

const handleDidClickViewProfile = function(username){
  console.log(username)
  location.href = '/users/' + username
}

const getUsername = function(){
  return requestPath.slice(7, -1)
}

export { loadBioCard, loadPostPreviews, getUsername, loadUserFollows }

const loadBioCard = function(bioElement){
  const xhr = new XMLHttpRequest()
  const method = 'GET'
  const url = '/api' + requestPath + 'bio-data/'
  const responseType = 'json'

  xhr.responseType = responseType
  xhr.open(method, url)
  xhr.onload = function(){
    var bioData = xhr.response

    bioElement.append(formatBioCard(bioData))
    loadFollowButton()
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
    for(var i=listedItems.length-1; i>=0; i--){
      postListElement.append(formatPostPreview(listedItems[i]))
    }
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
    title = 'people who follow '+ username
    url = '/api/users/'+ username + '/retrieve_user_followers/'
  }
  else if (page === 'following'){
    title = 'people '+ username +' follows'
    url = '/api/users/'+ username + '/retrieve_user_following/'
  }

  xhr.responseType = responseType
  xhr.open(method, url)
  xhr.onload = function(){
    var titleElement = document.getElementById('follows-page-title')
    var titleH1Element = document.createElement('h1')
    titleH1Element.classList.add('page-title', 'text-end')
    titleH1Element.innerText = title
    titleElement.append(titleH1Element)

    var listedItems = xhr.response.response
    var follows = document.getElementById('follows')

    if (listedItems.length == 0){
      var nobodyCard = document.createElement('div')
      var nobodyCardBody = document.createElement('div')
      var nobodyCardText = document.createElement('p')

      nobodyCard.classList.add('card')
      nobodyCardBody.classList.add('card-body')
      nobodyCardText.classList.add('card-text')

      nobodyCardText.innerHTML = 'nobody :('

      nobodyCardBody.append(nobodyCardText)
      nobodyCard.append(nobodyCardBody)
      follows.append(nobodyCard)

    }
    for(var i=listedItems.length-1; i>=0; i--){
      follows.append(formatProfileCard(listedItems[i]))
    }
  }
  xhr.send()
}

const formatPostPreview = function(post){
  var postPreviewCard = document.createElement('div')
  var postPreviewCardBody = document.createElement('div')
  var postPreviewCardTitle = document.createElement('h3')
  var postPreviewCardCreatedDate = document.createElement('h6')
  var postPreviewCardText = document.createElement('p')
  var postPreviewCardLink = document.createElement('a')

  postPreviewCard.classList.add('card', 'mb-2', 'preview-card')
  postPreviewCardBody.classList.add('card-body')
  postPreviewCardTitle.classList.add('card-title')
  postPreviewCardCreatedDate.classList.add('card-title')
  postPreviewCardText.classList.add('card-text')
  postPreviewCardLink.classList.add('stretched-link')

  postPreviewCard.setAttribute('id', 'user-post-' + String(post.id))
  postPreviewCardLink.setAttribute('href', '/blog/' + String(post.id))

  postPreviewCardTitle.innerText = String(post.title).toLowerCase()
  postPreviewCardCreatedDate.innerText = String(post.created)
  postPreviewCardText.innerText = String(post.content).length >= 280 ? String(post.content).substring(0, 280).toLowerCase() + '...' : String(post.content)

  postPreviewCardBody.append(postPreviewCardTitle, postPreviewCardCreatedDate, postPreviewCardText, postPreviewCardLink)
  postPreviewCard.append(postPreviewCardBody)

  return postPreviewCard
}

const formatBioCard = function(bioData){
  var bioCard = document.createElement('div')
  var bioCardBody = document.createElement('div')
  var bioCardTitle = document.createElement('h1')
  var bioCardLocation = document.createElement('h5')
  var bioCardBioText = document.createElement('p')
  var bioCardFollowButton = document.createElement('button')
  var bioCardFollowersCount = document.createElement('p')
  var bioCardFollowingCount = document.createElement('p')
  var bioCardFollowersLink = document.createElement('a')
  var bioCardFollowingLink = document.createElement('a')

  bioCard.classList.add('card')
  bioCardBody.classList.add('card-body')
  bioCardTitle.classList.add('card-title')
  bioCardLocation.classList.add('card-subtitle')
  bioCardBioText.classList.add('card-text')
  bioCardFollowButton.classList.add('btn', 'btn-primary')
  bioCardFollowersCount.classList.add('card-text')
  bioCardFollowingCount.classList.add('card-text')

  bioCardFollowButton.setAttribute('type', 'button')
  bioCardFollowButton.setAttribute('id', 'bio-card-follow-button')
  bioCardFollowersCount.setAttribute('id', 'bio-card-followers-count')
  bioCardFollowingCount.setAttribute('id', 'bio-card-following-count')
  bioCardFollowersLink.setAttribute('id', 'bio-card-followers-link')
  bioCardFollowingLink.setAttribute('id', 'bio-card-following-link')
  bioCardFollowersLink.setAttribute('href', 'followers/')
  bioCardFollowingLink.setAttribute('href', 'following/')

  bioCardFollowButton.addEventListener('click', function(){handleDidClickFollow()})

  bioCardTitle.innerText = bioData.username
  bioCardLocation.innerText = bioData.location
  bioCardBioText.innerText = bioData.bio
  bioCardFollowButton.innerText = 'follow'
  bioCardFollowersCount.innerText = String(bioData.followers_count) + ' '
  bioCardFollowingCount.innerText = String(bioData.following_count) + ' '
  bioCardFollowersLink.innerText = 'followers'
  bioCardFollowingLink.innerText = 'following'

  bioCardFollowersCount.append(bioCardFollowersLink)
  bioCardFollowingCount.append(bioCardFollowingLink)
  bioCardBody.append(bioCardTitle, bioCardLocation, bioCardBioText, bioCardFollowButton, bioCardFollowersCount, bioCardFollowingCount)
  bioCard.append(bioCardBody)

  return bioCard
}

const formatProfileCard = function(profile){
  var profileCard = document.createElement('div')
  var profileCardBody = document.createElement('div')
  var profileCardTitle = document.createElement('h3')
  var profileCardLocation = document.createElement('h6')
  var profileCardBioText = document.createElement('p')
  var profileCardLink = document.createElement('a')

  profileCard.classList.add('card', 'mb-2', 'preview-card')
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

const handleDidClickFollow = function(){
  const xhr = new XMLHttpRequest()
  const method = 'POST'
  const url = 'follow/'

  xhr.open(method, url)
  xhr.setRequestHeader('HTTP_X_REQUESTED_WITH', 'XMLHttpRequest')
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  xhr.onload = function(){
    var bioElement = document.getElementById('bio-card')
    updateBioCardAfterFollow()
  }
  xhr.send()
}

const loadFollowButton = function(){
  const xhr = new XMLHttpRequest()
  const method = 'GET'
  const url = 'refresh_bio_card/'
  const responseType = 'json'

  xhr.responseType = responseType
  xhr.open(method, url)
  xhr.onload = function(){
    var bioCardFollowButton = document.getElementById('bio-card-follow-button')
    var buttonText = xhr.response.user_follows_target_user ? 'unfollow' : 'follow'

    bioCardFollowButton.innerText = buttonText
  }
  xhr.send()
}

const updateBioCardAfterFollow = function(){
  // THIS DOESN'T WORK
  const xhr = new XMLHttpRequest()
  const method = 'GET'
  const url = 'refresh_bio_card/'
  const responseType = 'json'

  xhr.responseType = responseType
  xhr.open(method, url)
  xhr.onload = function(){
    var followersCountElement = document.getElementById('bio-card-followers-count')
    var followingCountElement = document.getElementById('bio-card-following-count')
    var followersLinkElement = document.getElementById('bio-card-followers-link')
    var followingLinkElement = document.getElementById('bio-card-following-link')

    var bioCardData = xhr.response

    followersCountElement.innerText = String(bioCardData.updated_followers_count) + ' '
    followingCountElement.innerText = String(bioCardData.updated_following_count) + ' '
    followersCountElement.append(followersLinkElement)
    followingCountElement.append(followingLinkElement)
    loadFollowButton()
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

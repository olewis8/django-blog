const loadBioCard = function(bioElement, editForm){
  const xhr = new XMLHttpRequest()
  const method = 'GET'
  const url = '/api' + requestPath + 'bio-data/'
  const responseType = 'json'

  xhr.responseType = responseType
  xhr.open(method, url)
  xhr.onload = function(){
    var bioData = xhr.response

    bioElement.innerHTML = ''
    bioElement.append(formatBioCard(bioData, editForm))
    loadFollowButton()
  }
 xhr.send()
}

const loadEditBioCard = function(bioElement, editForm){
  const xhr = new XMLHttpRequest()
  const method = 'GET'
  const url = '/api' + requestPath + 'bio-data/'
  const responseType = 'json'

  xhr.responseType = responseType
  xhr.open(method, url)
  xhr.onload = function(){
    var bioData = xhr.response

    bioElement.innerHTML = ''
    bioElement.append(formatEditBioCard(bioData, editForm))
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

    if (listedItems.length === 0){
      if (requestUser === username){
        // if you're looking at your own profile
        postListElement.append(formatProfilePostPrompt())
      }
      else{
        postListElement.append(formatUserHasNoPosts(username))
      }
    }

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
    titleH1Element.classList.add('page-title')
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

const formatBioCard = function(bioData, editForm){
  var bioCard = document.createElement('div')
  var bioCardBody = document.createElement('div')
  var bioCardTitle = document.createElement('h1')
  var bioCardLocation = document.createElement('h6')
  var bioCardBioText = document.createElement('p')
  var bioCardButtonGroup = document.createElement('div')
  var bioCardFollowButton = document.createElement('button')
  var bioCardEditProfileButton = document.createElement('button')
  var bioCardFollowsCount = document.createElement('div')
  var bioCardFollowersCount = document.createElement('p')
  var bioCardFollowingCount = document.createElement('p')
  var bioCardFollowersLink = document.createElement('a')
  var bioCardFollowingLink = document.createElement('a')

  bioCard.classList.add('card')
  bioCardBody.classList.add('card-body')
  bioCardTitle.classList.add('card-title')
  bioCardLocation.classList.add('card-subtitle')
  bioCardBioText.classList.add('card-text', 'bio-card-bio-text')
  bioCardButtonGroup.classList.add('w-100', 'bio-card-button-group')
  bioCardFollowButton.classList.add('btn', 'btn-outline-primary', 'bio-card-button', 'w-100')
  bioCardEditProfileButton.classList.add('btn', 'btn-outline-secondary', 'bio-card-button', 'w-100')
  bioCardFollowsCount.classList.add('follows-count')
  bioCardFollowersCount.classList.add('card-text')
  bioCardFollowingCount.classList.add('card-text')

  bioCardFollowButton.setAttribute('type', 'button')
  bioCardFollowButton.setAttribute('id', 'bio-card-follow-button')
  bioCardEditProfileButton.setAttribute('type', 'button')
  bioCardEditProfileButton.setAttribute('id', 'bio-card-edit-profile-button')
  bioCardFollowersCount.setAttribute('id', 'bio-card-followers-count')
  bioCardFollowingCount.setAttribute('id', 'bio-card-following-count')
  bioCardFollowersLink.setAttribute('id', 'bio-card-followers-link')
  bioCardFollowingLink.setAttribute('id', 'bio-card-following-link')
  bioCardFollowersLink.setAttribute('href', 'followers/')
  bioCardFollowingLink.setAttribute('href', 'following/')

  bioCardFollowButton.addEventListener('click', function(){handleDidClickFollow()})
  bioCardEditProfileButton.addEventListener('click', function(){handleDidClickEdit(editForm)})

  bioCardTitle.innerText = bioData.username
  bioCardLocation.innerText = bioData.location
  bioCardBioText.innerText = bioData.bio
  bioCardFollowButton.innerText = 'follow'
  bioCardEditProfileButton.innerText = 'edit profile'
  bioCardFollowersCount.innerText = String(bioData.followers_count) + ' '
  bioCardFollowingCount.innerText = String(bioData.following_count) + ' '
  bioCardFollowersLink.innerText = 'followers'
  bioCardFollowingLink.innerText = 'following'

  if (requestUserIsAuthenticated && requestUser === bioData.username){
    bioCardButtonGroup.append(bioCardEditProfileButton)
  }
  bioCardButtonGroup.append(bioCardFollowButton)

  bioCardFollowersCount.append(bioCardFollowersLink)
  bioCardFollowingCount.append(bioCardFollowingLink)
  bioCardFollowsCount.append(bioCardFollowingCount, bioCardFollowersCount)

  bioCardBody.append(bioCardTitle, bioCardLocation, bioCardBioText, bioCardButtonGroup, bioCardFollowsCount)
  bioCard.append(bioCardBody)

  return bioCard
}

const formatEditBioCard = function(bioData, editForm){
  var bioCard = document.createElement('div')
  var bioCardBody = document.createElement('div')
  var bioCardTitle = document.createElement('h1')
  var bioCardButtonGroup = document.createElement('div')
  var bioCardFollowButton = document.createElement('button')
  var bioCardSaveButton = document.createElement('button')
  var bioCardFollowsCount = document.createElement('div')
  var bioCardFollowersCount = document.createElement('p')
  var bioCardFollowingCount = document.createElement('p')
  var bioCardFollowersLink = document.createElement('a')
  var bioCardFollowingLink = document.createElement('a')
  var bioCardLocation = document.createElement('input')
  var bioCardBioText = document.createElement('textarea')

  bioCard.classList.add('card')
  bioCardBody.classList.add('card-body')
  bioCardTitle.classList.add('card-title')
  bioCardButtonGroup.classList.add('w-100', 'bio-card-button-group')
  bioCardFollowButton.classList.add('btn', 'btn-outline-primary', 'bio-card-button', 'w-100')
  bioCardSaveButton.classList.add('btn', 'btn-outline-secondary', 'bio-card-button', 'w-100')
  bioCardFollowsCount.classList.add('follows-count')
  bioCardFollowersCount.classList.add('card-text')
  bioCardFollowingCount.classList.add('card-text')
  bioCardLocation.classList.add('form-control', 'location-input')
  bioCardBioText.classList.add('form-control', 'bio-input')

  bioCardFollowButton.setAttribute('type', 'button')
  bioCardFollowButton.setAttribute('id', 'bio-card-follow-button')
  bioCardFollowButton.setAttribute('disabled', '')
  bioCardSaveButton.setAttribute('type', 'submit')
  bioCardSaveButton.setAttribute('id', 'bio-card-edit-profile-button')
  bioCardSaveButton.setAttribute('name', 'submit')
  bioCardFollowersCount.setAttribute('id', 'bio-card-followers-count')
  bioCardFollowingCount.setAttribute('id', 'bio-card-following-count')
  bioCardFollowersLink.setAttribute('id', 'bio-card-followers-link')
  bioCardFollowingLink.setAttribute('id', 'bio-card-following-link')
  bioCardFollowersLink.setAttribute('href', 'followers/')
  bioCardFollowingLink.setAttribute('href', 'following/')
  bioCardLocation.setAttribute('form', 'edit-profile-form')
  bioCardLocation.setAttribute('name', 'location')
  bioCardLocation.setAttribute('value', bioData.location)
  bioCardLocation.setAttribute('placeholder', 'change location')
  bioCardBioText.setAttribute('form', 'edit-profile-form')
  bioCardBioText.setAttribute('name', 'bio')
  bioCardBioText.setAttribute('placeholder', 'write about yourself')

  bioCardTitle.innerText = bioData.username
  bioCardFollowButton.innerText = 'follow'
  bioCardSaveButton.innerText = 'save'
  bioCardFollowersCount.innerText = String(bioData.followers_count) + ' '
  bioCardFollowingCount.innerText = String(bioData.following_count) + ' '
  bioCardFollowersLink.innerText = 'followers'
  bioCardFollowingLink.innerText = 'following'
  bioCardBioText.innerText = bioData.bio

  if (requestUserIsAuthenticated && requestUser === bioData.username){
    bioCardButtonGroup.append(bioCardSaveButton)
  }
  bioCardButtonGroup.append(bioCardFollowButton)
  bioCardFollowersCount.append(bioCardFollowersLink)
  bioCardFollowingCount.append(bioCardFollowingLink)
  bioCardFollowsCount.append(bioCardFollowingCount, bioCardFollowersCount)
  editForm.append(bioCardLocation, bioCardBioText, bioCardButtonGroup)
  bioCardBody.append(bioCardTitle, editForm, bioCardFollowsCount)
  bioCard.append(bioCardBody)

  editForm.addEventListener('submit', function(){handleDidClickSave(editForm)})

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

const formatUserHasNoPosts = function(username){
  var noPostsMessageCard = document.createElement('div')
  var noPostsMessageCardBody = document.createElement('div')
  var noPostsMessageCardText = document.createElement('p')

  noPostsMessageCard.classList.add('card', 'no-posts-message-card')
  noPostsMessageCardBody.classList.add('card-body')
  noPostsMessageCardText.classList.add('card-text')

  noPostsMessageCardText.innerText = String(username) + " doesn't seem to have very much to say :/"

  noPostsMessageCardBody.append(noPostsMessageCardText)
  noPostsMessageCard.append(noPostsMessageCardBody)

  return noPostsMessageCard
}

const formatProfilePostPrompt = function(){
  var noPostsMessageCard = document.createElement('div')
  var noPostsMessageCardBody = document.createElement('div')
  var noPostsMessageCardText = document.createElement('p')
  var noPostMessageCardLink = document.createElement('a')

  noPostsMessageCard.classList.add('card', 'new-post-prompt-card')
  noPostsMessageCardBody.classList.add('card-body')
  noPostsMessageCardText.classList.add('card-text')
  noPostMessageCardLink.classList.add('stretched-link')

  noPostMessageCardLink.setAttribute('href', '/blog/new/')

  noPostsMessageCardText.innerText = 'your posts will appear here once you have some. click here to get started.'

  noPostsMessageCardBody.append(noPostsMessageCardText)
  noPostsMessageCard.append(noPostsMessageCardBody, noPostMessageCardLink)

  return noPostsMessageCard
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

const handleDidClickEdit = function(editForm){
  var bioElement = document.getElementById('bio-card')
  bioElement.innerHTML = ''
  loadEditBioCard(bioElement, editForm)
}

const handleDidClickSave = function(editForm){
  event.preventDefault()
  const formData = new FormData(event.target)

  updateUserBio(formData, editForm)
}

const updateUserBio = function(formData, editForm){
  const xhr = new XMLHttpRequest()
  const method = 'POST'
  const url = '/api' + requestPath + 'update-bio/'

  xhr.open(method, url)
  xhr.setRequestHeader('HTTP_X_REQUESTED_WITH', 'XMLHttpRequest')
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  xhr.onload = function(){
    var bioElement = document.getElementById('bio-card')
    var bioCardLocation = editForm.querySelector('.location-input')
    var bioCardBioText = editForm.querySelector('.bio-input')
    var bioCardButtonGroup = editForm.querySelector('.bio-card-button-group')

    if (bioCardLocation){
      editForm.removeChild(bioCardLocation)
    }
    if (bioCardBioText){
      editForm.removeChild(bioCardBioText)
    }
    if (bioCardButtonGroup){
      editForm.removeChild(bioCardButtonGroup)
    }

    loadBioCard(bioElement, editForm)
  }
  xhr.send(formData)
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

export { loadBioCard, loadPostPreviews, getUsername, loadUserFollows, loadEditBioCard }

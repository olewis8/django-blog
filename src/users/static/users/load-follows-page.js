import { loadUserFollows } from './module.js'

var page = requestPath.slice(-10, -1)
if (page === 'followers' || page === 'following'){
  var userElement = document.getElementById('follows')
  loadUserFollows(userElement, page)
}

import { loadPostPreviews, getUsername } from './module.js'

var postListElement = document.getElementById('user-posts')
loadPostPreviews(postListElement, getUsername())

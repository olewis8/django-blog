import { loadPostPreviews, getUsername } from './module.js'

var postElement = document.getElementById('user-posts')
loadPostPreviews(postElement, getUsername())

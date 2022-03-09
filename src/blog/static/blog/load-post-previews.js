import { loadPostPreviews } from './module.js'

const postElement = document.getElementById('posts')

if (localStorage.getItem('buttonClicked') == 'disc'){
  loadPostPreviews(postElement, 'disc')
  localStorage.removeItem('buttonClicked')
}

loadPostPreviews(postElement, 'fy')

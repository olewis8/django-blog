import { loadPostPreviews } from './module.js'

const postListElement = document.getElementById('posts')

if (localStorage.getItem('buttonClicked') == 'disc'){
  loadPostPreviews(postListElement, 'disc')
  localStorage.removeItem('buttonClicked')
}

loadPostPreviews(postListElement, 'fy')

import { loadComments, handleFormDidSubmit } from './module.js'


var commentCreateForm = document.getElementById('comment-create-form')
var commentElement = document.getElementById('comment-section')

commentCreateForm.addEventListener('submit', handleFormDidSubmit)

loadComments(commentElement)

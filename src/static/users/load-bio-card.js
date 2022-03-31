import { loadBioCard } from './module.js'

var editForm = document.getElementById('edit-profile-form')
var bioElement = document.getElementById('bio-card')

loadBioCard(bioElement, editForm)

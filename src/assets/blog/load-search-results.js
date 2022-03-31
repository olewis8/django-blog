import { loadSearchProfileResults, loadSearchPostResults } from './module.js'

var searchResultsElement = document.getElementById('search-results')

loadSearchPostResults(searchResultsElement, query)

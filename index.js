const readMore = document.getElementById('read-more');
readMore.addEventListener('click', ()=>{
  var additionalContent = document.querySelector('.read-more');
  var buttonText = document.getElementById('read-more');
  
  if (additionalContent.style.display === 'none') {
      additionalContent.style.display = 'block';
      buttonText.innerHTML = 'Read Less';
  } else {
      additionalContent.style.display = 'none';
      buttonText.innerHTML = 'Read More';
  }

})
  

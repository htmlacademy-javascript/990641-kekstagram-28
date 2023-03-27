const renderComments = (photosCollection) => {
  const socialComments = document.querySelector('.social__comments');

  document.querySelectorAll('.social__comment')
    .forEach((comment) => comment.remove());

  const commentslFragment = document.createDocumentFragment();

  const commentTemplate = document.querySelector('#comment')
    .content
    .querySelector('.social__comment');

  photosCollection.forEach(({avatar, messages, name}) => {
    const commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__comment img').src = avatar;
    commentElement.querySelector('.social__comment img').alt = name;
    commentElement.querySelector('.social__text').textContent = messages;

    commentslFragment.appendChild(commentElement);
  });

  socialComments.appendChild(commentslFragment);

};

export {renderComments};

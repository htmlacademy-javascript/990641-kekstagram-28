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

const renderPictureDetails = ({url, likes, description}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

export {renderComments};

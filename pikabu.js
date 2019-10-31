(function(ratingLimit){
	function isCommentToRemove(comment) {
		for (let i = 0; i < 3; i++) {
			if (comment) {
				comment = comment.firstElementChild;
			} else {
				return true;
			}
		}
		return !(comment.firstChild.nodeValue > ratingLimit);
	}
	function removeComments() {
		var toRemove = [];
		for (let comment of document.getElementsByClassName('comment')) {
			if (isCommentToRemove(comment)) toRemove.push(comment);
		}
		console.log('removeComments', toRemove.length);
		toRemove.forEach((e) => e.remove());
	}
	function setObserver() {
		console.log('setObserver');
		var comments = document.getElementsByClassName('comments__container')
		var observer = new MutationObserver(function(mutations){
			removeComments();
		});
		observer.observe(comments[0], {
			childList: true,
			subtree: true
		});
	}
	removeComments();
	setObserver();
})(2);
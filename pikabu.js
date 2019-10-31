(function(ratingLimit){
	function isCommentToRemove(comment) {
		let comment_body = comment.firstElementChild;
		if (!comment_body) return true;
		let comment_header = comment_body.firstElementChild;
		if (!comment_header) return true;
		let comment_rating = comment_header.firstElementChild;
		if (!comment_rating) return true;
		let rating = comment_rating.firstChild.nodeValue;
		return !(rating > ratingLimit);
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
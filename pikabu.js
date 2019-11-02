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
	function checkAndRemove(comment) {
		if (isCommentToRemove(comment)) {
			comment.remove();
		} else {
			comment.pikabu_remove_comment = true;
		}
	}
	function removeComments() {
		for (let comment of document.getElementsByClassName('comment')) {
			if (comment.pikabu_remove_comment) continue;
			setTimeout(checkAndRemove,0,comment);
		}
	}
	function setObserver() {
		console.log('setObserver');
		var comments = document.getElementsByClassName('comments__container');
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
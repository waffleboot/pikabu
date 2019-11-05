(function(ratingLimit){
	function getRating(comment) {
		for (let i = 0; i < 3; i++) {
			if (comment) {
				comment = comment.firstElementChild;
			} else {
				return;
			}
		}
		return comment;
	}
	function isRatingToRemove(rating) {
		return rating === undefined || !(rating.firstChild.nodeValue > ratingLimit);
	}
	function checkAndRemove(comment) {
		var rating = getRating(comment);
		if (isRatingToRemove(rating)) {
			comment.remove();
		} else {
			comment.pikabu_remove_comment = true;
			var header = rating.parentElement;
			header.children[1].remove();
			header.children[1].remove();
			header.children[2].remove();
		}
	}
	function removeComments() {
		for (let comment of document.getElementsByClassName('comment')) {
			if (comment.pikabu_remove_comment) continue;
			setTimeout(checkAndRemove,0,comment);
		}
	}
	function setObserver() {
		var comments = document.getElementsByClassName('comments__container');
		var observer = new MutationObserver(function(mutations){
			setTimeout(removeComments,0);
		});
		observer.observe(comments[0], {
			childList: true,
			subtree: true
		});
	}
	removeComments();
	setObserver();
})(2);
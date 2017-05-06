class Braid {
	constructor (index, word = []) {
		this.index = index;
		this.word = word;
	}

	can_swap (i) {
		if (i < 0 || i >= this.word.length - 1) {
			return false;
		}
		return Math.abs (Math.abs (this.word [i]) - Math.abs (this.word [i+1])) > 1;
	}
	swap (i) {
		if (!this.can_swap (i)) {
			return false;
		}
		[this.word [i], this.word [i+1]] = [this.word [i+1], this.word [i]];
		return true;
	}
	conjugate (letter) {
		if (Math.abs (letter) > index) {
			index = Math.abs (letter);
		}
		this.word.unshift (letter);
		this.word.push		(-letter);
	}
	R2_add (i, letter) {
		if (i > 0 && i <= this.word.length - 1) {
			this.word.splice (i, 0, letter);
			this.word.splice (i+1, 0, -letter);
		}
	}
	R2_remove (i) {
		if (i < 0 || i >= this.word.length - 1) {
			return false;
		}
		if (this.word [i] === -this.word [i+1]) {
			this.word.splice (i, 2);
			return true;
		}
		return false;
	}
}






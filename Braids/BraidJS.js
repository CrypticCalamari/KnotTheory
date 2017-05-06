class BraidJS {
	constructor (braid, width, height, lineWidth, lineCap, lineJoin, lineStrokeStyle) {
		this.braid = braid;
		this.w = width;
		this.h = height;
		this.lineWidth = lineWidth;
		this.lineCap = lineCap;
		this.lineJoin = lineJoin;
		this.lineStrokeStyle = lineStrokeStyle;
	}
	draw (ctx) {
		let sw = this.h / this.braid.word.length;
		let sh = this.w / (this.braid.index + 1);

		ctx.beginPath();

		ctx.lineWidth = this.lineWidth;
		ctx.lineCap = this.lineCap;
		ctx.lineJoin = this.lineJoin;
		ctx.strokeStyle = this.lineStrokeStyle;

		for (let i = 1; i <= this.braid.index; i++) {
			ctx.moveTo(0, sh*i);

			let x_cursor = 0;

			for (let letter of this.braid.word) {
				if (Math.abs(letter) === i) {
					ctx.lineTo (x_cursor, sh*i);

					if (letter < 0) {
						ctx.lineTo (x_cursor + sw, sh*(i+1));
						ctx.moveTo (x_cursor, sh*(i+1));
						ctx.lineTo (x_cursor + sw, sh*i);
					}
					else {
						ctx.moveTo (x_cursor, sh*(i+1));
						ctx.lineTo (x_cursor + sw, sh*i);
						ctx.moveTo (x_cursor, sh*i);
						ctx.lineTo (x_cursor + sw, sh*(i+1));
						ctx.moveTo (x_cursor + sw, sh*i);
					}
				}

				if (Math.abs(letter) === i-1) {
					ctx.lineTo (x_cursor, sh*i);
				}
				x_cursor += sw;
			}
			ctx.lineTo (x_cursor, sh*i);
		}
		ctx.stroke();
	}
}

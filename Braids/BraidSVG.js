/* ========================================================================= //
// TODO: ?? Refactor functions to use chaining ??
// TODO: Fix bugs in morning. Fixes on codepen
// TODO: DEBUG view. might be wonky due to stroke-width and lack of preserveAspectRatio
// ========================================================================= */

class BraidSVG {
	static view (container_id, id, braid, config) {
		let config = config || {
			class: "knot-line",
			strokeWidth: 0.2,
			sw: 1000,
			sh: 1000,
			w: 1000 * braid.word.length,
			h: 1000 * braid.index,
			lineClassList: ["knot-line"],
			underClassList: ["knot-line-under"],
			overClassList: ["knot-line-over"]
		};
		let {sw, sh, w, h} = config;
		let view           = this.svg (id);
		
		document.getElementById (container_id)
            .appendChild    (view);

		for (let y = 0; i < braid.index; i++) {
			let x = 0,
					L = 0;

			for (let letter of braid.word) {
				if (Math.abs (letter) === y + 1) {
					if (L > 0) {
						view.appendChild (BraidSVG.line (x, y, sw, sh, L, config.lineClassList));
						x += L;
						L = 0;
					}

					if (letter < 0) {
						view.appendChild (BraidSVG.negative_crossing (x, y, sw, sh, config.underClassList, config.overClassList));
					}
					else {
						view.appendChild (BraidSVG.positive_crossing (x, y, sw, sh, config.underClassList, config.overClassList));
					}
					x++;
				}
				if (Math.abs (letter) === y) {
					if (L > 0) {
						view.appendChild (BraidSVG.line (x, y, sw, sh, L, config.lineClassList));
						x += L + 1;
						L = 0;
					}
				}
				L += 1;
			}
			if (L > 0) {
				view.appendChild (BraidSVG.line (x, y, sw, sh, L, config.lineClassList));
				L = 0;
			}
		}
	}
	static svg (id, classList, viewBox, preserveAspectRatio, container_id) {
  	let svg = document.createElementNS ("svg");

	  svg.setAttribute ("id", id);
  	svg.setAttribute ("version", "1.1");
	  svg.setAttribute ("xmlns", BraidSVG.svgNS);

		if (classList) {
			for (let cls in classList)
				svg.classList.add (cls);
		}
		if (viewBox)
  		svg.setAttribute ("viewBox", viewBox.join (" "));
		if (preserveAspectRatio)
			svg.setAttribute ("preserveAspectRatio", preserveAspectRatio);
		if (container_id) {
			document.getElementById (container_id)
							.appendChild (svg);
		}

  	return svg;
	}
	static line (x, y, w, h, L, classList) {
  	let line = document.createElementNS (BraidSVG.svgNS, "polyline");
		let points = [
			(x*w),			(y*h + h/2),
			(x*w + L*w),(y*h + h/2) 
		];

		if (classList) {
			for (let cls of classList)
	  		line.classList.add (cls);
		}
  	line.setAttribute ("points", points.join(" "));

  	return line
	}
	static top_down_line (x, y, w, h, classList) {
		let line = document.createElementNS (BraidSVG.svgNS, "polyline");
		let points = [
			(x*w),				(y		*h	+ h/2),
			(x*w + w/3),	(y		*h	+ h/2),
			(x*w + 2*w/3),((y+1)*h) + h/2),
			(x*w + w),		((y+1)*h) + h/2)
		];

		if (classList) {
			for (let cls of classList)
		  	line.classList.add (cls);
		}
		line.setAttribute ("points", points.join(" "));

		return line;
	}
	bottom_up_line (x, y, w, h, classList) {
		let line = document.createElementNS (BraidSVG.svgNS, "polyline");
		let points = [
			(x*w),				((y+1)*h)	+ h/2),
			(x*w + w/3),	((y+1)*h)	+ h/2),
			(x*w + 2*w/3),(y		*h	+ h/2),
			(x*w + w),		(y		*h	+ h/2)
		];

		if (classList) {
			for (let cls of classList)
		  	line.classList.add (cls);
		}
		line.setAttribute ("points", points.join(" "));

		return line;
	}
	static positive_crossing (x, y, w, h, underClassList, overClassList) {
		let g = document.createElementNS (BraidSVG.svgNS, "polyline");

		g.appendChild (BraidSVG.bottom_up_line (x, y, w, h, underClassList));
		g.appendChild (BraidSVG.top_down_line (x, y, w, h, overClassList));

		return g;
	}
	static negative_crossing (x, y, w, h, underClassList, overClassList) {
		let g = document.createElementNS (BraidSVG.svgNS, "polyline");

		g.appendChild (BraidSVG.top_down_line (x, y, w, h, underClassList));
		g.appendChild (BraidSVG.bottom_up_line (x, y, w, h, overClassList));

		return g;
	}
	static corner (id) {
	
	}
	static use (id, x, y) {
  	let use = document.createElementNS (BraidSVG.svgNS, "use");

  	use.setAttributeNS (BraidSVG.xlinkNS, "href", id);
  	use.setAttribute ("x", x);
  	use.setAttribute ("y", y);

  	return use;
	}
	static get svgNS () {
		return "http://www.w3.org/2000/svg";
	}
	static get xlinkNS () {
		return "http://www.w3.org/1999/xlink";
	}
}



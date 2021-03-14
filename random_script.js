"use strict";
var _get = function e(t, i, n) {
		null === t && (t = Function.prototype);
		var r = Object.getOwnPropertyDescriptor(t, i);
		if (void 0 === r) {
			var s = Object.getPrototypeOf(t);
			return null === s ? void 0 : e(s, i, n)
		}
		if ("value" in r) return r.value;
		var o = r.get;
		return void 0 !== o ? o.call(n) : void 0
	},
	_createClass = function() {
		function n(e, t) {
			for (var i = 0; i < t.length; i++) {
				var n = t[i];
				n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
			}
		}
		return function(e, t, i) {
			return t && n(e.prototype, t), i && n(e, i), e
		}
	}(),
	_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
		return typeof e
	} : function(e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
	};

function _possibleConstructorReturn(e, t) {
	if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
	if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
	e.prototype = Object.create(t && t.prototype, {
		constructor: {
			value: e,
			enumerable: !1,
			writable: !0,
			configurable: !0
		}
	}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}

function _classCallCheck(e, t) {
	if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function ajaxLinks(e, t) {
	for (var i = document.querySelectorAll("a"), n = 0; n < i.length; n++) {
		var r = i[n]; - 1 < r.getAttribute("href").indexOf(t) && (r.removeEventListener("click", e), r.addEventListener("click", e))
	}
}

function linksTargetBlank(e) {
	for (var t = document.querySelectorAll("a"), i = 0; i < t.length; i++) {
		var n = t[i],
			r = n.getAttribute("href"); - 1 === r.indexOf(e) && -1 === r.indexOf("mailto") && n.setAttribute("target", "_blank")
	}
}

function parseSharingLinks() {
	for (var e = document.querySelectorAll('[data-js="twitter-share"]'), t = 0; t < e.length; t++) {
		e[t].onclick = function(e) {
			e.preventDefault();
			var t = screen.width / 2 - 300,
				i = screen.height / 2 - 175,
				n = window.open("https://twitter.com/share?url=" + document.URL + "&text=" + e.target.getAttribute("data-tweet"), "twitter-popup", "height=350,width=600,left=" + t + ",top=" + i);
			n.focus && n.focus(), dataLayer.push({
				eventCategory: "WP_social network",
				eventAction: "twitter",
				eventLabel: document.title,
				eventValue: void 0,
				eventNonInteraction: !1,
				event: "eventPush"
			});
			var r = e.target.getAttribute("data-track-sp-label"),
				s = e.target.getAttribute("data-track-sp-prop");
			return __snowplow__("trackStructEvent", "article", "click_share", r, s), !1
		}
	}
	var i = document.querySelectorAll('[data-js="facebook-share"]');
	for (t = 0; t < i.length; t++) {
		i[t].onclick = function(e) {
			e.preventDefault();
			var t = screen.width / 2 - 300,
				i = screen.height / 2 - 175,
				n = window.open("https://www.facebook.com/sharer/sharer.php?u=" + document.URL, "facebook-popup", "height=350,width=600,left=" + t + ",top=" + i);
			n.focus && n.focus(), dataLayer.push({
				eventCategory: "WP_social network",
				eventAction: "facebook",
				eventLabel: document.title,
				eventValue: void 0,
				eventNonInteraction: !1,
				event: "eventPush"
			});
			var r = e.target.getAttribute("data-track-sp-label"),
				s = e.target.getAttribute("data-track-sp-prop");
			return __snowplow__("trackStructEvent", "article", "click_share", r, s), !1
		}
	}
	var n = document.querySelectorAll('[data-js="copy-link"]');
	for (t = 0; t < n.length; t++) {
		n[t].onclick = function(e) {
			e.preventDefault();
			var t = document.createElement("input");
			t.value = e.target.getAttribute("data-copy-text"), this.parentElement.appendChild(t), t.select();
			try {
				document.execCommand("copy")
			} catch (e) {
				console.log("Oops, unable to copy", e)
			}
			this.parentElement.removeChild(t);
			var i = this.innerHTML;
			this.innerHTML = "Link Copied", this.classList.add("disabled");
			var n = this;
			TweenMax.delayedCall(2, function(e) {
				n.innerHTML = e, n.classList.remove("disabled")
			}, [i]), dataLayer.push({
				eventCategory: "WP_social network",
				eventAction: "copy link",
				eventLabel: document.title,
				eventValue: void 0,
				eventNonInteraction: !1,
				event: "eventPush"
			});
			var r = e.target.getAttribute("data-track-sp-label"),
				s = e.target.getAttribute("data-track-sp-prop");
			return __snowplow__("trackStructEvent", "article", "click_share", r, s), !1
		}
	}
}

function ajaxLoad(e, n, r) {
	var t = new XMLHttpRequest;
	return t.onload = function(e) {
		var t, i = document.createRange().createContextualFragment(e.target.response);
		t = n ? i.querySelector(n) : i.firstElementChild, r && r(t)
	}, t.open("GET", e, !0), t.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), t.send(), t
}

function replaceDom(e, t) {
	if (e && t) {
		for (var i = document.querySelector(e); i.firstChild;) i.removeChild(i.firstChild);
		i.innerHTML = t.innerHTML
	}
}

function updateSectionTitle(e) {
	document.title = e
}

function preloadImages(e, t, i, n) {
	for (var r = 0, s = e.length, o = 0; o < e.length; o++) {
		var a = new Image;
		a.srcElement = e[o], a.onProgress = t, a.onComplete = i, a.onCompleteParams = n, a.addEventListener("load", function() {
			this.srcElement.src = this.src, r++, this.onProgress && this.onProgress(r, s, this.srcElement), r == s && this.onComplete && this.onComplete(a.onCompleteParams)
		}), e[o].getAttribute("src") ? a.src = e[o].getAttribute("src") : a.src = e[o].getAttribute("data-src")
	}
}

function getStrippedPath(e) {
	return e.replace(/(^\w+:|^)\/\//, "").split("?")[0]
}

function getStyle(e, t, i) {
	return ((i = window.getComputedStyle) ? i(e) : e.currentStyle)[t.replace(/-(\w)/gi, function(e, t) {
		return t.toUpperCase()
	})]
}

function getPosition(e) {
	var t = e.getBoundingClientRect();
	return {
		left: t.left + window.pageXOffset || document.documentElement.scrollLeft,
		top: t.top + window.pageYOffset || document.documentElement.scrollTop
	}
}

function getOffset(e) {
	var t = e.getBoundingClientRect();
	return {
		left: t.left,
		top: t.top
	}
}

function getSize(e) {
	return {
		width: e.clientWidth,
		height: e.clientHeight
	}
}

function getColspan(e) {
	return Math.round(e.parentElement.clientWidth / e.clientWidth)
}

function getCookie(e) {
	var t = document.cookie.match("(^|;) ?" + e + "=([^;]*)(;|$)");
	return t ? t[2] : null
}

function setCookie(e, t, i) {
	var n = getStrippedPath(path).replace("/", ""),
		r = new Date;
	r.setTime(r.getTime() + 864e5 * i), document.cookie = e + "=" + t + ";path=/;domain=" + n + ";expires=" + r.toGMTString()
}

function deleteCookie(e) {
	setCookie(e, "", -1)
}

function debounce(n, r, s) {
	var o;
	return function() {
		var e = this,
			t = arguments,
			i = s && !o;
		clearTimeout(o), o = setTimeout(function() {
			o = null, s || n.apply(e, t)
		}, r), i && n.apply(e, t)
	}
}

function rgb2hex(e) {
	function t(e) {
		return ("0" + parseInt(e).toString(16)).slice(-2)
	}
	return "#" + t((e = e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/))[1]) + t(e[2]) + t(e[3])
}

function isAndroid() {
	return -1 < navigator.userAgent.toLowerCase().indexOf("android")
}

function isIOS() {
	return /(iPad|iPhone|iPod)/g.test(navigator.userAgent)
}

function isMobile() {
	return !!(isTouch() && screen.width < 600)
}

function isTablet() {
	return !!(isTouch() && 600 <= screen.width)
}

function isTouch() {
	return Boolean("ontouchstart" in window || navigator.maxTouchPoints)
}

function hoverTouchUnstick() {
	if ("ontouchstart" in document.documentElement)
		for (var e = document.styleSheets.length - 1; 0 <= e; e--) {
			var t = document.styleSheets[e];
			if (t.cssRules)
				for (var i = t.cssRules.length - 1; 0 <= i; i--) {
					var n = t.cssRules[i];
					n.selectorText && (n.selectorText = n.selectorText.replace(":hover", ":active"))
				}
		}
}! function() {
	var e;
	(e = window.Node || window.Element) && e.prototype && null == e.prototype.firstElementChild && Object.defineProperty(e.prototype, "firstElementChild", {
		get: function() {
			for (var e, t = this.childNodes, i = 0; e = t[i++];)
				if (1 === e.nodeType) return e;
			return null
		}
	}), "function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
		value: function(e, t) {
			if (null == e) throw new TypeError("Cannot convert undefined or null to object");
			for (var i = Object(e), n = 1; n < arguments.length; n++) {
				var r = arguments[n];
				if (null != r)
					for (var s in r) Object.prototype.hasOwnProperty.call(r, s) && (i[s] = r[s])
			}
			return i
		},
		writable: !0,
		configurable: !0
	})
}(), Array.from || (Array.from = function() {
	var t = Object.prototype.toString,
		l = function(e) {
			return "function" == typeof e || "[object Function]" === t.call(e)
		},
		n = Math.pow(2, 53) - 1,
		h = function(e) {
			var t, i = (t = Number(e), isNaN(t) ? 0 : 0 !== t && isFinite(t) ? (0 < t ? 1 : -1) * Math.floor(Math.abs(t)) : t);
			return Math.min(Math.max(i, 0), n)
		};
	return function(e) {
		var t = Object(e);
		if (null == e) throw new TypeError("Array.from requires an array-like object - not null or undefined");
		var i, n = 1 < arguments.length ? arguments[1] : void 0;
		if (void 0 !== n) {
			if (!l(n)) throw new TypeError("Array.from: when provided, the second argument must be a function");
			2 < arguments.length && (i = arguments[2])
		}
		for (var r, s = h(t.length), o = l(this) ? Object(new this(s)) : new Array(s), a = 0; a < s;) r = t[a], o[a] = n ? void 0 === i ? n(r, a) : n.call(i, r, a) : r, a += 1;
		return o.length = s, o
	}
}()), Number.prototype.clamp = function(e, t) {
	return Math.min(Math.max(this, e), t)
};
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
		var e, l, t, x, b, S, k, y, i, _, E, v, w, p, f, m, n;
		_gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(n, u, _) {
			var m = function(e) {
					var t, i = [],
						n = e.length;
					for (t = 0; t !== n; i.push(e[t++]));
					return i
				},
				y = function(e, t, i) {
					var n, r, s = e.cycle;
					for (n in s) r = s[n], e[n] = "function" == typeof r ? r(i, t[i]) : r[i % r.length];
					delete e.cycle
				},
				v = function e(t, i, n) {
					_.call(this, t, i, n), this._cycle = 0, this._yoyo = !0 === this.vars.yoyo || !!this.vars.yoyoEase, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._repeat && this._uncache(!0), this.render = e.prototype.render
				},
				w = 1e-10,
				b = _._internals,
				S = b.isSelector,
				x = b.isArray,
				e = v.prototype = _.to({}, .1, {}),
				k = [];
			v.version = "1.20.3", e.constructor = v, e.kill()._gc = !1, v.killTweensOf = v.killDelayedCallsTo = _.killTweensOf, v.getTweensOf = _.getTweensOf, v.lagSmoothing = _.lagSmoothing, v.ticker = _.ticker, v.render = _.render, e.invalidate = function() {
				return this._yoyo = !0 === this.vars.yoyo || !!this.vars.yoyoEase, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._yoyoEase = null, this._uncache(!0), _.prototype.invalidate.call(this)
			}, e.updateTo = function(e, t) {
				var i, n = this.ratio,
					r = this.vars.immediateRender || e.immediateRender;
				for (i in t && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay)), e) this.vars[i] = e[i];
				if (this._initted || r)
					if (t) this._initted = !1, r && this.render(0, !0, !0);
					else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && _._onPluginEvent("_onDisable", this), .998 < this._time / this._duration) {
					var s = this._totalTime;
					this.render(0, !0, !1), this._initted = !1, this.render(s, !0, !1)
				} else if (this._initted = !1, this._init(), 0 < this._time || r)
					for (var o, a = 1 / (1 - n), l = this._firstPT; l;) o = l.s + l.c, l.c *= a, l.s = o - l.c, l = l._next;
				return this
			}, e.render = function(e, t, i) {
				this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
				var n, r, s, o, a, l, h, u, c, d = this._dirty ? this.totalDuration() : this._totalDuration,
					p = this._time,
					f = this._totalTime,
					g = this._cycle,
					m = this._duration,
					y = this._rawPrevTime;
				if (d - 1e-7 <= e && 0 <= e ? (this._totalTime = d, this._cycle = this._repeat, this._yoyo && 0 != (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = m, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (n = !0, r = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === m && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (e = 0), (y < 0 || e <= 0 && -1e-7 <= e || y === w && "isPause" !== this.data) && y !== e && (i = !0, w < y && (r = "onReverseComplete")), this._rawPrevTime = u = !t || e || y === e ? e : w)) : e < 1e-7 ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== f || 0 === m && 0 < y) && (r = "onReverseComplete", n = this._reversed), e < 0 && (this._active = !1, 0 === m && (this._initted || !this.vars.lazy || i) && (0 <= y && (i = !0), this._rawPrevTime = u = !t || e || y === e ? e : w)), this._initted || (i = !0)) : (this._totalTime = this._time = e, 0 !== this._repeat && (o = m + this._repeatDelay, this._cycle = this._totalTime / o >> 0, 0 !== this._cycle && this._cycle === this._totalTime / o && f <= e && this._cycle--, this._time = this._totalTime - this._cycle * o, this._yoyo && 0 != (1 & this._cycle) && (this._time = m - this._time, (c = this._yoyoEase || this.vars.yoyoEase) && (this._yoyoEase || (!0 !== c || this._initted ? this._yoyoEase = c = !0 === c ? this._ease : c instanceof Ease ? c : Ease.map[c] : (c = this.vars.ease, this._yoyoEase = c = c ? c instanceof Ease ? c : "function" == typeof c ? new Ease(c, this.vars.easeParams) : Ease.map[c] || _.defaultEase : _.defaultEase)), this.ratio = c ? 1 - c.getRatio((m - this._time) / m) : 0)), this._time > m ? this._time = m : this._time < 0 && (this._time = 0)), this._easeType && !c ? (a = this._time / m, (1 === (l = this._easeType) || 3 === l && .5 <= a) && (a = 1 - a), 3 === l && (a *= 2), 1 === (h = this._easePower) ? a *= a : 2 === h ? a *= a * a : 3 === h ? a *= a * a * a : 4 === h && (a *= a * a * a * a), 1 === l ? this.ratio = 1 - a : 2 === l ? this.ratio = a : this._time / m < .5 ? this.ratio = a / 2 : this.ratio = 1 - a / 2) : c || (this.ratio = this._ease.getRatio(this._time / m))), p !== this._time || i || g !== this._cycle) {
					if (!this._initted) {
						if (this._init(), !this._initted || this._gc) return;
						if (!i && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration)) return this._time = p, this._totalTime = f, this._rawPrevTime = y, this._cycle = g, b.lazyTweens.push(this), void(this._lazy = [e, t]);
						!this._time || n || c ? n && this._ease._calcEnd && !c && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1)) : this.ratio = this._ease.getRatio(this._time / m)
					}
					for (!1 !== this._lazy && (this._lazy = !1), this._active || !this._paused && this._time !== p && 0 <= e && (this._active = !0), 0 === f && (2 === this._initted && 0 < e && this._init(), this._startAt && (0 <= e ? this._startAt.render(e, !0, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === m) && (t || this._callback("onStart"))), s = this._firstPT; s;) s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s, s = s._next;
					this._onUpdate && (e < 0 && this._startAt && this._startTime && this._startAt.render(e, !0, i), t || (this._totalTime !== f || r) && this._callback("onUpdate")), this._cycle !== g && (t || this._gc || this.vars.onRepeat && this._callback("onRepeat")), r && (!this._gc || i) && (e < 0 && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(e, !0, i), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[r] && this._callback(r), 0 === m && this._rawPrevTime === w && u !== w && (this._rawPrevTime = 0))
				} else f !== this._totalTime && this._onUpdate && (t || this._callback("onUpdate"))
			}, v.to = function(e, t, i) {
				return new v(e, t, i)
			}, v.from = function(e, t, i) {
				return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new v(e, t, i)
			}, v.fromTo = function(e, t, i, n) {
				return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new v(e, t, n)
			}, v.staggerTo = v.allTo = function(e, t, i, n, r, s, o) {
				n = n || 0;
				var a, l, h, u, c = 0,
					d = [],
					p = function() {
						i.onComplete && i.onComplete.apply(i.onCompleteScope || this, arguments), r.apply(o || i.callbackScope || this, s || k)
					},
					f = i.cycle,
					g = i.startAt && i.startAt.cycle;
				for (x(e) || ("string" == typeof e && (e = _.selector(e) || e), S(e) && (e = m(e))), e = e || [], n < 0 && ((e = m(e)).reverse(), n *= -1), a = e.length - 1, h = 0; h <= a; h++) {
					for (u in l = {}, i) l[u] = i[u];
					if (f && (y(l, e, h), null != l.duration && (t = l.duration, delete l.duration)), g) {
						for (u in g = l.startAt = {}, i.startAt) g[u] = i.startAt[u];
						y(l.startAt, e, h)
					}
					l.delay = c + (l.delay || 0), h === a && r && (l.onComplete = p), d[h] = new v(e[h], t, l), c += n
				}
				return d
			}, v.staggerFrom = v.allFrom = function(e, t, i, n, r, s, o) {
				return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, v.staggerTo(e, t, i, n, r, s, o)
			}, v.staggerFromTo = v.allFromTo = function(e, t, i, n, r, s, o, a) {
				return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, v.staggerTo(e, t, n, r, s, o, a)
			}, v.delayedCall = function(e, t, i, n, r) {
				return new v(t, 0, {
					delay: e,
					onComplete: t,
					onCompleteParams: i,
					callbackScope: n,
					onReverseComplete: t,
					onReverseCompleteParams: i,
					immediateRender: !1,
					useFrames: r,
					overwrite: 0
				})
			}, v.set = function(e, t) {
				return new v(e, 0, t)
			}, v.isTweening = function(e) {
				return 0 < _.getTweensOf(e, !0).length
			};
			var t = function e(t, i) {
					for (var n = [], r = 0, s = t._first; s;) s instanceof _ ? n[r++] = s : (i && (n[r++] = s), r = (n = n.concat(e(s, i))).length), s = s._next;
					return n
				},
				c = v.getAllTweens = function(e) {
					return t(n._rootTimeline, e).concat(t(n._rootFramesTimeline, e))
				};
			v.killAll = function(e, t, i, n) {
				null == t && (t = !0), null == i && (i = !0);
				var r, s, o, a = c(0 != n),
					l = a.length,
					h = t && i && n;
				for (o = 0; o < l; o++) s = a[o], (h || s instanceof u || (r = s.target === s.vars.onComplete) && i || t && !r) && (e ? s.totalTime(s._reversed ? 0 : s.totalDuration()) : s._enabled(!1, !1))
			}, v.killChildTweensOf = function(e, t) {
				if (null != e) {
					var i, n, r, s, o, a = b.tweenLookup;
					if ("string" == typeof e && (e = _.selector(e) || e), S(e) && (e = m(e)), x(e))
						for (s = e.length; - 1 < --s;) v.killChildTweensOf(e[s], t);
					else {
						for (r in i = [], a)
							for (n = a[r].target.parentNode; n;) n === e && (i = i.concat(a[r].tweens)), n = n.parentNode;
						for (o = i.length, s = 0; s < o; s++) t && i[s].totalTime(i[s].totalDuration()), i[s]._enabled(!1, !1)
					}
				}
			};
			var r = function(e, t, i, n) {
				t = !1 !== t, i = !1 !== i;
				for (var r, s, o = c(n = !1 !== n), a = t && i && n, l = o.length; - 1 < --l;) s = o[l], (a || s instanceof u || (r = s.target === s.vars.onComplete) && i || t && !r) && s.paused(e)
			};
			return v.pauseAll = function(e, t, i) {
				r(!0, e, t, i)
			}, v.resumeAll = function(e, t, i) {
				r(!1, e, t, i)
			}, v.globalTimeScale = function(e) {
				var t = n._rootTimeline,
					i = _.ticker.time;
				return arguments.length ? (e = e || w, t._startTime = i - (i - t._startTime) * t._timeScale / e, t = n._rootFramesTimeline, i = _.ticker.frame, t._startTime = i - (i - t._startTime) * t._timeScale / e, t._timeScale = n._rootTimeline._timeScale = e, e) : t._timeScale
			}, e.progress = function(e, t) {
				return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 != (1 & this._cycle) ? 1 - e : e) + this._cycle * (this._duration + this._repeatDelay), t) : this._time / this.duration()
			}, e.totalProgress = function(e, t) {
				return arguments.length ? this.totalTime(this.totalDuration() * e, t) : this._totalTime / this.totalDuration()
			}, e.time = function(e, t) {
				return arguments.length ? (this._dirty && this.totalDuration(), e > this._duration && (e = this._duration), this._yoyo && 0 != (1 & this._cycle) ? e = this._duration - e + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (e += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(e, t)) : this._time
			}, e.duration = function(e) {
				return arguments.length ? n.prototype.duration.call(this, e) : this._duration
			}, e.totalDuration = function(e) {
				return arguments.length ? -1 === this._repeat ? this : this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
			}, e.repeat = function(e) {
				return arguments.length ? (this._repeat = e, this._uncache(!0)) : this._repeat
			}, e.repeatDelay = function(e) {
				return arguments.length ? (this._repeatDelay = e, this._uncache(!0)) : this._repeatDelay
			}, e.yoyo = function(e) {
				return arguments.length ? (this._yoyo = e, this) : this._yoyo
			}, v
		}, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(u, c, d) {
			var p = function(e) {
					c.call(this, e), this._labels = {}, this.autoRemoveChildren = !0 === this.vars.autoRemoveChildren, this.smoothChildTiming = !0 === this.vars.smoothChildTiming, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
					var t, i, n = this.vars;
					for (i in n) t = n[i], m(t) && -1 !== t.join("").indexOf("{self}") && (n[i] = this._swapSelfInParams(t));
					m(n.tweens) && this.add(n.tweens, 0, n.align, n.stagger)
				},
				g = 1e-10,
				e = d._internals,
				t = p._internals = {},
				f = e.isSelector,
				m = e.isArray,
				y = e.lazyTweens,
				_ = e.lazyRender,
				o = _gsScope._gsDefine.globals,
				v = function(e) {
					var t, i = {};
					for (t in e) i[t] = e[t];
					return i
				},
				w = function(e, t, i) {
					var n, r, s = e.cycle;
					for (n in s) r = s[n], e[n] = "function" == typeof r ? r(i, t[i]) : r[i % r.length];
					delete e.cycle
				},
				s = t.pauseCallback = function() {},
				b = function(e) {
					var t, i = [],
						n = e.length;
					for (t = 0; t !== n; i.push(e[t++]));
					return i
				},
				i = p.prototype = new c;
			return p.version = "1.20.3", i.constructor = p, i.kill()._gc = i._forcingPlayhead = i._hasPause = !1, i.to = function(e, t, i, n) {
				var r = i.repeat && o.TweenMax || d;
				return t ? this.add(new r(e, t, i), n) : this.set(e, i, n)
			}, i.from = function(e, t, i, n) {
				return this.add((i.repeat && o.TweenMax || d).from(e, t, i), n)
			}, i.fromTo = function(e, t, i, n, r) {
				var s = n.repeat && o.TweenMax || d;
				return t ? this.add(s.fromTo(e, t, i, n), r) : this.set(e, n, r)
			}, i.staggerTo = function(e, t, i, n, r, s, o, a) {
				var l, h, u = new p({
						onComplete: s,
						onCompleteParams: o,
						callbackScope: a,
						smoothChildTiming: this.smoothChildTiming
					}),
					c = i.cycle;
				for ("string" == typeof e && (e = d.selector(e) || e), f(e = e || []) && (e = b(e)), (n = n || 0) < 0 && ((e = b(e)).reverse(), n *= -1), h = 0; h < e.length; h++)(l = v(i)).startAt && (l.startAt = v(l.startAt), l.startAt.cycle && w(l.startAt, e, h)), c && (w(l, e, h), null != l.duration && (t = l.duration, delete l.duration)), u.to(e[h], t, l, h * n);
				return this.add(u, r)
			}, i.staggerFrom = function(e, t, i, n, r, s, o, a) {
				return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(e, t, i, n, r, s, o, a)
			}, i.staggerFromTo = function(e, t, i, n, r, s, o, a, l) {
				return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, this.staggerTo(e, t, n, r, s, o, a, l)
			}, i.call = function(e, t, i, n) {
				return this.add(d.delayedCall(0, e, t, i), n)
			}, i.set = function(e, t, i) {
				return i = this._parseTimeOrLabel(i, 0, !0), null == t.immediateRender && (t.immediateRender = i === this._time && !this._paused), this.add(new d(e, 0, t), i)
			}, p.exportRoot = function(e, t) {
				null == (e = e || {}).smoothChildTiming && (e.smoothChildTiming = !0);
				var i, n, r, s, o = new p(e),
					a = o._timeline;
				for (null == t && (t = !0), a._remove(o, !0), o._startTime = 0, o._rawPrevTime = o._time = o._totalTime = a._time, r = a._first; r;) s = r._next, t && r instanceof d && r.target === r.vars.onComplete || ((n = r._startTime - r._delay) < 0 && (i = 1), o.add(r, n)), r = s;
				return a.add(o, 0), i && o.totalDuration(), o
			}, i.add = function(e, t, i, n) {
				var r, s, o, a, l, h;
				if ("number" != typeof t && (t = this._parseTimeOrLabel(t, 0, !0, e)), !(e instanceof u)) {
					if (e instanceof Array || e && e.push && m(e)) {
						for (i = i || "normal", n = n || 0, r = t, s = e.length, o = 0; o < s; o++) m(a = e[o]) && (a = new p({
							tweens: a
						})), this.add(a, r), "string" != typeof a && "function" != typeof a && ("sequence" === i ? r = a._startTime + a.totalDuration() / a._timeScale : "start" === i && (a._startTime -= a.delay())), r += n;
						return this._uncache(!0)
					}
					if ("string" == typeof e) return this.addLabel(e, t);
					if ("function" != typeof e) throw "Cannot add " + e + " into the timeline; it is not a tween, timeline, function, or string.";
					e = d.delayedCall(0, e)
				}
				if (c.prototype.add.call(this, e, t), e._time && e.render((this.rawTime() - e._startTime) * e._timeScale, !1, !1), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
					for (h = (l = this).rawTime() > e._startTime; l._timeline;) h && l._timeline.smoothChildTiming ? l.totalTime(l._totalTime, !0) : l._gc && l._enabled(!0, !1), l = l._timeline;
				return this
			}, i.remove = function(e) {
				if (e instanceof u) {
					this._remove(e, !1);
					var t = e._timeline = e.vars.useFrames ? u._rootFramesTimeline : u._rootTimeline;
					return e._startTime = (e._paused ? e._pauseTime : t._time) - (e._reversed ? e.totalDuration() - e._totalTime : e._totalTime) / e._timeScale, this
				}
				if (e instanceof Array || e && e.push && m(e)) {
					for (var i = e.length; - 1 < --i;) this.remove(e[i]);
					return this
				}
				return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
			}, i._remove = function(e, t) {
				return c.prototype._remove.call(this, e, t), this._last ? this._time > this.duration() && (this._time = this._duration, this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
			}, i.append = function(e, t) {
				return this.add(e, this._parseTimeOrLabel(null, t, !0, e))
			}, i.insert = i.insertMultiple = function(e, t, i, n) {
				return this.add(e, t || 0, i, n)
			}, i.appendMultiple = function(e, t, i, n) {
				return this.add(e, this._parseTimeOrLabel(null, t, !0, e), i, n)
			}, i.addLabel = function(e, t) {
				return this._labels[e] = this._parseTimeOrLabel(t), this
			}, i.addPause = function(e, t, i, n) {
				var r = d.delayedCall(0, s, i, n || this);
				return r.vars.onComplete = r.vars.onReverseComplete = t, r.data = "isPause", this._hasPause = !0, this.add(r, e)
			}, i.removeLabel = function(e) {
				return delete this._labels[e], this
			}, i.getLabelTime = function(e) {
				return null != this._labels[e] ? this._labels[e] : -1
			}, i._parseTimeOrLabel = function(e, t, i, n) {
				var r, s;
				if (n instanceof u && n.timeline === this) this.remove(n);
				else if (n && (n instanceof Array || n.push && m(n)))
					for (s = n.length; - 1 < --s;) n[s] instanceof u && n[s].timeline === this && this.remove(n[s]);
				if (r = "number" != typeof e || t ? 99999999999 < this.duration() ? this.recent().endTime(!1) : this._duration : 0, "string" == typeof t) return this._parseTimeOrLabel(t, i && "number" == typeof e && null == this._labels[t] ? e - r : 0, i);
				if (t = t || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e]) null == e && (e = r);
				else {
					if (-1 === (s = e.indexOf("="))) return null == this._labels[e] ? i ? this._labels[e] = r + t : t : this._labels[e] + t;
					t = parseInt(e.charAt(s - 1) + "1", 10) * Number(e.substr(s + 1)), e = 1 < s ? this._parseTimeOrLabel(e.substr(0, s - 1), 0, i) : r
				}
				return Number(e) + t
			}, i.seek = function(e, t) {
				return this.totalTime("number" == typeof e ? e : this._parseTimeOrLabel(e), !1 !== t)
			}, i.stop = function() {
				return this.paused(!0)
			}, i.gotoAndPlay = function(e, t) {
				return this.play(e, t)
			}, i.gotoAndStop = function(e, t) {
				return this.pause(e, t)
			}, i.render = function(e, t, i) {
				this._gc && this._enabled(!0, !1);
				var n, r, s, o, a, l, h, u = this._time,
					c = this._dirty ? this.totalDuration() : this._totalDuration,
					d = this._startTime,
					p = this._timeScale,
					f = this._paused;
				if (u !== this._time && (e += this._time - u), c - 1e-7 <= e && 0 <= e) this._totalTime = this._time = c, this._reversed || this._hasPausedChild() || (r = !0, o = "onComplete", a = !!this._timeline.autoRemoveChildren, 0 === this._duration && (e <= 0 && -1e-7 <= e || this._rawPrevTime < 0 || this._rawPrevTime === g) && this._rawPrevTime !== e && this._first && (a = !0, this._rawPrevTime > g && (o = "onReverseComplete"))), this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : g, e = c + 1e-4;
				else if (e < 1e-7)
					if (this._totalTime = this._time = 0, (0 !== u || 0 === this._duration && this._rawPrevTime !== g && (0 < this._rawPrevTime || e < 0 && 0 <= this._rawPrevTime)) && (o = "onReverseComplete", r = this._reversed), e < 0) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (a = r = !0, o = "onReverseComplete") : 0 <= this._rawPrevTime && this._first && (a = !0), this._rawPrevTime = e;
					else {
						if (this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : g, 0 === e && r)
							for (n = this._first; n && 0 === n._startTime;) n._duration || (r = !1), n = n._next;
						e = 0, this._initted || (a = !0)
					}
				else {
					if (this._hasPause && !this._forcingPlayhead && !t) {
						if (u <= e)
							for (n = this._first; n && n._startTime <= e && !l;) n._duration || "isPause" !== n.data || n.ratio || 0 === n._startTime && 0 === this._rawPrevTime || (l = n), n = n._next;
						else
							for (n = this._last; n && n._startTime >= e && !l;) n._duration || "isPause" === n.data && 0 < n._rawPrevTime && (l = n), n = n._prev;
						l && (this._time = e = l._startTime, this._totalTime = e + this._cycle * (this._totalDuration + this._repeatDelay))
					}
					this._totalTime = this._time = this._rawPrevTime = e
				}
				if (this._time !== u && this._first || i || a || l) {
					if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== u && 0 < e && (this._active = !0), 0 === u && this.vars.onStart && (0 === this._time && this._duration || t || this._callback("onStart")), u <= (h = this._time))
						for (n = this._first; n && (s = n._next, h === this._time && (!this._paused || f));)(n._active || n._startTime <= h && !n._paused && !n._gc) && (l === n && this.pause(), n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (e - n._startTime) * n._timeScale, t, i) : n.render((e - n._startTime) * n._timeScale, t, i)), n = s;
					else
						for (n = this._last; n && (s = n._prev, h === this._time && (!this._paused || f));) {
							if (n._active || n._startTime <= u && !n._paused && !n._gc) {
								if (l === n) {
									for (l = n._prev; l && l.endTime() > this._time;) l.render(l._reversed ? l.totalDuration() - (e - l._startTime) * l._timeScale : (e - l._startTime) * l._timeScale, t, i), l = l._prev;
									l = null, this.pause()
								}
								n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (e - n._startTime) * n._timeScale, t, i) : n.render((e - n._startTime) * n._timeScale, t, i)
							}
							n = s
						}
					this._onUpdate && (t || (y.length && _(), this._callback("onUpdate"))), o && (this._gc || (d === this._startTime || p !== this._timeScale) && (0 === this._time || c >= this.totalDuration()) && (r && (y.length && _(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[o] && this._callback(o)))
				}
			}, i._hasPausedChild = function() {
				for (var e = this._first; e;) {
					if (e._paused || e instanceof p && e._hasPausedChild()) return !0;
					e = e._next
				}
				return !1
			}, i.getChildren = function(e, t, i, n) {
				n = n || -9999999999;
				for (var r = [], s = this._first, o = 0; s;) s._startTime < n || (s instanceof d ? !1 !== t && (r[o++] = s) : (!1 !== i && (r[o++] = s), !1 !== e && (o = (r = r.concat(s.getChildren(!0, t, i))).length))), s = s._next;
				return r
			}, i.getTweensOf = function(e, t) {
				var i, n, r = this._gc,
					s = [],
					o = 0;
				for (r && this._enabled(!0, !0), n = (i = d.getTweensOf(e)).length; - 1 < --n;)(i[n].timeline === this || t && this._contains(i[n])) && (s[o++] = i[n]);
				return r && this._enabled(!1, !0), s
			}, i.recent = function() {
				return this._recent
			}, i._contains = function(e) {
				for (var t = e.timeline; t;) {
					if (t === this) return !0;
					t = t.timeline
				}
				return !1
			}, i.shiftChildren = function(e, t, i) {
				i = i || 0;
				for (var n, r = this._first, s = this._labels; r;) r._startTime >= i && (r._startTime += e), r = r._next;
				if (t)
					for (n in s) s[n] >= i && (s[n] += e);
				return this._uncache(!0)
			}, i._kill = function(e, t) {
				if (!e && !t) return this._enabled(!1, !1);
				for (var i = t ? this.getTweensOf(t) : this.getChildren(!0, !0, !1), n = i.length, r = !1; - 1 < --n;) i[n]._kill(e, t) && (r = !0);
				return r
			}, i.clear = function(e) {
				var t = this.getChildren(!1, !0, !0),
					i = t.length;
				for (this._time = this._totalTime = 0; - 1 < --i;) t[i]._enabled(!1, !1);
				return !1 !== e && (this._labels = {}), this._uncache(!0)
			}, i.invalidate = function() {
				for (var e = this._first; e;) e.invalidate(), e = e._next;
				return u.prototype.invalidate.call(this)
			}, i._enabled = function(e, t) {
				if (e === this._gc)
					for (var i = this._first; i;) i._enabled(e, !0), i = i._next;
				return c.prototype._enabled.call(this, e, t)
			}, i.totalTime = function(e, t, i) {
				this._forcingPlayhead = !0;
				var n = u.prototype.totalTime.apply(this, arguments);
				return this._forcingPlayhead = !1, n
			}, i.duration = function(e) {
				return arguments.length ? (0 !== this.duration() && 0 !== e && this.timeScale(this._duration / e), this) : (this._dirty && this.totalDuration(), this._duration)
			}, i.totalDuration = function(e) {
				if (!arguments.length) {
					if (this._dirty) {
						for (var t, i, n = 0, r = this._last, s = 999999999999; r;) t = r._prev, r._dirty && r.totalDuration(), r._startTime > s && this._sortChildren && !r._paused && !this._calculatingDuration ? (this._calculatingDuration = 1, this.add(r, r._startTime - r._delay), this._calculatingDuration = 0) : s = r._startTime, r._startTime < 0 && !r._paused && (n -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale, this._time -= r._startTime, this._totalTime -= r._startTime, this._rawPrevTime -= r._startTime), this.shiftChildren(-r._startTime, !1, -9999999999), s = 0), n < (i = r._startTime + r._totalDuration / r._timeScale) && (n = i), r = t;
						this._duration = this._totalDuration = n, this._dirty = !1
					}
					return this._totalDuration
				}
				return e && this.totalDuration() ? this.timeScale(this._totalDuration / e) : this
			}, i.paused = function(e) {
				if (!e)
					for (var t = this._first, i = this._time; t;) t._startTime === i && "isPause" === t.data && (t._rawPrevTime = 0), t = t._next;
				return u.prototype.paused.apply(this, arguments)
			}, i.usesFrames = function() {
				for (var e = this._timeline; e._timeline;) e = e._timeline;
				return e === u._rootFramesTimeline
			}, i.rawTime = function(e) {
				return e && (this._paused || this._repeat && 0 < this.time() && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(e) - this._startTime) * this._timeScale
			}, p
		}, !0), _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(t, a, e) {
			var i = function(e) {
					t.call(this, e), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = !0 === this.vars.yoyo, this._dirty = !0
				},
				T = 1e-10,
				n = a._internals,
				C = n.lazyTweens,
				M = n.lazyRender,
				l = _gsScope._gsDefine.globals,
				h = new e(null, null, 1, 0),
				r = i.prototype = new t;
			return r.constructor = i, r.kill()._gc = !1, i.version = "1.20.3", r.invalidate = function() {
				return this._yoyo = !0 === this.vars.yoyo, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), t.prototype.invalidate.call(this)
			}, r.addCallback = function(e, t, i, n) {
				return this.add(a.delayedCall(0, e, i, n), t)
			}, r.removeCallback = function(e, t) {
				if (e)
					if (null == t) this._kill(null, e);
					else
						for (var i = this.getTweensOf(e, !1), n = i.length, r = this._parseTimeOrLabel(t); - 1 < --n;) i[n]._startTime === r && i[n]._enabled(!1, !1);
				return this
			}, r.removePause = function(e) {
				return this.removeCallback(t._internals.pauseCallback, e)
			}, r.tweenTo = function(e, t) {
				t = t || {};
				var i, n, r, s = {
						ease: h,
						useFrames: this.usesFrames(),
						immediateRender: !1
					},
					o = t.repeat && l.TweenMax || a;
				for (n in t) s[n] = t[n];
				return s.time = this._parseTimeOrLabel(e), i = Math.abs(Number(s.time) - this._time) / this._timeScale || .001, r = new o(this, i, s), s.onStart = function() {
					r.target.paused(!0), r.vars.time !== r.target.time() && i === r.duration() && r.duration(Math.abs(r.vars.time - r.target.time()) / r.target._timeScale), t.onStart && t.onStart.apply(t.onStartScope || t.callbackScope || r, t.onStartParams || [])
				}, r
			}, r.tweenFromTo = function(e, t, i) {
				i = i || {}, e = this._parseTimeOrLabel(e), i.startAt = {
					onComplete: this.seek,
					onCompleteParams: [e],
					callbackScope: this
				}, i.immediateRender = !1 !== i.immediateRender;
				var n = this.tweenTo(t, i);
				return n.duration(Math.abs(n.vars.time - e) / this._timeScale || .001)
			}, r.render = function(e, t, i) {
				this._gc && this._enabled(!0, !1);
				var n, r, s, o, a, l, h, u, c = this._time,
					d = this._dirty ? this.totalDuration() : this._totalDuration,
					p = this._duration,
					f = this._totalTime,
					g = this._startTime,
					m = this._timeScale,
					y = this._rawPrevTime,
					_ = this._paused,
					v = this._cycle;
				if (c !== this._time && (e += this._time - c), d - 1e-7 <= e && 0 <= e) this._locked || (this._totalTime = d, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (r = !0, o = "onComplete", a = !!this._timeline.autoRemoveChildren, 0 === this._duration && (e <= 0 && -1e-7 <= e || y < 0 || y === T) && y !== e && this._first && (a = !0, T < y && (o = "onReverseComplete"))), this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : T, this._yoyo && 0 != (1 & this._cycle) ? this._time = e = 0 : e = (this._time = p) + 1e-4;
				else if (e < 1e-7)
					if (this._locked || (this._totalTime = this._cycle = 0), ((this._time = 0) !== c || 0 === p && y !== T && (0 < y || e < 0 && 0 <= y) && !this._locked) && (o = "onReverseComplete", r = this._reversed), e < 0) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (a = r = !0, o = "onReverseComplete") : 0 <= y && this._first && (a = !0), this._rawPrevTime = e;
					else {
						if (this._rawPrevTime = p || !t || e || this._rawPrevTime === e ? e : T, 0 === e && r)
							for (n = this._first; n && 0 === n._startTime;) n._duration || (r = !1), n = n._next;
						e = 0, this._initted || (a = !0)
					}
				else if (0 === p && y < 0 && (a = !0), this._time = this._rawPrevTime = e, this._locked || (this._totalTime = e, 0 !== this._repeat && (l = p + this._repeatDelay, this._cycle = this._totalTime / l >> 0, 0 !== this._cycle && this._cycle === this._totalTime / l && f <= e && this._cycle--, this._time = this._totalTime - this._cycle * l, this._yoyo && 0 != (1 & this._cycle) && (this._time = p - this._time), this._time > p ? e = (this._time = p) + 1e-4 : this._time < 0 ? this._time = e = 0 : e = this._time)), this._hasPause && !this._forcingPlayhead && !t) {
					if (c <= (e = this._time) || this._repeat && v !== this._cycle)
						for (n = this._first; n && n._startTime <= e && !h;) n._duration || "isPause" !== n.data || n.ratio || 0 === n._startTime && 0 === this._rawPrevTime || (h = n), n = n._next;
					else
						for (n = this._last; n && n._startTime >= e && !h;) n._duration || "isPause" === n.data && 0 < n._rawPrevTime && (h = n), n = n._prev;
					h && h._startTime < p && (this._time = e = h._startTime, this._totalTime = e + this._cycle * (this._totalDuration + this._repeatDelay))
				}
				if (this._cycle !== v && !this._locked) {
					var w = this._yoyo && 0 != (1 & v),
						b = w === (this._yoyo && 0 != (1 & this._cycle)),
						S = this._totalTime,
						x = this._cycle,
						k = this._rawPrevTime,
						E = this._time;
					if (this._totalTime = v * p, this._cycle < v ? w = !w : this._totalTime += p, this._time = c, this._rawPrevTime = 0 === p ? y - 1e-4 : y, this._cycle = v, this._locked = !0, c = w ? 0 : p, this.render(c, t, 0 === p), t || this._gc || this.vars.onRepeat && (this._cycle = x, this._locked = !1, this._callback("onRepeat")), c !== this._time) return;
					if (b && (this._cycle = v, this._locked = !0, c = w ? p + 1e-4 : -1e-4, this.render(c, !0, !1)), this._locked = !1, this._paused && !_) return;
					this._time = E, this._totalTime = S, this._cycle = x, this._rawPrevTime = k
				}
				if (this._time !== c && this._first || i || a || h) {
					if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== f && 0 < e && (this._active = !0), 0 === f && this.vars.onStart && (0 === this._totalTime && this._totalDuration || t || this._callback("onStart")), c <= (u = this._time))
						for (n = this._first; n && (s = n._next, u === this._time && (!this._paused || _));)(n._active || n._startTime <= this._time && !n._paused && !n._gc) && (h === n && this.pause(), n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (e - n._startTime) * n._timeScale, t, i) : n.render((e - n._startTime) * n._timeScale, t, i)), n = s;
					else
						for (n = this._last; n && (s = n._prev, u === this._time && (!this._paused || _));) {
							if (n._active || n._startTime <= c && !n._paused && !n._gc) {
								if (h === n) {
									for (h = n._prev; h && h.endTime() > this._time;) h.render(h._reversed ? h.totalDuration() - (e - h._startTime) * h._timeScale : (e - h._startTime) * h._timeScale, t, i), h = h._prev;
									h = null, this.pause()
								}
								n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (e - n._startTime) * n._timeScale, t, i) : n.render((e - n._startTime) * n._timeScale, t, i)
							}
							n = s
						}
					this._onUpdate && (t || (C.length && M(), this._callback("onUpdate"))), o && (this._locked || this._gc || (g === this._startTime || m !== this._timeScale) && (0 === this._time || d >= this.totalDuration()) && (r && (C.length && M(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[o] && this._callback(o)))
				} else f !== this._totalTime && this._onUpdate && (t || this._callback("onUpdate"))
			}, r.getActive = function(e, t, i) {
				null == e && (e = !0), null == t && (t = !0), null == i && (i = !1);
				var n, r, s = [],
					o = this.getChildren(e, t, i),
					a = 0,
					l = o.length;
				for (n = 0; n < l; n++)(r = o[n]).isActive() && (s[a++] = r);
				return s
			}, r.getLabelAfter = function(e) {
				e || 0 !== e && (e = this._time);
				var t, i = this.getLabelsArray(),
					n = i.length;
				for (t = 0; t < n; t++)
					if (i[t].time > e) return i[t].name;
				return null
			}, r.getLabelBefore = function(e) {
				null == e && (e = this._time);
				for (var t = this.getLabelsArray(), i = t.length; - 1 < --i;)
					if (t[i].time < e) return t[i].name;
				return null
			}, r.getLabelsArray = function() {
				var e, t = [],
					i = 0;
				for (e in this._labels) t[i++] = {
					time: this._labels[e],
					name: e
				};
				return t.sort(function(e, t) {
					return e.time - t.time
				}), t
			}, r.invalidate = function() {
				return this._locked = !1, t.prototype.invalidate.call(this)
			}, r.progress = function(e, t) {
				return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 != (1 & this._cycle) ? 1 - e : e) + this._cycle * (this._duration + this._repeatDelay), t) : this._time / this.duration() || 0
			}, r.totalProgress = function(e, t) {
				return arguments.length ? this.totalTime(this.totalDuration() * e, t) : this._totalTime / this.totalDuration() || 0
			}, r.totalDuration = function(e) {
				return arguments.length ? -1 !== this._repeat && e ? this.timeScale(this.totalDuration() / e) : this : (this._dirty && (t.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
			}, r.time = function(e, t) {
				return arguments.length ? (this._dirty && this.totalDuration(), e > this._duration && (e = this._duration), this._yoyo && 0 != (1 & this._cycle) ? e = this._duration - e + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (e += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(e, t)) : this._time
			}, r.repeat = function(e) {
				return arguments.length ? (this._repeat = e, this._uncache(!0)) : this._repeat
			}, r.repeatDelay = function(e) {
				return arguments.length ? (this._repeatDelay = e, this._uncache(!0)) : this._repeatDelay
			}, r.yoyo = function(e) {
				return arguments.length ? (this._yoyo = e, this) : this._yoyo
			}, r.currentLabel = function(e) {
				return arguments.length ? this.seek(e, !0) : this.getLabelBefore(this._time + 1e-8)
			}, i
		}, !0), x = 180 / Math.PI, b = [], S = [], k = [], y = {}, i = _gsScope._gsDefine.globals, _ = function(e, t, i, n) {
			i === n && (i = n - (n - t) / 1e6), e === t && (t = e + (i - e) / 1e6), this.a = e, this.b = t, this.c = i, this.d = n, this.da = n - e, this.ca = i - e, this.ba = t - e
		}, E = function(e, t, i, n) {
			var r = {
					a: e
				},
				s = {},
				o = {},
				a = {
					c: n
				},
				l = (e + t) / 2,
				h = (t + i) / 2,
				u = (i + n) / 2,
				c = (l + h) / 2,
				d = (h + u) / 2,
				p = (d - c) / 8;
			return r.b = l + (e - l) / 4, s.b = c + p, r.c = s.a = (r.b + s.b) / 2, s.c = o.a = (c + d) / 2, o.b = d - p, a.b = u + (n - u) / 4, o.c = a.a = (o.b + a.b) / 2, [r, s, o, a]
		}, v = function(e, t, i, n, r) {
			var s, o, a, l, h, u, c, d, p, f, g, m, y, _ = e.length - 1,
				v = 0,
				w = e[0].a;
			for (s = 0; s < _; s++) o = (h = e[v]).a, a = h.d, l = e[v + 1].d, r ? (g = b[s], y = ((m = S[s]) + g) * t * .25 / (n ? .5 : k[s] || .5), d = a - ((u = a - (a - o) * (n ? .5 * t : 0 !== g ? y / g : 0)) + (((c = a + (l - a) * (n ? .5 * t : 0 !== m ? y / m : 0)) - u) * (3 * g / (g + m) + .5) / 4 || 0))) : d = a - ((u = a - (a - o) * t * .5) + (c = a + (l - a) * t * .5)) / 2, u += d, c += d, h.c = p = u, h.b = 0 !== s ? w : w = h.a + .6 * (h.c - h.a), h.da = a - o, h.ca = p - o, h.ba = w - o, i ? (f = E(o, w, p, a), e.splice(v, 1, f[0], f[1], f[2], f[3]), v += 4) : v++, w = c;
			(h = e[v]).b = w, h.c = w + .4 * (h.d - w), h.da = h.d - h.a, h.ca = h.c - h.a, h.ba = w - h.a, i && (f = E(h.a, w, h.c, h.d), e.splice(v, 1, f[0], f[1], f[2], f[3]))
		}, w = function(e, t, i, n) {
			var r, s, o, a, l, h, u = [];
			if (n)
				for (s = (e = [n].concat(e)).length; - 1 < --s;) "string" == typeof(h = e[s][t]) && "=" === h.charAt(1) && (e[s][t] = n[t] + Number(h.charAt(0) + h.substr(2)));
			if ((r = e.length - 2) < 0) return u[0] = new _(e[0][t], 0, 0, e[0][t]), u;
			for (s = 0; s < r; s++) o = e[s][t], a = e[s + 1][t], u[s] = new _(o, 0, 0, a), i && (l = e[s + 2][t], b[s] = (b[s] || 0) + (a - o) * (a - o), S[s] = (S[s] || 0) + (l - a) * (l - a));
			return u[s] = new _(e[s][t], 0, 0, e[s + 1][t]), u
		}, p = function(e, t, i, n, r, s) {
			var o, a, l, h, u, c, d, p, f = {},
				g = [],
				m = s || e[0];
			for (a in r = "string" == typeof r ? "," + r + "," : ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,", null == t && (t = 1), e[0]) g.push(a);
			if (1 < e.length) {
				for (p = e[e.length - 1], d = !0, o = g.length; - 1 < --o;)
					if (a = g[o], .05 < Math.abs(m[a] - p[a])) {
						d = !1;
						break
					} d && (e = e.concat(), s && e.unshift(s), e.push(e[1]), s = e[e.length - 3])
			}
			for (b.length = S.length = k.length = 0, o = g.length; - 1 < --o;) a = g[o], y[a] = -1 !== r.indexOf("," + a + ","), f[a] = w(e, a, y[a], s);
			for (o = b.length; - 1 < --o;) b[o] = Math.sqrt(b[o]), S[o] = Math.sqrt(S[o]);
			if (!n) {
				for (o = g.length; - 1 < --o;)
					if (y[a])
						for (c = (l = f[g[o]]).length - 1, h = 0; h < c; h++) u = l[h + 1].da / S[h] + l[h].da / b[h] || 0, k[h] = (k[h] || 0) + u * u;
				for (o = k.length; - 1 < --o;) k[o] = Math.sqrt(k[o])
			}
			for (o = g.length, h = i ? 4 : 1; - 1 < --o;) l = f[a = g[o]], v(l, t, i, n, y[a]), d && (l.splice(0, h), l.splice(l.length - h, h));
			return f
		}, f = function(e, t, i) {
			for (var n, r, s, o, a, l, h, u, c, d, p, f = 1 / i, g = e.length; - 1 < --g;)
				for (s = (d = e[g]).a, o = d.d - s, a = d.c - s, l = d.b - s, n = r = 0, u = 1; u <= i; u++) n = r - (r = ((h = f * u) * h * o + 3 * (c = 1 - h) * (h * a + c * l)) * h), p = g * i + u - 1, t[p] = (t[p] || 0) + n * n
		}, m = _gsScope._gsDefine.plugin({
			propName: "bezier",
			priority: -1,
			version: "1.3.8",
			API: 2,
			global: !0,
			init: function(e, t, i) {
				this._target = e, t instanceof Array && (t = {
					values: t
				}), this._func = {}, this._mod = {}, this._props = [], this._timeRes = null == t.timeResolution ? 6 : parseInt(t.timeResolution, 10);
				var n, r, s, o, a, l = t.values || [],
					h = {},
					u = l[0],
					c = t.autoRotate || i.vars.orientToBezier;
				for (n in this._autoRotate = c ? c instanceof Array ? c : [
						["x", "y", "rotation", !0 === c ? 0 : Number(c) || 0]
					] : null, u) this._props.push(n);
				for (s = this._props.length; - 1 < --s;) n = this._props[s], this._overwriteProps.push(n), r = this._func[n] = "function" == typeof e[n], h[n] = r ? e[n.indexOf("set") || "function" != typeof e["get" + n.substr(3)] ? n : "get" + n.substr(3)]() : parseFloat(e[n]), a || h[n] !== l[0][n] && (a = h);
				if (this._beziers = "cubic" !== t.type && "quadratic" !== t.type && "soft" !== t.type ? p(l, isNaN(t.curviness) ? 1 : t.curviness, !1, "thruBasic" === t.type, t.correlate, a) : function(e, t, i) {
						var n, r, s, o, a, l, h, u, c, d, p, f = {},
							g = "cubic" === (t = t || "soft") ? 3 : 2,
							m = "soft" === t,
							y = [];
						if (m && i && (e = [i].concat(e)), null == e || e.length < g + 1) throw "invalid Bezier data";
						for (c in e[0]) y.push(c);
						for (l = y.length; - 1 < --l;) {
							for (c = y[l], f[c] = a = [], d = 0, u = e.length, h = 0; h < u; h++) n = null == i ? e[h][c] : "string" == typeof(p = e[h][c]) && "=" === p.charAt(1) ? i[c] + Number(p.charAt(0) + p.substr(2)) : Number(p), m && 1 < h && h < u - 1 && (a[d++] = (n + a[d - 2]) / 2), a[d++] = n;
							for (u = d - g + 1, h = d = 0; h < u; h += g) n = a[h], r = a[h + 1], s = a[h + 2], o = 2 === g ? 0 : a[h + 3], a[d++] = p = 3 === g ? new _(n, r, s, o) : new _(n, (2 * r + n) / 3, (2 * r + s) / 3, s);
							a.length = d
						}
						return f
					}(l, t.type, h), this._segCount = this._beziers[n].length, this._timeRes) {
					var d = function(e, t) {
						var i, n, r, s, o = [],
							a = [],
							l = 0,
							h = 0,
							u = (t = t >> 0 || 6) - 1,
							c = [],
							d = [];
						for (i in e) f(e[i], o, t);
						for (r = o.length, n = 0; n < r; n++) l += Math.sqrt(o[n]), d[s = n % t] = l, s === u && (h += l, c[s = n / t >> 0] = d, a[s] = h, l = 0, d = []);
						return {
							length: h,
							lengths: a,
							segments: c
						}
					}(this._beziers, this._timeRes);
					this._length = d.length, this._lengths = d.lengths, this._segments = d.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
				}
				if (c = this._autoRotate)
					for (this._initialRotations = [], c[0] instanceof Array || (this._autoRotate = c = [c]), s = c.length; - 1 < --s;) {
						for (o = 0; o < 3; o++) n = c[s][o], this._func[n] = "function" == typeof e[n] && e[n.indexOf("set") || "function" != typeof e["get" + n.substr(3)] ? n : "get" + n.substr(3)];
						n = c[s][2], this._initialRotations[s] = (this._func[n] ? this._func[n].call(this._target) : this._target[n]) || 0, this._overwriteProps.push(n)
					}
				return this._startRatio = i.vars.runBackwards ? 1 : 0, !0
			},
			set: function(e) {
				var t, i, n, r, s, o, a, l, h, u, c = this._segCount,
					d = this._func,
					p = this._target,
					f = e !== this._startRatio;
				if (this._timeRes) {
					if (h = this._lengths, u = this._curSeg, e *= this._length, n = this._li, e > this._l2 && n < c - 1) {
						for (l = c - 1; n < l && (this._l2 = h[++n]) <= e;);
						this._l1 = h[n - 1], this._li = n, this._curSeg = u = this._segments[n], this._s2 = u[this._s1 = this._si = 0]
					} else if (e < this._l1 && 0 < n) {
						for (; 0 < n && (this._l1 = h[--n]) >= e;);
						0 === n && e < this._l1 ? this._l1 = 0 : n++, this._l2 = h[n], this._li = n, this._curSeg = u = this._segments[n], this._s1 = u[(this._si = u.length - 1) - 1] || 0, this._s2 = u[this._si]
					}
					if (t = n, e -= this._l1, n = this._si, e > this._s2 && n < u.length - 1) {
						for (l = u.length - 1; n < l && (this._s2 = u[++n]) <= e;);
						this._s1 = u[n - 1], this._si = n
					} else if (e < this._s1 && 0 < n) {
						for (; 0 < n && (this._s1 = u[--n]) >= e;);
						0 === n && e < this._s1 ? this._s1 = 0 : n++, this._s2 = u[n], this._si = n
					}
					o = (n + (e - this._s1) / (this._s2 - this._s1)) * this._prec || 0
				} else o = (e - (t = e < 0 ? 0 : 1 <= e ? c - 1 : c * e >> 0) * (1 / c)) * c;
				for (i = 1 - o, n = this._props.length; - 1 < --n;) r = this._props[n], a = (o * o * (s = this._beziers[r][t]).da + 3 * i * (o * s.ca + i * s.ba)) * o + s.a, this._mod[r] && (a = this._mod[r](a, p)), d[r] ? p[r](a) : p[r] = a;
				if (this._autoRotate) {
					var g, m, y, _, v, w, b, S = this._autoRotate;
					for (n = S.length; - 1 < --n;) r = S[n][2], w = S[n][3] || 0, b = !0 === S[n][4] ? 1 : x, s = this._beziers[S[n][0]], g = this._beziers[S[n][1]], s && g && (s = s[t], g = g[t], m = s.a + (s.b - s.a) * o, m += ((_ = s.b + (s.c - s.b) * o) - m) * o, _ += (s.c + (s.d - s.c) * o - _) * o, y = g.a + (g.b - g.a) * o, y += ((v = g.b + (g.c - g.b) * o) - y) * o, v += (g.c + (g.d - g.c) * o - v) * o, a = f ? Math.atan2(v - y, _ - m) * b + w : this._initialRotations[n], this._mod[r] && (a = this._mod[r](a, p)), d[r] ? p[r](a) : p[r] = a)
				}
			}
		}), n = m.prototype, m.bezierThrough = p, m.cubicToQuadratic = E, m._autoCSS = !0, m.quadraticToCubic = function(e, t, i) {
			return new _(e, (2 * t + e) / 3, (2 * t + i) / 3, i)
		}, m._cssRegister = function() {
			var e = i.CSSPlugin;
			if (e) {
				var t = e._internals,
					p = t._parseToProxy,
					f = t._setPluginRatio,
					g = t.CSSPropTween;
				t._registerComplexSpecialProp("bezier", {
					parser: function(e, t, i, n, r, s) {
						t instanceof Array && (t = {
							values: t
						}), s = new m;
						var o, a, l, h = t.values,
							u = h.length - 1,
							c = [],
							d = {};
						if (u < 0) return r;
						for (o = 0; o <= u; o++) l = p(e, h[o], n, r, s, u !== o), c[o] = l.end;
						for (a in t) d[a] = t[a];
						return d.values = c, (r = new g(e, "bezier", 0, 0, l.pt, 2)).data = l, r.plugin = s, r.setRatio = f, 0 === d.autoRotate && (d.autoRotate = !0), !d.autoRotate || d.autoRotate instanceof Array || (o = !0 === d.autoRotate ? 0 : Number(d.autoRotate), d.autoRotate = null != l.end.left ? [
							["left", "top", "rotation", o, !1]
						] : null != l.end.x && [
							["x", "y", "rotation", o, !1]
						]), d.autoRotate && (n._transform || n._enableTransforms(!1), l.autoRotate = n._target._gsTransform, l.proxy.rotation = l.autoRotate.rotation || 0, n._overwriteProps.push("rotation")), s._onInitTween(l.proxy, d, n._tween), r
					}
				})
			}
		}, n._mod = function(e) {
			for (var t, i = this._overwriteProps, n = i.length; - 1 < --n;)(t = e[i[n]]) && "function" == typeof t && (this._mod[i[n]] = t)
		}, n._kill = function(e) {
			var t, i, n = this._props;
			for (t in this._beziers)
				if (t in e)
					for (delete this._beziers[t], delete this._func[t], i = n.length; - 1 < --i;) n[i] === t && n.splice(i, 1);
			if (n = this._autoRotate)
				for (i = n.length; - 1 < --i;) e[n[i][2]] && n.splice(i, 1);
			return this._super._kill.call(this, e)
		}, _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(s, F) {
			var f, k, T, g, j = function e() {
					s.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = e.prototype.setRatio
				},
				h = _gsScope._gsDefine.globals,
				m = {},
				e = j.prototype = new s("css");
			(e.constructor = j).version = "1.20.3", j.API = 2, j.defaultTransformPerspective = 0, j.defaultSkewType = "compensated", j.defaultSmoothOrigin = !0, j.suffixMap = {
				top: e = "px",
				right: e,
				bottom: e,
				left: e,
				width: e,
				height: e,
				fontSize: e,
				padding: e,
				margin: e,
				perspective: e,
				lineHeight: ""
			};
			var C, y, _, W, v, E, M, P, t, i, O = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
				I = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
				w = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
				u = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
				A = /(?:\d|\-|\+|=|#|\.)*/g,
				L = /opacity *= *([^)]*)/i,
				b = /opacity:([^;]*)/i,
				o = /alpha\(opacity *=.+?\)/i,
				S = /^(rgb|hsl)/,
				a = /([A-Z])/g,
				l = /-([a-z])/gi,
				x = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
				c = function(e, t) {
					return t.toUpperCase()
				},
				p = /(?:Left|Right|Width)/i,
				d = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
				H = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
				R = /,(?=[^\)]*(?:\(|$))/gi,
				B = /[\s,\(]/i,
				N = Math.PI / 180,
				U = 180 / Math.PI,
				q = {},
				n = {
					style: {}
				},
				D = _gsScope.document || {
					createElement: function() {
						return n
					}
				},
				z = function(e, t) {
					return D.createElementNS ? D.createElementNS(t || "http://www.w3.org/1999/xhtml", e) : D.createElement(e)
				},
				V = z("div"),
				X = z("img"),
				r = j._internals = {
					_specialProps: m
				},
				Y = (_gsScope.navigator || {}).userAgent || "",
				G = (t = Y.indexOf("Android"), i = z("a"), _ = -1 !== Y.indexOf("Safari") && -1 === Y.indexOf("Chrome") && (-1 === t || 3 < parseFloat(Y.substr(t + 8, 2))), v = _ && parseFloat(Y.substr(Y.indexOf("Version/") + 8, 2)) < 6, W = -1 !== Y.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(Y) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(Y)) && (E = parseFloat(RegExp.$1)), !!i && (i.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(i.style.opacity))),
				K = function(e) {
					return L.test("string" == typeof e ? e : (e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
				},
				Q = function(e) {
					_gsScope.console && console.log(e)
				},
				$ = "",
				Z = "",
				J = function(e, t) {
					var i, n, r = (t = t || V).style;
					if (void 0 !== r[e]) return e;
					for (e = e.charAt(0).toUpperCase() + e.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], n = 5; - 1 < --n && void 0 === r[i[n] + e];);
					return 0 <= n ? ($ = "-" + (Z = 3 === n ? "ms" : i[n]).toLowerCase() + "-", Z + e) : null
				},
				ee = D.defaultView ? D.defaultView.getComputedStyle : function() {},
				te = j.getStyle = function(e, t, i, n, r) {
					var s;
					return G || "opacity" !== t ? (!n && e.style[t] ? s = e.style[t] : (i = i || ee(e)) ? s = i[t] || i.getPropertyValue(t) || i.getPropertyValue(t.replace(a, "-$1").toLowerCase()) : e.currentStyle && (s = e.currentStyle[t]), null == r || s && "none" !== s && "auto" !== s && "auto auto" !== s ? s : r) : K(e)
				},
				ie = r.convertToPixels = function(e, t, i, n, r) {
					if ("px" === n || !n && "lineHeight" !== t) return i;
					if ("auto" === n || !i) return 0;
					var s, o, a, l = p.test(t),
						h = e,
						u = V.style,
						c = i < 0,
						d = 1 === i;
					if (c && (i = -i), d && (i *= 100), "lineHeight" !== t || n)
						if ("%" === n && -1 !== t.indexOf("border")) s = i / 100 * (l ? e.clientWidth : e.clientHeight);
						else {
							if (u.cssText = "border:0 solid red;position:" + te(e, "position") + ";line-height:0;", "%" !== n && h.appendChild && "v" !== n.charAt(0) && "rem" !== n) u[l ? "borderLeftWidth" : "borderTopWidth"] = i + n;
							else {
								if (h = e.parentNode || D.body, -1 !== te(h, "display").indexOf("flex") && (u.position = "absolute"), o = h._gsCache, a = F.ticker.frame, o && l && o.time === a) return o.width * i / 100;
								u[l ? "width" : "height"] = i + n
							}
							h.appendChild(V), s = parseFloat(V[l ? "offsetWidth" : "offsetHeight"]), h.removeChild(V), l && "%" === n && !1 !== j.cacheWidths && ((o = h._gsCache = h._gsCache || {}).time = a, o.width = s / i * 100), 0 !== s || r || (s = ie(e, t, i, n, !0))
						}
					else o = ee(e).lineHeight, e.style.lineHeight = i, s = parseFloat(ee(e).lineHeight), e.style.lineHeight = o;
					return d && (s /= 100), c ? -s : s
				},
				ne = r.calculateOffset = function(e, t, i) {
					if ("absolute" !== te(e, "position", i)) return 0;
					var n = "left" === t ? "Left" : "Top",
						r = te(e, "margin" + n, i);
					return e["offset" + n] - (ie(e, t, parseFloat(r), r.replace(A, "")) || 0)
				},
				re = function(e, t) {
					var i, n, r, s = {};
					if (t = t || ee(e, null))
						if (i = t.length)
							for (; - 1 < --i;)(-1 === (r = t[i]).indexOf("-transform") || Re === r) && (s[r.replace(l, c)] = t.getPropertyValue(r));
						else
							for (i in t)(-1 === i.indexOf("Transform") || He === i) && (s[i] = t[i]);
					else if (t = e.currentStyle || e.style)
						for (i in t) "string" == typeof i && void 0 === s[i] && (s[i.replace(l, c)] = t[i]);
					return G || (s.opacity = K(e)), n = Ge(e, t, !1), s.rotation = n.rotation, s.skewX = n.skewX, s.scaleX = n.scaleX, s.scaleY = n.scaleY, s.x = n.x, s.y = n.y, qe && (s.z = n.z, s.rotationX = n.rotationX, s.rotationY = n.rotationY, s.scaleZ = n.scaleZ), s.filters && delete s.filters, s
				},
				se = function(e, t, i, n, r) {
					var s, o, a, l = {},
						h = e.style;
					for (o in i) "cssText" !== o && "length" !== o && isNaN(o) && (t[o] !== (s = i[o]) || r && r[o]) && -1 === o.indexOf("Origin") && ("number" == typeof s || "string" == typeof s) && (l[o] = "auto" !== s || "left" !== o && "top" !== o ? "" !== s && "auto" !== s && "none" !== s || "string" != typeof t[o] || "" === t[o].replace(u, "") ? s : 0 : ne(e, o), void 0 !== h[o] && (a = new we(h, o, h[o], a)));
					if (n)
						for (o in n) "className" !== o && (l[o] = n[o]);
					return {
						difs: l,
						firstMPT: a
					}
				},
				oe = {
					width: ["Left", "Right"],
					height: ["Top", "Bottom"]
				},
				ae = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
				le = function(e, t, i) {
					if ("svg" === (e.nodeName + "").toLowerCase()) return (i || ee(e))[t] || 0;
					if (e.getCTM && Ve(e)) return e.getBBox()[t] || 0;
					var n = parseFloat("width" === t ? e.offsetWidth : e.offsetHeight),
						r = oe[t],
						s = r.length;
					for (i = i || ee(e, null); - 1 < --s;) n -= parseFloat(te(e, "padding" + r[s], i, !0)) || 0, n -= parseFloat(te(e, "border" + r[s] + "Width", i, !0)) || 0;
					return n
				},
				he = function e(t, i) {
					if ("contain" === t || "auto" === t || "auto auto" === t) return t + " ";
					(null == t || "" === t) && (t = "0 0");
					var n, r = t.split(" "),
						s = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : r[0],
						o = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : r[1];
					if (3 < r.length && !i) {
						for (r = t.split(", ").join(",").split(","), t = [], n = 0; n < r.length; n++) t.push(e(r[n]));
						return t.join(",")
					}
					return null == o ? o = "center" === s ? "50%" : "0" : "center" === o && (o = "50%"), ("center" === s || isNaN(parseFloat(s)) && -1 === (s + "").indexOf("=")) && (s = "50%"), t = s + " " + o + (2 < r.length ? " " + r[2] : ""), i && (i.oxp = -1 !== s.indexOf("%"), i.oyp = -1 !== o.indexOf("%"), i.oxr = "=" === s.charAt(1), i.oyr = "=" === o.charAt(1), i.ox = parseFloat(s.replace(u, "")), i.oy = parseFloat(o.replace(u, "")), i.v = t), i || t
				},
				ue = function(e, t) {
					return "function" == typeof e && (e = e(P, M)), "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : parseFloat(e) - parseFloat(t) || 0
				},
				ce = function(e, t) {
					return "function" == typeof e && (e = e(P, M)), null == e ? t : "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) + t : parseFloat(e) || 0
				},
				de = function(e, t, i, n) {
					var r, s, o, a, l;
					return "function" == typeof e && (e = e(P, M)), null == e ? a = t : "number" == typeof e ? a = e : (r = 360, s = e.split("_"), o = ((l = "=" === e.charAt(1)) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(s[0].substr(2)) : parseFloat(s[0])) * (-1 === e.indexOf("rad") ? 1 : U) - (l ? 0 : t), s.length && (n && (n[i] = t + o), -1 !== e.indexOf("short") && ((o %= r) !== o % 180 && (o = o < 0 ? o + r : o - r)), -1 !== e.indexOf("_cw") && o < 0 ? o = (o + 3599999999640) % r - (o / r | 0) * r : -1 !== e.indexOf("ccw") && 0 < o && (o = (o - 3599999999640) % r - (o / r | 0) * r)), a = t + o), a < 1e-6 && -1e-6 < a && (a = 0), a
				},
				pe = {
					aqua: [0, 255, 255],
					lime: [0, 255, 0],
					silver: [192, 192, 192],
					black: [0, 0, 0],
					maroon: [128, 0, 0],
					teal: [0, 128, 128],
					blue: [0, 0, 255],
					navy: [0, 0, 128],
					white: [255, 255, 255],
					fuchsia: [255, 0, 255],
					olive: [128, 128, 0],
					yellow: [255, 255, 0],
					orange: [255, 165, 0],
					gray: [128, 128, 128],
					purple: [128, 0, 128],
					green: [0, 128, 0],
					red: [255, 0, 0],
					pink: [255, 192, 203],
					cyan: [0, 255, 255],
					transparent: [255, 255, 255, 0]
				},
				fe = function(e, t, i) {
					return 255 * (6 * (e = e < 0 ? e + 1 : 1 < e ? e - 1 : e) < 1 ? t + (i - t) * e * 6 : e < .5 ? i : 3 * e < 2 ? t + (i - t) * (2 / 3 - e) * 6 : t) + .5 | 0
				},
				ge = j.parseColor = function(e, t) {
					var i, n, r, s, o, a, l, h, u, c, d;
					if (e)
						if ("number" == typeof e) i = [e >> 16, e >> 8 & 255, 255 & e];
						else {
							if ("," === e.charAt(e.length - 1) && (e = e.substr(0, e.length - 1)), pe[e]) i = pe[e];
							else if ("#" === e.charAt(0)) 4 === e.length && (e = "#" + (n = e.charAt(1)) + n + (r = e.charAt(2)) + r + (s = e.charAt(3)) + s), i = [(e = parseInt(e.substr(1), 16)) >> 16, e >> 8 & 255, 255 & e];
							else if ("hsl" === e.substr(0, 3))
								if (i = d = e.match(O), t) {
									if (-1 !== e.indexOf("=")) return e.match(I)
								} else o = Number(i[0]) % 360 / 360, a = Number(i[1]) / 100, n = 2 * (l = Number(i[2]) / 100) - (r = l <= .5 ? l * (a + 1) : l + a - l * a), 3 < i.length && (i[3] = Number(i[3])), i[0] = fe(o + 1 / 3, n, r), i[1] = fe(o, n, r), i[2] = fe(o - 1 / 3, n, r);
							else i = e.match(O) || pe.transparent;
							i[0] = Number(i[0]), i[1] = Number(i[1]), i[2] = Number(i[2]), 3 < i.length && (i[3] = Number(i[3]))
						}
					else i = pe.black;
					return t && !d && (n = i[0] / 255, r = i[1] / 255, s = i[2] / 255, l = ((h = Math.max(n, r, s)) + (u = Math.min(n, r, s))) / 2, h === u ? o = a = 0 : (c = h - u, a = .5 < l ? c / (2 - h - u) : c / (h + u), o = h === n ? (r - s) / c + (r < s ? 6 : 0) : h === r ? (s - n) / c + 2 : (n - r) / c + 4, o *= 60), i[0] = o + .5 | 0, i[1] = 100 * a + .5 | 0, i[2] = 100 * l + .5 | 0), i
				},
				me = function(e, t) {
					var i, n, r, s = e.match(ye) || [],
						o = 0,
						a = "";
					if (!s.length) return e;
					for (i = 0; i < s.length; i++) n = s[i], o += (r = e.substr(o, e.indexOf(n, o) - o)).length + n.length, 3 === (n = ge(n, t)).length && n.push(1), a += r + (t ? "hsla(" + n[0] + "," + n[1] + "%," + n[2] + "%," + n[3] : "rgba(" + n.join(",")) + ")";
					return a + e.substr(o)
				},
				ye = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
			for (e in pe) ye += "|" + e + "\\b";
			ye = new RegExp(ye + ")", "gi"), j.colorStringFilter = function(e) {
				var t, i = e[0] + " " + e[1];
				ye.test(i) && (t = -1 !== i.indexOf("hsl(") || -1 !== i.indexOf("hsla("), e[0] = me(e[0], t), e[1] = me(e[1], t)), ye.lastIndex = 0
			}, F.defaultStringFilter || (F.defaultStringFilter = j.colorStringFilter);
			var _e = function(e, t, s, o) {
					if (null == e) return function(e) {
						return e
					};
					var a, l = t ? (e.match(ye) || [""])[0] : "",
						h = e.split(l).join("").match(w) || [],
						u = e.substr(0, e.indexOf(h[0])),
						c = ")" === e.charAt(e.length - 1) ? ")" : "",
						d = -1 !== e.indexOf(" ") ? " " : ",",
						p = h.length,
						f = 0 < p ? h[0].replace(O, "") : "";
					return p ? a = t ? function(e) {
						var t, i, n, r;
						if ("number" == typeof e) e += f;
						else if (o && R.test(e)) {
							for (r = e.replace(R, "|").split("|"), n = 0; n < r.length; n++) r[n] = a(r[n]);
							return r.join(",")
						}
						if (t = (e.match(ye) || [l])[0], n = (i = e.split(t).join("").match(w) || []).length, p > n--)
							for (; ++n < p;) i[n] = s ? i[(n - 1) / 2 | 0] : h[n];
						return u + i.join(d) + d + t + c + (-1 !== e.indexOf("inset") ? " inset" : "")
					} : function(e) {
						var t, i, n;
						if ("number" == typeof e) e += f;
						else if (o && R.test(e)) {
							for (i = e.replace(R, "|").split("|"), n = 0; n < i.length; n++) i[n] = a(i[n]);
							return i.join(",")
						}
						if (n = (t = e.match(w) || []).length, p > n--)
							for (; ++n < p;) t[n] = s ? t[(n - 1) / 2 | 0] : h[n];
						return u + t.join(d) + c
					} : function(e) {
						return e
					}
				},
				ve = function(h) {
					return h = h.split(","),
						function(e, t, i, n, r, s, o) {
							var a, l = (t + "").split(" ");
							for (o = {}, a = 0; a < 4; a++) o[h[a]] = l[a] = l[a] || l[(a - 1) / 2 >> 0];
							return n.parse(e, o, r, s)
						}
				},
				we = (r._setPluginRatio = function(e) {
					this.plugin.setRatio(e);
					for (var t, i, n, r, s, o = this.data, a = o.proxy, l = o.firstMPT; l;) t = a[l.v], l.r ? t = Math.round(t) : t < 1e-6 && -1e-6 < t && (t = 0), l.t[l.p] = t, l = l._next;
					if (o.autoRotate && (o.autoRotate.rotation = o.mod ? o.mod(a.rotation, this.t) : a.rotation), 1 === e || 0 === e)
						for (l = o.firstMPT, s = 1 === e ? "e" : "b"; l;) {
							if ((i = l.t).type) {
								if (1 === i.type) {
									for (r = i.xs0 + i.s + i.xs1, n = 1; n < i.l; n++) r += i["xn" + n] + i["xs" + (n + 1)];
									i[s] = r
								}
							} else i[s] = i.s + i.xs0;
							l = l._next
						}
				}, function(e, t, i, n, r) {
					this.t = e, this.p = t, this.v = i, this.r = r, n && ((n._prev = this)._next = n)
				}),
				be = (r._parseToProxy = function(e, t, i, n, r, s) {
					var o, a, l, h, u, c = n,
						d = {},
						p = {},
						f = i._transform,
						g = q;
					for (i._transform = null, q = t, n = u = i.parse(e, t, n, r), q = g, s && (i._transform = f, c && (c._prev = null, c._prev && (c._prev._next = null))); n && n !== c;) {
						if (n.type <= 1 && (p[a = n.p] = n.s + n.c, d[a] = n.s, s || (h = new we(n, "s", a, h, n.r), n.c = 0), 1 === n.type))
							for (o = n.l; 0 < --o;) l = "xn" + o, p[a = n.p + "_" + l] = n.data[l], d[a] = n[l], s || (h = new we(n, l, a, h, n.rxp[l]));
						n = n._next
					}
					return {
						proxy: d,
						end: p,
						firstMPT: h,
						pt: u
					}
				}, r.CSSPropTween = function(e, t, i, n, r, s, o, a, l, h, u) {
					this.t = e, this.p = t, this.s = i, this.c = n, this.n = o || t, e instanceof be || g.push(this.n), this.r = a, this.type = s || 0, l && (this.pr = l, f = !0), this.b = void 0 === h ? i : h, this.e = void 0 === u ? i + n : u, r && ((this._next = r)._prev = this)
				}),
				Se = function(e, t, i, n, r, s) {
					var o = new be(e, t, i, n - i, r, -1, s);
					return o.b = i, o.e = o.xs0 = n, o
				},
				xe = j.parseComplex = function(e, t, i, n, r, s, o, a, l, h) {
					i = i || s || "", "function" == typeof n && (n = n(P, M)), o = new be(e, t, 0, 0, o, h ? 2 : 1, null, !1, a, i, n), n += "", r && ye.test(n + i) && (j.colorStringFilter(n = [i, n]), i = n[0], n = n[1]);
					var u, c, d, p, f, g, m, y, _, v, w, b, S, x = i.split(", ").join(",").split(" "),
						k = n.split(", ").join(",").split(" "),
						E = x.length,
						T = !1 !== C;
					for ((-1 !== n.indexOf(",") || -1 !== i.indexOf(",")) && (-1 !== (n + i).indexOf("rgb") || -1 !== (n + i).indexOf("hsl") ? (x = x.join(" ").replace(R, ", ").split(" "), k = k.join(" ").replace(R, ", ").split(" ")) : (x = x.join(" ").split(",").join(", ").split(" "), k = k.join(" ").split(",").join(", ").split(" ")), E = x.length), E !== k.length && (E = (x = (s || "").split(" ")).length), o.plugin = l, o.setRatio = h, u = ye.lastIndex = 0; u < E; u++)
						if (p = x[u], f = k[u], (y = parseFloat(p)) || 0 === y) o.appendXtra("", y, ue(f, y), f.replace(I, ""), T && -1 !== f.indexOf("px"), !0);
						else if (r && ye.test(p)) b = ")" + ((b = f.indexOf(")") + 1) ? f.substr(b) : ""), S = -1 !== f.indexOf("hsl") && G, v = f, p = ge(p, S), f = ge(f, S), (_ = 6 < p.length + f.length) && !G && 0 === f[3] ? (o["xs" + o.l] += o.l ? " transparent" : "transparent", o.e = o.e.split(k[u]).join("transparent")) : (G || (_ = !1), S ? o.appendXtra(v.substr(0, v.indexOf("hsl")) + (_ ? "hsla(" : "hsl("), p[0], ue(f[0], p[0]), ",", !1, !0).appendXtra("", p[1], ue(f[1], p[1]), "%,", !1).appendXtra("", p[2], ue(f[2], p[2]), _ ? "%," : "%" + b, !1) : o.appendXtra(v.substr(0, v.indexOf("rgb")) + (_ ? "rgba(" : "rgb("), p[0], f[0] - p[0], ",", !0, !0).appendXtra("", p[1], f[1] - p[1], ",", !0).appendXtra("", p[2], f[2] - p[2], _ ? "," : b, !0), _ && (p = p.length < 4 ? 1 : p[3], o.appendXtra("", p, (f.length < 4 ? 1 : f[3]) - p, b, !1))), ye.lastIndex = 0;
					else if (g = p.match(O)) {
						if (!(m = f.match(I)) || m.length !== g.length) return o;
						for (c = d = 0; c < g.length; c++) w = g[c], v = p.indexOf(w, d), o.appendXtra(p.substr(d, v - d), Number(w), ue(m[c], w), "", T && "px" === p.substr(v + w.length, 2), 0 === c), d = v + w.length;
						o["xs" + o.l] += p.substr(d)
					} else o["xs" + o.l] += o.l || o["xs" + o.l] ? " " + f : f;
					if (-1 !== n.indexOf("=") && o.data) {
						for (b = o.xs0 + o.data.s, u = 1; u < o.l; u++) b += o["xs" + u] + o.data["xn" + u];
						o.e = b + o["xs" + u]
					}
					return o.l || (o.type = -1, o.xs0 = o.e), o.xfirst || o
				},
				ke = 9;
			for ((e = be.prototype).l = e.pr = 0; 0 < --ke;) e["xn" + ke] = 0, e["xs" + ke] = "";
			e.xs0 = "", e._next = e._prev = e.xfirst = e.data = e.plugin = e.setRatio = e.rxp = null, e.appendXtra = function(e, t, i, n, r, s) {
				var o = this,
					a = o.l;
				return o["xs" + a] += s && (a || o["xs" + a]) ? " " + e : e || "", i || 0 === a || o.plugin ? (o.l++, o.type = o.setRatio ? 2 : 1, o["xs" + o.l] = n || "", 0 < a ? (o.data["xn" + a] = t + i, o.rxp["xn" + a] = r, o["xn" + a] = t, o.plugin || (o.xfirst = new be(o, "xn" + a, t, i, o.xfirst || o, 0, o.n, r, o.pr), o.xfirst.xs0 = 0)) : (o.data = {
					s: t + i
				}, o.rxp = {}, o.s = t, o.c = i, o.r = r)) : o["xs" + a] += t + (n || ""), o
			};
			var Ee = function(e, t) {
					t = t || {}, this.p = t.prefix && J(e) || e, m[e] = m[this.p] = this, this.format = t.formatter || _e(t.defaultValue, t.color, t.collapsible, t.multi), t.parser && (this.parse = t.parser), this.clrs = t.color, this.multi = t.multi, this.keyword = t.keyword, this.dflt = t.defaultValue, this.pr = t.priority || 0
				},
				Te = r._registerComplexSpecialProp = function(e, t, i) {
					"object" != (void 0 === t ? "undefined" : _typeof(t)) && (t = {
						parser: i
					});
					var n, r = e.split(","),
						s = t.defaultValue;
					for (i = i || [s], n = 0; n < r.length; n++) t.prefix = 0 === n && t.prefix, t.defaultValue = i[n] || s, new Ee(r[n], t)
				},
				Ce = r._registerPluginProp = function(e) {
					if (!m[e]) {
						var l = e.charAt(0).toUpperCase() + e.substr(1) + "Plugin";
						Te(e, {
							parser: function(e, t, i, n, r, s, o) {
								var a = h.com.greensock.plugins[l];
								return a ? (a._cssRegister(), m[i].parse(e, t, i, n, r, s, o)) : (Q("Error: " + l + " js file not loaded."), r)
							}
						})
					}
				};
			(e = Ee.prototype).parseComplex = function(e, t, i, n, r, s) {
				var o, a, l, h, u, c, d = this.keyword;
				if (this.multi && (R.test(i) || R.test(t) ? (a = t.replace(R, "|").split("|"), l = i.replace(R, "|").split("|")) : d && (a = [t], l = [i])), l) {
					for (h = l.length > a.length ? l.length : a.length, o = 0; o < h; o++) t = a[o] = a[o] || this.dflt, i = l[o] = l[o] || this.dflt, d && ((u = t.indexOf(d)) !== (c = i.indexOf(d)) && (-1 === c ? a[o] = a[o].split(d).join("") : -1 === u && (a[o] += " " + d)));
					t = a.join(", "), i = l.join(", ")
				}
				return xe(e, this.p, t, i, this.clrs, this.dflt, n, this.pr, r, s)
			}, e.parse = function(e, t, i, n, r, s, o) {
				return this.parseComplex(e.style, this.format(te(e, this.p, T, !1, this.dflt)), this.format(t), r, s)
			}, j.registerSpecialProp = function(e, l, h) {
				Te(e, {
					parser: function(e, t, i, n, r, s, o) {
						var a = new be(e, i, 0, 0, r, 2, i, !1, h);
						return a.plugin = s, a.setRatio = l(e, t, n._tween, i), a
					},
					priority: h
				})
			}, j.useSVGTransformAttr = !0;
			var Me, Pe, Oe, Ie, Ae, Le = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
				He = J("transform"),
				Re = $ + "transform",
				Be = J("transformOrigin"),
				qe = null !== J("perspective"),
				De = r.Transform = function() {
					this.perspective = parseFloat(j.defaultTransformPerspective) || 0, this.force3D = !(!1 === j.defaultForce3D || !qe) && (j.defaultForce3D || "auto")
				},
				ze = _gsScope.SVGElement,
				Fe = function(e, t, i) {
					var n, r = D.createElementNS("http://www.w3.org/2000/svg", e),
						s = /([a-z])([A-Z])/g;
					for (n in i) r.setAttributeNS(null, n.replace(s, "$1-$2").toLowerCase(), i[n]);
					return t.appendChild(r), r
				},
				je = D.documentElement || {},
				We = (Ae = E || /Android/i.test(Y) && !_gsScope.chrome, D.createElementNS && !Ae && (Pe = Fe("svg", je), Ie = (Oe = Fe("rect", Pe, {
					width: 100,
					height: 50,
					x: 100
				})).getBoundingClientRect().width, Oe.style[Be] = "50% 50%", Oe.style[He] = "scaleX(0.5)", Ae = Ie === Oe.getBoundingClientRect().width && !(W && qe), je.removeChild(Pe)), Ae),
				Ne = function(e, t, i, n, r, s) {
					var o, a, l, h, u, c, d, p, f, g, m, y, _, v, w = e._gsTransform,
						b = Ye(e, !0);
					w && (_ = w.xOrigin, v = w.yOrigin), (!n || (o = n.split(" ")).length < 2) && (0 === (d = e.getBBox()).x && 0 === d.y && d.width + d.height === 0 && (d = {
						x: parseFloat(e.hasAttribute("x") ? e.getAttribute("x") : e.hasAttribute("cx") ? e.getAttribute("cx") : 0) || 0,
						y: parseFloat(e.hasAttribute("y") ? e.getAttribute("y") : e.hasAttribute("cy") ? e.getAttribute("cy") : 0) || 0,
						width: 0,
						height: 0
					}), o = [(-1 !== (t = he(t).split(" "))[0].indexOf("%") ? parseFloat(t[0]) / 100 * d.width : parseFloat(t[0])) + d.x, (-1 !== t[1].indexOf("%") ? parseFloat(t[1]) / 100 * d.height : parseFloat(t[1])) + d.y]), i.xOrigin = h = parseFloat(o[0]), i.yOrigin = u = parseFloat(o[1]), n && b !== Xe && (c = b[0], d = b[1], p = b[2], f = b[3], g = b[4], m = b[5], (y = c * f - d * p) && (a = h * (f / y) + u * (-p / y) + (p * m - f * g) / y, l = h * (-d / y) + u * (c / y) - (c * m - d * g) / y, h = i.xOrigin = o[0] = a, u = i.yOrigin = o[1] = l)), w && (s && (i.xOffset = w.xOffset, i.yOffset = w.yOffset, w = i), r || !1 !== r && !1 !== j.defaultSmoothOrigin ? (a = h - _, l = u - v, w.xOffset += a * b[0] + l * b[2] - a, w.yOffset += a * b[1] + l * b[3] - l) : w.xOffset = w.yOffset = 0), s || e.setAttribute("data-svg-origin", o.join(" "))
				},
				Ue = function(t) {
					try {
						return t.getBBox()
					} catch (e) {
						return function e(t) {
							var i, n = z("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
								r = this.parentNode,
								s = this.nextSibling,
								o = this.style.cssText;
							if (je.appendChild(n), n.appendChild(this), this.style.display = "block", t) try {
								i = this.getBBox(), this._originalGetBBox = this.getBBox, this.getBBox = e
							} catch (e) {} else this._originalGetBBox && (i = this._originalGetBBox());
							return s ? r.insertBefore(this, s) : r.appendChild(this), je.removeChild(n), this.style.cssText = o, i
						}.call(t, !0)
					}
				},
				Ve = function(e) {
					return !(!ze || !e.getCTM || e.parentNode && !e.ownerSVGElement || !Ue(e))
				},
				Xe = [1, 0, 0, 1, 0, 0],
				Ye = function(e, t) {
					var i, n, r, s, o, a, l = e._gsTransform || new De,
						h = e.style;
					if (He ? n = te(e, Re, null, !0) : e.currentStyle && (n = (n = e.currentStyle.filter.match(d)) && 4 === n.length ? [n[0].substr(4), Number(n[2].substr(4)), Number(n[1].substr(4)), n[3].substr(4), l.x || 0, l.y || 0].join(",") : ""), i = !n || "none" === n || "matrix(1, 0, 0, 1, 0, 0)" === n, !He || !(a = !ee(e) || "none" === ee(e).display) && e.parentNode || (a && (s = h.display, h.display = "block"), e.parentNode || (o = 1, je.appendChild(e)), i = !(n = te(e, Re, null, !0)) || "none" === n || "matrix(1, 0, 0, 1, 0, 0)" === n, s ? h.display = s : a && Ze(h, "display"), o && je.removeChild(e)), (l.svg || e.getCTM && Ve(e)) && (i && -1 !== (h[He] + "").indexOf("matrix") && (n = h[He], i = 0), r = e.getAttribute("transform"), i && r && (-1 !== r.indexOf("matrix") ? (n = r, i = 0) : -1 !== r.indexOf("translate") && (n = "matrix(1,0,0,1," + r.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", i = 0))), i) return Xe;
					for (r = (n || "").match(O) || [], ke = r.length; - 1 < --ke;) s = Number(r[ke]), r[ke] = (o = s - (s |= 0)) ? (1e5 * o + (o < 0 ? -.5 : .5) | 0) / 1e5 + s : s;
					return t && 6 < r.length ? [r[0], r[1], r[4], r[5], r[12], r[13]] : r
				},
				Ge = r.getTransform = function(e, t, i, n) {
					if (e._gsTransform && i && !n) return e._gsTransform;
					var r, s, o, a, l, h, u = i && e._gsTransform || new De,
						c = u.scaleX < 0,
						d = qe && (parseFloat(te(e, Be, t, !1, "0 0 0").split(" ")[2]) || u.zOrigin) || 0,
						p = parseFloat(j.defaultTransformPerspective) || 0;
					if (u.svg = !(!e.getCTM || !Ve(e)), u.svg && (Ne(e, te(e, Be, t, !1, "50% 50%") + "", u, e.getAttribute("data-svg-origin")), Me = j.useSVGTransformAttr || We), (r = Ye(e)) !== Xe) {
						if (16 === r.length) {
							var f, g, m, y, _, v = r[0],
								w = r[1],
								b = r[2],
								S = r[3],
								x = r[4],
								k = r[5],
								E = r[6],
								T = r[7],
								C = r[8],
								M = r[9],
								P = r[10],
								O = r[12],
								I = r[13],
								A = r[14],
								L = r[11],
								H = Math.atan2(E, P);
							u.zOrigin && (O = C * (A = -u.zOrigin) - r[12], I = M * A - r[13], A = P * A + u.zOrigin - r[14]), u.rotationX = H * U, H && (f = x * (y = Math.cos(-H)) + C * (_ = Math.sin(-H)), g = k * y + M * _, m = E * y + P * _, C = x * -_ + C * y, M = k * -_ + M * y, P = E * -_ + P * y, L = T * -_ + L * y, x = f, k = g, E = m), H = Math.atan2(-b, P), u.rotationY = H * U, H && (g = w * (y = Math.cos(-H)) - M * (_ = Math.sin(-H)), m = b * y - P * _, M = w * _ + M * y, P = b * _ + P * y, L = S * _ + L * y, v = f = v * y - C * _, w = g, b = m), H = Math.atan2(w, v), u.rotation = H * U, H && (f = v * (y = Math.cos(H)) + w * (_ = Math.sin(H)), g = x * y + k * _, m = C * y + M * _, w = w * y - v * _, k = k * y - x * _, M = M * y - C * _, v = f, x = g, C = m), u.rotationX && 359.9 < Math.abs(u.rotationX) + Math.abs(u.rotation) && (u.rotationX = u.rotation = 0, u.rotationY = 180 - u.rotationY), H = Math.atan2(x, k), u.scaleX = (1e5 * Math.sqrt(v * v + w * w + b * b) + .5 | 0) / 1e5, u.scaleY = (1e5 * Math.sqrt(k * k + E * E) + .5 | 0) / 1e5, u.scaleZ = (1e5 * Math.sqrt(C * C + M * M + P * P) + .5 | 0) / 1e5, v /= u.scaleX, x /= u.scaleY, w /= u.scaleX, k /= u.scaleY, 2e-5 < Math.abs(H) ? (u.skewX = H * U, x = 0, "simple" !== u.skewType && (u.scaleY *= 1 / Math.cos(H))) : u.skewX = 0, u.perspective = L ? 1 / (L < 0 ? -L : L) : 0, u.x = O, u.y = I, u.z = A, u.svg && (u.x -= u.xOrigin - (u.xOrigin * v - u.yOrigin * x), u.y -= u.yOrigin - (u.yOrigin * w - u.xOrigin * k))
						} else if (!qe || n || !r.length || u.x !== r[4] || u.y !== r[5] || !u.rotationX && !u.rotationY) {
							var R = 6 <= r.length,
								B = R ? r[0] : 1,
								q = r[1] || 0,
								D = r[2] || 0,
								z = R ? r[3] : 1;
							u.x = r[4] || 0, u.y = r[5] || 0, o = Math.sqrt(B * B + q * q), a = Math.sqrt(z * z + D * D), l = B || q ? Math.atan2(q, B) * U : u.rotation || 0, h = D || z ? Math.atan2(D, z) * U + l : u.skewX || 0, u.scaleX = o, u.scaleY = a, u.rotation = l, u.skewX = h, qe && (u.rotationX = u.rotationY = u.z = 0, u.perspective = p, u.scaleZ = 1), u.svg && (u.x -= u.xOrigin - (u.xOrigin * B + u.yOrigin * D), u.y -= u.yOrigin - (u.xOrigin * q + u.yOrigin * z))
						}
						for (s in 90 < Math.abs(u.skewX) && Math.abs(u.skewX) < 270 && (c ? (u.scaleX *= -1, u.skewX += u.rotation <= 0 ? 180 : -180, u.rotation += u.rotation <= 0 ? 180 : -180) : (u.scaleY *= -1, u.skewX += u.skewX <= 0 ? 180 : -180)), u.zOrigin = d, u) u[s] < 2e-5 && -2e-5 < u[s] && (u[s] = 0)
					}
					return i && ((e._gsTransform = u).svg && (Me && e.style[He] ? F.delayedCall(.001, function() {
						Ze(e.style, He)
					}) : !Me && e.getAttribute("transform") && F.delayedCall(.001, function() {
						e.removeAttribute("transform")
					}))), u
				},
				Ke = function(e) {
					var t, i, n = this.data,
						r = -n.rotation * N,
						s = r + n.skewX * N,
						o = 1e5,
						a = (Math.cos(r) * n.scaleX * o | 0) / o,
						l = (Math.sin(r) * n.scaleX * o | 0) / o,
						h = (Math.sin(s) * -n.scaleY * o | 0) / o,
						u = (Math.cos(s) * n.scaleY * o | 0) / o,
						c = this.t.style,
						d = this.t.currentStyle;
					if (d) {
						i = l, l = -h, h = -i, t = d.filter, c.filter = "";
						var p, f, g = this.t.offsetWidth,
							m = this.t.offsetHeight,
							y = "absolute" !== d.position,
							_ = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + l + ", M21=" + h + ", M22=" + u,
							v = n.x + g * n.xPercent / 100,
							w = n.y + m * n.yPercent / 100;
						if (null != n.ox && (v += (p = (n.oxp ? g * n.ox * .01 : n.ox) - g / 2) - (p * a + (f = (n.oyp ? m * n.oy * .01 : n.oy) - m / 2) * l), w += f - (p * h + f * u)), y ? _ += ", Dx=" + ((p = g / 2) - (p * a + (f = m / 2) * l) + v) + ", Dy=" + (f - (p * h + f * u) + w) + ")" : _ += ", sizingMethod='auto expand')", -1 !== t.indexOf("DXImageTransform.Microsoft.Matrix(") ? c.filter = t.replace(H, _) : c.filter = _ + " " + t, (0 === e || 1 === e) && 1 === a && 0 === l && 0 === h && 1 === u && (y && -1 === _.indexOf("Dx=0, Dy=0") || L.test(t) && 100 !== parseFloat(RegExp.$1) || -1 === t.indexOf(t.indexOf("Alpha")) && c.removeAttribute("filter")), !y) {
							var b, S, x, k = E < 8 ? 1 : -1;
							for (p = n.ieOffsetX || 0, f = n.ieOffsetY || 0, n.ieOffsetX = Math.round((g - ((a < 0 ? -a : a) * g + (l < 0 ? -l : l) * m)) / 2 + v), n.ieOffsetY = Math.round((m - ((u < 0 ? -u : u) * m + (h < 0 ? -h : h) * g)) / 2 + w), ke = 0; ke < 4; ke++) x = (i = -1 !== (b = d[S = ae[ke]]).indexOf("px") ? parseFloat(b) : ie(this.t, S, parseFloat(b), b.replace(A, "")) || 0) !== n[S] ? ke < 2 ? -n.ieOffsetX : -n.ieOffsetY : ke < 2 ? p - n.ieOffsetX : f - n.ieOffsetY, c[S] = (n[S] = Math.round(i - x * (0 === ke || 2 === ke ? 1 : k))) + "px"
						}
					}
				},
				Qe = r.set3DTransformRatio = r.setTransformRatio = function(e) {
					var t, i, n, r, s, o, a, l, h, u, c, d, p, f, g, m, y, _, v, w, b, S, x, k = this.data,
						E = this.t.style,
						T = k.rotation,
						C = k.rotationX,
						M = k.rotationY,
						P = k.scaleX,
						O = k.scaleY,
						I = k.scaleZ,
						A = k.x,
						L = k.y,
						H = k.z,
						R = k.svg,
						B = k.perspective,
						q = k.force3D,
						D = k.skewY,
						z = k.skewX;
					if (D && (z += D, T += D), !((1 !== e && 0 !== e || "auto" !== q || this.tween._totalTime !== this.tween._totalDuration && this.tween._totalTime) && q || H || B || M || C || 1 !== I) || Me && R || !qe) T || z || R ? (T *= N, S = z * N, x = 1e5, i = Math.cos(T) * P, s = Math.sin(T) * P, n = Math.sin(T - S) * -O, o = Math.cos(T - S) * O, S && "simple" === k.skewType && (t = Math.tan(S - D * N), n *= t = Math.sqrt(1 + t * t), o *= t, D && (t = Math.tan(D * N), i *= t = Math.sqrt(1 + t * t), s *= t)), R && (A += k.xOrigin - (k.xOrigin * i + k.yOrigin * n) + k.xOffset, L += k.yOrigin - (k.xOrigin * s + k.yOrigin * o) + k.yOffset, Me && (k.xPercent || k.yPercent) && (g = this.t.getBBox(), A += .01 * k.xPercent * g.width, L += .01 * k.yPercent * g.height), A < (g = 1e-6) && -g < A && (A = 0), L < g && -g < L && (L = 0)), v = (i * x | 0) / x + "," + (s * x | 0) / x + "," + (n * x | 0) / x + "," + (o * x | 0) / x + "," + A + "," + L + ")", R && Me ? this.t.setAttribute("transform", "matrix(" + v) : E[He] = (k.xPercent || k.yPercent ? "translate(" + k.xPercent + "%," + k.yPercent + "%) matrix(" : "matrix(") + v) : E[He] = (k.xPercent || k.yPercent ? "translate(" + k.xPercent + "%," + k.yPercent + "%) matrix(" : "matrix(") + P + ",0,0," + O + "," + A + "," + L + ")";
					else {
						if (W && (P < (g = 1e-4) && -g < P && (P = I = 2e-5), O < g && -g < O && (O = I = 2e-5), !B || k.z || k.rotationX || k.rotationY || (B = 0)), T || z) T *= N, m = i = Math.cos(T), y = s = Math.sin(T), z && (T -= z * N, m = Math.cos(T), y = Math.sin(T), "simple" === k.skewType && (t = Math.tan((z - D) * N), m *= t = Math.sqrt(1 + t * t), y *= t, k.skewY && (t = Math.tan(D * N), i *= t = Math.sqrt(1 + t * t), s *= t))), n = -y, o = m;
						else {
							if (!(M || C || 1 !== I || B || R)) return void(E[He] = (k.xPercent || k.yPercent ? "translate(" + k.xPercent + "%," + k.yPercent + "%) translate3d(" : "translate3d(") + A + "px," + L + "px," + H + "px)" + (1 !== P || 1 !== O ? " scale(" + P + "," + O + ")" : ""));
							i = o = 1, n = s = 0
						}
						u = 1, r = a = l = h = c = d = 0, p = B ? -1 / B : 0, f = k.zOrigin, g = 1e-6, w = ",", b = "0", (T = M * N) && (m = Math.cos(T), c = p * (l = -(y = Math.sin(T))), r = i * y, a = s * y, p *= u = m, i *= m, s *= m), (T = C * N) && (t = n * (m = Math.cos(T)) + r * (y = Math.sin(T)), _ = o * m + a * y, h = u * y, d = p * y, r = n * -y + r * m, a = o * -y + a * m, u *= m, p *= m, n = t, o = _), 1 !== I && (r *= I, a *= I, u *= I, p *= I), 1 !== O && (n *= O, o *= O, h *= O, d *= O), 1 !== P && (i *= P, s *= P, l *= P, c *= P), (f || R) && (f && (A += r * -f, L += a * -f, H += u * -f + f), R && (A += k.xOrigin - (k.xOrigin * i + k.yOrigin * n) + k.xOffset, L += k.yOrigin - (k.xOrigin * s + k.yOrigin * o) + k.yOffset), A < g && -g < A && (A = b), L < g && -g < L && (L = b), H < g && -g < H && (H = 0)), v = k.xPercent || k.yPercent ? "translate(" + k.xPercent + "%," + k.yPercent + "%) matrix3d(" : "matrix3d(", v += (i < g && -g < i ? b : i) + w + (s < g && -g < s ? b : s) + w + (l < g && -g < l ? b : l), v += w + (c < g && -g < c ? b : c) + w + (n < g && -g < n ? b : n) + w + (o < g && -g < o ? b : o), C || M || 1 !== I ? (v += w + (h < g && -g < h ? b : h) + w + (d < g && -g < d ? b : d) + w + (r < g && -g < r ? b : r), v += w + (a < g && -g < a ? b : a) + w + (u < g && -g < u ? b : u) + w + (p < g && -g < p ? b : p) + w) : v += ",0,0,0,0,1,0,", v += A + w + L + w + H + w + (B ? 1 + -H / B : 1) + ")", E[He] = v
					}
				};
			(e = De.prototype).x = e.y = e.z = e.skewX = e.skewY = e.rotation = e.rotationX = e.rotationY = e.zOrigin = e.xPercent = e.yPercent = e.xOffset = e.yOffset = 0, e.scaleX = e.scaleY = e.scaleZ = 1, Te("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
				parser: function(e, t, i, n, r, s, o) {
					if (n._lastParsedTransform === o) return r;
					var a, l = (n._lastParsedTransform = o).scale && "function" == typeof o.scale ? o.scale : 0;
					"function" == typeof o[i] && (a = o[i], o[i] = t), l && (o.scale = l(P, e));
					var h, u, c, d, p, f, g, m, y, _ = e._gsTransform,
						v = e.style,
						w = Le.length,
						b = o,
						S = {},
						x = "transformOrigin",
						k = Ge(e, T, !0, b.parseTransform),
						E = b.transform && ("function" == typeof b.transform ? b.transform(P, M) : b.transform);
					if (k.skewType = b.skewType || k.skewType || j.defaultSkewType, n._transform = k, E && "string" == typeof E && He)(u = V.style)[He] = E, u.display = "block", u.position = "absolute", D.body.appendChild(V), h = Ge(V, null, !1), "simple" === k.skewType && (h.scaleY *= Math.cos(h.skewX * N)), k.svg && (f = k.xOrigin, g = k.yOrigin, h.x -= k.xOffset, h.y -= k.yOffset, (b.transformOrigin || b.svgOrigin) && (E = {}, Ne(e, he(b.transformOrigin), E, b.svgOrigin, b.smoothOrigin, !0), f = E.xOrigin, g = E.yOrigin, h.x -= E.xOffset - k.xOffset, h.y -= E.yOffset - k.yOffset), (f || g) && (m = Ye(V, !0), h.x -= f - (f * m[0] + g * m[2]), h.y -= g - (f * m[1] + g * m[3]))), D.body.removeChild(V), h.perspective || (h.perspective = k.perspective), null != b.xPercent && (h.xPercent = ce(b.xPercent, k.xPercent)), null != b.yPercent && (h.yPercent = ce(b.yPercent, k.yPercent));
					else if ("object" == (void 0 === b ? "undefined" : _typeof(b))) {
						if (h = {
								scaleX: ce(null != b.scaleX ? b.scaleX : b.scale, k.scaleX),
								scaleY: ce(null != b.scaleY ? b.scaleY : b.scale, k.scaleY),
								scaleZ: ce(b.scaleZ, k.scaleZ),
								x: ce(b.x, k.x),
								y: ce(b.y, k.y),
								z: ce(b.z, k.z),
								xPercent: ce(b.xPercent, k.xPercent),
								yPercent: ce(b.yPercent, k.yPercent),
								perspective: ce(b.transformPerspective, k.perspective)
							}, null != (p = b.directionalRotation))
							if ("object" == (void 0 === p ? "undefined" : _typeof(p)))
								for (u in p) b[u] = p[u];
							else b.rotation = p;
						"string" == typeof b.x && -1 !== b.x.indexOf("%") && (h.x = 0, h.xPercent = ce(b.x, k.xPercent)), "string" == typeof b.y && -1 !== b.y.indexOf("%") && (h.y = 0, h.yPercent = ce(b.y, k.yPercent)), h.rotation = de("rotation" in b ? b.rotation : "shortRotation" in b ? b.shortRotation + "_short" : "rotationZ" in b ? b.rotationZ : k.rotation, k.rotation, "rotation", S), qe && (h.rotationX = de("rotationX" in b ? b.rotationX : "shortRotationX" in b ? b.shortRotationX + "_short" : k.rotationX || 0, k.rotationX, "rotationX", S), h.rotationY = de("rotationY" in b ? b.rotationY : "shortRotationY" in b ? b.shortRotationY + "_short" : k.rotationY || 0, k.rotationY, "rotationY", S)), h.skewX = de(b.skewX, k.skewX), h.skewY = de(b.skewY, k.skewY)
					}
					for (qe && null != b.force3D && (k.force3D = b.force3D, d = !0), (c = k.force3D || k.z || k.rotationX || k.rotationY || h.z || h.rotationX || h.rotationY || h.perspective) || null == b.scale || (h.scaleZ = 1); - 1 < --w;)(1e-6 < (E = h[y = Le[w]] - k[y]) || E < -1e-6 || null != b[y] || null != q[y]) && (d = !0, r = new be(k, y, k[y], E, r), y in S && (r.e = S[y]), r.xs0 = 0, r.plugin = s, n._overwriteProps.push(r.n));
					return E = b.transformOrigin, k.svg && (E || b.svgOrigin) && (f = k.xOffset, g = k.yOffset, Ne(e, he(E), h, b.svgOrigin, b.smoothOrigin), r = Se(k, "xOrigin", (_ ? k : h).xOrigin, h.xOrigin, r, x), r = Se(k, "yOrigin", (_ ? k : h).yOrigin, h.yOrigin, r, x), (f !== k.xOffset || g !== k.yOffset) && (r = Se(k, "xOffset", _ ? f : k.xOffset, k.xOffset, r, x), r = Se(k, "yOffset", _ ? g : k.yOffset, k.yOffset, r, x)), E = "0px 0px"), (E || qe && c && k.zOrigin) && (He ? (d = !0, y = Be, E = (E || te(e, y, T, !1, "50% 50%")) + "", (r = new be(v, y, 0, 0, r, -1, x)).b = v[y], r.plugin = s, qe ? (u = k.zOrigin, E = E.split(" "), k.zOrigin = (2 < E.length && (0 === u || "0px" !== E[2]) ? parseFloat(E[2]) : u) || 0, r.xs0 = r.e = E[0] + " " + (E[1] || "50%") + " 0px", (r = new be(k, "zOrigin", 0, 0, r, -1, r.n)).b = u, r.xs0 = r.e = k.zOrigin) : r.xs0 = r.e = E) : he(E + "", k)), d && (n._transformType = k.svg && Me || !c && 3 !== this._transformType ? 2 : 3), a && (o[i] = a), l && (o.scale = l), r
				},
				prefix: !0
			}), Te("boxShadow", {
				defaultValue: "0px 0px 0px 0px #999",
				prefix: !0,
				color: !0,
				multi: !0,
				keyword: "inset"
			}), Te("borderRadius", {
				defaultValue: "0px",
				parser: function(e, t, i, n, r, s) {
					t = this.format(t);
					var o, a, l, h, u, c, d, p, f, g, m, y, _, v, w, b, S = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
						x = e.style;
					for (f = parseFloat(e.offsetWidth), g = parseFloat(e.offsetHeight), o = t.split(" "), a = 0; a < S.length; a++) this.p.indexOf("border") && (S[a] = J(S[a])), -1 !== (u = h = te(e, S[a], T, !1, "0px")).indexOf(" ") && (u = (h = u.split(" "))[0], h = h[1]), c = l = o[a], d = parseFloat(u), y = u.substr((d + "").length), (_ = "=" === c.charAt(1)) ? (p = parseInt(c.charAt(0) + "1", 10), c = c.substr(2), p *= parseFloat(c), m = c.substr((p + "").length - (p < 0 ? 1 : 0)) || "") : (p = parseFloat(c), m = c.substr((p + "").length)), "" === m && (m = k[i] || y), m !== y && (v = ie(e, "borderLeft", d, y), w = ie(e, "borderTop", d, y), "%" === m ? (u = v / f * 100 + "%", h = w / g * 100 + "%") : "em" === m ? (u = v / (b = ie(e, "borderLeft", 1, "em")) + "em", h = w / b + "em") : (u = v + "px", h = w + "px"), _ && (c = parseFloat(u) + p + m, l = parseFloat(h) + p + m)), r = xe(x, S[a], u + " " + h, c + " " + l, !1, "0px", r);
					return r
				},
				prefix: !0,
				formatter: _e("0px 0px 0px 0px", !1, !0)
			}), Te("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
				defaultValue: "0px",
				parser: function(e, t, i, n, r, s) {
					return xe(e.style, i, this.format(te(e, i, T, !1, "0px 0px")), this.format(t), !1, "0px", r)
				},
				prefix: !0,
				formatter: _e("0px 0px", !1, !0)
			}), Te("backgroundPosition", {
				defaultValue: "0 0",
				parser: function(e, t, i, n, r, s) {
					var o, a, l, h, u, c, d = "background-position",
						p = T || ee(e, null),
						f = this.format((p ? E ? p.getPropertyValue(d + "-x") + " " + p.getPropertyValue(d + "-y") : p.getPropertyValue(d) : e.currentStyle.backgroundPositionX + " " + e.currentStyle.backgroundPositionY) || "0 0"),
						g = this.format(t);
					if (-1 !== f.indexOf("%") != (-1 !== g.indexOf("%")) && g.split(",").length < 2 && ((c = te(e, "backgroundImage").replace(x, "")) && "none" !== c)) {
						for (o = f.split(" "), a = g.split(" "), X.setAttribute("src", c), l = 2; - 1 < --l;)(h = -1 !== (f = o[l]).indexOf("%")) !== (-1 !== a[l].indexOf("%")) && (u = 0 === l ? e.offsetWidth - X.width : e.offsetHeight - X.height, o[l] = h ? parseFloat(f) / 100 * u + "px" : parseFloat(f) / u * 100 + "%");
						f = o.join(" ")
					}
					return this.parseComplex(e.style, f, g, r, s)
				},
				formatter: he
			}), Te("backgroundSize", {
				defaultValue: "0 0",
				formatter: function(e) {
					return he(-1 === (e += "").indexOf(" ") ? e + " " + e : e)
				}
			}), Te("perspective", {
				defaultValue: "0px",
				prefix: !0
			}), Te("perspectiveOrigin", {
				defaultValue: "50% 50%",
				prefix: !0
			}), Te("transformStyle", {
				prefix: !0
			}), Te("backfaceVisibility", {
				prefix: !0
			}), Te("userSelect", {
				prefix: !0
			}), Te("margin", {
				parser: ve("marginTop,marginRight,marginBottom,marginLeft")
			}), Te("padding", {
				parser: ve("paddingTop,paddingRight,paddingBottom,paddingLeft")
			}), Te("clip", {
				defaultValue: "rect(0px,0px,0px,0px)",
				parser: function(e, t, i, n, r, s) {
					var o, a, l;
					return E < 9 ? (a = e.currentStyle, l = E < 8 ? " " : ",", o = "rect(" + a.clipTop + l + a.clipRight + l + a.clipBottom + l + a.clipLeft + ")", t = this.format(t).split(",").join(l)) : (o = this.format(te(e, this.p, T, !1, this.dflt)), t = this.format(t)), this.parseComplex(e.style, o, t, r, s)
				}
			}), Te("textShadow", {
				defaultValue: "0px 0px 0px #999",
				color: !0,
				multi: !0
			}), Te("autoRound,strictUnits", {
				parser: function(e, t, i, n, r) {
					return r
				}
			}), Te("border", {
				defaultValue: "0px solid #000",
				parser: function(e, t, i, n, r, s) {
					var o = te(e, "borderTopWidth", T, !1, "0px"),
						a = this.format(t).split(" "),
						l = a[0].replace(A, "");
					return "px" !== l && (o = parseFloat(o) / ie(e, "borderTopWidth", 1, l) + l), this.parseComplex(e.style, this.format(o + " " + te(e, "borderTopStyle", T, !1, "solid") + " " + te(e, "borderTopColor", T, !1, "#000")), a.join(" "), r, s)
				},
				color: !0,
				formatter: function(e) {
					var t = e.split(" ");
					return t[0] + " " + (t[1] || "solid") + " " + (e.match(ye) || ["#000"])[0]
				}
			}), Te("borderWidth", {
				parser: ve("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
			}), Te("float,cssFloat,styleFloat", {
				parser: function(e, t, i, n, r, s) {
					var o = e.style,
						a = "cssFloat" in o ? "cssFloat" : "styleFloat";
					return new be(o, a, 0, 0, r, -1, i, !1, 0, o[a], t)
				}
			});
			var $e = function(e) {
				var t, i = this.t,
					n = i.filter || te(this.data, "filter") || "",
					r = this.s + this.c * e | 0;
				100 === r && (-1 === n.indexOf("atrix(") && -1 === n.indexOf("radient(") && -1 === n.indexOf("oader(") ? (i.removeAttribute("filter"), t = !te(this.data, "filter")) : (i.filter = n.replace(o, ""), t = !0)), t || (this.xn1 && (i.filter = n = n || "alpha(opacity=" + r + ")"), -1 === n.indexOf("pacity") ? 0 === r && this.xn1 || (i.filter = n + " alpha(opacity=" + r + ")") : i.filter = n.replace(L, "opacity=" + r))
			};
			Te("opacity,alpha,autoAlpha", {
				defaultValue: "1",
				parser: function(e, t, i, n, r, s) {
					var o = parseFloat(te(e, "opacity", T, !1, "1")),
						a = e.style,
						l = "autoAlpha" === i;
					return "string" == typeof t && "=" === t.charAt(1) && (t = ("-" === t.charAt(0) ? -1 : 1) * parseFloat(t.substr(2)) + o), l && 1 === o && "hidden" === te(e, "visibility", T) && 0 !== t && (o = 0), G ? r = new be(a, "opacity", o, t - o, r) : ((r = new be(a, "opacity", 100 * o, 100 * (t - o), r)).xn1 = l ? 1 : 0, a.zoom = 1, r.type = 2, r.b = "alpha(opacity=" + r.s + ")", r.e = "alpha(opacity=" + (r.s + r.c) + ")", r.data = e, r.plugin = s, r.setRatio = $e), l && ((r = new be(a, "visibility", 0, 0, r, -1, null, !1, 0, 0 !== o ? "inherit" : "hidden", 0 === t ? "hidden" : "inherit")).xs0 = "inherit", n._overwriteProps.push(r.n), n._overwriteProps.push(i)), r
				}
			});
			var Ze = function(e, t) {
					t && (e.removeProperty ? (("ms" === t.substr(0, 2) || "webkit" === t.substr(0, 6)) && (t = "-" + t), e.removeProperty(t.replace(a, "-$1").toLowerCase())) : e.removeAttribute(t))
				},
				Je = function(e) {
					if (this.t._gsClassPT = this, 1 === e || 0 === e) {
						this.t.setAttribute("class", 0 === e ? this.b : this.e);
						for (var t = this.data, i = this.t.style; t;) t.v ? i[t.p] = t.v : Ze(i, t.p), t = t._next;
						1 === e && this.t._gsClassPT === this && (this.t._gsClassPT = null)
					} else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
				};
			Te("className", {
				parser: function(e, t, i, n, r, s, o) {
					var a, l, h, u, c, d = e.getAttribute("class") || "",
						p = e.style.cssText;
					if ((r = n._classNamePT = new be(e, i, 0, 0, r, 2)).setRatio = Je, r.pr = -11, f = !0, r.b = d, l = re(e, T), h = e._gsClassPT) {
						for (u = {}, c = h.data; c;) u[c.p] = 1, c = c._next;
						h.setRatio(1)
					}
					return (e._gsClassPT = r).e = "=" !== t.charAt(1) ? t : d.replace(new RegExp("(?:\\s|^)" + t.substr(2) + "(?![\\w-])"), "") + ("+" === t.charAt(0) ? " " + t.substr(2) : ""), e.setAttribute("class", r.e), a = se(e, l, re(e), o, u), e.setAttribute("class", d), r.data = a.firstMPT, e.style.cssText = p, r.xfirst = n.parse(e, a.difs, r, s)
				}
			});
			var et = function(e) {
				if ((1 === e || 0 === e) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
					var t, i, n, r, s, o = this.t.style,
						a = m.transform.parse;
					if ("all" === this.e) r = !(o.cssText = "");
					else
						for (n = (t = this.e.split(" ").join("").split(",")).length; - 1 < --n;) i = t[n], m[i] && (m[i].parse === a ? r = !0 : i = "transformOrigin" === i ? Be : m[i].p), Ze(o, i);
					r && (Ze(o, He), (s = this.t._gsTransform) && (s.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform))
				}
			};
			for (Te("clearProps", {
					parser: function(e, t, i, n, r) {
						return (r = new be(e, i, 0, 0, r, 2)).setRatio = et, r.e = t, r.pr = -10, r.data = n._tween, f = !0, r
					}
				}), e = "bezier,throwProps,physicsProps,physics2D".split(","), ke = e.length; ke--;) Ce(e[ke]);
			(e = j.prototype)._firstPT = e._lastParsedTransform = e._transform = null, e._onInitTween = function(e, t, i, n) {
				if (!e.nodeType) return !1;
				this._target = M = e, this._tween = i, this._vars = t, P = n, C = t.autoRound, f = !1, k = t.suffixMap || j.suffixMap, T = ee(e, ""), g = this._overwriteProps;
				var r, s, o, a, l, h, u, c, d, p = e.style;
				if (y && "" === p.zIndex && (("auto" === (r = te(e, "zIndex", T)) || "" === r) && this._addLazySet(p, "zIndex", 0)), "string" == typeof t && (a = p.cssText, r = re(e, T), p.cssText = a + ";" + t, r = se(e, r, re(e)).difs, !G && b.test(t) && (r.opacity = parseFloat(RegExp.$1)), t = r, p.cssText = a), t.className ? this._firstPT = s = m.className.parse(e, t.className, "className", this, null, null, t) : this._firstPT = s = this.parse(e, t, null), this._transformType) {
					for (d = 3 === this._transformType, He ? _ && (y = !0, "" === p.zIndex && (("auto" === (u = te(e, "zIndex", T)) || "" === u) && this._addLazySet(p, "zIndex", 0)), v && this._addLazySet(p, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (d ? "visible" : "hidden"))) : p.zoom = 1, o = s; o && o._next;) o = o._next;
					c = new be(e, "transform", 0, 0, null, 2), this._linkCSSP(c, null, o), c.setRatio = He ? Qe : Ke, c.data = this._transform || Ge(e, T, !0), c.tween = i, c.pr = -1, g.pop()
				}
				if (f) {
					for (; s;) {
						for (h = s._next, o = a; o && o.pr > s.pr;) o = o._next;
						(s._prev = o ? o._prev : l) ? s._prev._next = s: a = s, (s._next = o) ? o._prev = s : l = s, s = h
					}
					this._firstPT = a
				}
				return !0
			}, e.parse = function(e, t, i, n) {
				var r, s, o, a, l, h, u, c, d, p, f = e.style;
				for (r in t) {
					if ("function" == typeof(h = t[r]) && (h = h(P, M)), s = m[r]) i = s.parse(e, h, r, this, i, n, t);
					else {
						if ("--" === r.substr(0, 2)) {
							this._tween._propLookup[r] = this._addTween.call(this._tween, e.style, "setProperty", ee(e).getPropertyValue(r) + "", h + "", r, !1, r);
							continue
						}
						l = te(e, r, T) + "", d = "string" == typeof h, "color" === r || "fill" === r || "stroke" === r || -1 !== r.indexOf("Color") || d && S.test(h) ? (d || (h = (3 < (h = ge(h)).length ? "rgba(" : "rgb(") + h.join(",") + ")"), i = xe(f, r, l, h, !0, "transparent", i, 0, n)) : d && B.test(h) ? i = xe(f, r, l, h, !0, null, i, 0, n) : (u = (o = parseFloat(l)) || 0 === o ? l.substr((o + "").length) : "", ("" === l || "auto" === l) && ("width" === r || "height" === r ? (o = le(e, r, T), u = "px") : "left" === r || "top" === r ? (o = ne(e, r, T), u = "px") : (o = "opacity" !== r ? 0 : 1, u = "")), (p = d && "=" === h.charAt(1)) ? (a = parseInt(h.charAt(0) + "1", 10), h = h.substr(2), a *= parseFloat(h), c = h.replace(A, "")) : (a = parseFloat(h), c = d ? h.replace(A, "") : ""), "" === c && (c = r in k ? k[r] : u), h = a || 0 === a ? (p ? a + o : a) + c : t[r], u !== c && ("" !== c || "lineHeight" === r) && (a || 0 === a) && o && (o = ie(e, r, o, u), "%" === c ? (o /= ie(e, r, 100, "%") / 100, !0 !== t.strictUnits && (l = o + "%")) : "em" === c || "rem" === c || "vw" === c || "vh" === c ? o /= ie(e, r, 1, c) : "px" !== c && (a = ie(e, r, a, c), c = "px"), p && (a || 0 === a) && (h = a + o + c)), p && (a += o), !o && 0 !== o || !a && 0 !== a ? void 0 !== f[r] && (h || h + "" != "NaN" && null != h) ? (i = new be(f, r, a || o || 0, 0, i, -1, r, !1, 0, l, h)).xs0 = "none" !== h || "display" !== r && -1 === r.indexOf("Style") ? h : l : Q("invalid " + r + " tween value: " + t[r]) : (i = new be(f, r, o, a - o, i, 0, r, !1 !== C && ("px" === c || "zIndex" === r), 0, l, h)).xs0 = c)
					}
					n && i && !i.plugin && (i.plugin = n)
				}
				return i
			}, e.setRatio = function(e) {
				var t, i, n, r = this._firstPT;
				if (1 !== e || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
					if (e || this._tween._time !== this._tween._duration && 0 !== this._tween._time || -1e-6 === this._tween._rawPrevTime)
						for (; r;) {
							if (t = r.c * e + r.s, r.r ? t = Math.round(t) : t < 1e-6 && -1e-6 < t && (t = 0), r.type)
								if (1 === r.type)
									if (2 === (n = r.l)) r.t[r.p] = r.xs0 + t + r.xs1 + r.xn1 + r.xs2;
									else if (3 === n) r.t[r.p] = r.xs0 + t + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
							else if (4 === n) r.t[r.p] = r.xs0 + t + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4;
							else if (5 === n) r.t[r.p] = r.xs0 + t + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5;
							else {
								for (i = r.xs0 + t + r.xs1, n = 1; n < r.l; n++) i += r["xn" + n] + r["xs" + (n + 1)];
								r.t[r.p] = i
							} else -1 === r.type ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(e);
							else r.t[r.p] = t + r.xs0;
							r = r._next
						} else
							for (; r;) 2 !== r.type ? r.t[r.p] = r.b : r.setRatio(e), r = r._next;
					else
						for (; r;) {
							if (2 !== r.type)
								if (r.r && -1 !== r.type)
									if (t = Math.round(r.s + r.c), r.type) {
										if (1 === r.type) {
											for (n = r.l, i = r.xs0 + t + r.xs1, n = 1; n < r.l; n++) i += r["xn" + n] + r["xs" + (n + 1)];
											r.t[r.p] = i
										}
									} else r.t[r.p] = t + r.xs0;
							else r.t[r.p] = r.e;
							else r.setRatio(e);
							r = r._next
						}
			}, e._enableTransforms = function(e) {
				this._transform = this._transform || Ge(this._target, T, !0), this._transformType = this._transform.svg && Me || !e && 3 !== this._transformType ? 2 : 3
			};
			var tt = function(e) {
				this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
			};
			e._addLazySet = function(e, t, i) {
				var n = this._firstPT = new be(e, t, 0, 0, this._firstPT, 2);
				n.e = i, n.setRatio = tt, n.data = this
			}, e._linkCSSP = function(e, t, i, n) {
				return e && (t && (t._prev = e), e._next && (e._next._prev = e._prev), e._prev ? e._prev._next = e._next : this._firstPT === e && (this._firstPT = e._next, n = !0), i ? i._next = e : n || null !== this._firstPT || (this._firstPT = e), e._next = t, e._prev = i), e
			}, e._mod = function(e) {
				for (var t = this._firstPT; t;) "function" == typeof e[t.p] && e[t.p] === Math.round && (t.r = 1), t = t._next
			}, e._kill = function(e) {
				var t, i, n, r = e;
				if (e.autoAlpha || e.alpha) {
					for (i in r = {}, e) r[i] = e[i];
					r.opacity = 1, r.autoAlpha && (r.visibility = 1)
				}
				for (e.className && (t = this._classNamePT) && ((n = t.xfirst) && n._prev ? this._linkCSSP(n._prev, t._next, n._prev._prev) : n === this._firstPT && (this._firstPT = t._next), t._next && this._linkCSSP(t._next, t._next._next, n._prev), this._classNamePT = null), t = this._firstPT; t;) t.plugin && t.plugin !== i && t.plugin._kill && (t.plugin._kill(e), i = t.plugin), t = t._next;
				return s.prototype._kill.call(this, r)
			};
			var it = function e(t, i, n) {
				var r, s, o, a;
				if (t.slice)
					for (s = t.length; - 1 < --s;) e(t[s], i, n);
				else
					for (s = (r = t.childNodes).length; - 1 < --s;) a = (o = r[s]).type, o.style && (i.push(re(o)), n && n.push(o)), 1 !== a && 9 !== a && 11 !== a || !o.childNodes.length || e(o, i, n)
			};
			return j.cascadeTo = function(e, t, i) {
				var n, r, s, o, a = F.to(e, t, i),
					l = [a],
					h = [],
					u = [],
					c = [],
					d = F._internals.reservedProps;
				for (e = a._targets || a.target, it(e, h, c), a.render(t, !0, !0), it(e, u), a.render(0, !0, !0), a._enabled(!0), n = c.length; - 1 < --n;)
					if ((r = se(c[n], h[n], u[n])).firstMPT) {
						for (s in r = r.difs, i) d[s] && (r[s] = i[s]);
						for (s in o = {}, r) o[s] = h[n][s];
						l.push(F.fromTo(c[n], t, o, r))
					} return l
			}, s.activate([j]), j
		}, !0), e = _gsScope._gsDefine.plugin({
			propName: "roundProps",
			version: "1.6.0",
			priority: -1,
			API: 2,
			init: function(e, t, i) {
				return this._tween = i, !0
			}
		}), l = function(e) {
			for (; e;) e.f || e.blob || (e.m = Math.round), e = e._next
		}, (t = e.prototype)._onInitAllProps = function() {
			for (var e, t, i, n = this._tween, r = n.vars.roundProps.join ? n.vars.roundProps : n.vars.roundProps.split(","), s = r.length, o = {}, a = n._propLookup.roundProps; - 1 < --s;) o[r[s]] = Math.round;
			for (s = r.length; - 1 < --s;)
				for (e = r[s], t = n._firstPT; t;) i = t._next, t.pg ? t.t._mod(o) : t.n === e && (2 === t.f && t.t ? l(t.t._firstPT) : (this._add(t.t, e, t.s, t.c), i && (i._prev = t._prev), t._prev ? t._prev._next = i : n._firstPT === t && (n._firstPT = i), t._next = t._prev = null, n._propLookup[e] = a)), t = i;
			return !1
		}, t._add = function(e, t, i, n) {
			this._addTween(e, t, i, i + n, t, Math.round), this._overwriteProps.push(t)
		}, _gsScope._gsDefine.plugin({
			propName: "attr",
			API: 2,
			version: "0.6.1",
			init: function(e, t, i, n) {
				var r, s;
				if ("function" != typeof e.setAttribute) return !1;
				for (r in t) "function" == typeof(s = t[r]) && (s = s(n, e)), this._addTween(e, "setAttribute", e.getAttribute(r) + "", s + "", r, !1, r), this._overwriteProps.push(r);
				return !0
			}
		}), _gsScope._gsDefine.plugin({
			propName: "directionalRotation",
			version: "0.3.1",
			API: 2,
			init: function(e, t, i, n) {
				"object" != (void 0 === t ? "undefined" : _typeof(t)) && (t = {
					rotation: t
				}), this.finals = {};
				var r, s, o, a, l, h, u = !0 === t.useRadians ? 2 * Math.PI : 360;
				for (r in t) "useRadians" !== r && ("function" == typeof(a = t[r]) && (a = a(n, e)), s = (h = (a + "").split("_"))[0], o = parseFloat("function" != typeof e[r] ? e[r] : e[r.indexOf("set") || "function" != typeof e["get" + r.substr(3)] ? r : "get" + r.substr(3)]()), l = (a = this.finals[r] = "string" == typeof s && "=" === s.charAt(1) ? o + parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2)) : Number(s) || 0) - o, h.length && (-1 !== (s = h.join("_")).indexOf("short") && ((l %= u) !== l % (u / 2) && (l = l < 0 ? l + u : l - u)), -1 !== s.indexOf("_cw") && l < 0 ? l = (l + 9999999999 * u) % u - (l / u | 0) * u : -1 !== s.indexOf("ccw") && 0 < l && (l = (l - 9999999999 * u) % u - (l / u | 0) * u)), (1e-6 < l || l < -1e-6) && (this._addTween(e, r, o, o + l, r), this._overwriteProps.push(r)));
				return !0
			},
			set: function(e) {
				var t;
				if (1 !== e) this._super.setRatio.call(this, e);
				else
					for (t = this._firstPT; t;) t.f ? t.t[t.p](this.finals[t.p]) : t.t[t.p] = this.finals[t.p], t = t._next
			}
		})._autoCSS = !0, _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(m) {
			var i, t, e, n = _gsScope.GreenSockGlobals || _gsScope,
				r = n.com.greensock,
				s = 2 * Math.PI,
				o = Math.PI / 2,
				a = r._class,
				l = function(e, t) {
					var i = a("easing." + e, function() {}, !0),
						n = i.prototype = new m;
					return n.constructor = i, n.getRatio = t, i
				},
				h = m.register || function() {},
				u = function(e, t, i, n, r) {
					var s = a("easing." + e, {
						easeOut: new t,
						easeIn: new i,
						easeInOut: new n
					}, !0);
					return h(s, e), s
				},
				y = function(e, t, i) {
					this.t = e, this.v = t, i && (((this.next = i).prev = this).c = i.v - t, this.gap = i.t - e)
				},
				c = function(e, t) {
					var i = a("easing." + e, function(e) {
							this._p1 = e || 0 === e ? e : 1.70158, this._p2 = 1.525 * this._p1
						}, !0),
						n = i.prototype = new m;
					return n.constructor = i, n.getRatio = t, n.config = function(e) {
						return new i(e)
					}, i
				},
				d = u("Back", c("BackOut", function(e) {
					return (e -= 1) * e * ((this._p1 + 1) * e + this._p1) + 1
				}), c("BackIn", function(e) {
					return e * e * ((this._p1 + 1) * e - this._p1)
				}), c("BackInOut", function(e) {
					return (e *= 2) < 1 ? .5 * e * e * ((this._p2 + 1) * e - this._p2) : .5 * ((e -= 2) * e * ((this._p2 + 1) * e + this._p2) + 2)
				})),
				p = a("easing.SlowMo", function(e, t, i) {
					t = t || 0 === t ? t : .7, null == e ? e = .7 : 1 < e && (e = 1), this._p = 1 !== e ? t : 0, this._p1 = (1 - e) / 2, this._p2 = e, this._p3 = this._p1 + this._p2, this._calcEnd = !0 === i
				}, !0),
				f = p.prototype = new m;
			return f.constructor = p, f.getRatio = function(e) {
				var t = e + (.5 - e) * this._p;
				return e < this._p1 ? this._calcEnd ? 1 - (e = 1 - e / this._p1) * e : t - (e = 1 - e / this._p1) * e * e * e * t : e > this._p3 ? this._calcEnd ? 1 === e ? 0 : 1 - (e = (e - this._p3) / this._p1) * e : t + (e - t) * (e = (e - this._p3) / this._p1) * e * e * e : this._calcEnd ? 1 : t
			}, p.ease = new p(.7, .7), f.config = p.config = function(e, t, i) {
				return new p(e, t, i)
			}, (f = (i = a("easing.SteppedEase", function(e, t) {
				e = e || 1, this._p1 = 1 / e, this._p2 = e + (t ? 0 : 1), this._p3 = t ? 1 : 0
			}, !0)).prototype = new m).constructor = i, f.getRatio = function(e) {
				return e < 0 ? e = 0 : 1 <= e && (e = .999999999), ((this._p2 * e | 0) + this._p3) * this._p1
			}, f.config = i.config = function(e, t) {
				return new i(e, t)
			}, (f = (t = a("easing.RoughEase", function(e) {
				for (var t, i, n, r, s, o, a = (e = e || {}).taper || "none", l = [], h = 0, u = 0 | (e.points || 20), c = u, d = !1 !== e.randomize, p = !0 === e.clamp, f = e.template instanceof m ? e.template : null, g = "number" == typeof e.strength ? .4 * e.strength : .4; - 1 < --c;) t = d ? Math.random() : 1 / u * c, i = f ? f.getRatio(t) : t, "none" === a ? n = g : "out" === a ? n = (r = 1 - t) * r * g : "in" === a ? n = t * t * g : n = (r = t < .5 ? 2 * t : 2 * (1 - t)) * r * .5 * g, d ? i += Math.random() * n - .5 * n : c % 2 ? i += .5 * n : i -= .5 * n, p && (1 < i ? i = 1 : i < 0 && (i = 0)), l[h++] = {
					x: t,
					y: i
				};
				for (l.sort(function(e, t) {
						return e.x - t.x
					}), o = new y(1, 1, null), c = u; - 1 < --c;) s = l[c], o = new y(s.x, s.y, o);
				this._prev = new y(0, 0, 0 !== o.t ? o : o.next)
			}, !0)).prototype = new m).constructor = t, f.getRatio = function(e) {
				var t = this._prev;
				if (e > t.t) {
					for (; t.next && e >= t.t;) t = t.next;
					t = t.prev
				} else
					for (; t.prev && e <= t.t;) t = t.prev;
				return (this._prev = t).v + (e - t.t) / t.gap * t.c
			}, f.config = function(e) {
				return new t(e)
			}, t.ease = new t, u("Bounce", l("BounceOut", function(e) {
				return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
			}), l("BounceIn", function(e) {
				return (e = 1 - e) < 1 / 2.75 ? 1 - 7.5625 * e * e : e < 2 / 2.75 ? 1 - (7.5625 * (e -= 1.5 / 2.75) * e + .75) : e < 2.5 / 2.75 ? 1 - (7.5625 * (e -= 2.25 / 2.75) * e + .9375) : 1 - (7.5625 * (e -= 2.625 / 2.75) * e + .984375)
			}), l("BounceInOut", function(e) {
				var t = e < .5;
				return e = (e = t ? 1 - 2 * e : 2 * e - 1) < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375, t ? .5 * (1 - e) : .5 * e + .5
			})), u("Circ", l("CircOut", function(e) {
				return Math.sqrt(1 - (e -= 1) * e)
			}), l("CircIn", function(e) {
				return -(Math.sqrt(1 - e * e) - 1)
			}), l("CircInOut", function(e) {
				return (e *= 2) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
			})), u("Elastic", (e = function(e, t, i) {
				var n = a("easing." + e, function(e, t) {
						this._p1 = 1 <= e ? e : 1, this._p2 = (t || i) / (e < 1 ? e : 1), this._p3 = this._p2 / s * (Math.asin(1 / this._p1) || 0), this._p2 = s / this._p2
					}, !0),
					r = n.prototype = new m;
				return r.constructor = n, r.getRatio = t, r.config = function(e, t) {
					return new n(e, t)
				}, n
			})("ElasticOut", function(e) {
				return this._p1 * Math.pow(2, -10 * e) * Math.sin((e - this._p3) * this._p2) + 1
			}, .3), e("ElasticIn", function(e) {
				return -this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2)
			}, .3), e("ElasticInOut", function(e) {
				return (e *= 2) < 1 ? this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2) * -.5 : this._p1 * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2) * .5 + 1
			}, .45)), u("Expo", l("ExpoOut", function(e) {
				return 1 - Math.pow(2, -10 * e)
			}), l("ExpoIn", function(e) {
				return Math.pow(2, 10 * (e - 1)) - .001
			}), l("ExpoInOut", function(e) {
				return (e *= 2) < 1 ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (2 - Math.pow(2, -10 * (e - 1)))
			})), u("Sine", l("SineOut", function(e) {
				return Math.sin(e * o)
			}), l("SineIn", function(e) {
				return 1 - Math.cos(e * o)
			}), l("SineInOut", function(e) {
				return -.5 * (Math.cos(Math.PI * e) - 1)
			})), a("easing.EaseLookup", {
				find: function(e) {
					return m.map[e]
				}
			}, !0), h(n.SlowMo, "SlowMo", "ease,"), h(t, "RoughEase", "ease,"), h(i, "SteppedEase", "ease,"), d
		}, !0)
	}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
	function(p, f) {
		var t, i, g = {},
			r = p.document,
			m = p.GreenSockGlobals = p.GreenSockGlobals || p;
		if (!m.TweenLite) {
			var e, n, s, y, _, v = function(e) {
					var t, i = e.split("."),
						n = m;
					for (t = 0; t < i.length; t++) n[i[t]] = n = n[i[t]] || {};
					return n
				},
				c = v("com.greensock"),
				w = 1e-10,
				l = function(e) {
					var t, i = [],
						n = e.length;
					for (t = 0; t !== n; i.push(e[t++]));
					return i
				},
				b = function() {},
				S = (t = Object.prototype.toString, i = t.call([]), function(e) {
					return null != e && (e instanceof Array || "object" == (void 0 === e ? "undefined" : _typeof(e)) && !!e.push && t.call(e) === i)
				}),
				x = {},
				o = function a(l, h, u, c) {
					this.sc = x[l] ? x[l].sc : [], (x[l] = this).gsClass = null, this.func = u;
					var d = [];
					this.check = function(e) {
						for (var t, i, n, r, s = h.length, o = s; - 1 < --s;)(t = x[h[s]] || new a(h[s], [])).gsClass ? (d[s] = t.gsClass, o--) : e && t.sc.push(this);
						if (0 === o && u) {
							if (n = (i = ("com.greensock." + l).split(".")).pop(), r = v(i.join("."))[n] = this.gsClass = u.apply(u, d), c)
								if (m[n] = g[n] = r, "undefined" != typeof module && module.exports)
									if (l === f)
										for (s in module.exports = g[f] = r, g) r[s] = g[s];
									else g[f] && (g[f][n] = r);
							else "function" == typeof define && define.amd && define((p.GreenSockAMDPath ? p.GreenSockAMDPath + "/" : "") + l.split(".").pop(), [], function() {
								return r
							});
							for (s = 0; s < this.sc.length; s++) this.sc[s].check()
						}
					}, this.check(!0)
				},
				a = p._gsDefine = function(e, t, i, n) {
					return new o(e, t, i, n)
				},
				d = c._class = function(e, t, i) {
					return t = t || function() {}, a(e, [], function() {
						return t
					}, i), t
				};
			a.globals = m;
			var h = [0, 0, 1, 1],
				k = d("easing.Ease", function(e, t, i, n) {
					this._func = e, this._type = i || 0, this._power = n || 0, this._params = t ? h.concat(t) : h
				}, !0),
				E = k.map = {},
				u = k.register = function(e, t, i, n) {
					for (var r, s, o, a, l = t.split(","), h = l.length, u = (i || "easeIn,easeOut,easeInOut").split(","); - 1 < --h;)
						for (s = l[h], r = n ? d("easing." + s, null, !0) : c.easing[s] || {}, o = u.length; - 1 < --o;) a = u[o], E[s + "." + a] = E[a + s] = r[a] = e.getRatio ? e : e[a] || new e
				};
			for ((s = k.prototype)._calcEnd = !1, s.getRatio = function(e) {
					if (this._func) return this._params[0] = e, this._func.apply(null, this._params);
					var t = this._type,
						i = this._power,
						n = 1 === t ? 1 - e : 2 === t ? e : e < .5 ? 2 * e : 2 * (1 - e);
					return 1 === i ? n *= n : 2 === i ? n *= n * n : 3 === i ? n *= n * n * n : 4 === i && (n *= n * n * n * n), 1 === t ? 1 - n : 2 === t ? n : e < .5 ? n / 2 : 1 - n / 2
				}, n = (e = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"]).length; - 1 < --n;) s = e[n] + ",Power" + n, u(new k(null, null, 1, n), s, "easeOut", !0), u(new k(null, null, 2, n), s, "easeIn" + (0 === n ? ",easeNone" : "")), u(new k(null, null, 3, n), s, "easeInOut");
			E.linear = c.easing.Linear.easeIn, E.swing = c.easing.Quad.easeInOut;
			var T = d("events.EventDispatcher", function(e) {
				this._listeners = {}, this._eventTarget = e || this
			});
			(s = T.prototype).addEventListener = function(e, t, i, n, r) {
				r = r || 0;
				var s, o, a = this._listeners[e],
					l = 0;
				for (this !== y || _ || y.wake(), null == a && (this._listeners[e] = a = []), o = a.length; - 1 < --o;)(s = a[o]).c === t && s.s === i ? a.splice(o, 1) : 0 === l && s.pr < r && (l = o + 1);
				a.splice(l, 0, {
					c: t,
					s: i,
					up: n,
					pr: r
				})
			}, s.removeEventListener = function(e, t) {
				var i, n = this._listeners[e];
				if (n)
					for (i = n.length; - 1 < --i;)
						if (n[i].c === t) return void n.splice(i, 1)
			}, s.dispatchEvent = function(e) {
				var t, i, n, r = this._listeners[e];
				if (r)
					for (1 < (t = r.length) && (r = r.slice(0)), i = this._eventTarget; - 1 < --t;)(n = r[t]) && (n.up ? n.c.call(n.s || i, {
						type: e,
						target: i
					}) : n.c.call(n.s || i))
			};
			var C = p.requestAnimationFrame,
				M = p.cancelAnimationFrame,
				P = Date.now || function() {
					return (new Date).getTime()
				},
				O = P();
			for (n = (e = ["ms", "moz", "webkit", "o"]).length; - 1 < --n && !C;) C = p[e[n] + "RequestAnimationFrame"], M = p[e[n] + "CancelAnimationFrame"] || p[e[n] + "CancelRequestAnimationFrame"];
			d("Ticker", function(e, t) {
				var s, o, a, l, h, u = this,
					c = P(),
					i = !(!1 === t || !C) && "auto",
					d = 500,
					p = 33,
					n = function e(t) {
						var i, n, r = P() - O;
						d < r && (c += r - p), O += r, u.time = (O - c) / 1e3, i = u.time - h, (!s || 0 < i || !0 === t) && (u.frame++, h += i + (l <= i ? .004 : l - i), n = !0), !0 !== t && (a = o(e)), n && u.dispatchEvent("tick")
					};
				T.call(u), u.time = u.frame = 0, u.tick = function() {
					n(!0)
				}, u.lagSmoothing = function(e, t) {
					return arguments.length ? (d = e || 1e10, void(p = Math.min(t, d, 0))) : d < 1e10
				}, u.sleep = function() {
					null != a && (i && M ? M(a) : clearTimeout(a), o = b, a = null, u === y && (_ = !1))
				}, u.wake = function(e) {
					null !== a ? u.sleep() : e ? c += -O + (O = P()) : 10 < u.frame && (O = P() - d + 5), o = 0 === s ? b : i && C ? C : function(e) {
						return setTimeout(e, 1e3 * (h - u.time) + 1 | 0)
					}, u === y && (_ = !0), n(2)
				}, u.fps = function(e) {
					return arguments.length ? (l = 1 / ((s = e) || 60), h = this.time + l, void u.wake()) : s
				}, u.useRAF = function(e) {
					return arguments.length ? (u.sleep(), i = e, void u.fps(s)) : i
				}, u.fps(e), setTimeout(function() {
					"auto" === i && u.frame < 5 && "hidden" !== r.visibilityState && u.useRAF(!1)
				}, 1500)
			}), (s = c.Ticker.prototype = new c.events.EventDispatcher).constructor = c.Ticker;
			var I = d("core.Animation", function(e, t) {
				if (this.vars = t = t || {}, this._duration = this._totalDuration = e || 0, this._delay = Number(t.delay) || 0, this._timeScale = 1, this._active = !0 === t.immediateRender, this.data = t.data, this._reversed = !0 === t.reversed, K) {
					_ || y.wake();
					var i = this.vars.useFrames ? G : K;
					i.add(this, i._time), this.vars.paused && this.paused(!0)
				}
			});
			y = I.ticker = new c.Ticker, (s = I.prototype)._dirty = s._gc = s._initted = s._paused = !1, s._totalTime = s._time = 0, s._rawPrevTime = -1, s._next = s._last = s._onUpdate = s._timeline = s.timeline = null, s._paused = !1;
			(function e() {
				_ && 2e3 < P() - O && ("hidden" !== r.visibilityState || !y.lagSmoothing()) && y.wake();
				var t = setTimeout(e, 2e3);
				t.unref && t.unref()
			})(), s.play = function(e, t) {
				return null != e && this.seek(e, t), this.reversed(!1).paused(!1)
			}, s.pause = function(e, t) {
				return null != e && this.seek(e, t), this.paused(!0)
			}, s.resume = function(e, t) {
				return null != e && this.seek(e, t), this.paused(!1)
			}, s.seek = function(e, t) {
				return this.totalTime(Number(e), !1 !== t)
			}, s.restart = function(e, t) {
				return this.reversed(!1).paused(!1).totalTime(e ? -this._delay : 0, !1 !== t, !0)
			}, s.reverse = function(e, t) {
				return null != e && this.seek(e || this.totalDuration(), t), this.reversed(!0).paused(!1)
			}, s.render = function(e, t, i) {}, s.invalidate = function() {
				return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
			}, s.isActive = function() {
				var e, t = this._timeline,
					i = this._startTime;
				return !t || !this._gc && !this._paused && t.isActive() && (e = t.rawTime(!0)) >= i && e < i + this.totalDuration() / this._timeScale - 1e-7
			}, s._enabled = function(e, t) {
				return _ || y.wake(), this._gc = !e, this._active = this.isActive(), !0 !== t && (e && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !e && this.timeline && this._timeline._remove(this, !0)), !1
			}, s._kill = function(e, t) {
				return this._enabled(!1, !1)
			}, s.kill = function(e, t) {
				return this._kill(e, t), this
			}, s._uncache = function(e) {
				for (var t = e ? this : this.timeline; t;) t._dirty = !0, t = t.timeline;
				return this
			}, s._swapSelfInParams = function(e) {
				for (var t = e.length, i = e.concat(); - 1 < --t;) "{self}" === e[t] && (i[t] = this);
				return i
			}, s._callback = function(e) {
				var t = this.vars,
					i = t[e],
					n = t[e + "Params"],
					r = t[e + "Scope"] || t.callbackScope || this;
				switch (n ? n.length : 0) {
					case 0:
						i.call(r);
						break;
					case 1:
						i.call(r, n[0]);
						break;
					case 2:
						i.call(r, n[0], n[1]);
						break;
					default:
						i.apply(r, n)
				}
			}, s.eventCallback = function(e, t, i, n) {
				if ("on" === (e || "").substr(0, 2)) {
					var r = this.vars;
					if (1 === arguments.length) return r[e];
					null == t ? delete r[e] : (r[e] = t, r[e + "Params"] = S(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, r[e + "Scope"] = n), "onUpdate" === e && (this._onUpdate = t)
				}
				return this
			}, s.delay = function(e) {
				return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + e - this._delay), this._delay = e, this) : this._delay
			}, s.duration = function(e) {
				return arguments.length ? (this._duration = this._totalDuration = e, this._uncache(!0), this._timeline.smoothChildTiming && 0 < this._time && this._time < this._duration && 0 !== e && this.totalTime(this._totalTime * (e / this._duration), !0), this) : (this._dirty = !1, this._duration)
			}, s.totalDuration = function(e) {
				return this._dirty = !1, arguments.length ? this.duration(e) : this._totalDuration
			}, s.time = function(e, t) {
				return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(e > this._duration ? this._duration : e, t)) : this._time
			}, s.totalTime = function(e, t, i) {
				if (_ || y.wake(), !arguments.length) return this._totalTime;
				if (this._timeline) {
					if (e < 0 && !i && (e += this.totalDuration()), this._timeline.smoothChildTiming) {
						this._dirty && this.totalDuration();
						var n = this._totalDuration,
							r = this._timeline;
						if (n < e && !i && (e = n), this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? n - e : e) / this._timeScale, r._dirty || this._uncache(!1), r._timeline)
							for (; r._timeline;) r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0), r = r._timeline
					}
					this._gc && this._enabled(!0, !1), (this._totalTime !== e || 0 === this._duration) && (R.length && $(), this.render(e, t, !1), R.length && $())
				}
				return this
			}, s.progress = s.totalProgress = function(e, t) {
				var i = this.duration();
				return arguments.length ? this.totalTime(i * e, t) : i ? this._time / i : this.ratio
			}, s.startTime = function(e) {
				return arguments.length ? (e !== this._startTime && (this._startTime = e, this.timeline && this.timeline._sortChildren && this.timeline.add(this, e - this._delay)), this) : this._startTime
			}, s.endTime = function(e) {
				return this._startTime + (0 != e ? this.totalDuration() : this.duration()) / this._timeScale
			}, s.timeScale = function(e) {
				if (!arguments.length) return this._timeScale;
				var t, i;
				for (e = e || w, this._timeline && this._timeline.smoothChildTiming && (i = (t = this._pauseTime) || 0 === t ? t : this._timeline.totalTime(), this._startTime = i - (i - this._startTime) * this._timeScale / e), this._timeScale = e, i = this.timeline; i && i.timeline;) i._dirty = !0, i.totalDuration(), i = i.timeline;
				return this
			}, s.reversed = function(e) {
				return arguments.length ? (e != this._reversed && (this._reversed = e, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
			}, s.paused = function(e) {
				if (!arguments.length) return this._paused;
				var t, i, n = this._timeline;
				return e != this._paused && n && (_ || e || y.wake(), i = (t = n.rawTime()) - this._pauseTime, !e && n.smoothChildTiming && (this._startTime += i, this._uncache(!1)), this._pauseTime = e ? t : null, this._paused = e, this._active = this.isActive(), !e && 0 !== i && this._initted && this.duration() && (t = n.smoothChildTiming ? this._totalTime : (t - this._startTime) / this._timeScale, this.render(t, t === this._totalTime, !0))), this._gc && !e && this._enabled(!0, !1), this
			};
			var A = d("core.SimpleTimeline", function(e) {
				I.call(this, 0, e), this.autoRemoveChildren = this.smoothChildTiming = !0
			});
			(s = A.prototype = new I).constructor = A, s.kill()._gc = !1, s._first = s._last = s._recent = null, s._sortChildren = !1, s.add = s.insert = function(e, t, i, n) {
				var r, s;
				if (e._startTime = Number(t || 0) + e._delay, e._paused && this !== e._timeline && (e._pauseTime = e._startTime + (this.rawTime() - e._startTime) / e._timeScale), e.timeline && e.timeline._remove(e, !0), e.timeline = e._timeline = this, e._gc && e._enabled(!0, !0), r = this._last, this._sortChildren)
					for (s = e._startTime; r && r._startTime > s;) r = r._prev;
				return r ? (e._next = r._next, r._next = e) : (e._next = this._first, this._first = e), e._next ? e._next._prev = e : this._last = e, e._prev = r, this._recent = e, this._timeline && this._uncache(!0), this
			}, s._remove = function(e, t) {
				return e.timeline === this && (t || e._enabled(!1, !0), e._prev ? e._prev._next = e._next : this._first === e && (this._first = e._next), e._next ? e._next._prev = e._prev : this._last === e && (this._last = e._prev), e._next = e._prev = e.timeline = null, e === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
			}, s.render = function(e, t, i) {
				var n, r = this._first;
				for (this._totalTime = this._time = this._rawPrevTime = e; r;) n = r._next, (r._active || e >= r._startTime && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, i) : r.render((e - r._startTime) * r._timeScale, t, i)), r = n
			}, s.rawTime = function() {
				return _ || y.wake(), this._totalTime
			};
			var L = d("TweenLite", function(e, t, i) {
					if (I.call(this, t, i), this.render = L.prototype.render, null == e) throw "Cannot tween a null target.";
					this.target = e = "string" != typeof e ? e : L.selector(e) || e;
					var n, r, s, o = e.jquery || e.length && e !== p && e[0] && (e[0] === p || e[0].nodeType && e[0].style && !e.nodeType),
						a = this.vars.overwrite;
					if (this._overwrite = a = null == a ? Y[L.defaultOverwrite] : "number" == typeof a ? a >> 0 : Y[a], (o || e instanceof Array || e.push && S(e)) && "number" != typeof e[0])
						for (this._targets = s = l(e), this._propLookup = [], this._siblings = [], n = 0; n < s.length; n++)(r = s[n]) ? "string" != typeof r ? r.length && r !== p && r[0] && (r[0] === p || r[0].nodeType && r[0].style && !r.nodeType) ? (s.splice(n--, 1), this._targets = s = s.concat(l(r))) : (this._siblings[n] = Z(r, this, !1), 1 === a && 1 < this._siblings[n].length && ee(r, this, null, 1, this._siblings[n])) : "string" == typeof(r = s[n--] = L.selector(r)) && s.splice(n + 1, 1) : s.splice(n--, 1);
					else this._propLookup = {}, this._siblings = Z(e, this, !1), 1 === a && 1 < this._siblings.length && ee(e, this, null, 1, this._siblings);
					(this.vars.immediateRender || 0 === t && 0 === this._delay && !1 !== this.vars.immediateRender) && (this._time = -w, this.render(Math.min(0, -this._delay)))
				}, !0),
				H = function(e) {
					return e && e.length && e !== p && e[0] && (e[0] === p || e[0].nodeType && e[0].style && !e.nodeType)
				};
			(s = L.prototype = new I).constructor = L, s.kill()._gc = !1, s.ratio = 0, s._firstPT = s._targets = s._overwrittenProps = s._startAt = null, s._notifyPluginsOfEnabled = s._lazy = !1, L.version = "1.20.3", L.defaultEase = s._ease = new k(null, null, 1, 1), L.defaultOverwrite = "auto", L.ticker = y, L.autoSleep = 120, L.lagSmoothing = function(e, t) {
				y.lagSmoothing(e, t)
			}, L.selector = p.$ || p.jQuery || function(e) {
				var t = p.$ || p.jQuery;
				return t ? (L.selector = t)(e) : void 0 === r ? e : r.querySelectorAll ? r.querySelectorAll(e) : r.getElementById("#" === e.charAt(0) ? e.substr(1) : e)
			};
			var R = [],
				B = {},
				q = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
				D = /[\+-]=-?[\.\d]/,
				z = function(e) {
					for (var t, i = this._firstPT; i;) t = i.blob ? 1 === e && null != this.end ? this.end : e ? this.join("") : this.start : i.c * e + i.s, i.m ? t = i.m(t, this._target || i.t) : t < 1e-6 && -1e-6 < t && !i.blob && (t = 0), i.f ? i.fp ? i.t[i.p](i.fp, t) : i.t[i.p](t) : i.t[i.p] = t, i = i._next
				},
				F = function(e, t, i, n) {
					var r, s, o, a, l, h, u, c = [],
						d = 0,
						p = "",
						f = 0;
					for (c.start = e, c.end = t, e = c[0] = e + "", t = c[1] = t + "", i && (i(c), e = c[0], t = c[1]), c.length = 0, r = e.match(q) || [], s = t.match(q) || [], n && (n._next = null, n.blob = 1, c._firstPT = c._applyPT = n), l = s.length, a = 0; a < l; a++) u = s[a], p += (h = t.substr(d, t.indexOf(u, d) - d)) || !a ? h : ",", d += h.length, f ? f = (f + 1) % 5 : "rgba(" === h.substr(-5) && (f = 1), u === r[a] || r.length <= a ? p += u : (p && (c.push(p), p = ""), o = parseFloat(r[a]), c.push(o), c._firstPT = {
						_next: c._firstPT,
						t: c,
						p: c.length - 1,
						s: o,
						c: ("=" === u.charAt(1) ? parseInt(u.charAt(0) + "1", 10) * parseFloat(u.substr(2)) : parseFloat(u) - o) || 0,
						f: 0,
						m: f && f < 4 ? Math.round : 0
					}), d += u.length;
					return (p += t.substr(d)) && c.push(p), c.setRatio = z, D.test(t) && (c.end = null), c
				},
				j = function(e, t, i, n, r, s, o, a, l) {
					"function" == typeof n && (n = n(l || 0, e));
					var h = _typeof(e[t]),
						u = "function" !== h ? "" : t.indexOf("set") || "function" != typeof e["get" + t.substr(3)] ? t : "get" + t.substr(3),
						c = "get" !== i ? i : u ? o ? e[u](o) : e[u]() : e[t],
						d = "string" == typeof n && "=" === n.charAt(1),
						p = {
							t: e,
							p: t,
							s: c,
							f: "function" === h,
							pg: 0,
							n: r || t,
							m: s ? "function" == typeof s ? s : Math.round : 0,
							pr: 0,
							c: d ? parseInt(n.charAt(0) + "1", 10) * parseFloat(n.substr(2)) : parseFloat(n) - c || 0
						};
					return ("number" != typeof c || "number" != typeof n && !d) && (o || isNaN(c) || !d && isNaN(n) || "boolean" == typeof c || "boolean" == typeof n ? (p.fp = o, p = {
						t: F(c, d ? parseFloat(p.s) + p.c : n, a || L.defaultStringFilter, p),
						p: "setRatio",
						s: 0,
						c: 1,
						f: 2,
						pg: 0,
						n: r || t,
						pr: 0,
						m: 0
					}) : (p.s = parseFloat(c), d || (p.c = parseFloat(n) - p.s || 0))), p.c ? ((p._next = this._firstPT) && (p._next._prev = p), this._firstPT = p) : void 0
				},
				W = L._internals = {
					isArray: S,
					isSelector: H,
					lazyTweens: R,
					blobDif: F
				},
				N = L._plugins = {},
				U = W.tweenLookup = {},
				V = 0,
				X = W.reservedProps = {
					ease: 1,
					delay: 1,
					overwrite: 1,
					onComplete: 1,
					onCompleteParams: 1,
					onCompleteScope: 1,
					useFrames: 1,
					runBackwards: 1,
					startAt: 1,
					onUpdate: 1,
					onUpdateParams: 1,
					onUpdateScope: 1,
					onStart: 1,
					onStartParams: 1,
					onStartScope: 1,
					onReverseComplete: 1,
					onReverseCompleteParams: 1,
					onReverseCompleteScope: 1,
					onRepeat: 1,
					onRepeatParams: 1,
					onRepeatScope: 1,
					easeParams: 1,
					yoyo: 1,
					immediateRender: 1,
					repeat: 1,
					repeatDelay: 1,
					data: 1,
					paused: 1,
					reversed: 1,
					autoCSS: 1,
					lazy: 1,
					onOverwrite: 1,
					callbackScope: 1,
					stringFilter: 1,
					id: 1,
					yoyoEase: 1
				},
				Y = {
					none: 0,
					all: 1,
					auto: 2,
					concurrent: 3,
					allOnStart: 4,
					preexisting: 5,
					true: 1,
					false: 0
				},
				G = I._rootFramesTimeline = new A,
				K = I._rootTimeline = new A,
				Q = 30,
				$ = W.lazyRender = function() {
					var e, t = R.length;
					for (B = {}; - 1 < --t;)(e = R[t]) && !1 !== e._lazy && (e.render(e._lazy[0], e._lazy[1], !0), e._lazy = !1);
					R.length = 0
				};
			K._startTime = y.time, G._startTime = y.frame, K._active = G._active = !0, setTimeout($, 1), I._updateRoot = L.render = function() {
				var e, t, i;
				if (R.length && $(), K.render((y.time - K._startTime) * K._timeScale, !1, !1), G.render((y.frame - G._startTime) * G._timeScale, !1, !1), R.length && $(), y.frame >= Q) {
					for (i in Q = y.frame + (parseInt(L.autoSleep, 10) || 120), U) {
						for (e = (t = U[i].tweens).length; - 1 < --e;) t[e]._gc && t.splice(e, 1);
						0 === t.length && delete U[i]
					}
					if ((!(i = K._first) || i._paused) && L.autoSleep && !G._first && 1 === y._listeners.tick.length) {
						for (; i && i._paused;) i = i._next;
						i || y.sleep()
					}
				}
			}, y.addEventListener("tick", I._updateRoot);
			var Z = function(e, t, i) {
					var n, r, s = e._gsTweenID;
					if (U[s || (e._gsTweenID = s = "t" + V++)] || (U[s] = {
							target: e,
							tweens: []
						}), t && ((n = U[s].tweens)[r = n.length] = t, i))
						for (; - 1 < --r;) n[r] === t && n.splice(r, 1);
					return U[s].tweens
				},
				J = function(e, t, i, n) {
					var r, s, o = e.vars.onOverwrite;
					return o && (r = o(e, t, i, n)), (o = L.onOverwrite) && (s = o(e, t, i, n)), !1 !== r && !1 !== s
				},
				ee = function(e, t, i, n, r) {
					var s, o, a, l;
					if (1 === n || 4 <= n) {
						for (l = r.length, s = 0; s < l; s++)
							if ((a = r[s]) !== t) a._gc || a._kill(null, e, t) && (o = !0);
							else if (5 === n) break;
						return o
					}
					var h, u = t._startTime + w,
						c = [],
						d = 0,
						p = 0 === t._duration;
					for (s = r.length; - 1 < --s;)(a = r[s]) === t || a._gc || a._paused || (a._timeline !== t._timeline ? (h = h || te(t, 0, p), 0 === te(a, h, p) && (c[d++] = a)) : a._startTime <= u && a._startTime + a.totalDuration() / a._timeScale > u && ((p || !a._initted) && u - a._startTime <= 2e-10 || (c[d++] = a)));
					for (s = d; - 1 < --s;)
						if (a = c[s], 2 === n && a._kill(i, e, t) && (o = !0), 2 !== n || !a._firstPT && a._initted) {
							if (2 !== n && !J(a, t)) continue;
							a._enabled(!1, !1) && (o = !0)
						} return o
				},
				te = function(e, t, i) {
					for (var n = e._timeline, r = n._timeScale, s = e._startTime; n._timeline;) {
						if (s += n._startTime, r *= n._timeScale, n._paused) return -100;
						n = n._timeline
					}
					return t < (s /= r) ? s - t : i && s === t || !e._initted && s - t < 2 * w ? w : (s += e.totalDuration() / e._timeScale / r) > t + w ? 0 : s - t - w
				};
			s._init = function() {
				var e, t, i, n, r, s, o = this.vars,
					a = this._overwrittenProps,
					l = this._duration,
					h = !!o.immediateRender,
					u = o.ease;
				if (o.startAt) {
					for (n in this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), r = {}, o.startAt) r[n] = o.startAt[n];
					if (r.data = "isStart", r.overwrite = !1, r.immediateRender = !0, r.lazy = h && !1 !== o.lazy, r.startAt = r.delay = null, r.onUpdate = o.onUpdate, r.onUpdateParams = o.onUpdateParams, r.onUpdateScope = o.onUpdateScope || o.callbackScope || this, this._startAt = L.to(this.target, 0, r), h)
						if (0 < this._time) this._startAt = null;
						else if (0 !== l) return
				} else if (o.runBackwards && 0 !== l)
					if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
					else {
						for (n in 0 !== this._time && (h = !1), i = {}, o) X[n] && "autoCSS" !== n || (i[n] = o[n]);
						if (i.overwrite = 0, i.data = "isFromStart", i.lazy = h && !1 !== o.lazy, i.immediateRender = h, this._startAt = L.to(this.target, 0, i), h) {
							if (0 === this._time) return
						} else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
					} if (this._ease = u = u ? u instanceof k ? u : "function" == typeof u ? new k(u, o.easeParams) : E[u] || L.defaultEase : L.defaultEase, o.easeParams instanceof Array && u.config && (this._ease = u.config.apply(u, o.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
					for (s = this._targets.length, e = 0; e < s; e++) this._initProps(this._targets[e], this._propLookup[e] = {}, this._siblings[e], a ? a[e] : null, e) && (t = !0);
				else t = this._initProps(this.target, this._propLookup, this._siblings, a, 0);
				if (t && L._onPluginEvent("_onInitAllProps", this), a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), o.runBackwards)
					for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
				this._onUpdate = o.onUpdate, this._initted = !0
			}, s._initProps = function(e, t, i, n, r) {
				var s, o, a, l, h, u;
				if (null == e) return !1;
				for (s in B[e._gsTweenID] && $(), this.vars.css || e.style && e !== p && e.nodeType && N.css && !1 !== this.vars.autoCSS && function(e, t) {
						var i, n = {};
						for (i in e) X[i] || i in t && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!N[i] || N[i] && N[i]._autoCSS) || (n[i] = e[i], delete e[i]);
						e.css = n
					}(this.vars, e), this.vars)
					if (u = this.vars[s], X[s]) u && (u instanceof Array || u.push && S(u)) && -1 !== u.join("").indexOf("{self}") && (this.vars[s] = u = this._swapSelfInParams(u, this));
					else if (N[s] && (l = new N[s])._onInitTween(e, this.vars[s], this, r)) {
					for (this._firstPT = h = {
							_next: this._firstPT,
							t: l,
							p: "setRatio",
							s: 0,
							c: 1,
							f: 1,
							n: s,
							pg: 1,
							pr: l._priority,
							m: 0
						}, o = l._overwriteProps.length; - 1 < --o;) t[l._overwriteProps[o]] = this._firstPT;
					(l._priority || l._onInitAllProps) && (a = !0), (l._onDisable || l._onEnable) && (this._notifyPluginsOfEnabled = !0), h._next && (h._next._prev = h)
				} else t[s] = j.call(this, e, s, "get", u, s, 0, null, this.vars.stringFilter, r);
				return n && this._kill(n, e) ? this._initProps(e, t, i, n, r) : 1 < this._overwrite && this._firstPT && 1 < i.length && ee(e, this, t, this._overwrite, i) ? (this._kill(t, e), this._initProps(e, t, i, n, r)) : (this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration) && (B[e._gsTweenID] = !0), a)
			}, s.render = function(e, t, i) {
				var n, r, s, o, a = this._time,
					l = this._duration,
					h = this._rawPrevTime;
				if (l - 1e-7 <= e && 0 <= e) this._totalTime = this._time = l, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (n = !0, r = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (e = 0), (h < 0 || e <= 0 && -1e-7 <= e || h === w && "isPause" !== this.data) && h !== e && (i = !0, w < h && (r = "onReverseComplete")), this._rawPrevTime = o = !t || e || h === e ? e : w);
				else if (e < 1e-7) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== a || 0 === l && 0 < h) && (r = "onReverseComplete", n = this._reversed), e < 0 && (this._active = !1, 0 === l && (this._initted || !this.vars.lazy || i) && (0 <= h && (h !== w || "isPause" !== this.data) && (i = !0), this._rawPrevTime = o = !t || e || h === e ? e : w)), (!this._initted || this._startAt && this._startAt.progress()) && (i = !0);
				else if (this._totalTime = this._time = e, this._easeType) {
					var u = e / l,
						c = this._easeType,
						d = this._easePower;
					(1 === c || 3 === c && .5 <= u) && (u = 1 - u), 3 === c && (u *= 2), 1 === d ? u *= u : 2 === d ? u *= u * u : 3 === d ? u *= u * u * u : 4 === d && (u *= u * u * u * u), this.ratio = 1 === c ? 1 - u : 2 === c ? u : e / l < .5 ? u / 2 : 1 - u / 2
				} else this.ratio = this._ease.getRatio(e / l);
				if (this._time !== a || i) {
					if (!this._initted) {
						if (this._init(), !this._initted || this._gc) return;
						if (!i && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = a, this._rawPrevTime = h, R.push(this), void(this._lazy = [e, t]);
						this._time && !n ? this.ratio = this._ease.getRatio(this._time / l) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
					}
					for (!1 !== this._lazy && (this._lazy = !1), this._active || !this._paused && this._time !== a && 0 <= e && (this._active = !0), 0 === a && (this._startAt && (0 <= e ? this._startAt.render(e, !0, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === l) && (t || this._callback("onStart"))), s = this._firstPT; s;) s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s, s = s._next;
					this._onUpdate && (e < 0 && this._startAt && -1e-4 !== e && this._startAt.render(e, !0, i), t || (this._time !== a || n || i) && this._callback("onUpdate")), r && (!this._gc || i) && (e < 0 && this._startAt && !this._onUpdate && -1e-4 !== e && this._startAt.render(e, !0, i), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[r] && this._callback(r), 0 === l && this._rawPrevTime === w && o !== w && (this._rawPrevTime = 0))
				}
			}, s._kill = function(e, t, i) {
				if ("all" === e && (e = null), null == e && (null == t || t === this.target)) return this._lazy = !1, this._enabled(!1, !1);
				t = "string" != typeof t ? t || this._targets || this.target : L.selector(t) || t;
				var n, r, s, o, a, l, h, u, c, d = i && this._time && i._startTime === this._startTime && this._timeline === i._timeline;
				if ((S(t) || H(t)) && "number" != typeof t[0])
					for (n = t.length; - 1 < --n;) this._kill(e, t[n], i) && (l = !0);
				else {
					if (this._targets) {
						for (n = this._targets.length; - 1 < --n;)
							if (t === this._targets[n]) {
								a = this._propLookup[n] || {}, this._overwrittenProps = this._overwrittenProps || [], r = this._overwrittenProps[n] = e ? this._overwrittenProps[n] || {} : "all";
								break
							}
					} else {
						if (t !== this.target) return !1;
						a = this._propLookup, r = this._overwrittenProps = e ? this._overwrittenProps || {} : "all"
					}
					if (a) {
						if (h = e || a, u = e !== r && "all" !== r && e !== a && ("object" != (void 0 === e ? "undefined" : _typeof(e)) || !e._tempKill), i && (L.onOverwrite || this.vars.onOverwrite)) {
							for (s in h) a[s] && (c || (c = []), c.push(s));
							if ((c || !e) && !J(this, i, t, c)) return !1
						}
						for (s in h)(o = a[s]) && (d && (o.f ? o.t[o.p](o.s) : o.t[o.p] = o.s, l = !0), o.pg && o.t._kill(h) && (l = !0), o.pg && 0 !== o.t._overwriteProps.length || (o._prev ? o._prev._next = o._next : o === this._firstPT && (this._firstPT = o._next), o._next && (o._next._prev = o._prev), o._next = o._prev = null), delete a[s]), u && (r[s] = 1);
						!this._firstPT && this._initted && this._enabled(!1, !1)
					}
				}
				return l
			}, s.invalidate = function() {
				return this._notifyPluginsOfEnabled && L._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], I.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -w, this.render(Math.min(0, -this._delay))), this
			}, s._enabled = function(e, t) {
				if (_ || y.wake(), e && this._gc) {
					var i, n = this._targets;
					if (n)
						for (i = n.length; - 1 < --i;) this._siblings[i] = Z(n[i], this, !0);
					else this._siblings = Z(this.target, this, !0)
				}
				return I.prototype._enabled.call(this, e, t), !(!this._notifyPluginsOfEnabled || !this._firstPT) && L._onPluginEvent(e ? "_onEnable" : "_onDisable", this)
			}, L.to = function(e, t, i) {
				return new L(e, t, i)
			}, L.from = function(e, t, i) {
				return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new L(e, t, i)
			}, L.fromTo = function(e, t, i, n) {
				return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new L(e, t, n)
			}, L.delayedCall = function(e, t, i, n, r) {
				return new L(t, 0, {
					delay: e,
					onComplete: t,
					onCompleteParams: i,
					callbackScope: n,
					onReverseComplete: t,
					onReverseCompleteParams: i,
					immediateRender: !1,
					lazy: !1,
					useFrames: r,
					overwrite: 0
				})
			}, L.set = function(e, t) {
				return new L(e, 0, t)
			}, L.getTweensOf = function(e, t) {
				if (null == e) return [];
				var i, n, r, s;
				if (e = "string" != typeof e ? e : L.selector(e) || e, (S(e) || H(e)) && "number" != typeof e[0]) {
					for (i = e.length, n = []; - 1 < --i;) n = n.concat(L.getTweensOf(e[i], t));
					for (i = n.length; - 1 < --i;)
						for (s = n[i], r = i; - 1 < --r;) s === n[r] && n.splice(i, 1)
				} else if (e._gsTweenID)
					for (i = (n = Z(e).concat()).length; - 1 < --i;)(n[i]._gc || t && !n[i].isActive()) && n.splice(i, 1);
				return n || []
			}, L.killTweensOf = L.killDelayedCallsTo = function(e, t, i) {
				"object" == (void 0 === t ? "undefined" : _typeof(t)) && (i = t, t = !1);
				for (var n = L.getTweensOf(e, t), r = n.length; - 1 < --r;) n[r]._kill(i, e)
			};
			var ie = d("plugins.TweenPlugin", function(e, t) {
				this._overwriteProps = (e || "").split(","), this._propName = this._overwriteProps[0], this._priority = t || 0, this._super = ie.prototype
			}, !0);
			if (s = ie.prototype, ie.version = "1.19.0", ie.API = 2, s._firstPT = null, s._addTween = j, s.setRatio = z, s._kill = function(e) {
					var t, i = this._overwriteProps,
						n = this._firstPT;
					if (null != e[this._propName]) this._overwriteProps = [];
					else
						for (t = i.length; - 1 < --t;) null != e[i[t]] && i.splice(t, 1);
					for (; n;) null != e[n.n] && (n._next && (n._next._prev = n._prev), n._prev ? (n._prev._next = n._next, n._prev = null) : this._firstPT === n && (this._firstPT = n._next)), n = n._next;
					return !1
				}, s._mod = s._roundProps = function(e) {
					for (var t, i = this._firstPT; i;)(t = e[this._propName] || null != i.n && e[i.n.split(this._propName + "_").join("")]) && "function" == typeof t && (2 === i.f ? i.t._applyPT.m = t : i.m = t), i = i._next
				}, L._onPluginEvent = function(e, t) {
					var i, n, r, s, o, a = t._firstPT;
					if ("_onInitAllProps" === e) {
						for (; a;) {
							for (o = a._next, n = r; n && n.pr > a.pr;) n = n._next;
							(a._prev = n ? n._prev : s) ? a._prev._next = a: r = a, (a._next = n) ? n._prev = a : s = a, a = o
						}
						a = t._firstPT = r
					}
					for (; a;) a.pg && "function" == typeof a.t[e] && a.t[e]() && (i = !0), a = a._next;
					return i
				}, ie.activate = function(e) {
					for (var t = e.length; - 1 < --t;) e[t].API === ie.API && (N[(new e[t])._propName] = e[t]);
					return !0
				}, a.plugin = function(e) {
					if (!(e && e.propName && e.init && e.API)) throw "illegal plugin definition.";
					var t, i = e.propName,
						n = e.priority || 0,
						r = e.overwriteProps,
						s = {
							init: "_onInitTween",
							set: "setRatio",
							kill: "_kill",
							round: "_mod",
							mod: "_mod",
							initAll: "_onInitAllProps"
						},
						o = d("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function() {
							ie.call(this, i, n), this._overwriteProps = r || []
						}, !0 === e.global),
						a = o.prototype = new ie(i);
					for (t in (a.constructor = o).API = e.API, s) "function" == typeof e[t] && (a[s[t]] = e[t]);
					return o.version = e.version, ie.activate([o]), o
				}, e = p._gsQueue) {
				for (n = 0; n < e.length; n++) e[n]();
				for (s in x) x[s].func || p.console.log("GSAP encountered missing dependency: " + s)
			}
			_ = !1
		}
	}("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : window, "TweenMax");
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : window;

function EventDispatcher() {}(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
		var a = document.documentElement,
			l = _gsScope,
			o = function(e, t) {
				var i = "x" === t ? "Width" : "Height",
					n = "scroll" + i,
					r = "client" + i,
					s = document.body;
				return e === l || e === a || e === s ? Math.max(a[n], s[n]) - (l["inner" + i] || a[r] || s[r]) : e[n] - e["offset" + i]
			},
			h = function(e, t) {
				var i = "scroll" + ("x" === t ? "Left" : "Top");
				return e === l && (null != e.pageXOffset ? i = "page" + t.toUpperCase() + "Offset" : e = null != a[i] ? a : document.body),
					function() {
						return e[i]
					}
			},
			r = function(e, t) {
				var i, n = (i = e, "string" == typeof i && (i = TweenLite.selector(i)), i.length && i !== l && i[0] && i[0].style && !i.nodeType && (i = i[0]), i === l || i.nodeType && i.style ? i : null).getBoundingClientRect(),
					r = !t || t === l || t === document.body,
					s = (r ? a : t).getBoundingClientRect(),
					o = {
						x: n.left - s.left,
						y: n.top - s.top
					};
				return !r && t && (o.x += h(t, "x")(), o.y += h(t, "y")()), o
			},
			n = function(e, t, i) {
				var n = void 0 === e ? "undefined" : _typeof(e);
				return "number" === n || "string" === n && "=" === e.charAt(1) ? e : "max" === e ? o(t, i) : Math.min(o(t, i), r(e, t)[i])
			},
			u = _gsScope._gsDefine.plugin({
				propName: "scrollTo",
				API: 2,
				global: !0,
				version: "1.8.1",
				init: function(e, t, i) {
					return this._wdw = e === l, this._target = e, this._tween = i, "object" !== (void 0 === t ? "undefined" : _typeof(t)) ? "string" == typeof(t = {
						y: t
					}).y && "max" !== t.y && "=" !== t.y.charAt(1) && (t.x = t.y) : t.nodeType && (t = {
						y: t,
						x: t
					}), this.vars = t, this._autoKill = !1 !== t.autoKill, this.getX = h(e, "x"), this.getY = h(e, "y"), this.x = this.xPrev = this.getX(), this.y = this.yPrev = this.getY(), null != t.x ? (this._addTween(this, "x", this.x, n(t.x, e, "x") - (t.offsetX || 0), "scrollTo_x", !0), this._overwriteProps.push("scrollTo_x")) : this.skipX = !0, null != t.y ? (this._addTween(this, "y", this.y, n(t.y, e, "y") - (t.offsetY || 0), "scrollTo_y", !0), this._overwriteProps.push("scrollTo_y")) : this.skipY = !0, !0
				},
				set: function(e) {
					this._super.setRatio.call(this, e);
					var t = this._wdw || !this.skipX ? this.getX() : this.xPrev,
						i = this._wdw || !this.skipY ? this.getY() : this.yPrev,
						n = i - this.yPrev,
						r = t - this.xPrev,
						s = u.autoKillThreshold;
					this.x < 0 && (this.x = 0), this.y < 0 && (this.y = 0), this._autoKill && (!this.skipX && (s < r || r < -s) && t < o(this._target, "x") && (this.skipX = !0), !this.skipY && (s < n || n < -s) && i < o(this._target, "y") && (this.skipY = !0), this.skipX && this.skipY && (this._tween.kill(), this.vars.onAutoKill && this.vars.onAutoKill.apply(this.vars.onAutoKillScope || this._tween, this.vars.onAutoKillParams || []))), this._wdw ? l.scrollTo(this.skipX ? t : this.x, this.skipY ? i : this.y) : (this.skipY || (this._target.scrollTop = this.y), this.skipX || (this._target.scrollLeft = this.x)), this.xPrev = this.x, this.yPrev = this.y
				}
			}),
			e = u.prototype;
		u.max = o, u.getOffset = r, u.autoKillThreshold = 7, e._kill = function(e) {
			return e.scrollTo_x && (this.skipX = !0), e.scrollTo_y && (this.skipY = !0), this._super._kill.call(this, e)
		}
	}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
	function(e) {
		var t = function() {
			return (_gsScope.GreenSockGlobals || _gsScope).ScrollToPlugin
		};
		"function" == typeof define && define.amd ? define(["TweenLite"], t) : "undefined" != typeof module && module.exports && (require("../TweenLite.js"), module.exports = t())
	}(),
	function() {
		var e = window.Mixcloud,
			t = {
				noConflict: function() {
					return window.Mixcloud = e, t
				}
			};
		window.Mixcloud = t
	}(), window.Mixcloud.Callbacks = function() {
		var n = [];
		return {
			apply: function(e, t) {
				for (var i = 0; i < n.length; i++) n[i].apply(e, t)
			},
			external: {
				on: function(e) {
					n.push(e)
				},
				off: function(e) {
					for (var t = 0; t < n.length; t++)
						if (n[t] === e) {
							n.splice(t, 1);
							break
						}
				}
			}
		}
	},
	function() {
		function c(e, t) {
			return (void 0 === e ? "undefined" : _typeof(e))[0] === t
		}
		window.Mixcloud.Deferred = function() {
			function n(e) {
				t(1, e)
			}

			function r(e) {
				t(2, e)
			}

			function t(e, t) {
				if (!h) {
					if (u.resolve = u.reject = function() {}, 1 === e) {
						if (t === u.promise) return void r(new TypeError);
						if (t instanceof o) return void t.then(n, r);
						if (c(t, "f") || c(t, "o")) {
							var i;
							try {
								i = t.then
							} catch (e) {
								return void r(e)
							}
							if (c(i, "f")) {
								try {
									i.call(t, n, r)
								} catch (e) {
									h || r(e)
								}
								return
							}
						}
					}
					a = t, h = e, s()
				}
			}

			function s() {
				setTimeout(function() {
					for (var e = 0; e < l.length; e++) l[e][h - 1].call(void 0, a);
					l = []
				}, 0)
			}

			function e(e, t) {
				function i(t) {
					return function(e) {
						try {
							n.resolve(t.call(this, e))
						} catch (e) {
							n.reject(e)
						}
					}
				}
				var n = window.Mixcloud.Deferred();
				return l.push([c(e, "f") ? i(e) : function(e) {
					n.resolve(e)
				}, c(t, "f") ? i(t) : function(e) {
					n.reject(e)
				}]), h && s(), n.promise
			}

			function o() {
				this.then = e
			}
			var a, l = [],
				h = 0,
				u = {
					resolve: n,
					reject: r,
					promise: new o
				};
			return u
		}
	}(),
	function(l) {
		function e(e) {
			if (e.origin === n || e.origin === l.location.origin) {
				var t;
				try {
					t = JSON.parse(e.data)
				} catch (e) {
					return
				}
				if ("playerWidget" === t.mixcloud)
					for (var i = 0; i < u.length; i++) u[i].window === e.source && u[i].callback(t.type, t.data)
			}
		}

		function h(e, t) {
			e.postMessage(JSON.stringify(t), n)
		}
		var n = "https://www.mixcloud.com",
			t = 0,
			u = [];
		l.Mixcloud.PlayerWidget = function(e) {
			function i(e) {
				return function() {
					return o[++t] = l.Mixcloud.Deferred(), h(n, {
						type: "method",
						data: {
							methodId: t,
							methodName: e,
							args: Array.prototype.slice.call(arguments)
						}
					}), o[t].promise
				}
			}
			var n = e.contentWindow,
				r = l.Mixcloud.Deferred(),
				s = {},
				o = {},
				a = {
					ready: r.promise,
					events: {}
				};
			return u.push({
				window: n,
				callback: function(e, t) {
					"ready" === e ? h(n, {
						type: "getApi"
					}) : "api" === e ? function(e) {
						var t;
						for (t = 0; t < e.methods.length; t++) a[e.methods[t]] = i(e.methods[t]);
						for (t = 0; t < e.events.length; t++) s[e.events[t]] = l.Mixcloud.Callbacks(), a.events[e.events[t]] = s[e.events[t]].external;
						r.resolve(a)
					}(t) : "event" === e ? s[t.eventName].apply(a, t.args) : "methodResponse" === e && o[t.methodId] && (o[t.methodId].resolve(t.value), delete o[t.methodId])
				}
			}), h(n, {
				type: "getApi"
			}), a
		}, l.addEventListener ? l.addEventListener("message", e, !1) : l.attachEvent("onmessage", e)
	}(window), "object" != ("undefined" == typeof JSON ? "undefined" : _typeof(JSON)) && (JSON = {}),
	function() {
		function f(e) {
			return e < 10 ? "0" + e : e
		}

		function quote(e) {
			return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function(e) {
				var t = meta[e];
				return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
			}) + '"' : '"' + e + '"'
		}

		function str(e, t) {
			var i, n, r, s, o, a = gap,
				l = t[e];
			switch (l && "object" == (void 0 === l ? "undefined" : _typeof(l)) && "function" == typeof l.toJSON && (l = l.toJSON(e)), "function" == typeof rep && (l = rep.call(t, e, l)), void 0 === l ? "undefined" : _typeof(l)) {
				case "string":
					return quote(l);
				case "number":
					return isFinite(l) ? String(l) : "null";
				case "boolean":
				case "null":
					return String(l);
				case "object":
					if (!l) return "null";
					if (gap += indent, o = [], "[object Array]" === Object.prototype.toString.apply(l)) {
						for (s = l.length, i = 0; i < s; i += 1) o[i] = str(i, l) || "null";
						return r = 0 === o.length ? "[]" : gap ? "[\n" + gap + o.join(",\n" + gap) + "\n" + a + "]" : "[" + o.join(",") + "]", gap = a, r
					}
					if (rep && "object" == (void 0 === rep ? "undefined" : _typeof(rep)))
						for (s = rep.length, i = 0; i < s; i += 1) "string" == typeof rep[i] && ((r = str(n = rep[i], l)) && o.push(quote(n) + (gap ? ": " : ":") + r));
					else
						for (n in l) Object.prototype.hasOwnProperty.call(l, n) && ((r = str(n, l)) && o.push(quote(n) + (gap ? ": " : ":") + r));
					return r = 0 === o.length ? "{}" : gap ? "{\n" + gap + o.join(",\n" + gap) + "\n" + a + "}" : "{" + o.join(",") + "}", gap = a, r
			}
		}
		"function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function(e) {
			return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
		}, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(e) {
			return this.valueOf()
		});
		var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
			escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
			gap, indent, meta = {
				"\b": "\\b",
				"\t": "\\t",
				"\n": "\\n",
				"\f": "\\f",
				"\r": "\\r",
				'"': '\\"',
				"\\": "\\\\"
			},
			rep;
		"function" != typeof JSON.stringify && (JSON.stringify = function(e, t, i) {
			var n;
			if (indent = gap = "", "number" == typeof i)
				for (n = 0; n < i; n += 1) indent += " ";
			else "string" == typeof i && (indent = i);
			if (!(rep = t) || "function" == typeof t || "object" == (void 0 === t ? "undefined" : _typeof(t)) && "number" == typeof t.length) return str("", {
				"": e
			});
			throw new Error("JSON.stringify")
		}), "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
			function walk(e, t) {
				var i, n, r = e[t];
				if (r && "object" == (void 0 === r ? "undefined" : _typeof(r)))
					for (i in r) Object.prototype.hasOwnProperty.call(r, i) && (void 0 !== (n = walk(r, i)) ? r[i] = n : delete r[i]);
				return reviver.call(e, t, r)
			}
			var j;
			if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(e) {
					return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
				})), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
				"": j
			}, "") : j;
			throw new SyntaxError("JSON.parse")
		})
	}(),
	function(i, e) {
		var o = i.History = i.History || {};
		if (void 0 !== o.Adapter) throw new Error("History.js Adapter has already been loaded...");
		o.Adapter = {
			handlers: {},
			_uid: 1,
			uid: function(e) {
				return e._uid || (e._uid = o.Adapter._uid++)
			},
			bind: function(e, t, i) {
				var n, r, s = o.Adapter.uid(e);
				o.Adapter.handlers[s] = o.Adapter.handlers[s] || {}, o.Adapter.handlers[s][t] = o.Adapter.handlers[s][t] || [], o.Adapter.handlers[s][t].push(i), e["on" + t] = (n = e, r = t, function(e) {
					o.Adapter.trigger(n, r, e)
				})
			},
			trigger: function(e, t, i) {
				i = i || {};
				var n, r, s = o.Adapter.uid(e);
				for (o.Adapter.handlers[s] = o.Adapter.handlers[s] || {}, o.Adapter.handlers[s][t] = o.Adapter.handlers[s][t] || [], n = 0, r = o.Adapter.handlers[s][t].length; n < r; ++n) o.Adapter.handlers[s][t][n].apply(this, [i])
			},
			extractEventData: function(e, t) {
				return t && t[e] || void 0
			},
			onDomLoad: function(e) {
				var t = i.setTimeout(function() {
					e()
				}, 2e3);
				i.onload = function() {
					clearTimeout(t), e()
				}
			}
		}, void 0 !== o.init && o.init()
	}(window),
	function(u, e) {
		var t = u.document,
			i = u.setTimeout || i,
			n = u.clearTimeout || n,
			a = u.setInterval || a,
			c = u.History = u.History || {};
		if (void 0 !== c.initHtml4) throw new Error("History.js HTML4 Support has already been loaded...");
		c.initHtml4 = function() {
			if (void 0 !== c.initHtml4.initialized) return !1;
			c.initHtml4.initialized = !0, c.enabled = !0, c.savedHashes = [], c.isLastHash = function(e) {
				return e === c.getHashByIndex()
			}, c.isHashEqual = function(e, t) {
				return (e = encodeURIComponent(e).replace(/%25/g, "%")) === (t = encodeURIComponent(t).replace(/%25/g, "%"))
			}, c.saveHash = function(e) {
				return !c.isLastHash(e) && (c.savedHashes.push(e), !0)
			}, c.getHashByIndex = function(e) {
				return void 0 === e ? c.savedHashes[c.savedHashes.length - 1] : e < 0 ? c.savedHashes[c.savedHashes.length + e] : c.savedHashes[e]
			}, c.discardedHashes = {}, c.discardedStates = {}, c.discardState = function(e, t, i) {
				var n, r = c.getHashByState(e);
				return n = {
					discardedState: e,
					backState: i,
					forwardState: t
				}, c.discardedStates[r] = n, !0
			}, c.discardHash = function(e, t, i) {
				var n = {
					discardedHash: e,
					backState: i,
					forwardState: t
				};
				return c.discardedHashes[e] = n, !0
			}, c.discardedState = function(e) {
				var t = c.getHashByState(e);
				return c.discardedStates[t] || !1
			}, c.discardedHash = function(e) {
				return c.discardedHashes[e] || !1
			}, c.recycleState = function(e) {
				var t = c.getHashByState(e);
				return c.discardedState(e) && delete c.discardedStates[t], !0
			}, c.emulated.hashChange && (c.hashChangeInit = function() {
				c.checkerFunction = null;
				var i, n, r, s = "",
					o = Boolean(c.getHash());
				return c.isInternetExplorer() ? ("historyjs-iframe", (i = t.createElement("iframe")).setAttribute("id", "historyjs-iframe"), i.setAttribute("src", "#"), i.style.display = "none", t.body.appendChild(i), i.contentWindow.document.open(), i.contentWindow.document.close(), n = "", r = !1, c.checkerFunction = function() {
					if (r) return !1;
					r = !0;
					var e = c.getHash(),
						t = c.getHash(i.contentWindow.document);
					return e !== s ? (t !== (s = e) && (n = t = e, i.contentWindow.document.open(), i.contentWindow.document.close(), i.contentWindow.document.location.hash = c.escapeHash(e)), c.Adapter.trigger(u, "hashchange")) : t !== n && (n = t, o && "" === t ? c.back() : c.setHash(t, !1)), !(r = !1)
				}) : c.checkerFunction = function() {
					var e = c.getHash() || "";
					return e !== s && (s = e, c.Adapter.trigger(u, "hashchange")), !0
				}, c.intervalList.push(a(c.checkerFunction, c.options.hashChangeInterval)), !0
			}, c.Adapter.onDomLoad(c.hashChangeInit)), c.emulated.pushState && (c.onHashChange = function(e) {
				var t, i = e && e.newURL || c.getLocationHref(),
					n = c.getHashByUrl(i),
					r = null;
				return c.isLastHash(n) ? (c.busy(!1), !1) : (c.doubleCheckComplete(), c.saveHash(n), n && c.isTraditionalAnchor(n) ? (c.Adapter.trigger(u, "anchorchange"), c.busy(!1), !1) : (r = c.extractState(c.getFullUrl(n || c.getLocationHref()), !0), c.isLastSavedState(r) ? (c.busy(!1), !1) : (c.getHashByState(r), (t = c.discardedState(r)) ? (c.getHashByIndex(-2) === c.getHashByState(t.forwardState) ? c.back(!1) : c.forward(!1), !1) : (c.pushState(r.data, r.title, encodeURI(r.url), !1), !0))))
			}, c.Adapter.bind(u, "hashchange", c.onHashChange), c.pushState = function(e, t, i, n) {
				if (i = encodeURI(i).replace(/%25/g, "%"), c.getHashByUrl(i)) throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");
				if (!1 !== n && c.busy()) return c.pushQueue({
					scope: c,
					callback: c.pushState,
					args: arguments,
					queue: n
				}), !1;
				c.busy(!0);
				var r = c.createStateObject(e, t, i),
					s = c.getHashByState(r),
					o = c.getState(!1),
					a = c.getHashByState(o),
					l = c.getHash(),
					h = c.expectedStateId == r.id;
				return c.storeState(r), c.expectedStateId = r.id, c.recycleState(r), c.setTitle(r), s === a ? (c.busy(!1), !1) : (c.saveState(r), h || c.Adapter.trigger(u, "statechange"), !c.isHashEqual(s, l) && !c.isHashEqual(s, c.getShortUrl(c.getLocationHref())) && c.setHash(s, !1), c.busy(!1), !0)
			}, c.replaceState = function(e, t, i, n) {
				if (i = encodeURI(i).replace(/%25/g, "%"), c.getHashByUrl(i)) throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");
				if (!1 !== n && c.busy()) return c.pushQueue({
					scope: c,
					callback: c.replaceState,
					args: arguments,
					queue: n
				}), !1;
				c.busy(!0);
				var r = c.createStateObject(e, t, i),
					s = c.getHashByState(r),
					o = c.getState(!1),
					a = c.getHashByState(o),
					l = c.getStateByIndex(-2);
				return c.discardState(o, r, l), s === a ? (c.storeState(r), c.expectedStateId = r.id, c.recycleState(r), c.setTitle(r), c.saveState(r), c.Adapter.trigger(u, "statechange"), c.busy(!1)) : c.pushState(r.data, r.title, r.url, !1), !0
			}), c.emulated.pushState && c.getHash() && !c.emulated.hashChange && c.Adapter.onDomLoad(function() {
				c.Adapter.trigger(u, "hashchange")
			})
		}, void 0 !== c.init && c.init()
	}(window),
	function(o, i) {
		var a = o.console || i,
			l = o.document,
			n = o.navigator,
			r = !1,
			s = o.setTimeout,
			h = o.clearTimeout,
			u = o.setInterval,
			c = o.clearInterval,
			d = o.JSON,
			p = o.alert,
			f = o.History = o.History || {},
			g = o.history;
		try {
			(r = o.sessionStorage).setItem("TEST", "1"), r.removeItem("TEST")
		} catch (e) {
			r = !1
		}
		if (d.stringify = d.stringify || d.encode, d.parse = d.parse || d.decode, void 0 !== f.init) throw new Error("History.js Core has already been loaded...");
		f.init = function(e) {
			return void 0 !== f.Adapter && (void 0 !== f.initCore && f.initCore(), void 0 !== f.initHtml4 && f.initHtml4(), !0)
		}, f.initCore = function(e) {
			if (void 0 !== f.initCore.initialized) return !1;
			if (f.initCore.initialized = !0, f.options = f.options || {}, f.options.hashChangeInterval = f.options.hashChangeInterval || 100, f.options.safariPollInterval = f.options.safariPollInterval || 500, f.options.doubleCheckInterval = f.options.doubleCheckInterval || 500, f.options.disableSuid = f.options.disableSuid || !1, f.options.storeInterval = f.options.storeInterval || 1e3, f.options.busyDelay = f.options.busyDelay || 250, f.options.debug = f.options.debug || !1, f.options.initialTitle = f.options.initialTitle || l.title, f.options.html4Mode = f.options.html4Mode || !1, f.options.delayInit = f.options.delayInit || !1, f.intervalList = [], f.clearAllIntervals = function() {
					var e, t = f.intervalList;
					if (null != t) {
						for (e = 0; e < t.length; e++) c(t[e]);
						f.intervalList = null
					}
				}, f.debug = function() {
					f.options.debug && f.log.apply(f, arguments)
				}, f.log = function() {
					var e, t, i, n, r, s = void 0 !== a && void 0 !== a.log && void 0 !== a.log.apply,
						o = l.getElementById("log");
					for (s ? (e = (n = Array.prototype.slice.call(arguments)).shift(), void 0 !== a.debug ? a.debug.apply(a, [e, n]) : a.log.apply(a, [e, n])) : e = "\n" + arguments[0] + "\n", t = 1, i = arguments.length; t < i; ++t) {
						if ("object" == (void 0 === (r = arguments[t]) ? "undefined" : _typeof(r)) && void 0 !== d) try {
							r = d.stringify(r)
						} catch (e) {}
						e += "\n" + r + "\n"
					}
					return o ? (o.value += e + "\n-----\n", o.scrollTop = o.scrollHeight - o.clientHeight) : s || p(e), !0
				}, f.getInternetExplorerMajorVersion = function() {
					return f.getInternetExplorerMajorVersion.cached = void 0 !== f.getInternetExplorerMajorVersion.cached ? f.getInternetExplorerMajorVersion.cached : function() {
						for (var e = 3, t = l.createElement("div"), i = t.getElementsByTagName("i");
							(t.innerHTML = "\x3c!--[if gt IE " + ++e + "]><i></i><![endif]--\x3e") && i[0];);
						return 4 < e && e
					}()
				}, f.isInternetExplorer = function() {
					return f.isInternetExplorer.cached = void 0 !== f.isInternetExplorer.cached ? f.isInternetExplorer.cached : Boolean(f.getInternetExplorerMajorVersion())
				}, f.options.html4Mode ? f.emulated = {
					pushState: !0,
					hashChange: !0
				} : f.emulated = {
					pushState: !Boolean(o.history && o.history.pushState && o.history.replaceState && !/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(n.userAgent) && !/AppleWebKit\/5([0-2]|3[0-2])/i.test(n.userAgent)),
					hashChange: Boolean(!("onhashchange" in o || "onhashchange" in l) || f.isInternetExplorer() && f.getInternetExplorerMajorVersion() < 8)
				}, f.enabled = !f.emulated.pushState, f.bugs = {
					setHash: Boolean(!f.emulated.pushState && "Apple Computer, Inc." === n.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(n.userAgent)),
					safariPoll: Boolean(!f.emulated.pushState && "Apple Computer, Inc." === n.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(n.userAgent)),
					ieDoubleCheck: Boolean(f.isInternetExplorer() && f.getInternetExplorerMajorVersion() < 8),
					hashEscape: Boolean(f.isInternetExplorer() && f.getInternetExplorerMajorVersion() < 7)
				}, f.isEmptyObject = function(e) {
					for (var t in e)
						if (e.hasOwnProperty(t)) return !1;
					return !0
				}, f.cloneObject = function(e) {
					var t, i;
					return e ? (t = d.stringify(e), i = d.parse(t)) : i = {}, i
				}, f.getRootUrl = function() {
					var e = l.location.protocol + "//" + (l.location.hostname || l.location.host);
					return l.location.port && (e += ":" + l.location.port), e += "/"
				}, f.getBaseHref = function() {
					var e = l.getElementsByTagName("base"),
						t = "";
					return 1 === e.length && (t = e[0].href.replace(/[^\/]+$/, "")), (t = t.replace(/\/+$/, "")) && (t += "/"), t
				}, f.getBaseUrl = function() {
					return f.getBaseHref() || f.getBasePageUrl() || f.getRootUrl()
				}, f.getPageUrl = function() {
					return ((f.getState(!1, !1) || {}).url || f.getLocationHref()).replace(/\/+$/, "").replace(/[^\/]+$/, function(e, t, i) {
						return /\./.test(e) ? e : e + "/"
					})
				}, f.getBasePageUrl = function() {
					return f.getLocationHref().replace(/[#\?].*/, "").replace(/[^\/]+$/, function(e, t, i) {
						return /[^\/]$/.test(e) ? "" : e
					}).replace(/\/+$/, "") + "/"
				}, f.getFullUrl = function(e, t) {
					var i = e,
						n = e.substring(0, 1);
					return t = void 0 === t || t, /[a-z]+\:\/\//.test(e) || (i = "/" === n ? f.getRootUrl() + e.replace(/^\/+/, "") : "#" === n ? f.getPageUrl().replace(/#.*/, "") + e : "?" === n ? f.getPageUrl().replace(/[\?#].*/, "") + e : t ? f.getBaseUrl() + e.replace(/^(\.\/)+/, "") : f.getBasePageUrl() + e.replace(/^(\.\/)+/, "")), i.replace(/\#$/, "")
				}, f.getShortUrl = function(e) {
					var t = e,
						i = f.getBaseUrl(),
						n = f.getRootUrl();
					return f.emulated.pushState && (t = t.replace(i, "")), t = t.replace(n, "/"), f.isTraditionalAnchor(t) && (t = "./" + t), t = t.replace(/^(\.\/)+/g, "./").replace(/\#$/, "")
				}, f.getLocationHref = function(e) {
					return (e = e || l).URL === e.location.href ? e.location.href : e.location.href === decodeURIComponent(e.URL) ? e.URL : e.location.hash && decodeURIComponent(e.location.href.replace(/^[^#]+/, "")) === e.location.hash ? e.location.href : -1 == e.URL.indexOf("#") && -1 != e.location.href.indexOf("#") ? e.location.href : e.URL || e.location.href
				}, f.store = {}, f.idToState = f.idToState || {}, f.stateToId = f.stateToId || {}, f.urlToId = f.urlToId || {}, f.storedStates = f.storedStates || [], f.savedStates = f.savedStates || [], f.normalizeStore = function() {
					f.store.idToState = f.store.idToState || {}, f.store.urlToId = f.store.urlToId || {}, f.store.stateToId = f.store.stateToId || {}
				}, f.getState = function(e, t) {
					void 0 === e && (e = !0), void 0 === t && (t = !0);
					var i = f.getLastSavedState();
					return !i && t && (i = f.createStateObject()), e && ((i = f.cloneObject(i)).url = i.cleanUrl || i.url), i
				}, f.getIdByState = function(e) {
					var t, i = f.extractId(e.url);
					if (!i)
						if (t = f.getStateString(e), void 0 !== f.stateToId[t]) i = f.stateToId[t];
						else if (void 0 !== f.store.stateToId[t]) i = f.store.stateToId[t];
					else {
						for (; i = (new Date).getTime() + String(Math.random()).replace(/\D/g, ""), void 0 !== f.idToState[i] || void 0 !== f.store.idToState[i];);
						f.stateToId[t] = i, f.idToState[i] = e
					}
					return i
				}, f.normalizeState = function(e) {
					var t, i;
					return e && "object" == (void 0 === e ? "undefined" : _typeof(e)) || (e = {}), void 0 !== e.normalized ? e : (e.data && "object" == _typeof(e.data) || (e.data = {}), (t = {
						normalized: !0
					}).title = e.title || "", t.url = f.getFullUrl(e.url ? e.url : f.getLocationHref()), t.hash = f.getShortUrl(t.url), t.data = f.cloneObject(e.data), t.id = f.getIdByState(t), t.cleanUrl = t.url.replace(/\??\&_suid.*/, ""), t.url = t.cleanUrl, i = !f.isEmptyObject(t.data), (t.title || i) && !0 !== f.options.disableSuid && (t.hash = f.getShortUrl(t.url).replace(/\??\&_suid.*/, ""), /\?/.test(t.hash) || (t.hash += "?"), t.hash += "&_suid=" + t.id), t.hashedUrl = f.getFullUrl(t.hash), (f.emulated.pushState || f.bugs.safariPoll) && f.hasUrlDuplicate(t) && (t.url = t.hashedUrl), t)
				}, f.createStateObject = function(e, t, i) {
					var n = {
						data: e,
						title: t,
						url: i
					};
					return n = f.normalizeState(n)
				}, f.getStateById = function(e) {
					return e = String(e), f.idToState[e] || f.store.idToState[e] || i
				}, f.getStateString = function(e) {
					var t;
					return t = {
						data: f.normalizeState(e).data,
						title: e.title,
						url: e.url
					}, d.stringify(t)
				}, f.getStateId = function(e) {
					return f.normalizeState(e).id
				}, f.getHashByState = function(e) {
					return f.normalizeState(e).hash
				}, f.extractId = function(e) {
					var t, i;
					return i = -1 != e.indexOf("#") ? e.split("#")[0] : e, (t = /(.*)\&_suid=([0-9]+)$/.exec(i)) && t[1] || e, (t ? String(t[2] || "") : "") || !1
				}, f.isTraditionalAnchor = function(e) {
					return !/[\/\?\.]/.test(e)
				}, f.extractState = function(e, t) {
					var i, n, r = null;
					return t = t || !1, (i = f.extractId(e)) && (r = f.getStateById(i)), r || (n = f.getFullUrl(e), (i = f.getIdByUrl(n) || !1) && (r = f.getStateById(i)), !r && t && !f.isTraditionalAnchor(e) && (r = f.createStateObject(null, null, n))), r
				}, f.getIdByUrl = function(e) {
					return f.urlToId[e] || f.store.urlToId[e] || i
				}, f.getLastSavedState = function() {
					return f.savedStates[f.savedStates.length - 1] || i
				}, f.getLastStoredState = function() {
					return f.storedStates[f.storedStates.length - 1] || i
				}, f.hasUrlDuplicate = function(e) {
					var t;
					return (t = f.extractState(e.url)) && t.id !== e.id
				}, f.storeState = function(e) {
					return f.urlToId[e.url] = e.id, f.storedStates.push(f.cloneObject(e)), e
				}, f.isLastSavedState = function(e) {
					var t = !1;
					return f.savedStates.length && (t = e.id === f.getLastSavedState().id), t
				}, f.saveState = function(e) {
					return !f.isLastSavedState(e) && (f.savedStates.push(f.cloneObject(e)), !0)
				}, f.getStateByIndex = function(e) {
					return void 0 === e ? f.savedStates[f.savedStates.length - 1] : e < 0 ? f.savedStates[f.savedStates.length + e] : f.savedStates[e]
				}, f.getCurrentIndex = function() {
					return f.savedStates.length < 1 ? 0 : f.savedStates.length - 1
				}, f.getHash = function(e) {
					var t = f.getLocationHref(e);
					return f.getHashByUrl(t)
				}, f.unescapeHash = function(e) {
					var t = f.normalizeHash(e);
					return t = decodeURIComponent(t)
				}, f.normalizeHash = function(e) {
					return e.replace(/[^#]*#/, "").replace(/#.*/, "")
				}, f.setHash = function(e, t) {
					var i, n;
					return !1 !== t && f.busy() ? (f.pushQueue({
						scope: f,
						callback: f.setHash,
						args: arguments,
						queue: t
					}), !1) : (f.busy(!0), (i = f.extractState(e, !0)) && !f.emulated.pushState ? f.pushState(i.data, i.title, i.url, !1) : f.getHash() !== e && (f.bugs.setHash ? (n = f.getPageUrl(), f.pushState(null, null, n + "#" + e, !1)) : l.location.hash = e), f)
				}, f.escapeHash = function(e) {
					var t = f.normalizeHash(e);
					return t = o.encodeURIComponent(t), f.bugs.hashEscape || (t = t.replace(/\%21/g, "!").replace(/\%26/g, "&").replace(/\%3D/g, "=").replace(/\%3F/g, "?")), t
				}, f.getHashByUrl = function(e) {
					var t = String(e).replace(/([^#]*)#?([^#]*)#?(.*)/, "$2");
					return t = f.unescapeHash(t)
				}, f.setTitle = function(e) {
					var t, i = e.title;
					i || (t = f.getStateByIndex(0)) && t.url === e.url && (i = t.title || f.options.initialTitle);
					try {
						l.getElementsByTagName("title")[0].innerHTML = i.replace("<", "&lt;").replace(">", "&gt;").replace(" & ", " &amp; ")
					} catch (e) {}
					return l.title = i, f
				}, f.queues = [], f.busy = function(e) {
					if (void 0 !== e ? f.busy.flag = e : void 0 === f.busy.flag && (f.busy.flag = !1), !f.busy.flag) {
						h(f.busy.timeout);
						f.busy.timeout = s(function e() {
							var t, i, n;
							if (!f.busy.flag)
								for (t = f.queues.length - 1; 0 <= t; --t) 0 !== (i = f.queues[t]).length && (n = i.shift(), f.fireQueueItem(n), f.busy.timeout = s(e, f.options.busyDelay))
						}, f.options.busyDelay)
					}
					return f.busy.flag
				}, f.busy.flag = !1, f.fireQueueItem = function(e) {
					return e.callback.apply(e.scope || f, e.args || [])
				}, f.pushQueue = function(e) {
					return f.queues[e.queue || 0] = f.queues[e.queue || 0] || [], f.queues[e.queue || 0].push(e), f
				}, f.queue = function(e, t) {
					return "function" == typeof e && (e = {
						callback: e
					}), void 0 !== t && (e.queue = t), f.busy() ? f.pushQueue(e) : f.fireQueueItem(e), f
				}, f.clearQueue = function() {
					return f.busy.flag = !1, f.queues = [], f
				}, f.stateChanged = !1, f.doubleChecker = !1, f.doubleCheckComplete = function() {
					return f.stateChanged = !0, f.doubleCheckClear(), f
				}, f.doubleCheckClear = function() {
					return f.doubleChecker && (h(f.doubleChecker), f.doubleChecker = !1), f
				}, f.doubleCheck = function(e) {
					return f.stateChanged = !1, f.doubleCheckClear(), f.bugs.ieDoubleCheck && (f.doubleChecker = s(function() {
						return f.doubleCheckClear(), f.stateChanged || e(), !0
					}, f.options.doubleCheckInterval)), f
				}, f.safariStatePoll = function() {
					var e = f.extractState(f.getLocationHref());
					if (!f.isLastSavedState(e)) return e || f.createStateObject(), f.Adapter.trigger(o, "popstate"), f
				}, f.back = function(e) {
					return !1 !== e && f.busy() ? (f.pushQueue({
						scope: f,
						callback: f.back,
						args: arguments,
						queue: e
					}), !1) : (f.busy(!0), f.doubleCheck(function() {
						f.back(!1)
					}), g.go(-1), !0)
				}, f.forward = function(e) {
					return !1 !== e && f.busy() ? (f.pushQueue({
						scope: f,
						callback: f.forward,
						args: arguments,
						queue: e
					}), !1) : (f.busy(!0), f.doubleCheck(function() {
						f.forward(!1)
					}), g.go(1), !0)
				}, f.go = function(e, t) {
					var i;
					if (0 < e)
						for (i = 1; i <= e; ++i) f.forward(t);
					else {
						if (!(e < 0)) throw new Error("History.go: History.go requires a positive or negative integer passed.");
						for (i = -1; e <= i; --i) f.back(t)
					}
					return f
				}, f.emulated.pushState) {
				var t = function() {};
				f.pushState = f.pushState || t, f.replaceState = f.replaceState || t
			} else f.onPopState = function(e, t) {
				var i, n, r = !1,
					s = !1;
				return f.doubleCheckComplete(), (i = f.getHash()) ? ((n = f.extractState(i || f.getLocationHref(), !0)) ? f.replaceState(n.data, n.title, n.url, !1) : (f.Adapter.trigger(o, "anchorchange"), f.busy(!1)), f.expectedStateId = !1) : ((s = (r = f.Adapter.extractEventData("state", e, t) || !1) ? f.getStateById(r) : f.expectedStateId ? f.getStateById(f.expectedStateId) : f.extractState(f.getLocationHref())) || (s = f.createStateObject(null, null, f.getLocationHref())), f.expectedStateId = !1, f.isLastSavedState(s) ? (f.busy(!1), !1) : (f.storeState(s), f.saveState(s), f.setTitle(s), f.Adapter.trigger(o, "statechange"), f.busy(!1), !0))
			}, f.Adapter.bind(o, "popstate", f.onPopState), f.pushState = function(e, t, i, n) {
				if (f.getHashByUrl(i) && f.emulated.pushState) throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
				if (!1 !== n && f.busy()) return f.pushQueue({
					scope: f,
					callback: f.pushState,
					args: arguments,
					queue: n
				}), !1;
				f.busy(!0);
				var r = f.createStateObject(e, t, i);
				return f.isLastSavedState(r) ? f.busy(!1) : (f.storeState(r), f.expectedStateId = r.id, g.pushState(r.id, r.title, r.url), f.Adapter.trigger(o, "popstate")), !0
			}, f.replaceState = function(e, t, i, n) {
				if (f.getHashByUrl(i) && f.emulated.pushState) throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
				if (!1 !== n && f.busy()) return f.pushQueue({
					scope: f,
					callback: f.replaceState,
					args: arguments,
					queue: n
				}), !1;
				f.busy(!0);
				var r = f.createStateObject(e, t, i);
				return f.isLastSavedState(r) ? f.busy(!1) : (f.storeState(r), f.expectedStateId = r.id, g.replaceState(r.id, r.title, r.url), f.Adapter.trigger(o, "popstate")), !0
			};
			if (r) {
				try {
					f.store = d.parse(r.getItem("History.store")) || {}
				} catch (e) {
					f.store = {}
				}
				f.normalizeStore()
			} else f.store = {}, f.normalizeStore();
			f.Adapter.bind(o, "unload", f.clearAllIntervals), f.saveState(f.storeState(f.extractState(f.getLocationHref(), !0))), r && (f.onUnload = function() {
				var t, e, i;
				try {
					t = d.parse(r.getItem("History.store")) || {}
				} catch (e) {
					t = {}
				}
				for (e in t.idToState = t.idToState || {}, t.urlToId = t.urlToId || {}, t.stateToId = t.stateToId || {}, f.idToState) f.idToState.hasOwnProperty(e) && (t.idToState[e] = f.idToState[e]);
				for (e in f.urlToId) f.urlToId.hasOwnProperty(e) && (t.urlToId[e] = f.urlToId[e]);
				for (e in f.stateToId) f.stateToId.hasOwnProperty(e) && (t.stateToId[e] = f.stateToId[e]);
				f.store = t, f.normalizeStore(), i = d.stringify(t);
				try {
					r.setItem("History.store", i)
				} catch (e) {
					if (e.code !== DOMException.QUOTA_EXCEEDED_ERR) throw e;
					r.length && (r.removeItem("History.store"), r.setItem("History.store", i))
				}
			}, f.intervalList.push(u(f.onUnload, f.options.storeInterval)), f.Adapter.bind(o, "beforeunload", f.onUnload), f.Adapter.bind(o, "unload", f.onUnload)), f.emulated.pushState || (f.bugs.safariPoll && f.intervalList.push(u(f.safariStatePoll, f.options.safariPollInterval)), "Apple Computer, Inc." !== n.vendor && "Mozilla" !== (n.appCodeName || "") || (f.Adapter.bind(o, "hashchange", function() {
				f.Adapter.trigger(o, "popstate")
			}), f.getHash() && f.Adapter.onDomLoad(function() {
				f.Adapter.trigger(o, "hashchange")
			})))
		}, (!f.options || !f.options.delayInit) && f.init()
	}(window),
	function(t, i) {
		"function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(e) {
			return i(t, e)
		}) : "object" == ("undefined" == typeof module ? "undefined" : _typeof(module)) && module.exports ? module.exports = i(t, require("jquery")) : t.jQueryBridget = i(t, t.jQuery)
	}(window, function(e, t) {
		function i(h, r, u) {
			(u = u || t || e.jQuery) && (r.prototype.option || (r.prototype.option = function(e) {
				u.isPlainObject(e) && (this.options = u.extend(!0, this.options, e))
			}), u.fn[h] = function(e) {
				if ("string" == typeof e) {
					var t = c.call(arguments, 1);
					return o = t, l = "$()." + h + '("' + (s = e) + '")', (i = this).each(function(e, t) {
						var i = u.data(t, h);
						if (i) {
							var n = i[s];
							if (n && "_" != s.charAt(0)) {
								var r = n.apply(i, o);
								a = void 0 === a ? r : a
							} else d(l + " is not a valid method")
						} else d(h + " not initialized. Cannot call methods, i.e. " + l)
					}), void 0 !== a ? a : i
				}
				var i, s, o, a, l, n;
				return n = e, this.each(function(e, t) {
					var i = u.data(t, h);
					i ? (i.option(n), i._init()) : (i = new r(t, n), u.data(t, h, i))
				}), this
			}, n(u))
		}

		function n(e) {
			!e || e && e.bridget || (e.bridget = i)
		}
		var c = Array.prototype.slice,
			r = e.console,
			d = void 0 === r ? function() {} : function(e) {
				r.error(e)
			};
		return n(t || e.jQuery), i
	}),
	function(e, t) {
		"function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == ("undefined" == typeof module ? "undefined" : _typeof(module)) && module.exports ? module.exports = t() : e.EvEmitter = t()
	}("undefined" != typeof window ? window : void 0, function() {
		function e() {}
		var t = e.prototype;
		return t.on = function(e, t) {
			if (e && t) {
				var i = this._events = this._events || {},
					n = i[e] = i[e] || [];
				return -1 == n.indexOf(t) && n.push(t), this
			}
		}, t.once = function(e, t) {
			if (e && t) {
				this.on(e, t);
				var i = this._onceEvents = this._onceEvents || {};
				return (i[e] = i[e] || {})[t] = !0, this
			}
		}, t.off = function(e, t) {
			var i = this._events && this._events[e];
			if (i && i.length) {
				var n = i.indexOf(t);
				return -1 != n && i.splice(n, 1), this
			}
		}, t.emitEvent = function(e, t) {
			var i = this._events && this._events[e];
			if (i && i.length) {
				var n = 0,
					r = i[n];
				t = t || [];
				for (var s = this._onceEvents && this._onceEvents[e]; r;) {
					var o = s && s[r];
					o && (this.off(e, r), delete s[r]), r.apply(this, t), r = i[n += o ? 0 : 1]
				}
				return this
			}
		}, e
	}),
	function(e, t) {
		"function" == typeof define && define.amd ? define("get-size/get-size", [], function() {
			return t()
		}) : "object" == ("undefined" == typeof module ? "undefined" : _typeof(module)) && module.exports ? module.exports = t() : e.getSize = t()
	}(window, function() {
		function y(e) {
			var t = parseFloat(e);
			return -1 == e.indexOf("%") && !isNaN(t) && t
		}

		function _(e) {
			var t = getComputedStyle(e);
			return t || i("Style returned " + t + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), t
		}

		function v(e) {
			if (function() {
					if (!x) {
						x = !0;
						var e = document.createElement("div");
						e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
						var t = document.body || document.documentElement;
						t.appendChild(e);
						var i = _(e);
						v.isBoxSizeOuter = w = 200 == y(i.width), t.removeChild(e)
					}
				}(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == (void 0 === e ? "undefined" : _typeof(e)) && e.nodeType) {
				var t = _(e);
				if ("none" == t.display) return function() {
					for (var e = {
							width: 0,
							height: 0,
							innerWidth: 0,
							innerHeight: 0,
							outerWidth: 0,
							outerHeight: 0
						}, t = 0; t < S; t++) e[b[t]] = 0;
					return e
				}();
				var i = {};
				i.width = e.offsetWidth, i.height = e.offsetHeight;
				for (var n = i.isBorderBox = "border-box" == t.boxSizing, r = 0; r < S; r++) {
					var s = b[r],
						o = t[s],
						a = parseFloat(o);
					i[s] = isNaN(a) ? 0 : a
				}
				var l = i.paddingLeft + i.paddingRight,
					h = i.paddingTop + i.paddingBottom,
					u = i.marginLeft + i.marginRight,
					c = i.marginTop + i.marginBottom,
					d = i.borderLeftWidth + i.borderRightWidth,
					p = i.borderTopWidth + i.borderBottomWidth,
					f = n && w,
					g = y(t.width);
				!1 !== g && (i.width = g + (f ? 0 : l + d));
				var m = y(t.height);
				return !1 !== m && (i.height = m + (f ? 0 : h + p)), i.innerWidth = i.width - (l + d), i.innerHeight = i.height - (h + p), i.outerWidth = i.width + u, i.outerHeight = i.height + c, i
			}
		}
		var w, i = "undefined" == typeof console ? function() {} : function(e) {
				console.error(e)
			},
			b = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
			S = b.length,
			x = !1;
		return v
	}),
	function(e, t) {
		"function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", t) : "object" == ("undefined" == typeof module ? "undefined" : _typeof(module)) && module.exports ? module.exports = t() : e.matchesSelector = t()
	}(window, function() {
		var i = function() {
			var e = window.Element.prototype;
			if (e.matches) return "matches";
			if (e.matchesSelector) return "matchesSelector";
			for (var t = ["webkit", "moz", "ms", "o"], i = 0; i < t.length; i++) {
				var n = t[i] + "MatchesSelector";
				if (e[n]) return n
			}
		}();
		return function(e, t) {
			return e[i](t)
		}
	}),
	function(t, i) {
		"function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(e) {
			return i(t, e)
		}) : "object" == ("undefined" == typeof module ? "undefined" : _typeof(module)) && module.exports ? module.exports = i(t, require("desandro-matches-selector")) : t.fizzyUIUtils = i(t, t.matchesSelector)
	}(window, function(h, s) {
		var u = {
				extend: function(e, t) {
					for (var i in t) e[i] = t[i];
					return e
				},
				modulo: function(e, t) {
					return (e % t + t) % t
				},
				makeArray: function(e) {
					var t = [];
					if (Array.isArray(e)) t = e;
					else if (e && "object" == (void 0 === e ? "undefined" : _typeof(e)) && "number" == typeof e.length)
						for (var i = 0; i < e.length; i++) t.push(e[i]);
					else t.push(e);
					return t
				},
				removeFrom: function(e, t) {
					var i = e.indexOf(t); - 1 != i && e.splice(i, 1)
				},
				getParent: function(e, t) {
					for (; e != document.body;)
						if (e = e.parentNode, s(e, t)) return e
				},
				getQueryElement: function(e) {
					return "string" == typeof e ? document.querySelector(e) : e
				},
				handleEvent: function(e) {
					var t = "on" + e.type;
					this[t] && this[t](e)
				},
				filterFindElements: function(e, n) {
					e = u.makeArray(e);
					var r = [];
					return e.forEach(function(e) {
						if (e instanceof HTMLElement) {
							if (!n) return void r.push(e);
							s(e, n) && r.push(e);
							for (var t = e.querySelectorAll(n), i = 0; i < t.length; i++) r.push(t[i])
						}
					}), r
				},
				debounceMethod: function(e, t, n) {
					var r = e.prototype[t],
						s = t + "Timeout";
					e.prototype[t] = function() {
						var e = this[s];
						e && clearTimeout(e);
						var t = arguments,
							i = this;
						this[s] = setTimeout(function() {
							r.apply(i, t), delete i[s]
						}, n || 100)
					}
				},
				docReady: function(e) {
					var t = document.readyState;
					"complete" == t || "interactive" == t ? setTimeout(e) : document.addEventListener("DOMContentLoaded", e)
				},
				toDashed: function(e) {
					return e.replace(/(.)([A-Z])/g, function(e, t, i) {
						return t + "-" + i
					}).toLowerCase()
				}
			},
			c = h.console;
		return u.htmlInit = function(a, l) {
			u.docReady(function() {
				var e = u.toDashed(l),
					r = "data-" + e,
					t = document.querySelectorAll("[" + r + "]"),
					i = document.querySelectorAll(".js-" + e),
					n = u.makeArray(t).concat(u.makeArray(i)),
					s = r + "-options",
					o = h.jQuery;
				n.forEach(function(t) {
					var e, i = t.getAttribute(r) || t.getAttribute(s);
					try {
						e = i && JSON.parse(i)
					} catch (e) {
						return void(c && c.error("Error parsing " + r + " on " + t.className + ": " + e))
					}
					var n = new a(t, e);
					o && o.data(t, l, n)
				})
			})
		}, u
	}),
	function(e, t) {
		"function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], t) : "object" == ("undefined" == typeof module ? "undefined" : _typeof(module)) && module.exports ? module.exports = t(require("ev-emitter"), require("get-size")) : (e.Outlayer = {}, e.Outlayer.Item = t(e.EvEmitter, e.getSize))
	}(window, function(e, t) {
		function i(e, t) {
			e && (this.element = e, this.layout = t, this.position = {
				x: 0,
				y: 0
			}, this._create())
		}
		var n = document.documentElement.style,
			r = "string" == typeof n.transition ? "transition" : "WebkitTransition",
			s = "string" == typeof n.transform ? "transform" : "WebkitTransform",
			o = {
				WebkitTransition: "webkitTransitionEnd",
				transition: "transitionend"
			} [r],
			a = {
				transform: s,
				transition: r,
				transitionDuration: r + "Duration",
				transitionProperty: r + "Property",
				transitionDelay: r + "Delay"
			},
			l = i.prototype = Object.create(e.prototype);
		l.constructor = i, l._create = function() {
			this._transn = {
				ingProperties: {},
				clean: {},
				onEnd: {}
			}, this.css({
				position: "absolute"
			})
		}, l.handleEvent = function(e) {
			var t = "on" + e.type;
			this[t] && this[t](e)
		}, l.getSize = function() {
			this.size = t(this.element)
		}, l.css = function(e) {
			var t = this.element.style;
			for (var i in e) {
				t[a[i] || i] = e[i]
			}
		}, l.getPosition = function() {
			var e = getComputedStyle(this.element),
				t = this.layout._getOption("originLeft"),
				i = this.layout._getOption("originTop"),
				n = e[t ? "left" : "right"],
				r = e[i ? "top" : "bottom"],
				s = this.layout.size,
				o = -1 != n.indexOf("%") ? parseFloat(n) / 100 * s.width : parseInt(n, 10),
				a = -1 != r.indexOf("%") ? parseFloat(r) / 100 * s.height : parseInt(r, 10);
			o = isNaN(o) ? 0 : o, a = isNaN(a) ? 0 : a, o -= t ? s.paddingLeft : s.paddingRight, a -= i ? s.paddingTop : s.paddingBottom, this.position.x = o, this.position.y = a
		}, l.layoutPosition = function() {
			var e = this.layout.size,
				t = {},
				i = this.layout._getOption("originLeft"),
				n = this.layout._getOption("originTop"),
				r = i ? "paddingLeft" : "paddingRight",
				s = i ? "left" : "right",
				o = i ? "right" : "left",
				a = this.position.x + e[r];
			t[s] = this.getXValue(a), t[o] = "";
			var l = n ? "paddingTop" : "paddingBottom",
				h = n ? "top" : "bottom",
				u = n ? "bottom" : "top",
				c = this.position.y + e[l];
			t[h] = this.getYValue(c), t[u] = "", this.css(t), this.emitEvent("layout", [this])
		}, l.getXValue = function(e) {
			var t = this.layout._getOption("horizontal");
			return this.layout.options.percentPosition && !t ? e / this.layout.size.width * 100 + "%" : e + "px"
		}, l.getYValue = function(e) {
			var t = this.layout._getOption("horizontal");
			return this.layout.options.percentPosition && t ? e / this.layout.size.height * 100 + "%" : e + "px"
		}, l._transitionTo = function(e, t) {
			this.getPosition();
			var i = this.position.x,
				n = this.position.y,
				r = parseInt(e, 10),
				s = parseInt(t, 10),
				o = r === this.position.x && s === this.position.y;
			if (this.setPosition(e, t), !o || this.isTransitioning) {
				var a = e - i,
					l = t - n,
					h = {};
				h.transform = this.getTranslate(a, l), this.transition({
					to: h,
					onTransitionEnd: {
						transform: this.layoutPosition
					},
					isCleaning: !0
				})
			} else this.layoutPosition()
		}, l.getTranslate = function(e, t) {
			return "translate3d(" + (e = this.layout._getOption("originLeft") ? e : -e) + "px, " + (t = this.layout._getOption("originTop") ? t : -t) + "px, 0)"
		}, l.goTo = function(e, t) {
			this.setPosition(e, t), this.layoutPosition()
		}, l.moveTo = l._transitionTo, l.setPosition = function(e, t) {
			this.position.x = parseInt(e, 10), this.position.y = parseInt(t, 10)
		}, l._nonTransition = function(e) {
			for (var t in this.css(e.to), e.isCleaning && this._removeStyles(e.to), e.onTransitionEnd) e.onTransitionEnd[t].call(this)
		}, l.transition = function(e) {
			if (parseFloat(this.layout.options.transitionDuration)) {
				var t = this._transn;
				for (var i in e.onTransitionEnd) t.onEnd[i] = e.onTransitionEnd[i];
				for (i in e.to) t.ingProperties[i] = !0, e.isCleaning && (t.clean[i] = !0);
				if (e.from) {
					this.css(e.from);
					this.element.offsetHeight;
					null
				}
				this.enableTransition(e.to), this.css(e.to), this.isTransitioning = !0
			} else this._nonTransition(e)
		};
		var h = "opacity," + s.replace(/([A-Z])/g, function(e) {
			return "-" + e.toLowerCase()
		});
		l.enableTransition = function() {
			if (!this.isTransitioning) {
				var e = this.layout.options.transitionDuration;
				e = "number" == typeof e ? e + "ms" : e, this.css({
					transitionProperty: h,
					transitionDuration: e,
					transitionDelay: this.staggerDelay || 0
				}), this.element.addEventListener(o, this, !1)
			}
		}, l.onwebkitTransitionEnd = function(e) {
			this.ontransitionend(e)
		}, l.onotransitionend = function(e) {
			this.ontransitionend(e)
		};
		var u = {
			"-webkit-transform": "transform"
		};
		l.ontransitionend = function(e) {
			if (e.target === this.element) {
				var t = this._transn,
					i = u[e.propertyName] || e.propertyName;
				if (delete t.ingProperties[i], function(e) {
						for (var t in e) return !1;
						return !0
					}(t.ingProperties) && this.disableTransition(), i in t.clean && (this.element.style[e.propertyName] = "", delete t.clean[i]), i in t.onEnd) t.onEnd[i].call(this), delete t.onEnd[i];
				this.emitEvent("transitionEnd", [this])
			}
		}, l.disableTransition = function() {
			this.removeTransitionStyles(), this.element.removeEventListener(o, this, !1), this.isTransitioning = !1
		}, l._removeStyles = function(e) {
			var t = {};
			for (var i in e) t[i] = "";
			this.css(t)
		};
		var c = {
			transitionProperty: "",
			transitionDuration: "",
			transitionDelay: ""
		};
		return l.removeTransitionStyles = function() {
			this.css(c)
		}, l.stagger = function(e) {
			e = isNaN(e) ? 0 : e, this.staggerDelay = e + "ms"
		}, l.removeElem = function() {
			this.element.parentNode.removeChild(this.element), this.css({
				display: ""
			}), this.emitEvent("remove", [this])
		}, l.remove = function() {
			return r && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function() {
				this.removeElem()
			}), void this.hide()) : void this.removeElem()
		}, l.reveal = function() {
			delete this.isHidden, this.css({
				display: ""
			});
			var e = this.layout.options,
				t = {};
			t[this.getHideRevealTransitionEndProperty("visibleStyle")] = this.onRevealTransitionEnd, this.transition({
				from: e.hiddenStyle,
				to: e.visibleStyle,
				isCleaning: !0,
				onTransitionEnd: t
			})
		}, l.onRevealTransitionEnd = function() {
			this.isHidden || this.emitEvent("reveal")
		}, l.getHideRevealTransitionEndProperty = function(e) {
			var t = this.layout.options[e];
			if (t.opacity) return "opacity";
			for (var i in t) return i
		}, l.hide = function() {
			this.isHidden = !0, this.css({
				display: ""
			});
			var e = this.layout.options,
				t = {};
			t[this.getHideRevealTransitionEndProperty("hiddenStyle")] = this.onHideTransitionEnd, this.transition({
				from: e.visibleStyle,
				to: e.hiddenStyle,
				isCleaning: !0,
				onTransitionEnd: t
			})
		}, l.onHideTransitionEnd = function() {
			this.isHidden && (this.css({
				display: "none"
			}), this.emitEvent("hide"))
		}, l.destroy = function() {
			this.css({
				position: "",
				left: "",
				right: "",
				top: "",
				bottom: "",
				transition: "",
				transform: ""
			})
		}, i
	}),
	function(r, s) {
		"function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(e, t, i, n) {
			return s(r, e, t, i, n)
		}) : "object" == ("undefined" == typeof module ? "undefined" : _typeof(module)) && module.exports ? module.exports = s(r, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : r.Outlayer = s(r, r.EvEmitter, r.getSize, r.fizzyUIUtils, r.Outlayer.Item)
	}(window, function(e, t, r, s, n) {
		function o(e, t) {
			var i = s.getQueryElement(e);
			if (i) {
				this.element = i, h && (this.$element = h(this.element)), this.options = s.extend({}, this.constructor.defaults), this.option(t);
				var n = ++u;
				this.element.outlayerGUID = n, (c[n] = this)._create(), this._getOption("initLayout") && this.layout()
			} else l && l.error("Bad element for " + this.constructor.namespace + ": " + (i || e))
		}

		function a(e) {
			function t() {
				e.apply(this, arguments)
			}
			return (t.prototype = Object.create(e.prototype)).constructor = t
		}
		var l = e.console,
			h = e.jQuery,
			i = function() {},
			u = 0,
			c = {};
		o.namespace = "outlayer", o.Item = n, o.defaults = {
			containerStyle: {
				position: "relative"
			},
			initLayout: !0,
			originLeft: !0,
			originTop: !0,
			resize: !0,
			resizeContainer: !0,
			transitionDuration: "0.4s",
			hiddenStyle: {
				opacity: 0,
				transform: "scale(0.001)"
			},
			visibleStyle: {
				opacity: 1,
				transform: "scale(1)"
			}
		};
		var d = o.prototype;
		s.extend(d, t.prototype), d.option = function(e) {
			s.extend(this.options, e)
		}, d._getOption = function(e) {
			var t = this.constructor.compatOptions[e];
			return t && void 0 !== this.options[t] ? this.options[t] : this.options[e]
		}, o.compatOptions = {
			initLayout: "isInitLayout",
			horizontal: "isHorizontal",
			layoutInstant: "isLayoutInstant",
			originLeft: "isOriginLeft",
			originTop: "isOriginTop",
			resize: "isResizeBound",
			resizeContainer: "isResizingContainer"
		}, d._create = function() {
			this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), s.extend(this.element.style, this.options.containerStyle), this._getOption("resize") && this.bindResize()
		}, d.reloadItems = function() {
			this.items = this._itemize(this.element.children)
		}, d._itemize = function(e) {
			for (var t = this._filterFindItemElements(e), i = this.constructor.Item, n = [], r = 0; r < t.length; r++) {
				var s = new i(t[r], this);
				n.push(s)
			}
			return n
		}, d._filterFindItemElements = function(e) {
			return s.filterFindElements(e, this.options.itemSelector)
		}, d.getItemElements = function() {
			return this.items.map(function(e) {
				return e.element
			})
		}, d.layout = function() {
			this._resetLayout(), this._manageStamps();
			var e = this._getOption("layoutInstant"),
				t = void 0 !== e ? e : !this._isLayoutInited;
			this.layoutItems(this.items, t), this._isLayoutInited = !0
		}, d._init = d.layout, d._resetLayout = function() {
			this.getSize()
		}, d.getSize = function() {
			this.size = r(this.element)
		}, d._getMeasurement = function(e, t) {
			var i, n = this.options[e];
			n ? ("string" == typeof n ? i = this.element.querySelector(n) : n instanceof HTMLElement && (i = n), this[e] = i ? r(i)[t] : n) : this[e] = 0
		}, d.layoutItems = function(e, t) {
			e = this._getItemsForLayout(e), this._layoutItems(e, t), this._postLayout()
		}, d._getItemsForLayout = function(e) {
			return e.filter(function(e) {
				return !e.isIgnored
			})
		}, d._layoutItems = function(e, i) {
			if (this._emitCompleteOnItems("layout", e), e && e.length) {
				var n = [];
				e.forEach(function(e) {
					var t = this._getItemLayoutPosition(e);
					t.item = e, t.isInstant = i || e.isLayoutInstant, n.push(t)
				}, this), this._processLayoutQueue(n)
			}
		}, d._getItemLayoutPosition = function() {
			return {
				x: 0,
				y: 0
			}
		}, d._processLayoutQueue = function(e) {
			this.updateStagger(), e.forEach(function(e, t) {
				this._positionItem(e.item, e.x, e.y, e.isInstant, t)
			}, this)
		}, d.updateStagger = function() {
			var e = this.options.stagger;
			return null == e ? void(this.stagger = 0) : (this.stagger = function(e) {
				if ("number" == typeof e) return e;
				var t = e.match(/(^\d*\.?\d*)(\w*)/),
					i = t && t[1],
					n = t && t[2];
				return i.length ? (i = parseFloat(i)) * (p[n] || 1) : 0
			}(e), this.stagger)
		}, d._positionItem = function(e, t, i, n, r) {
			n ? e.goTo(t, i) : (e.stagger(r * this.stagger), e.moveTo(t, i))
		}, d._postLayout = function() {
			this.resizeContainer()
		}, d.resizeContainer = function() {
			if (this._getOption("resizeContainer")) {
				var e = this._getContainerSize();
				e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
			}
		}, d._getContainerSize = i, d._setContainerMeasure = function(e, t) {
			if (void 0 !== e) {
				var i = this.size;
				i.isBorderBox && (e += t ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), e = Math.max(e, 0), this.element.style[t ? "width" : "height"] = e + "px"
			}
		}, d._emitCompleteOnItems = function(t, e) {
			function i() {
				r.dispatchEvent(t + "Complete", null, [e])
			}

			function n() {
				++o == s && i()
			}
			var r = this,
				s = e.length;
			if (e && s) {
				var o = 0;
				e.forEach(function(e) {
					e.once(t, n)
				})
			} else i()
		}, d.dispatchEvent = function(e, t, i) {
			var n = t ? [t].concat(i) : i;
			if (this.emitEvent(e, n), h)
				if (this.$element = this.$element || h(this.element), t) {
					var r = h.Event(t);
					r.type = e, this.$element.trigger(r, i)
				} else this.$element.trigger(e, i)
		}, d.ignore = function(e) {
			var t = this.getItem(e);
			t && (t.isIgnored = !0)
		}, d.unignore = function(e) {
			var t = this.getItem(e);
			t && delete t.isIgnored
		}, d.stamp = function(e) {
			(e = this._find(e)) && (this.stamps = this.stamps.concat(e), e.forEach(this.ignore, this))
		}, d.unstamp = function(e) {
			(e = this._find(e)) && e.forEach(function(e) {
				s.removeFrom(this.stamps, e), this.unignore(e)
			}, this)
		}, d._find = function(e) {
			return e ? ("string" == typeof e && (e = this.element.querySelectorAll(e)), e = s.makeArray(e)) : void 0
		}, d._manageStamps = function() {
			this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
		}, d._getBoundingRect = function() {
			var e = this.element.getBoundingClientRect(),
				t = this.size;
			this._boundingRect = {
				left: e.left + t.paddingLeft + t.borderLeftWidth,
				top: e.top + t.paddingTop + t.borderTopWidth,
				right: e.right - (t.paddingRight + t.borderRightWidth),
				bottom: e.bottom - (t.paddingBottom + t.borderBottomWidth)
			}
		}, d._manageStamp = i, d._getElementOffset = function(e) {
			var t = e.getBoundingClientRect(),
				i = this._boundingRect,
				n = r(e);
			return {
				left: t.left - i.left - n.marginLeft,
				top: t.top - i.top - n.marginTop,
				right: i.right - t.right - n.marginRight,
				bottom: i.bottom - t.bottom - n.marginBottom
			}
		}, d.handleEvent = s.handleEvent, d.bindResize = function() {
			e.addEventListener("resize", this), this.isResizeBound = !0
		}, d.unbindResize = function() {
			e.removeEventListener("resize", this), this.isResizeBound = !1
		}, d.onresize = function() {
			this.resize()
		}, s.debounceMethod(o, "onresize", 100), d.resize = function() {
			this.isResizeBound && this.needsResizeLayout() && this.layout()
		}, d.needsResizeLayout = function() {
			var e = r(this.element);
			return this.size && e && e.innerWidth !== this.size.innerWidth
		}, d.addItems = function(e) {
			var t = this._itemize(e);
			return t.length && (this.items = this.items.concat(t)), t
		}, d.appended = function(e) {
			var t = this.addItems(e);
			t.length && (this.layoutItems(t, !0), this.reveal(t))
		}, d.prepended = function(e) {
			var t = this._itemize(e);
			if (t.length) {
				var i = this.items.slice(0);
				this.items = t.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(t, !0), this.reveal(t), this.layoutItems(i)
			}
		}, d.reveal = function(e) {
			if (this._emitCompleteOnItems("reveal", e), e && e.length) {
				var i = this.updateStagger();
				e.forEach(function(e, t) {
					e.stagger(t * i), e.reveal()
				})
			}
		}, d.hide = function(e) {
			if (this._emitCompleteOnItems("hide", e), e && e.length) {
				var i = this.updateStagger();
				e.forEach(function(e, t) {
					e.stagger(t * i), e.hide()
				})
			}
		}, d.revealItemElements = function(e) {
			var t = this.getItems(e);
			this.reveal(t)
		}, d.hideItemElements = function(e) {
			var t = this.getItems(e);
			this.hide(t)
		}, d.getItem = function(e) {
			for (var t = 0; t < this.items.length; t++) {
				var i = this.items[t];
				if (i.element == e) return i
			}
		}, d.getItems = function(e) {
			e = s.makeArray(e);
			var i = [];
			return e.forEach(function(e) {
				var t = this.getItem(e);
				t && i.push(t)
			}, this), i
		}, d.remove = function(e) {
			var t = this.getItems(e);
			this._emitCompleteOnItems("remove", t), t && t.length && t.forEach(function(e) {
				e.remove(), s.removeFrom(this.items, e)
			}, this)
		}, d.destroy = function() {
			var e = this.element.style;
			e.height = "", e.position = "", e.width = "", this.items.forEach(function(e) {
				e.destroy()
			}), this.unbindResize();
			var t = this.element.outlayerGUID;
			delete c[t], delete this.element.outlayerGUID, h && h.removeData(this.element, this.constructor.namespace)
		}, o.data = function(e) {
			var t = (e = s.getQueryElement(e)) && e.outlayerGUID;
			return t && c[t]
		}, o.create = function(e, t) {
			var i = a(o);
			return i.defaults = s.extend({}, o.defaults), s.extend(i.defaults, t), i.compatOptions = s.extend({}, o.compatOptions), i.namespace = e, i.data = o.data, i.Item = a(n), s.htmlInit(i, e), h && h.bridget && h.bridget(e, i), i
		};
		var p = {
			ms: 1,
			s: 1e3
		};
		return o.Item = n, o
	}),
	function(e, t) {
		"function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], t) : "object" == ("undefined" == typeof module ? "undefined" : _typeof(module)) && module.exports ? module.exports = t(require("outlayer"), require("get-size")) : e.Masonry = t(e.Outlayer, e.getSize)
	}(window, function(e, h) {
		var t = e.create("masonry");
		t.compatOptions.fitWidth = "isFitWidth";
		var i = t.prototype;
		return i._resetLayout = function() {
			this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
			for (var e = 0; e < this.cols; e++) this.colYs.push(0);
			this.maxY = 0, this.horizontalColIndex = 0
		}, i.measureColumns = function() {
			if (this.getContainerWidth(), !this.columnWidth) {
				var e = this.items[0],
					t = e && e.element;
				this.columnWidth = t && h(t).outerWidth || this.containerWidth
			}
			var i = this.columnWidth += this.gutter,
				n = this.containerWidth + this.gutter,
				r = n / i,
				s = i - n % i;
			r = Math[s && s < 1 ? "round" : "floor"](r), this.cols = Math.max(r, 1)
		}, i.getContainerWidth = function() {
			var e = this._getOption("fitWidth") ? this.element.parentNode : this.element,
				t = h(e);
			this.containerWidth = t && t.innerWidth
		}, i._getItemLayoutPosition = function(e) {
			e.getSize();
			var t = e.size.outerWidth % this.columnWidth,
				i = Math[t && t < 1 ? "round" : "ceil"](e.size.outerWidth / this.columnWidth);
			i = Math.min(i, this.cols);
			for (var n = this[this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition"](i, e), r = {
					x: this.columnWidth * n.col,
					y: n.y
				}, s = n.y + e.size.outerHeight, o = i + n.col, a = n.col; a < o; a++) this.colYs[a] = s;
			return r
		}, i._getTopColPosition = function(e) {
			var t = this._getTopColGroup(e),
				i = Math.min.apply(Math, t);
			return {
				col: t.indexOf(i),
				y: i
			}
		}, i._getTopColGroup = function(e) {
			if (e < 2) return this.colYs;
			for (var t = [], i = this.cols + 1 - e, n = 0; n < i; n++) t[n] = this._getColGroupY(n, e);
			return t
		}, i._getColGroupY = function(e, t) {
			if (t < 2) return this.colYs[e];
			var i = this.colYs.slice(e, e + t);
			return Math.max.apply(Math, i)
		}, i._getHorizontalColPosition = function(e, t) {
			var i = this.horizontalColIndex % this.cols;
			i = 1 < e && i + e > this.cols ? 0 : i;
			var n = t.size.outerWidth && t.size.outerHeight;
			return this.horizontalColIndex = n ? i + e : this.horizontalColIndex, {
				col: i,
				y: this._getColGroupY(i, e)
			}
		}, i._manageStamp = function(e) {
			var t = h(e),
				i = this._getElementOffset(e),
				n = this._getOption("originLeft") ? i.left : i.right,
				r = n + t.outerWidth,
				s = Math.floor(n / this.columnWidth);
			s = Math.max(0, s);
			var o = Math.floor(r / this.columnWidth);
			o -= r % this.columnWidth ? 0 : 1, o = Math.min(this.cols - 1, o);
			for (var a = (this._getOption("originTop") ? i.top : i.bottom) + t.outerHeight, l = s; l <= o; l++) this.colYs[l] = Math.max(a, this.colYs[l])
		}, i._getContainerSize = function() {
			this.maxY = Math.max.apply(Math, this.colYs);
			var e = {
				height: this.maxY
			};
			return this._getOption("fitWidth") && (e.width = this._getContainerFitWidth()), e
		}, i._getContainerFitWidth = function() {
			for (var e = 0, t = this.cols; --t && 0 === this.colYs[t];) e++;
			return (this.cols - e) * this.columnWidth - this.gutter
		}, i.needsResizeLayout = function() {
			var e = this.containerWidth;
			return this.getContainerWidth(), e != this.containerWidth
		}, t
	}), Object.assign(EventDispatcher.prototype, {
		addEventListener: function(e, t) {
			void 0 === this._listeners && (this._listeners = {});
			var i = this._listeners;
			void 0 === i[e] && (i[e] = []), -1 === i[e].indexOf(t) && i[e].push(t)
		},
		hasEventListener: function(e, t) {
			if (void 0 === this._listeners) return !1;
			var i = this._listeners;
			return void 0 !== i[e] && -1 !== i[e].indexOf(t)
		},
		removeEventListener: function(e, t) {
			if (void 0 !== this._listeners) {
				var i = this._listeners[e];
				if (void 0 !== i) {
					var n = i.indexOf(t); - 1 !== n && i.splice(n, 1)
				}
			}
		},
		dispatchEvent: function(e) {
			if (void 0 !== this._listeners) {
				var t = this._listeners[e.type];
				if (void 0 !== t) {
					e.target = this;
					for (var i = t.slice(0), n = 0, r = i.length; n < r; n++) i[n].call(this, e)
				}
			}
		}
	});
var _ServiceController = function() {
	function t(e) {
		_classCallCheck(this, t), this.GET_MAIN_FEED_COMPLETE = "GET_MAIN_FEED_COMPLETE", this.GET_IMAGE_FEED_COMPLETE = "GET_IMAGE_FEED_COMPLETE", this.GET_LATEST_STORIES_COMPLETE = "GET_LATEST_STORIES_COMPLETE", this.GET_HOME_MODULES_COMPLETE = "GET_HOME_MODULES_COMPLETE", this.gettingMainFeed, this.gettingImageFeed, this.gettingLatestStories, this.gettingHomeModules
	}
	return _createClass(t, [{
		key: "getMainFeed",
		value: function(e, t) {
			this.gettingMainFeed || (this.gettingMainFeed = !0, e || (e = "all"), ajaxLoad(path + "mainFeed/" + e + "/" + t + "/", null, this.getMainFeedCompleteHandler.bind(this)))
		}
	}, {
		key: "getMainFeedCompleteHandler",
		value: function(e) {
			this.dispatchEvent({
				type: this.GET_MAIN_FEED_COMPLETE,
				data: e
			}), this.gettingMainFeed = !1
		}
	}, {
		key: "getImageFeed",
		value: function(e) {
			this.gettingImageFeed || (this.gettingImageFeed = !0, ajaxLoad(path + "imageFeed/" + e + "/", null, this.getImageFeedCompleteHandler.bind(this)))
		}
	}, {
		key: "getImageFeedCompleteHandler",
		value: function(e) {
			this.dispatchEvent({
				type: this.GET_IMAGE_FEED_COMPLETE,
				data: e
			}), this.gettingImageFeed = !1
		}
	}, {
		key: "getLatestStories",
		value: function(e) {
			this.gettingLatestStories || (this.gettingLatestStories = !0, ajaxLoad(path + "latestStories/" + e + "/", null, this.getLatestStoriesCompleteHandler.bind(this)))
		}
	}, {
		key: "getLatestStoriesCompleteHandler",
		value: function(e) {
			this.gettingLatestStories = !1, this.dispatchEvent({
				type: this.GET_LATEST_STORIES_COMPLETE,
				data: e
			})
		}
	}, {
		key: "getHomeModules",
		value: function() {
			this.gettingHomeModules || (this.gettingHomeModules = !0, ajaxLoad(path + "homeModules/", null, this.getHomeModulesComplete.bind(this)))
		}
	}, {
		key: "getHomeModulesComplete",
		value: function(e) {
			this.dispatchEvent({
				type: this.GET_HOME_MODULES_COMPLETE,
				data: e
			}), this.gettingHomeModules = !1
		}
	}, {
		key: "addNewsletterSubscriber",
		value: function(e, t) {
			document.MC_callback = function(e) {
				dataLayer.push({
					eventCategory: "WP_social",
					eventAction: "email subscribed",
					eventLabel: document.title,
					eventValue: void 0,
					eventNonInteraction: !1,
					event: "eventPush"
				}), t && t(e)
			};
			var i = document.createElement("script");
			i.type = "text/javascript", i.src = "//wetransfer.us10.list-manage.com/subscribe/post-json?u=ba76baa5847c58f5eb3427dc9&id=1380f64b6e&c=document.MC_callback&EMAIL=" + e, document.getElementsByTagName("head")[0].appendChild(i)
		}
	}]), t
}();
Object.assign(_ServiceController.prototype, EventDispatcher.prototype);
var ServiceController = new _ServiceController,
	_SearchController = function() {
		function t(e) {
			_classCallCheck(this, t), this.keywordData = null, this.articlesData = null
		}
		return _createClass(t, [{
			key: "load",
			value: function() {
				var e = this,
					t = new XMLHttpRequest;
				t.onreadystatechange = function() {
					4 == this.readyState && 200 == this.status && (e.keywordData = JSON.parse(this.responseText))
				}, t.open("GET", path + "json/keywords/", !0), t.send();
				var i = new XMLHttpRequest;
				i.onreadystatechange = function() {
					4 == this.readyState && 200 == this.status && (e.articlesData = JSON.parse(this.responseText))
				}, i.open("GET", path + "json/articles/", !0), i.send()
			}
		}, {
			key: "searchKeywords",
			value: function(e) {
				if (e && this.keywordData) {
					for (var t = [], i = 0; i < this.keywordData.length; i++) this.keywordData[i].value && -1 < this.keywordData[i].value.toLowerCase().indexOf(e.toLowerCase()) && t.push(this.keywordData[i]);
					return t
				}
			}
		}, {
			key: "searchArticles",
			value: function(e) {
				if (e && this.articlesData) {
					for (var t = [], i = 0; i < this.articlesData.length; i++) {
						for (var n = 0; n < this.articlesData[i].categories.length; n++) this.isMatch(e, this.articlesData[i].categories[n].title) && t.push(this.articlesData[i]);
						if (this.articlesData[i].featuredProfile) {
							var r = this.articlesData[i].featuredProfile.country,
								s = this.articlesData[i].featuredProfile.name;
							(this.isMatch(e, s) || this.isMatch(e, r)) && t.push(this.articlesData[i])
						}
					}
					return t
				}
			}
		}, {
			key: "isMatch",
			value: function(e, t) {
				return !(!e || !t) && -1 < t.toLowerCase().indexOf(e.toLowerCase())
			}
		}]), t
	}();
Object.assign(_SearchController.prototype, EventDispatcher.prototype);
var SearchController = new _SearchController,
	View = function() {
		function t(e) {
			_classCallCheck(this, t), this.element = e, this.showing = !0
		}
		return _createClass(t, [{
			key: "layout",
			value: function() {}
		}, {
			key: "animate",
			value: function() {}
		}, {
			key: "show",
			value: function() {
				this.element.style.display = "block", this.showing = !0
			}
		}, {
			key: "hide",
			value: function() {
				this.element.style.display = "none", this.showing = !1
			}
		}, {
			key: "transitionIn",
			value: function() {
				this.transitionInComplete()
			}
		}, {
			key: "transitionInComplete",
			value: function() {
				this.dispatchEvent({
					type: "transitionInComplete"
				})
			}
		}, {
			key: "transitionOut",
			value: function() {
				TweenMax.to(this.element, .4, {
					opacity: 0,
					onComplete: this.transitionOutComplete.bind(this)
				})
			}
		}, {
			key: "transitionOutComplete",
			value: function() {
				this.dispatchEvent({
					type: "transitionOutComplete"
				})
			}
		}, {
			key: "destroy",
			value: function() {}
		}]), t
	}();
Object.assign(View.prototype, EventDispatcher.prototype);
var Section = function(e) {
		function t() {
			return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
		}
		return _inherits(t, View), _createClass(t, [{
			key: "onScroll",
			value: function(e) {}
		}]), t
	}(),
	App = function() {
		function App() {
			_classCallCheck(this, App)
		}
		return _createClass(App, [{
			key: "init",
			value: function() {
				app.mousePosition = {
					x: 0,
					y: 0
				}, app.scrollLeft = 0, app.scrollTop = 0, app.innerHeight = window.innerHeight, app.innerWidth = window.innerWidth, app.disableTouchHeaderSlide = !1, this.animate = this._animate.bind(this), this.pendingDom, this.currentSection, this.sectionClass, this.initSnowplow(), this.detectDevice(), hoverTouchUnstick(), this.bps = {}, this.bps["phone-upper-boundary"] = 600, this.bps["tablet-portrait-upper-boundary"] = 900, this.bps["tablet-landscape-upper-boundary"] = 1200, this.bps["desktop-upper-boundary"] = 1800, this.colors = {}, this.colors.spotColor = "#ffb500", this.colors.offBlack = "#17181A", this.colors.white = "#ffffff", this.cookieAlert = document.querySelector("#cookieMessage"), this.cookieClose = this.cookieAlert.querySelector(".close"), History.Adapter.bind(window, "statechange", this.onStateChange.bind(this)), this.sideMenu = new SideMenu(document.querySelector("#sideMenu")), this.header = new Header(document.querySelector("header")), this.header.transitionIn(1), document.querySelector("footer") && (this.footer = new Footer(document.querySelector("footer"))), this.mobileVHElements = document.querySelectorAll(".vh-to-px-mobile, .vh-to-px-w-mobile"), document.fonts && document.fonts.ready && document.fonts.ready.then(function() {
					this.resizeHandler()
				}.bind(this)), getCookie("wt_tandc") || setCookie("wt_tandc", "20180508", 365), getCookie("wt_cookie_agree") || this.showCookieAgree(), this.initSection(), this.addGlobalEvents(), this.resizeHandler(), this.scrollHandler(), this.animate()
			}
		}, {
			key: "initSection",
			value: function initSection() {
				parseSharingLinks(), linksTargetBlank(path);
				var currentSectionElement = document.querySelector("#content > .section");
				updateSectionTitle(currentSectionElement.getAttribute("data-title")), this.sectionClass = currentSectionElement.getAttribute("data-class"), this.sectionClass && (this.currentSection = new(eval(this.sectionClass))(currentSectionElement), this.currentSection.addEventListener("transitionInComplete", this.transitionInSectionCompleteHandler.bind(this)), this.currentSection.addEventListener("transitionOutComplete", this.transitionOutSectionCompleteHandler.bind(this)), this.currentSection.layout(), this.currentSection.transitionIn())
			}
		}, {
			key: "initSnowplow",
			value: function() {
				window.__snowplow__("newTracker", "co", window.__snowplow__.collector, {
					bufferSize: 1,
					post: !0,
					encodeBase64: !1,
					respectDoNotTrack: !0,
					userFingerprint: !1,
					appId: "wepresent",
					platform: "web",
					stateStorageStrategy: "cookie",
					contexts: {
						webPage: !0
					},
					cookieName: "_wt_snowplow",
					discoverRootDomain: !0
				}), window.__snowplow__("trackPageView:co", path)
			}
		}, {
			key: "addGlobalEvents",
			value: function() {
				isTouch() ? window.addEventListener("orientationchange", this.resizeHandler.bind(this)) : window.addEventListener("resize", this.resizeHandler.bind(this)), this.cookieClose.addEventListener("click", this.cookieAgreeHandler.bind(this)), window.addEventListener("scroll", this.scrollHandler.bind(this)), document.body.addEventListener("mousemove", this.mouseMoveHandler.bind(this));
				var e = document.querySelector("#youtube-api");
				e.setAttribute("src", e.getAttribute("data-src"))
			}
		}, {
			key: "onAjaxLinkClick",
			value: function(e) {
				e.preventDefault(), History.pushState(null, null, e.target.href)
			}
		}, {
			key: "onStateChange",
			value: function(e) {
				var t = History.getState();
				this.isAjaxLoadRequired() && ajaxLoad(t.url, "#content", this.onPageLoadComplete.bind(this))
			}
		}, {
			key: "onPageLoadComplete",
			value: function(e) {
				this.pendingDom = e, this.currentSection && this.currentSection.transitionOut()
			}
		}, {
			key: "transitionInSectionCompleteHandler",
			value: function() {}
		}, {
			key: "transitionOutSectionCompleteHandler",
			value: function() {
				replaceDom("#content", this.pendingDom), this.initSection()
			}
		}, {
			key: "isAjaxLoadRequired",
			value: function() {
				return !0
			}
		}, {
			key: "detectDevice",
			value: function() {
				var e = document.documentElement.classList;
				isTouch() ? (e.add("touch"), isAndroid() ? e.add("android") : isIOS() && e.add("ios")) : e.add("noTouch")
			}
		}, {
			key: "resizeHandler",
			value: function() {
				this.innerHeight = window.innerHeight, this.innerWidth = window.innerWidth, window.innerHeightHalf = this.innerHeight / 2, window.innerWidthHalf = this.innerWidth / 2, this.header && this.header.layout(), this.footer && this.footer.layout(), this.currentSection && this.currentSection.layout(), isTouch() && this.mobileVHElements.forEach(function(e) {
					var t;
					t = e.classList.contains("vh-to-px-w-mobile") ? app.innerHeight : app.innerWidth < app.innerHeight ? window.screen.height : window.screen.width, e.style.height = t + "px"
				})
			}
		}, {
			key: "scrollHandler",
			value: function(e) {
				app.scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, app.scrollTop = window.pageYOffset || document.documentElement.scrollTop, this.header.onScroll(e), this.footer && this.footer.onScroll(e), this.currentSection && this.currentSection.onScroll(e)
			}
		}, {
			key: "_animate",
			value: function() {
				this.currentSection && this.currentSection.animate(), requestAnimationFrame(this.animate)
			}
		}, {
			key: "mouseMoveHandler",
			value: function(e) {
				app.mousePosition.x = e.clientX, app.mousePosition.y = e.clientY
			}
		}, {
			key: "cookieAgreeHandler",
			value: function(e) {
				setCookie("wt_cookie_agree", "20180508", 365), this.hideCookieAgree()
			}
		}, {
			key: "showCookieAgree",
			value: function() {
				TweenMax.to(this.cookieAlert, .7, {
					ease: Strong.easeOut,
					y: 0
				}), document.body.classList.add("cookieNotAgree")
			}
		}, {
			key: "hideCookieAgree",
			value: function() {
				TweenMax.to(this.cookieAlert, .7, {
					ease: Strong.easeOut,
					y: "100%",
					onComplete: function() {
						document.body.classList.remove("cookieNotAgree")
					}
				});
				var e = document.querySelector(".cover .downButton");
				e && TweenMax.to(e, .7, {
					autoAlpha: 1
				})
			}
		}]), App
	}(),
	globals = {};
document.addEventListener("DOMContentLoaded", function(e) {
	window.app = new App, window.app.init()
});
var HomeSection = function(e) {
		function n(e) {
			_classCallCheck(this, n);
			var t = _possibleConstructorReturn(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e));
			t.scrollContentsEl = e.querySelector(".scrollContents"), t.sideDockedImageCards = Array.from(t.element.querySelectorAll(".sideDockedImageCards")).map(function(e) {
				return new SideDockedImageCards(e, 3)
			}), t.skyscraperCardsGrids = Array.from(t.element.querySelectorAll(".skyscaperCardsGrid")).map(function(e) {
				return new SkyscraperCardsGrid(e, 12)
			}), t.bannerCarouselModules = Array.from(t.element.querySelectorAll(".bannerCarouselModule")).map(function(e) {
				return new BannerCarouselModule(e)
			}), t.socialCarouselModules = Array.from(t.element.querySelectorAll(".socialCarouselModule")).map(function(e) {
				return new SocialCarouselModule(e)
			}), t.coverModule = new HomeCover(e.querySelector(".cover")), t.coverModule.setParalaxElement(document.querySelector(".latestStories")), t.coverModule.element.querySelector("a.headline").addEventListener("click", function(e) {
				dataLayer.push({
					eventCategory: "WP_homepage",
					eventAction: "click main article",
					eventLabel: void 0,
					eventValue: void 0,
					eventNonInteraction: !1,
					event: "eventPush"
				})
			});
			var i = e.querySelector(".latestStories");
			return i && (t.latestStories = new LatestStories(i)), t
		}
		return _inherits(n, Section), _createClass(n, [{
			key: "layout",
			value: function() {
				_get(n.prototype.__proto__ || Object.getPrototypeOf(n.prototype), "layout", this).call(this), this.coverModule.layout(), this.latestStories && this.latestStories.layout(), this.sideDockedImageCards.map(function(e) {
					return e.layout()
				}), this.skyscraperCardsGrids.map(function(e) {
					return e.layout()
				}), this.bannerCarouselModules.map(function(e) {
					return e.layout()
				}), this.socialCarouselModules.map(function(e) {
					return e.layout()
				})
			}
		}, {
			key: "onScroll",
			value: function(t) {
				this.coverModule.onScroll(t), this.latestStories && this.latestStories.onScroll(t), this.sideDockedImageCards.map(function(e) {
					return e.onScroll(t)
				}), this.skyscraperCardsGrids.map(function(e) {
					return e.onScroll(t)
				}), this.bannerCarouselModules.map(function(e) {
					return e.onScroll(t)
				}), this.socialCarouselModules.map(function(e) {
					return e.onScroll(t)
				})
			}
		}, {
			key: "getHomeModulesComplete",
			value: function(e) {
				window.app.resizeHandler()
			}
		}]), n
	}(),
	DetailSection = function(_Section2) {
		function DetailSection(e) {
			_classCallCheck(this, DetailSection);
			var t = _possibleConstructorReturn(this, (DetailSection.__proto__ || Object.getPrototypeOf(DetailSection)).call(this, e));
			t.scrollerEl = t.element.querySelector("#scroller"), t.scrollContentsEl = t.element.querySelector(".scrollContents");
			var i = t.element.querySelector(".dockedShareMenu");
			i && (t.dockedShareMenu = new DockedShareMenu(i)), t.readProgressEl = t.element.querySelector(".readProgressBar .progress");
			var n = e.querySelector(".cover");
			n ? (t.coverModule = new DetailCover(n), t.coverModule.setParalaxElement(t.scrollContentsEl)) : t.scrollContentsEl.style.position = "absolute", t.titleModuleEl = t.element.querySelector(".titleModule"), t.shareOptionsEl = t.titleModuleEl.querySelector(".shareOptions"), t.relatedArticlesModule = new RelatedArticlesModule(e.querySelector(".relatedArticlesModule")), t.seriesModuleEl = t.element.querySelector(".seriesModule"), t.seriesModuleEl && (t.seriesModule = new SeriesModule(t.seriesModuleEl)), t.theaterModeEl = t.element.querySelector(".theaterModeModule"), t.theaterModeEl && (t.theaterModeModule = new TheaterModeModule(t.theaterModeEl)), t.newsletterModuleEl = t.element.querySelector(".newsletterModule"), t.newsletterModuleEl && (t.newsletterModule = new NewsletterModule(t.newsletterModuleEl)), t.shareModuleEl = t.element.querySelector(".shareModule"), t.nextArticleModuleEl = t.element.querySelector(".nextArticleModule"), t.nextArticleModuleEl && (TweenMax.set(t.nextArticleModuleEl, {
				scale: .1
			}), t.showingNextArticle = !1), t.customArticleModule = null, t.textModules = [], t.slideshowModules = [], t.galleryModules = [], t.videoModules = [], t.imageModules = [], t.chapterModules = [], t.soundbyteModules = [], t.embeddableModules = [], t.scrollRevealModules = [], t.chapterMenuModules = [], t.readMoreModules = [], t.layeredImageGalleryModules = [];
			var r = t.element.querySelector(".chapterIndicator");
			return r && (t.chapterIndicator = new ChapterIndicator(r)), t.parseCustomModule(), t.parseContentModules(), preloadImages(t.element.querySelectorAll(".module:not(.relatedArticlesModule):not(.imageModule):not(.galleryModule):not(.layeredImageGalleryModule) img"), t.layout.bind(t)), t
		}
		return _inherits(DetailSection, _Section2), _createClass(DetailSection, [{
			key: "animate",
			value: function() {
				this.theaterModeModule && this.theaterModeModule.animate();
				for (var e = 0; e < this.layeredImageGalleryModules.length; e++) this.layeredImageGalleryModules[e].animate()
			}
		}, {
			key: "transitionIn",
			value: function() {
				_get(DetailSection.prototype.__proto__ || Object.getPrototypeOf(DetailSection.prototype), "transitionIn", this).call(this);
				var e = window.location.hash.split("#")[1];
				if (this.chapterIndicator && e) {
					var t = this.chapterIndicator.getChapterIndexBySlug(e);
					this.chapterIndicator.gotoChapter(t, !0)
				} else "1" == this.element.getAttribute("data-land-on-title") && this.coverModule.gotoTitle(0)
			}
		}, {
			key: "layout",
			value: function() {
				_get(DetailSection.prototype.__proto__ || Object.getPrototypeOf(DetailSection.prototype), "layout", this).call(this), this.coverModule && this.coverModule.layout(), this.theaterModeModule && this.theaterModeModule.layout(), this.seriesModule && this.seriesModule.layout(), this.chapterIndicator && this.chapterIndicator.layout(), this.relatedArticlesModule && this.relatedArticlesModule.layout();
				for (var e = 0; e < this.galleryModules.length; e++) this.galleryModules[e].layout();
				for (e = 0; e < this.slideshowModules.length; e++) this.slideshowModules[e].layout();
				for (e = 0; e < this.layeredImageGalleryModules.length; e++) this.layeredImageGalleryModules[e].layout()
			}
		}, {
			key: "onScroll",
			value: function(e) {
				var t = app.scrollTop / (document.body.clientHeight - app.innerHeight);
				this.readProgressEl.style.width = 100 * t + "%", this.coverModule && this.coverModule.onScroll(e), this.relatedArticlesModule && this.relatedArticlesModule.onScroll(e);
				for (var i = 0; i < this.imageModules.length; i++) this.imageModules[i].onScroll(e);
				for (i = 0; i < this.videoModules.length; i++) this.videoModules[i].onScroll(e);
				for (i = 0; i < this.galleryModules.length; i++) this.galleryModules[i].onScroll(e);
				if (this.chapterIndicator) this.chapterIndicator.onScroll(e);
				else if (this.nextArticleModuleEl) {
					var n = this.seriesModuleEl ? getOffset(this.seriesModuleEl) : getOffset(this.relatedArticlesModule.element);
					(.4 < t && n.top) > app.innerHeight ? this.showingNextArticle || this.showNextArticle() : this.showingNextArticle && this.hideNextArticle()
				}
				for (i = 0; i < this.layeredImageGalleryModules.length; i++) this.layeredImageGalleryModules[i].onScroll(e);
				if (this.dockedShareMenu) {
					var r = getOffset(this.shareOptionsEl).top,
						s = getOffset(this.shareModuleEl).top;
					r < 0 && s > app.innerHeight ? this.dockedShareMenu.showing || this.dockedShareMenu.show() : this.dockedShareMenu.showing && this.dockedShareMenu.hide()
				}
			}
		}, {
			key: "onOpenTheaterModeHandler",
			value: function(e) {
				dataLayer.push({
					eventCategory: "WP_engagement",
					eventAction: "enlarge image",
					eventLabel: document.title,
					eventValue: void 0,
					eventNonInteraction: !1,
					event: "eventPush"
				}), this.theaterModeModule.show(), this.theaterModeModule.gotoByUrl(e.url)
			}
		}, {
			key: "showNextArticle",
			value: function() {
				this.showingNextArticle = !0, TweenMax.to(this.nextArticleModuleEl, 1, {
					ease: Elastic.easeOut,
					scale: 1,
					opacity: 1
				})
			}
		}, {
			key: "hideNextArticle",
			value: function() {
				this.showingNextArticle = !1, TweenMax.to(this.nextArticleModuleEl, .25, {
					scale: .1,
					opacity: 0
				})
			}
		}, {
			key: "parseCustomModule",
			value: function parseCustomModule() {
				var customModuleEl = this.element.querySelector("[data-custom-module]");
				if (customModuleEl) {
					var customModuleId = customModuleEl.getAttribute("data-custom-module");
					this.customArticleModule = eval("new " + customModuleId), this.customArticleModule.initialize(customModuleEl)
				}
			}
		}, {
			key: "parseContentModules",
			value: function() {
				var e = this.element.querySelectorAll(".chapterModule");
				for (C = 0; C < e.length; C++) {
					var t = new ChapterModule(e[C]);
					this.chapterModules.push(t)
				}
				var i = this.element.querySelectorAll(".textModule");
				for (C = 0; C < i.length; C++) {
					var n = new TextModule(i[C]);
					this.textModules.push(n)
				}
				var r = this.element.querySelectorAll(".slideshowModule");
				for (C = 0; C < r.length; C++) {
					var s = new SlideshowModule(r[C]);
					s.gotoIndex(0, 0), "1" === r[C].getAttribute("data-autoplay") && s.play(), s.addEventListener("pauseAllVideos", this.pauseAllVideos.bind(this)), this.slideshowModules.push(s)
				}
				var o = this.element.querySelectorAll(".galleryModule");
				for (C = 0; C < o.length; C++) {
					var a = new GalleryModule(o[C]);
					a.addEventListener("openTheaterMode", this.onOpenTheaterModeHandler.bind(this)), this.galleryModules.push(a)
				}
				var l = this.element.querySelectorAll(".imageModule");
				for (C = 0; C < l.length; C++) {
					var h = new ImageModule(l[C]);
					h.addEventListener("openTheaterMode", this.onOpenTheaterModeHandler.bind(this)), this.imageModules.push(h)
				}
				var u = this.element.querySelectorAll(".videoModule");
				for (C = 0; C < u.length; C++) {
					var c = u[C],
						d = new VideoModule(c);
					this.videoModules.push(d)
				}
				var p = this.element.querySelectorAll(".soundbyteModule");
				if (1 <= p.length) {
					var f = this.element.querySelector(".audioPlayerModule"),
						g = new AudioPlayer(f);
					for (C = 0; C < p.length; C++) {
						var m = new SoundbyteModule(p[C], g);
						this.soundbyteModules.push(m)
					}
				}
				var y = this.element.querySelectorAll(".embeddableModule");
				for (C = 0; C < y.length; C++) {
					var _ = new EmbeddableModule(y[C]);
					this.embeddableModules.push(_)
				}
				var v = this.element.querySelectorAll(".scrollRevealModule__item");
				for (C = 0; C < v.length; C++) {
					var w = new ScrollRevealModule(v[C]);
					this.scrollRevealModules.push(w)
				}
				var b = this.element.querySelectorAll(".chapterMenuModule");
				for (C = 0; C < b.length; C++) {
					var S = new ChapterMenuModule(b[C]);
					this.chapterMenuModules.push(S)
				}
				var x = this.element.querySelectorAll(".readMoreModule");
				for (C = 0; C < x.length; C++) {
					var k = new ReadMoreModule(x[C]);
					this.readMoreModules.push(k)
				}
				var E = this.element.querySelectorAll(".layeredImageGalleryModule");
				for (C = 0; C < E.length; C++) {
					var T = new LayeredImageGalleryModule(E[C]);
					this.layeredImageGalleryModules.push(T)
				}
				this.noteButtonEls = this.element.querySelectorAll("note[target]");
				for (var C = 0; C < this.noteButtonEls.length; C++) {
					this.noteButtonEl = this.noteButtonEls[C];
					var M = document.createElement("div");
					M.classList.add("circle"), this.noteButtonEl.prepend(M);
					var P = this.element.querySelector("#" + this.noteButtonEl.getAttribute("target"));
					if (P) {
						var O = P.parentNode;
						O && (O.classList.add("note"), this.noteButtonEl.targetNote = O, this.noteButtonEl.addEventListener("click", this.onNoteButtonClickHandler.bind(this)), this.noteButtonEl.addEventListener("mouseenter", this.noteButtonOverHandler.bind(this)), TweenMax.set(O, {
							height: 0
						}))
					}
				}
			}
		}, {
			key: "noteButtonOverHandler",
			value: function(e) {
				var t = e.currentTarget.querySelector(".circle");
				TweenMax.set(t, {
					scale: .1,
					opacity: 0
				}), TweenMax.to(t, 1, {
					ease: Elastic.easeOut,
					scale: 1,
					opacity: 1
				})
			}
		}, {
			key: "onNoteButtonClickHandler",
			value: function(e) {
				var t = e.currentTarget.targetNote;
				t.classList.contains("open") ? (t.classList.remove("open"), TweenMax.to(t, .6, {
					height: 0,
					ease: Power1.easeInOut
				}), dataLayer.push({
					eventCategory: "WP_engagement",
					eventAction: "collapse text",
					eventLabel: document.title,
					eventValue: void 0,
					eventNonInteraction: !1,
					event: "eventPush"
				})) : (t.classList.add("open"), TweenMax.set(t, {
					height: "auto"
				}), TweenMax.from(t, .6, {
					height: 0,
					ease: Power1.easeInOut
				}), dataLayer.push({
					eventCategory: "WP_engagement",
					eventAction: "expand text",
					eventLabel: document.title,
					eventValue: void 0,
					eventNonInteraction: !1,
					event: "eventPush"
				}))
			}
		}, {
			key: "pauseAllVideos",
			value: function() {
				for (var e = 0; e < this.videoModules.length; e++) this.videoModules[e].pause()
			}
		}, {
			key: "youtubeAPIReady",
			value: function() {
				for (var e = 0; e < this.videoModules.length; e++) this.videoModules[e].youtubeAPIReady()
			}
		}]), DetailSection
	}(Section),
	CategorySection = function(e) {
		function i(e) {
			_classCallCheck(this, i);
			var t = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, e));
			return t.skyscraperCardsGrid = new SkyscraperCardsGrid(e.querySelector(".skyscaperCardsGrid")), t
		}
		return _inherits(i, Section), _createClass(i, [{
			key: "onScroll",
			value: function(e) {
				this.skyscraperCardsGrid.onScroll()
			}
		}, {
			key: "layout",
			value: function() {
				this.skyscraperCardsGrid.layout()
			}
		}]), i
	}(),
	ProfilesSection = function(e) {
		function r(e) {
			_classCallCheck(this, r);
			var t = _possibleConstructorReturn(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, e));
			t.scrollerEl = t.element.querySelector("#scroller"), t.scrollContentsEl = t.element.querySelector(".scrollContents"), t.backgroundImageLoEl = t.element.querySelector(".backgroundImage.lo"), t.backgroundImageHighEl = t.element.querySelector(".backgroundImage.high"), t.backgroundContainerEl = t.element.querySelector(".backgroundContainer"), t.lettersEl = t.element.querySelectorAll(".letter"), t.letterMenuEl = t.element.querySelector(".letterMenu"), t.profilesLinksEl = t.element.querySelectorAll(".profile a"), t.currentImageUrl = "", t.currentAspectRatio = "";
			for (var i = 0; i < t.profilesLinksEl.length; i++) {
				var n = t.profilesLinksEl[i];
				n.addEventListener("mouseenter", t.onProfileOverHandler.bind(t)), n.addEventListener("mouseleave", t.onProfileOutHandler.bind(t))
			}
			return t.letterMenuEl.addEventListener("touchmove", t.onLetterMenuTouchMove.bind(t)), t.generateMenu(), t
		}
		return _inherits(r, Section), _createClass(r, [{
			key: "layout",
			value: function() {
				this.scrollerEl.style.height = this.scrollContentsEl.clientHeight + "px"
			}
		}, {
			key: "generateMenu",
			value: function() {
				for (var e = this.letterMenuEl.querySelector("li"), t = 0; t < this.lettersEl.length; t++) {
					var i = this.lettersEl[t],
						n = e.cloneNode(!0);
					n.querySelector("span").innerHTML = i.getAttribute("data-letter"), (n.hoverTarget = i).menuTarget = n, this.letterMenuEl.appendChild(n), n.addEventListener("mouseenter", this.onLetterOverHandler.bind(this))
				}
			}
		}, {
			key: "onProfileOverHandler",
			value: function(e) {
				window.stop(), this.currentImageUrl = e.target.getAttribute("data-image-url"), this.currentAspectRatio = e.target.getAttribute("data-image-width") / e.target.getAttribute("data-image-height"), this.loadImageLo(this.currentImageUrl)
			}
		}, {
			key: "loadImageLo",
			value: function(t) {
				this.backgroundImageHighEl.style["background-image"] = "";
				var e, i, n = this,
					r = new Image,
					s = t + "?w=10";
				r.setAttribute("data-src", s), app.innerWidth < app.bps["phone-upper-boundary"] ? (i = (e = app.innerWidth - 60) / this.currentAspectRatio, this.backgroundContainerEl.style.height = i + "px", this.backgroundContainerEl.style.width = e + "px", this.backgroundContainerEl.style.left = "30px", this.backgroundContainerEl.style.top = (window.innerHeight - i) / 2 + "px") : (e = (i = app.innerHeight - 100) * this.currentAspectRatio, this.backgroundContainerEl.style.height = i + "px", this.backgroundContainerEl.style.width = e + "px", this.backgroundContainerEl.style.left = (app.innerWidth - e) / 2 + "px", this.backgroundContainerEl.style.top = "50px"), preloadImages([r], null, function(e) {
					n.currentImageUrl === e && (n.backgroundImageLoEl.style["background-image"] = "url(" + e + "?w=10)", TweenMax.to(n.backgroundContainerEl, .4, {
						opacity: .4
					}), n.loadImageHigh(t))
				}, t)
			}
		}, {
			key: "loadImageHigh",
			value: function(e) {
				var t = this,
					i = new Image,
					n = e + "?w=1200";
				i.setAttribute("data-src", n), preloadImages([i], null, function(e) {
					t.currentImageUrl === e && (t.backgroundImageHighEl.style["background-image"] = "url(" + e + "?w=1200)", TweenMax.set(t.backgroundImageHighEl, {
						opacity: 1
					}))
				}, e)
			}
		}, {
			key: "onProfileOutHandler",
			value: function(e) {
				var t = this;
				TweenMax.to(this.backgroundContainerEl, .2, {
					opacity: 0,
					onComplete: function() {
						t.backgroundImageLoEl.style["background-image"] = "", t.backgroundImageHighEl.style["background-image"] = ""
					}
				})
			}
		}, {
			key: "onLetterOverHandler",
			value: function(e) {
				var t = getPosition(e.target.hoverTarget).top - app.innerHeight / 2 + 50;
				TweenMax.to(window, .6, {
					scrollTo: t
				})
			}
		}, {
			key: "onLetterMenuTouchMove",
			value: function(e) {
				e.preventDefault();
				var t = getPosition(document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY).closest("li").hoverTarget).top - app.innerHeight / 2 + 50;
				TweenMax.to(window, 0, {
					scrollTo: t
				})
			}
		}, {
			key: "onScroll",
			value: function(e) {
				for (var t, i, n, r = 0; r < this.lettersEl.length; r++) this.lettersEl[r].menuTarget.classList.remove("active"), t = Math.abs(this.lettersEl[r].getBoundingClientRect().top), (!i || t < i) && (i = t, n = this.lettersEl[r]);
				if (n.menuTarget.classList.add("active"), isTouch()) {
					for (n = i = t = null, r = 0; r < this.profilesLinksEl.length; r++) this.profilesLinksEl[r].classList.remove("active"), t = Math.abs(this.profilesLinksEl[r].getBoundingClientRect().top - app.innerHeight / 2 + 25), (!i || t < i) && (i = t, n = this.profilesLinksEl[r]);
					n.classList.add("active"), this.currentImageUrl != n.getAttribute("data-image-url") && (window.stop(), this.currentImageUrl = n.getAttribute("data-image-url"), this.currentAspectRatio = n.getAttribute("data-image-width") / n.getAttribute("data-image-height"), this.loadImageLo(this.currentImageUrl))
				}
			}
		}]), r
	}(),
	AboutSection = function(e) {
		function i(e) {
			_classCallCheck(this, i);
			var t = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, e));
			return t.scrollerEl = t.element.querySelector("#scroller"), t.scrollContentsEl = t.element.querySelector(".scrollContents"), t.coverModule = new AboutCover(t.element.querySelector(".cover")), t
		}
		return _inherits(i, Section), _createClass(i, [{
			key: "layout",
			value: function() {
				this.scrollerEl.style.height = this.scrollContentsEl.clientHeight, this.coverModule.layout()
			}
		}, {
			key: "onScroll",
			value: function(e) {
				this.coverModule.onScroll(e)
			}
		}]), i
	}(),
	SeriesSection = function(e) {
		function i(e) {
			_classCallCheck(this, i);
			var t = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, e));
			return t.skyscraperCardsGrid = new SkyscraperCardsGrid(e.querySelector(".skyscaperCardsGrid")), t
		}
		return _inherits(i, Section), _createClass(i, [{
			key: "onScroll",
			value: function(e) {
				this.skyscraperCardsGrid.onScroll()
			}
		}, {
			key: "layout",
			value: function() {
				this.skyscraperCardsGrid.layout()
			}
		}]), i
	}(),
	SeriesCategorySection = function(e) {
		function i(e) {
			_classCallCheck(this, i);
			var t = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, e));
			return t.sideDockedImageCards = Array.from(e.querySelectorAll(".sideDockedImageCards")).map(function(e) {
				return new SideDockedImageCards(e)
			}), t.skyscraperCardsGrids = Array.from(e.querySelectorAll(".skyscaperCardsGrid")).map(function(e) {
				return new SkyscraperCardsGrid(e)
			}), t
		}
		return _inherits(i, Section), _createClass(i, [{
			key: "onScroll",
			value: function(e) {
				this.sideDockedImageCards.map(function(e) {
					return e.onScroll()
				}), this.skyscraperCardsGrids.map(function(e) {
					return e.onScroll()
				})
			}
		}, {
			key: "layout",
			value: function() {
				this.sideDockedImageCards.map(function(e) {
					return e.layout()
				}), this.skyscraperCardsGrids.map(function(e) {
					return e.layout()
				})
			}
		}]), i
	}(),
	Header = function(e) {
		function i(e) {
			_classCallCheck(this, i);
			var t = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, e));
			return t.wtButtonEl = t.element.querySelector(".wtButton"), t.wtButtonPathEl = t.element.querySelector(".wtButton path"), t.presentsLogoPathEl = t.element.querySelector(".presentsLogo path"), t.menuButtonEl = t.element.querySelector(".menuButton"), t.menuButtonIconEl = t.element.querySelector(".menuButton .icon"), t.menuButtonTextEl = t.element.querySelector(".menuButton .icon span"), t.menuButtonState = 0, t.menuBackgroundEl = t.element.querySelector(".background"), t.tintColor = "#ffffff", t.lastTintColor, t.lastMenuToggleColor, t.requestedColor, t.lastScrollPosition = 0, t.menuButtonEl.addEventListener("mouseenter", t.menuButtonOverHandler.bind(t)), t.menuButtonEl.addEventListener("mouseleave", t.menuButtonOutHandler.bind(t)), t.menuButtonEl.addEventListener("click", t.menuButtonClickHandler.bind(t)), getCookie("menu_button_helper") && t.removeMenuButtonState(), TweenMax.set(t.menuButtonIconEl, {
				scale: 0,
				opacity: 0
			}), t
		}
		return _inherits(i, View), _createClass(i, [{
			key: "transitionIn",
			value: function(e) {
				0 === this.menuButtonState ? (TweenMax.set(this.menuButtonIconEl, {
					scale: 1
				}), TweenMax.to(this.menuButtonIconEl, 1, {
					opacity: 1,
					delay: e
				})) : TweenMax.to(this.menuButtonIconEl, 1, {
					ease: Elastic.easeOut,
					scale: 1,
					opacity: 1,
					delay: e
				})
			}
		}, {
			key: "menuButtonOverHandler",
			value: function(e) {
				var t, i;
				0 === this.menuButtonState ? (this.tintColor == app.colors.white ? (t = app.colors.offBlack, i = app.colors.white) : (t = app.colors.white, i = app.colors.offBlack), TweenMax.set(this.menuButtonIconEl, {
					backgroundColor: t
				}), TweenMax.set(this.menuButtonTextEl, {
					color: i
				})) : (TweenMax.set(this.menuButtonIconEl, {
					scale: .1,
					opacity: 0
				}), TweenMax.to(this.menuButtonIconEl, 1, {
					ease: Elastic.easeOut,
					scale: 1,
					opacity: 1
				}))
			}
		}, {
			key: "menuButtonOutHandler",
			value: function(e) {
				var t, i;
				0 === this.menuButtonState && (this.tintColor == app.colors.white ? (t = app.colors.white, i = app.colors.offBlack) : (t = app.colors.offBlack, i = app.colors.white), TweenMax.set(this.menuButtonIconEl, {
					backgroundColor: t
				}), TweenMax.set(this.menuButtonTextEl, {
					color: i
				}))
			}
		}, {
			key: "menuButtonClickHandler",
			value: function(e) {
				var t = window.app.sideMenu;
				t.showing ? (t.toggleShowHide(), this.tintMenuButton(this.lastMenuToggleColor)) : (this.menuButtonOutHandler(), this.removeMenuButtonState(), setCookie("menu_button_helper", "true", 365), this.lastMenuToggleColor = getStyle(this.menuButtonIconEl, "backgroundColor"), this.tintMenuButton(window.app.colors.spotColor), t.toggleShowHide())
			}
		}, {
			key: "onScroll",
			value: function(e) {
				if (!app.disableTouchHeaderSlide && 20 <= app.scrollTop && app.scrollTop < getSize(document.body).height - app.innerHeight) {
					var t = app.scrollTop - this.lastScrollPosition;
					0 < t ? this.hide() : t < 0 && this.show(), this.lastScrollPosition = app.scrollTop
				}
			}
		}, {
			key: "show",
			value: function() {
				this.showing || (this.showing = !0, TweenMax.to(this.element, .3, {
					y: 0
				}))
			}
		}, {
			key: "hide",
			value: function() {
				this.showing && (this.showing = !1, TweenMax.to(this.element, .3, {
					y: -this.element.clientHeight
				}))
			}
		}, {
			key: "layout",
			value: function() {
				app.innerWidth <= app.bps["phone-upper-boundary"] && this.removeMenuButtonState()
			}
		}, {
			key: "showMenuButton",
			value: function() {
				this.menuButtonEl.style.display = "block"
			}
		}, {
			key: "hideMenuButton",
			value: function() {
				this.menuButtonEl.style.display = "none"
			}
		}, {
			key: "tint",
			value: function(e, t) {
				e = "white" == e ? app.colors.white : e, app.innerWidth < app.bps["phone-upper-boundary"] && !t || this.tintColor != e && (TweenMax.to([this.wtButtonPathEl, this.presentsLogoPathEl], .25, {
					fill: e
				}), this.tintMenuButton(e), this.lastTintColor = this.tintColor, this.tintColor = e)
			}
		}, {
			key: "showMobileBackground",
			value: function() {
				TweenMax.to(this.menuBackgroundEl, .25, {
					opacity: 1
				})
			}
		}, {
			key: "hideMobileBackground",
			value: function() {
				TweenMax.to(this.menuBackgroundEl, .25, {
					opacity: 0
				})
			}
		}, {
			key: "revertTint",
			value: function() {
				this.tint(this.lastTintColor)
			}
		}, {
			key: "removeMenuButtonState",
			value: function() {
				this.menuButtonState = 1, TweenMax.to(this.menuButtonIconEl, .3, {
					width: 16,
					height: 16
				}), TweenMax.to(this.menuButtonTextEl, .05, {
					autoAlpha: 0
				})
			}
		}, {
			key: "tintMenuButton",
			value: function(e) {
				if (app.sideMenu.showing) this.requestedColor = e;
				else {
					var t = this.requestedColor ? this.requestedColor : e,
						i = t != app.colors.white ? app.colors.white : app.colors.offBlack;
					TweenMax.to(this.menuButtonIconEl, .25, {
						backgroundColor: t
					}), TweenMax.to(this.menuButtonTextEl, .25, {
						color: i
					}), this.requestedColor = null
				}
			}
		}]), i
	}(),
	Footer = function(e) {
		function n(e) {
			_classCallCheck(this, n);
			var t = _possibleConstructorReturn(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e));
			t.wrapperEl = t.element.querySelector(".wrapper"), t.promoEl = t.element.querySelector(".promo"), t.categoriesEl = t.element.querySelector(".categories"), t.buttonsEl = t.element.querySelectorAll(".roundButton"), t.logoLight = !1, t.tracked;
			for (var i = 0; i < t.buttonsEl.length; i++) t.buttonsEl[i].addEventListener("click", function() {
				dataLayer.push({
					eventCategory: "WP_engagement",
					eventAction: "bottom click wetransfer",
					eventLabel: document.title,
					eventValue: void 0,
					eventNonInteraction: !1,
					event: "eventPush"
				})
			});
			return t
		}
		return _inherits(n, View), _createClass(n, [{
			key: "layout",
			value: function() {
				this.promoEl.style.height = app.innerHeight - getSize(this.categoriesEl).height + "px"
			}
		}, {
			key: "onScroll",
			value: function(e) {
				var t = getOffset(this.element).top - app.innerHeight;
				t < 0 && "fixed" != this.wrapperEl.style.position ? (this.wrapperEl.style.position = "fixed", this.tracked || "HomeSection" != app.sectionClass || (this.tracked = !0, __snowplow__("trackStructEvent", "home_page", "show_footer"))) : 0 <= t && "fixed" == this.wrapperEl.style.position && (this.wrapperEl.style.position = "static"), t <= 2 - app.innerHeight && !this.logoLight ? (this.logoLight = !0, app.header.tint(app.colors.white)) : t > 2 - app.innerHeight && this.logoLight && (this.logoLight = !1, app.header.tint(app.colors.offBlack))
			}
		}]), n
	}(),
	CoverModule = function(e) {
		function n(e) {
			_classCallCheck(this, n);
			var t = _possibleConstructorReturn(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e));
			if (t.topColor = document.querySelector(".section").getAttribute("data-topColor") || "#ffffff", t.bottomColor = document.querySelector(".section").getAttribute("data-bottomColor") || "#17181A", t.videoSize = {
					width: null,
					height: null,
					aspect: null
				}, t.isInFrame = !0, t.isImageLoaded = !1, t.isTransitionedIn = !1, t.paralaxEl, t.presentsLogoEl = t.element.querySelector(".presentsLogo"), t.primaryStoryEl = t.element.querySelector(".primaryStory"), t.visualsEl = t.element.querySelector(".visuals"), t.imageBackgroundEl = t.element.querySelector(".imageBackground"), preloadImages([t.imageBackgroundEl], null, t.onCoverImageLoadedHandler.bind(t)), t.videoBackgroundEl = t.element.querySelector(".videoBackground"), t.videoBackgroundFrameEl = t.element.querySelector(".videoBackground iframe"), t.videoBackgroundEl) {
				t.videoBackgroundPlayer = new VimeoPlayer(t.videoBackgroundFrameEl);
				var i = t;
				t.videoBackgroundPlayer.player.getVideoHeight().then(function(e) {
					i.setVideoSize(i.videoSize.width, e)
				}), t.videoBackgroundPlayer.player.getVideoWidth().then(function(e) {
					i.setVideoSize(e, i.videoSize.height)
				})
			}
			return t.downButtonEl = t.element.querySelector(".cover .downButton"), t.downButtonEl && t.downButtonEl.addEventListener("click", t.downHandler.bind(t)), t
		}
		return _inherits(n, View), _createClass(n, [{
			key: "layout",
			value: function() {
				if (this.videoBackgroundFrameEl && this.videoSize.aspect) {
					var e, t, i, n = 0;
					app.innerWidth / app.innerHeight < this.videoSize.aspect ? (i = -((t = (e = app.innerHeight) * this.videoSize.aspect) - app.innerWidth) / 2, n = 0) : (i = 0, n = -((e = (t = app.innerWidth) / this.videoSize.aspect) - app.innerHeight) / 2), this.element.style.height = app.innerHeight + "px", this.videoBackgroundFrameEl.style.height = Math.round(e) + "px", this.videoBackgroundFrameEl.style.width = Math.round(t) + "px", this.videoBackgroundFrameEl.style.left = Math.round(i) + "px", this.videoBackgroundFrameEl.style.top = Math.round(n) + "px"
				}
			}
		}, {
			key: "downHandler",
			value: function(e) {
				e.preventDefault(), this.gotoTitle()
			}
		}, {
			key: "gotoTitle",
			value: function() {
				var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 1,
					t = !isTouch();
				TweenMax.to(window, e, {
					scrollTo: {
						y: getSize(this.element).height,
						autoKill: t
					},
					ease: Power2.easeInOut
				})
			}
		}, {
			key: "setVideoSize",
			value: function(e, t) {
				this.videoSize.width = e, this.videoSize.height = t, this.videoSize.width && this.videoSize.height && (this.videoSize.aspect = this.videoSize.width / this.videoSize.height, this.layout())
			}
		}, {
			key: "onCoverImageLoadedHandler",
			value: function(e) {
				this.isImageLoaded = !0, this.isTransitionedIn || this.transitionIn()
			}
		}, {
			key: "transitionIn",
			value: function() {}
		}, {
			key: "setParalaxElement",
			value: function(e) {
				this.paralaxEl = e
			}
		}, {
			key: "onScroll",
			value: function(e) {
				if (this.showing && (app.scrollTop >= app.innerHeight ? this.isInFrame && (this.isInFrame = !1, TweenMax.killDelayedCallsTo(window.app.header.tint), app.header.tint(this.bottomColor, !0), app.header.showMobileBackground()) : this.isInFrame || (this.isInFrame = !0, app.header.tint(this.topColor, !0), app.header.hideMobileBackground()), this.paralaxEl)) {
					var t = 1 - app.scrollTop / app.innerHeight,
						i = -app.innerHeight / 2 * t.clamp(0, 1);
					0 <= i ? TweenMax.set(this.paralaxEl, {
						clearProps: "y"
					}) : TweenMax.set(this.paralaxEl, {
						y: i
					})
				}
			}
		}]), n
	}(),
	HomeCover = function(e) {
		function i(e) {
			_classCallCheck(this, i);
			var t = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, e));
			return t.downButtonElIntro = t.element.querySelector(".cover .foreground.intro .downButton"), t.downButtonElIntro && t.downButtonElIntro.addEventListener("click", t.downHandler.bind(t)), t
		}
		return _inherits(i, CoverModule), _createClass(i, [{
			key: "transitionIn",
			value: function() {
				var e = .5;
				this.isImageLoaded && (this.isTransitionedIn = !0, TweenMax.to(this.visualsEl, 1.25, {
					opacity: 1,
					delay: e
				}), TweenMax.to(this.downButtonEl, .5, {
					opacity: 1,
					delay: e
				}), e = 3, TweenMax.to(this.element.querySelector(".foreground.intro"), 1, {
					ease: Power2.easeInOut,
					height: 0,
					delay: e
				}), TweenMax.to(this.element.querySelector(".foreground.story"), 1, {
					ease: Power2.easeInOut,
					height: "100%",
					delay: e
				}), app.scrollTop < app.innerHeight && TweenMax.delayedCall(e + .7, window.app.header.tint, [this.topColor], window.app.header)), TweenMax.set(this.downButtonElIntro, {
					y: 20
				}), TweenMax.to(this.downButtonElIntro, .6, {
					opacity: 1,
					y: 0
				})
			}
		}]), i
	}(),
	DetailCover = function(e) {
		function s(e) {
			_classCallCheck(this, s);
			var t = _possibleConstructorReturn(this, (s.__proto__ || Object.getPrototypeOf(s)).call(this, e));
			t.tracked, t.downClicked, t.videoOverlaySize = {
				width: null,
				height: null,
				aspect: null
			}, t.taglineOverlayEl = t.element.querySelector(".taglineOverlay"), t.playButtonEl = t.element.querySelector(".cover .playButton"), t.pauseButtonEl = t.element.querySelector(".cover .pauseButton"), t.playButtonEl && t.playButtonEl.addEventListener("click", t.playClickHandler.bind(t)), t.pauseButtonEl && t.pauseButtonEl.addEventListener("click", t.pauseClickHandler.bind(t)), t.advertiserBar = t.element.querySelector(".advertiserBar");
			var i = t.element.querySelector(".cover .mixcloudOverlay");
			if (i && (t.mixcloudCoverPlayer = new MixcloudPlayer(i)), t.videoOverlayEl = t.element.querySelector(".cover .videoOverlay"), t.videoOverlayFrameEl = t.element.querySelector(".cover .videoOverlay iframe"), t.videoOverlayEl) {
				var n = t.videoOverlayFrameEl.getAttribute("data-src");
				isTouch() || (n += "&background=1"), t.videoOverlayFrameEl.setAttribute("src", n), t.vimeoCoverPlayer = new VimeoPlayer(t.videoOverlayEl);
				var r = t;
				t.vimeoCoverPlayer.player.getVideoHeight().then(function(e) {
					r.setVideoOverlaySize(r.videoOverlaySize.width, e)
				}), t.vimeoCoverPlayer.player.getVideoWidth().then(function(e) {
					r.setVideoOverlaySize(e, r.videoOverlaySize.height)
				}), t.closeButtonEl = t.videoOverlayEl.querySelector(".closeButton"), t.closeButtonEl.addEventListener("click", t.closeVideoOverlayHandler.bind(t))
			}
			return t
		}
		return _inherits(s, CoverModule), _createClass(s, [{
			key: "playClickHandler",
			value: function(e) {
				this.mixcloudCoverPlayer ? (this.playButtonEl.style.display = "none", this.mixcloudCoverPlayer.togglePlay()) : this.vimeoCoverPlayer && (this.vimeoCoverPlayer.play(), this.vimeoCoverPlayer.show(), window.scrollTo(0, 0), document.body.style["overflow-y"] = "hidden", document.querySelector("#scroller, header .presentsLogo").style.display = "none", document.querySelector("header").style.width = "50px", window.app.header.hideMenuButton())
			}
		}, {
			key: "pauseClickHandler",
			value: function() {
				this.vimeoCoverPlayer && this.vimeoCoverPlayer.pause()
			}
		}, {
			key: "closeVideoOverlayHandler",
			value: function() {
				this.vimeoCoverPlayer.pause(), this.vimeoCoverPlayer.hide(), window.app.header.showMenuButton(), document.body.style["overflow-y"] = "scroll", document.querySelector("#scroller, header .presentsLogo").style.removeProperty("display"), document.querySelector("header").style.removeProperty("width")
			}
		}, {
			key: "layout",
			value: function() {
				if (_get(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "layout", this).call(this), this.videoOverlayFrameEl && this.videoOverlaySize && this.videoOverlaySize.aspect) {
					var e, t, i, n = 0;
					app.innerWidth / app.innerHeight < this.videoOverlaySize.aspect && app.innerWidth > app.innerHeight ? (i = -((t = (e = app.innerHeight) * this.videoOverlaySize.aspect) - app.innerWidth) / 2, n = 0) : (i = 0, n = -((e = (t = app.innerWidth) / this.videoOverlaySize.aspect) - app.innerHeight) / 2), this.videoOverlayFrameEl.style.height = Math.round(e) + "px", this.videoOverlayFrameEl.style.width = Math.round(t) + "px", this.videoOverlayFrameEl.style.left = Math.round(i) + "px", this.videoOverlayFrameEl.style.top = Math.round(n) + "px"
				}
			}
		}, {
			key: "setVideoOverlaySize",
			value: function(e, t) {
				this.videoOverlaySize.width = e, this.videoOverlaySize.height = t, this.videoOverlaySize.width && this.videoOverlaySize.height && (this.videoOverlaySize.aspect = this.videoOverlaySize.width / this.videoOverlaySize.height, this.layout())
			}
		}, {
			key: "transitionIn",
			value: function() {
				this.isImageLoaded && (this.isTransitionedIn = !0, app.scrollTop < app.innerHeight && TweenMax.delayedCall(2, window.app.header.tint, [this.topColor], window.app.header), TweenMax.to(this.presentsLogoEl.querySelector("path"), .25, {
					fill: this.topColor,
					delay: 2
				}), TweenMax.to(this.taglineOverlayEl, 1, {
					backgroundColor: "rgba(0,0,0,0.7)"
				}), TweenMax.to(this.taglineOverlayEl, .5, {
					backgroundColor: "rgba(0,0,0,0)",
					delay: 2
				}), TweenMax.to(this.taglineOverlayEl.querySelector(".tagline"), .4, {
					y: 20,
					opacity: 0,
					delay: 2
				}), this.playButtonEl && TweenMax.to(this.playButtonEl, .6, {
					opacity: 1,
					delay: 2.3
				}), TweenMax.set(this.downButtonEl, {
					y: 20
				}), TweenMax.to(this.downButtonEl, .6, {
					opacity: 1,
					y: 0,
					delay: 2.3
				}), this.advertiserBar && TweenMax.to(this.advertiserBar, .6, {
					opacity: 1,
					delay: 2.3
				}))
			}
		}, {
			key: "onScroll",
			value: function(e) {
				app.scrollTop >= app.innerHeight && !this.tracked && !this.downClicked && (this.tracked = !0, __snowplow__("trackStructEvent", "article", "scroll_down")), _get(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "onScroll", this).call(this, e)
			}
		}, {
			key: "downHandler",
			value: function(e) {
				_get(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "downHandler", this).call(this, e), this.downClicked = !0, __snowplow__("trackStructEvent", "article", "click_down")
			}
		}]), s
	}(),
	AboutCover = function(e) {
		function t(e) {
			return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e))
		}
		return _inherits(t, CoverModule), _createClass(t, [{
			key: "transitionIn",
			value: function() {}
		}]), t
	}(),
	FeedLoader = function(e) {
		function i(e) {
			_classCallCheck(this, i);
			var t = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, e));
			return t.colors = ["#FF825D", "#FFBE00", "#36EB8E", "#409FFF", "#C836FF"], t.circlesEl = t.element.querySelectorAll(".circle"), t.buttonEl = t.element.querySelector("button"), t.buttonEl.addEventListener("mouseenter", t.onMouseEnter.bind(t)), t.buttonEl.addEventListener("mouseleave", t.onMouseLeave.bind(t)), t
		}
		return _inherits(i, View), _createClass(i, [{
			key: "show",
			value: function() {
				this.buttonEl.style.visibility = "visible"
			}
		}, {
			key: "hide",
			value: function() {
				this.buttonEl.style.visibility = "hidden"
			}
		}, {
			key: "start",
			value: function() {}
		}, {
			key: "onMouseEnter",
			value: function(e) {
				TweenMax.to(this.circlesEl[0], .25, {
					ease: Power1.easeInOut,
					y: -10,
					yoyo: !0,
					repeat: 1
				}), TweenMax.to(this.circlesEl[1], .25, {
					ease: Power1.easeInOut,
					y: -10,
					yoyo: !0,
					repeat: 1,
					delay: .1
				}), TweenMax.to(this.circlesEl[2], .25, {
					ease: Power1.easeInOut,
					y: -10,
					yoyo: !0,
					repeat: 1,
					delay: .2
				})
			}
		}, {
			key: "onMouseLeave",
			value: function(e) {}
		}]), i
	}(),
	FeedCards = function(e) {
		function i(e) {
			_classCallCheck(this, i);
			var t = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, e));
			return t.updateElements(), t
		}
		return _inherits(i, View), _createClass(i, [{
			key: "updateElements",
			value: function() {
				this.feedCardsEl = this.element.querySelectorAll(".feedCard")
			}
		}, {
			key: "setHeadingHeights",
			value: function() {
				for (var e = [], t = 0, i = 0, n = 0; n < this.feedCardsEl.length; n++) {
					var r = this.feedCardsEl[n],
						s = parseInt(r.getAttribute("data-colspan")),
						o = r.querySelector(".imageWrapper"),
						a = r.querySelector("img"),
						l = a.getAttribute("data-width") / a.getAttribute("data-height");
					if (o.style.height = getSize(r.querySelector(".wrapper")).width / l + "px", app.innerWidth < app.bps["tablet-portrait-upper-boundary"] && (s = 50, n % 3 != 0 && 0 != n || (s = 100)), 100 < (t += s) || n == this.feedCardsEl.length - 1) {
						0,
						n == this.feedCardsEl.length - 1 && (i = Math.max(i, parseInt(r.querySelector("h4").clientHeight, 10)), e.push(r));
						for (var h = 0; h < e.length; h++) e[h].querySelector("h4").style.height = i + "px";e = [],
						t = s,
						i = 0
					}
					i = Math.max(i, parseInt(r.querySelector("h4").clientHeight, 10)), e.push(r)
				}
			}
		}]), i
	}(),
	LatestStories = function(e) {
		function i(e) {
			_classCallCheck(this, i);
			var t = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, e));
			return t.entryPage = 0, t.maskPage = 1, t.gridEl = e.querySelector(".gridFull"), t.maskEl = e.querySelector(".mask"), t.dimmerEl = e.querySelector(".dimmer"), t.msnry = new Masonry(t.gridEl, {
				transitionDuration: 0,
				percentPosition: !0,
				itemSelector: ".latestStoryEntry",
				gutter: 10
			}), t.entriesToLoad = [], t.hasAllEntries = !1, t.feedLoaderClicked = !1, t.feedLoader = new FeedLoader(e.querySelector(".feedLoader")), t.feedLoader.buttonEl.addEventListener("click", t.onFeedLoaderClick.bind(t)), ServiceController.addEventListener(ServiceController.GET_LATEST_STORIES_COMPLETE, t.getLatestStoriesCompleteHandler.bind(t)), t.loadNextPage(), t
		}
		return _inherits(i, View), _createClass(i, [{
			key: "layout",
			value: function() {
				for (var e = this.gridEl.querySelectorAll(".latestStoryEntry"), t = 0; t < e.length; t++) {
					var i = e[t].querySelector("img");
					i.style.height = getSize(i).width / i.getAttribute("data-aspect-ratio") + "px"
				}
				this.msnry.layout(), this.doEntriesFillGrid() || this.loadNextPage()
			}
		}, {
			key: "onScroll",
			value: function(e) {
				if (this.checkEntriesToLoad(), !isTouch()) {
					var t = 1 - app.scrollTop / window.innerHeightHalf;
					this.dimmerEl.style.opacity = t.clamp(0, 1)
				}
			}
		}, {
			key: "onFeedLoaderClick",
			value: function(e) {
				this.feedLoaderClicked || (__snowplow__("trackStructEvent", "home_page", "click_expand", "recent_published"), this.feedLoaderClicked = !0, this.maskPage++, this.loadNextPage())
			}
		}, {
			key: "loadNextPage",
			value: function() {
				ServiceController.gettingLatestStories || (this.hasAllEntries && this.feedLoaderClicked ? this.expandMask() : (this.entryPage++, ServiceController.getLatestStories(this.entryPage)))
			}
		}, {
			key: "getLatestStoriesCompleteHandler",
			value: function(e) {
				var t = e.data.querySelectorAll(".latestStoryEntry");
				if (0 == t.length) this.hasAllEntries = !0;
				else {
					for (var i = 0; i < t.length; i++) this.gridEl.appendChild(t[i]), this.entriesToLoad.push(t[i]);
					this.msnry.appended(t), this.layout()
				}
				this.doEntriesFillGrid() ? this.feedLoaderClicked && this.expandMask() : this.loadNextPage(), this.onScroll()
			}
		}, {
			key: "expandMask",
			value: function() {
				app.disableTouchHeaderSlide = !0, this.feedLoaderClicked = !1;
				var e = this.getMaskHeight();
				!this.doEntriesFillGrid() && this.hasAllEntries && (e = this.gridEl.clientHeight, this.feedLoader.hide()), TweenMax.to(this.maskEl, 1, {
					ease: Power2.easeInOut,
					height: e,
					onComplete: this.maskAnimateComplete.bind(this)
				});
				var t = !isTouch();
				TweenMax.to(window, 1, {
					ease: Power2.easeInOut,
					scrollTo: {
						y: getPosition(this.feedLoader.element).top,
						autoKill: t
					}
				})
			}
		}, {
			key: "maskAnimateComplete",
			value: function() {
				app.disableTouchHeaderSlide = !1, !this.doEntriesFillGrid() && this.hasAllEntries && (this.maskEl.style.height = "auto")
			}
		}, {
			key: "getMaskHeight",
			value: function() {
				return 2 * app.innerHeight + app.innerHeight * (this.maskPage - 1) * 3
			}
		}, {
			key: "doEntriesFillGrid",
			value: function() {
				return !(this.getMaskHeight() > this.gridEl.clientHeight - app.innerHeight)
			}
		}, {
			key: "checkEntriesToLoad",
			value: function() {
				for (var e = this.entriesToLoad.length - 1; - 1 < e; e--) {
					var t = this.entriesToLoad[e],
						i = getOffset(t).top,
						n = i + app.scrollTop,
						r = getPosition(this.maskEl).top;
					if (i < app.innerHeight && n < this.maskEl.clientHeight + r) {
						var s = t.querySelector("img");
						preloadImages([s], null, this.transitionInImage.bind(this), s), this.entriesToLoad.splice(e, 1)
					}
				}
			}
		}, {
			key: "transitionInImage",
			value: function(e) {
				TweenMax.to(e, .3, {
					opacity: 1,
					delay: .2 * Math.random()
				})
			}
		}]), i
	}(),
	SideDockedImageCards = function(e) {
		function n(e, t) {
			_classCallCheck(this, n);
			var i = _possibleConstructorReturn(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e));
			return i.id = e.dataset.id, i.tracked, i.gridEl = e.querySelector(".gridFull"), i.imageWrappers = i.element.querySelectorAll(".imageWrapper"), i.cardsEl = i.element.querySelectorAll(".sideDockedImageCard"), i.feedLoader = new FeedLoader(e.querySelector(".feedLoader")), i.feedLoader.buttonEl.addEventListener("click", i.onFeedLoaderClick.bind(i)), i.maskedAmount, t < i.imageWrappers.length && (i.maskedAmount = t), i.maskedAmount || i.feedLoader.hide(), i
		}
		return _inherits(n, View), _createClass(n, [{
			key: "layout",
			value: function() {
				for (var e = 0; e < this.imageWrappers.length; e++) {
					var t = this.imageWrappers[e],
						i = t.querySelector("img"),
						n = i.getAttribute("data-width") / i.getAttribute("data-height");
					t.style.height = t.clientWidth / n + "px"
				}
				this.maskedAmount ? this.gridEl.style.height = this.getHeightOfMaskedItems() + "px" : this.gridEl.style.height = "auto"
			}
		}, {
			key: "getHeightOfMaskedItems",
			value: function() {
				var e = 0;
				if (this.maskedAmount)
					for (var t = 0; t < this.maskedAmount; t++) {
						var i = this.cardsEl[t],
							n = getComputedStyle(i);
						e < (r = i.offsetTop + parseInt(n.height) + parseInt(n.marginBottom) - 2) && (e = r)
					} else {
						var r = this.gridEl.style.height;
						this.gridEl.style.height = "auto";
						n = getComputedStyle(this.gridEl);
						e = parseInt(n.height), this.gridEl.style.height = r
					}
				return e
			}
		}, {
			key: "onFeedLoaderClick",
			value: function(e) {
				this.maskedAmount = null, this.feedLoader.hide(), TweenMax.to(this.gridEl, 1, {
					ease: Power2.easeInOut,
					height: this.getHeightOfMaskedItems(),
					onComplete: this.maskAnimateComplete.bind(this)
				});
				var t = !isTouch();
				TweenMax.to(window, 1, {
					ease: Power2.easeInOut,
					scrollTo: {
						y: getPosition(this.feedLoader.element).top,
						autoKill: t
					}
				})
			}
		}, {
			key: "maskAnimateComplete",
			value: function() {
				window.app.resizeHandler()
			}
		}, {
			key: "onScroll",
			value: function(e) {
				for (var t = 0; t < this.imageWrappers.length; t++) {
					var i = this.imageWrappers[t];
					if (!i.showing && (t < this.maskedAmount || !this.maskedAmount) && getOffset(i).top < app.innerHeight) {
						i.showing = !0, this.tracked || "staff_picks" != this.id || (this.tracked = !0, __snowplow__("trackStructEvent", "home_page", "show_section", this.id));
						var n = i.querySelector("img");
						preloadImages([n], null, this.transitionInImage.bind(this), n)
					}
				}
			}
		}, {
			key: "transitionInImage",
			value: function(e) {
				TweenMax.to(e, .5, {
					opacity: 1
				})
			}
		}]), n
	}(),
	SkyscraperCardsGrid = function(e) {
		function r(e, t) {
			_classCallCheck(this, r);
			var i = _possibleConstructorReturn(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, e));
			i.id = e.dataset.id, i.tracked, i.feedCardsEl = i.element.querySelectorAll(".skyscraperCard"), i.feedCardsArr = Array.from(i.feedCardsEl), i.skyscraperCardsEl = i.element.querySelector(".skyscraperCards"), i.gridEl = i.skyscraperCardsEl.querySelector(".gridInlay"), i.feedLoader = new FeedLoader(i.element.querySelector(".feedLoader")), i.feedLoader.buttonEl.addEventListener("click", i.onFeedLoaderClick.bind(i));
			for (var n = 0; n < i.feedCardsEl.length; n++) i.feedCardsEl[n].wrapper = i.feedCardsEl[n].querySelector(".wrapper"), i.feedCardsEl[n].textWrapper = i.feedCardsEl[n].querySelector(".textWrapper"), i.feedCardsEl[n].imageWrapper = i.feedCardsEl[n].querySelector(".imageWrapper"), i.feedCardsEl[n].image = i.feedCardsEl[n].querySelector("img");
			return i.maskedAmount, t < i.feedCardsEl.length && (i.maskedAmount = t), i.maskedAmount || i.feedLoader.hide(), i
		}
		return _inherits(r, View), _createClass(r, [{
			key: "layout",
			value: function() {
				this.setHeadingHeights(), this.maskedAmount ? this.gridEl.style.height = this.getHeightOfMaskedItems() + "px" : this.gridEl.style.height = "auto"
			}
		}, {
			key: "onScroll",
			value: function() {
				for (var e = 0; e < this.feedCardsEl.length; e++) {
					var t = this.feedCardsEl[e];
					!t.showing && (e < this.maskedAmount || !this.maskedAmount) && getOffset(t).top < app.innerHeight && (this.tracked || "film" != this.id || (this.tracked = !0, __snowplow__("trackStructEvent", "home_page", "show_section", this.id)), t.showing = !0, preloadImages([t.image], null, this.transitionInCard.bind(this), t))
				}
			}
		}, {
			key: "onFeedLoaderClick",
			value: function(e) {
				this.maskedAmount = null, this.feedLoader.hide(), TweenMax.to(this.gridEl, 1, {
					ease: Power2.easeInOut,
					height: this.getHeightOfMaskedItems(),
					onComplete: this.maskAnimateComplete.bind(this)
				});
				var t = !isTouch();
				TweenMax.to(window, 1, {
					ease: Power2.easeInOut,
					scrollTo: {
						y: getPosition(this.feedLoader.element).top,
						autoKill: t
					}
				})
			}
		}, {
			key: "maskAnimateComplete",
			value: function() {
				window.app.resizeHandler()
			}
		}, {
			key: "transitionInCard",
			value: function(e) {
				TweenMax.to(e.querySelector("img"), .5, {
					opacity: 1
				})
			}
		}, {
			key: "getHeightOfMaskedItems",
			value: function() {
				var e = 0;
				if (this.maskedAmount)
					for (var t = 0; t < this.maskedAmount; t++) {
						var i = this.feedCardsEl[t],
							n = getComputedStyle(i);
						e < (r = i.offsetTop + parseInt(n.height) + parseInt(n.marginBottom) - 2) && (e = r)
					} else {
						var r = this.gridEl.style.height;
						this.gridEl.style.height = "auto";
						n = getComputedStyle(this.gridEl);
						e = parseInt(n.height), this.gridEl.style.height = r
					}
				return e
			}
		}, {
			key: "setHeadingHeights",
			value: function() {
				for (var e = 0; e < this.feedCardsArr.length; e++) {
					var t = getColspan(this.feedCardsArr[e]),
						i = this.feedCardsArr.slice(e, e + t),
						n = Math.max.apply(Math, i.map(function(e) {
							return e.textWrapper.style.height = "auto", e.textWrapper.clientHeight
						}));
					i.map(function(e) {
						e.imageWrapper.style.height = getSize(e.wrapper).width / e.image.getAttribute("data-ar") + "px", e.textWrapper.style.height = n + "px"
					}), e += t - 1
				}
			}
		}]), r
	}(),
	CarouselModule = function(e) {
		function i(e) {
			_classCallCheck(this, i);
			var t = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, e));
			return t.dragging = !1, t.dragMade = !1, t.draggingHorizontal = !1, t.loadRequested, t.dragStartMouse = {
				x: 0,
				y: 0
			}, t.dragStartPosition = {
				x: 0,
				y: 0
			}, t.dragLastMouse = {
				x: 0,
				y: 0
			}, t.oldPosition = {
				x: 0,
				y: 0
			}, t.delta = {
				x: 0,
				y: 0
			}, t.currentIndex = 0, t.currentDirection = -1, t.margin = 25, t.swipeThreshold = 50, t.onDragStopHandlerFunction = t.onDragStopHandler.bind(t), t.nextButtonEl = t.element.querySelector(".nextButton"), t.previousButtonEl = t.element.querySelector(".previousButton"), t.slidesContainerEl = t.element.querySelector(".slides"), t.slidesEl = t.element.querySelectorAll(".slide"), t.menuEl = t.element.querySelector(".menu"), t.nextButtonEl.addEventListener("click", t.onNextHandler.bind(t)), t.previousButtonEl.addEventListener("click", t.onPreviousHandler.bind(t)), t.slidesContainerEl.addEventListener("touchstart", t.onDragStartHandler.bind(t)), t.slidesContainerEl.addEventListener("touchmove", t.onDragHandler.bind(t)), t.menuEl && t.createMenu(), t
		}
		return _inherits(i, View), _createClass(i, [{
			key: "layout",
			value: function() {
				for (var e = 0, t = 0; t < this.slidesEl.length; t++) {
					var i = this.slidesEl[t],
						n = i.getAttribute("data-width") / i.getAttribute("data-height");
					isNaN(n) && (n = 1);
					var r = getSize(this.slidesContainerEl).height * n;
					i.style.width = Math.floor(r) + "px", i.style.left = Math.floor(e) + "px", e += r + this.margin
				}
				this.slidesContainerEl.style.width = Math.floor(e) + "px", this.gotoIndex(this.currentIndex, !0), this.checkLoop()
			}
		}, {
			key: "onScroll",
			value: function(e) {
				!this.loadRequested && getOffset(this.element).top < app.innerHeight + 500 && (this.loadRequested = !0, preloadImages(this.element.querySelectorAll("img"), this.onImageProgress.bind(this)))
			}
		}, {
			key: "createMenu",
			value: function() {
				if (this.menuEl) {
					for (var e = 0; e < this.slidesEl.length; e++) {
						var t = document.createElement("li");
						this.menuEl.appendChild(t)
					}
					this.setActiveMenuItem()
				}
			}
		}, {
			key: "setActiveMenuItem",
			value: function() {
				if (this.menuEl) {
					for (var e = 0; e < this.menuEl.childNodes.length; e++) this.menuEl.childNodes[e].classList.remove("active");
					this.menuEl.childNodes[this.currentIndex].classList.add("active")
				}
			}
		}, {
			key: "onImageProgress",
			value: function(e, t, i) {
				TweenMax.set(i, {
					opacity: 0
				}), TweenMax.to(i, 1, {
					opacity: 1,
					clearProps: "opacity"
				}), app.resizeHandler()
			}
		}, {
			key: "onNextHandler",
			value: function(e) {
				this.next()
			}
		}, {
			key: "onPreviousHandler",
			value: function(e) {
				this.previous()
			}
		}, {
			key: "onDragStartHandler",
			value: function(e) {
				this.dragStartMouse = {
					x: e.touches[0].clientX,
					y: e.touches[0].clientY
				}, this.dragStartPosition = {
					x: this.slidesContainerEl._gsTransform.x,
					y: this.slidesContainerEl._gsTransform.y
				}, this.dragging = !0, document.removeEventListener("touchend", this.onDragStopHandlerFunction), document.addEventListener("touchend", this.onDragStopHandlerFunction)
			}
		}, {
			key: "onDragHandler",
			value: function(e) {
				this.delta.x = this.dragStartMouse.x - e.touches[0].clientX, this.delta.y = this.dragStartMouse.y - e.touches[0].clientY, Math.abs(this.delta.x) > Math.abs(this.delta.y) && (this.draggingHorizontal = !0), this.dragging && this.draggingHorizontal && (e.preventDefault(), TweenMax.set(this.slidesContainerEl, {
					x: Math.floor(this.dragStartPosition.x - this.delta.x)
				}), this.dragMade = !0, this.checkLoop(), this.dragLastMouse.x = e.touches[0].clientX)
			}
		}, {
			key: "onDragStopHandler",
			value: function(e) {
				(document.removeEventListener("touchend", this.onDragStopHandlerFunction), this.dragMade) ? this.dragLastMouse.x < this.dragStartMouse.x && Math.abs(this.delta.x) > this.swipeThreshold ? this.next() : this.dragLastMouse.x > this.dragStartMouse.x && Math.abs(this.delta.x) > this.swipeThreshold ? this.previous() : this.gotoIndex(this.currentIndex): TweenMax.isTweening(this.slidesContainerEl) || e.target.closest(".slide").click();
				this.dragging = !1, this.dragMade = !1, this.draggingHorizontal = !1
			}
		}, {
			key: "next",
			value: function() {
				this.currentIndex + 1 > this.slidesEl.length - 1 ? this.gotoIndex(0) : this.gotoIndex(this.currentIndex + 1)
			}
		}, {
			key: "previous",
			value: function() {
				this.currentIndex - 1 < 0 ? this.gotoIndex(this.slidesEl.length - 1) : this.gotoIndex(this.currentIndex - 1)
			}
		}, {
			key: "gotoIndex",
			value: function(e, t) {
				this.currentIndex = e;
				var i = t ? 0 : .7,
					n = Power2.easeOut,
					r = this.slidesEl[this.currentIndex],
					s = getPosition(this.slidesContainerEl).left - getPosition(r).left + app.innerWidth / 2 - getSize(r).width / 2,
					o = this;
				TweenMax.to(this.slidesContainerEl, i, {
					x: Math.floor(s),
					ease: n,
					onUpdate: function() {
						o.checkLoop()
					}
				}), this.setActiveMenuItem()
			}
		}, {
			key: "checkLoop",
			value: function() {
				this.currentDirection = this.slidesContainerEl._gsTransform.x >= this.oldPosition.x ? -1 : 1;
				for (var e = this.slidesEl.length - 1; - 1 < e; e--) {
					var t = this.slidesEl[e],
						i = getPosition(t).left; - 1 == this.currentDirection && i > app.innerWidth ? t.style.left = i - getSize(this.slidesContainerEl).width - getPosition(this.slidesContainerEl).left + "px" : 1 == this.currentDirection && i < -app.innerWidth && (t.style.left = i + getSize(this.slidesContainerEl).width - getPosition(this.slidesContainerEl).left + "px")
				}
				this.oldPosition.x = this.slidesContainerEl._gsTransform.x
			}
		}]), i
	}(),
	FullBleedCarouselModule = function(e) {
		function i(e) {
			_classCallCheck(this, i);
			var t = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, e));
			return t.wrapperEl = e.querySelector(".wrapper"), t.isLogoLight, t.isVisible, t.arrowsShowing, t.headerColor = app.colors.white, t.headerColorOut = window.app.colors.offBlack, t
		}
		return _inherits(i, CarouselModule), _createClass(i, [{
			key: "layout",
			value: function() {
				for (var e = 0, t = 0; t < this.slidesEl.length; t++) {
					var i = this.slidesEl[t],
						n = app.innerWidth;
					i.style.width = Math.floor(n) + "px", i.style.left = Math.floor(e) + "px", e += n
				}
				this.slidesContainerEl.style.width = Math.floor(e) + "px", this.gotoIndex(this.currentIndex, !0), this.checkLoop()
			}
		}, {
			key: "onScroll",
			value: function(e) {
				var t = getOffset(this.element).top,
					i = isTouch() ? window.screen.height : app.innerHeight;
				return t <= 1 && t >= -app.innerHeight ? this.isLogoLight || (this.isLogoLight = !0, app.header.tint(this.headerColor)) : this.isLogoLight && (this.isLogoLight = !1, app.header.tint(this.headerColorOut)), t < -i || i < t ? this.isVisible && (this.isVisible = !1, this.wrapperEl.style.position = "relative", this.slidesStop()) : (isTouch() || TweenMax.set(this.wrapperEl, {
					y: t / 8
				}), this.isVisible || (this.isVisible = !0, this.wrapperEl.style.position = "fixed", this.slidesStart())), t < .25 * i && .25 * -i < t ? this.arrowsShowing || (this.arrowsShowing = !0, TweenMax.to([this.nextButtonEl, this.previousButtonEl], .3, {
					opacity: 1,
					x: 0
				})) : this.arrowsShowing && (this.arrowsShowing = !1, TweenMax.to(this.nextButtonEl, .3, {
					opacity: 0,
					x: 20
				}), TweenMax.to(this.previousButtonEl, .3, {
					opacity: 0,
					x: -20
				})), t
			}
		}, {
			key: "next",
			value: function() {
				_get(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "next", this).call(this), isTouch() || TweenMax.to(window, .5, {
					scrollTo: getPosition(this.element).top
				})
			}
		}, {
			key: "previous",
			value: function() {
				_get(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "previous", this).call(this), isTouch() || TweenMax.to(window, .5, {
					scrollTo: getPosition(this.element).top
				})
			}
		}, {
			key: "slidesStart",
			value: function() {}
		}, {
			key: "slidesStop",
			value: function() {}
		}]), i
	}(),
	BannerCarouselModule = function(e) {
		function i(e) {
			_classCallCheck(this, i);
			var t = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, e));
			return t.bannerSlides = Array.from(t.element.querySelectorAll(".slide")).map(function(e) {
				return new BannerSlide(e)
			}), t.foregroundTransitioned, "Black" == e.getAttribute("data-header-color") && (t.headerColor = window.app.colors.offBlack), t
		}
		return _inherits(i, FullBleedCarouselModule), _createClass(i, [{
			key: "layout",
			value: function() {
				this.bannerSlides.map(function(e) {
					return e.layout()
				}), _get(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "layout", this).call(this)
			}
		}, {
			key: "onScroll",
			value: function(e) {
				var t = _get(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "onScroll", this).call(this, e);
				t < window.innerHeightHalf && t > -window.innerHeightHalf && (this.foregroundTransitioned || (this.foregroundTransitioned = !0, this.bannerSlides[this.currentIndex].scrollTransitionIn()))
			}
		}, {
			key: "next",
			value: function() {
				this.bannerSlides[this.currentIndex].slideTransitionOut(), _get(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "next", this).call(this), this.bannerSlides[this.currentIndex].slideTransitionIn(1)
			}
		}, {
			key: "previous",
			value: function() {
				this.bannerSlides[this.currentIndex].slideTransitionOut(), _get(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "previous", this).call(this), this.bannerSlides[this.currentIndex].slideTransitionIn(.5)
			}
		}, {
			key: "slidesStart",
			value: function() {
				this.bannerSlides.map(function(e) {
					return e.start()
				})
			}
		}, {
			key: "slidesStop",
			value: function() {
				this.bannerSlides.map(function(e) {
					return e.stop()
				})
			}
		}]), i
	}(),
	BannerSlide = function(e) {
		function s(e) {
			_classCallCheck(this, s);
			var t = _possibleConstructorReturn(this, (s.__proto__ || Object.getPrototypeOf(s)).call(this, e));
			return t.imageBackgroundEl = e.querySelector(".backgroundImage"), t.videoBackgroundEl = e.querySelector(".backgroundVideo"), t.videoBackgroundFrameEl = e.querySelector(".backgroundVideo iframe"), t.foregroundEl = e.querySelector(".foreground"), t.foregroundImgEl = e.querySelector(".foreground img"), t.videoSize = {
				width: null,
				height: null,
				aspect: null
			}, t.vimeoPlayer, t.loadRequested, t.started, t
		}
		return _inherits(s, View), _createClass(s, [{
			key: "layout",
			value: function() {
				_get(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "layout", this).call(this);
				var e = isTouch() ? window.screen.height : app.innerHeight;
				if (this.vimeoPlayer && this.videoSize.aspect) {
					var t, i, n, r = 0;
					app.innerWidth / e < this.videoSize.aspect ? (n = -((i = (t = e) * this.videoSize.aspect) - app.innerWidth) / 2, r = 0) : (n = 0, r = -((t = (i = app.innerWidth) / this.videoSize.aspect) - e) / 2), this.videoBackgroundFrameEl.style.height = Math.round(t) + "px", this.videoBackgroundFrameEl.style.width = Math.round(i) + "px", this.videoBackgroundEl.style.left = Math.round(n) + "px", this.videoBackgroundEl.style.top = Math.round(r) + "px"
				}
			}
		}, {
			key: "start",
			value: function() {
				this.started || (this.started = !0, this.load(), this.vimeoPlayer && this.vimeoPlayer.play())
			}
		}, {
			key: "stop",
			value: function() {
				this.started && (this.started = !1, this.vimeoPlayer && this.vimeoPlayer.pause())
			}
		}, {
			key: "load",
			value: function() {
				this.loadRequested || (this.loadRequested = !0, this.element.classList.add("load"), this.imageBackgroundEl ? (this.foregroundImgEl && preloadImages([this.foregroundImgEl]), this.onImageBackgroundLoadComplete()) : this.transitionInImageComplete())
			}
		}, {
			key: "setVideoSize",
			value: function(e, t) {
				this.videoSize.width = e, this.videoSize.height = t, this.videoSize.width && this.videoSize.height && (this.videoSize.aspect = this.videoSize.width / this.videoSize.height, this.layout())
			}
		}, {
			key: "onImageBackgroundLoadComplete",
			value: function() {
				this.transitionInImage(this.imageBackgroundEl)
			}
		}, {
			key: "transitionInImage",
			value: function(e) {
				TweenMax.to(e, .5, {
					opacity: 1,
					onComplete: this.transitionInImageComplete.bind(this)
				})
			}
		}, {
			key: "transitionInImageComplete",
			value: function() {
				if (this.videoBackgroundFrameEl && !this.vimeoPlayer) {
					var e = this.videoBackgroundFrameEl.getAttribute("data-src");
					this.videoBackgroundFrameEl.setAttribute("src", e), this.vimeoPlayer = new VimeoPlayer(this.videoBackgroundFrameEl);
					var t = this;
					this.vimeoPlayer.player.getVideoHeight().then(function(e) {
						t.setVideoSize(t.videoSize.width, e)
					}), this.vimeoPlayer.player.getVideoWidth().then(function(e) {
						t.setVideoSize(e, t.videoSize.height)
					}), this.layout()
				}
			}
		}, {
			key: "scrollTransitionIn",
			value: function() {
				TweenMax.to(this.foregroundEl, .3, {
					opacity: 1
				})
			}
		}, {
			key: "scrollTransitionOut",
			value: function() {
				TweenMax.to(this.foregroundEl, .3, {
					opacity: 0
				})
			}
		}, {
			key: "slideTransitionIn",
			value: function(e) {
				TweenMax.set(this.foregroundEl, {
					opacity: 0
				}), TweenMax.to(this.foregroundEl, .5, {
					opacity: 1,
					delay: e
				})
			}
		}, {
			key: "slideTransitionOut",
			value: function(e) {
				TweenMax.killTweensOf(this.foregroundEl), TweenMax.to(this.foregroundEl, .5, {
					opacity: 0,
					delay: e
				})
			}
		}]), s
	}(),
	SocialCarouselModule = function(e) {
		function n(e) {
			_classCallCheck(this, n);
			var t = _possibleConstructorReturn(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e));
			t.backgroundEl = e.querySelector(".background");
			var i = t.slidesEl[t.currentIndex].getAttribute("data-background-color");
			return t.setBackgroundColor(i), t.newsletterElement = e.querySelector(".newsletter"), t.newsletterFormElement = t.newsletterElement.querySelector("form"), t.newsletterFormElement.addEventListener("submit", t.submitHandler.bind(t)), t
		}
		return _inherits(n, FullBleedCarouselModule), _createClass(n, [{
			key: "layout",
			value: function() {
				_get(n.prototype.__proto__ || Object.getPrototypeOf(n.prototype), "layout", this).call(this)
			}
		}, {
			key: "onScroll",
			value: function(e) {
				_get(n.prototype.__proto__ || Object.getPrototypeOf(n.prototype), "onScroll", this).call(this, e)
			}
		}, {
			key: "next",
			value: function() {
				_get(n.prototype.__proto__ || Object.getPrototypeOf(n.prototype), "next", this).call(this);
				var e = this.slidesEl[this.currentIndex].getAttribute("data-background-color");
				this.setBackgroundColor(e)
			}
		}, {
			key: "previous",
			value: function() {
				_get(n.prototype.__proto__ || Object.getPrototypeOf(n.prototype), "previous", this).call(this);
				var e = this.slidesEl[this.currentIndex].getAttribute("data-background-color");
				this.setBackgroundColor(e)
			}
		}, {
			key: "setBackgroundColor",
			value: function(e) {
				TweenMax.to(this.backgroundEl, 1, {
					backgroundColor: parseInt(e)
				})
			}
		}, {
			key: "submitHandler",
			value: function(e) {
				e.preventDefault(), ServiceController.addNewsletterSubscriber(this.newsletterFormElement.querySelector(".email").value, this.submitComplete.bind(this))
			}
		}, {
			key: "submitComplete",
			value: function(e) {
				this.newsletterElement.querySelector(".subscribeResult").innerHTML = e.msg
			}
		}]), n
	}(),
	SideMenu = function(e) {
		function i(e) {
			_classCallCheck(this, i);
			var t = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, e));
			return t.pushoverElements = document.querySelectorAll(".pushable"), t.hideOnOpenElements = document.querySelectorAll(".hideOnCategoryMenuOpen"), t.showing = !1, t.secondaryLinks = t.element.querySelector(".secondary"), t.searchInput = e.querySelector(".search-box"), t.searchInput.addEventListener("keyup", t.onInputChange.bind(t)), t.closeButton = e.querySelector(".closeButton"), t.closeButton.addEventListener("click", t.onCloseHandler.bind(t)), t.keywordResultsEl = e.querySelector(".keywordResults"), t.searchResultsEl = e.querySelector(".searchResults"), t.feedLoader = new FeedLoader(t.element.querySelector(".feedLoader")), t.feedLoader.element.querySelector("button").addEventListener("click", t.onLoaderSelectHandler.bind(t)), t.categoriesTitleEl = e.querySelector(".categoriesTitle"), t.categoriesWrapperEl = e.querySelector(".categoriesWrapper"), t.oReq, t
		}
		return _inherits(i, View), _createClass(i, [{
			key: "show",
			value: function() {
				this.showing = !0, this.move(-this.element.clientWidth), dataLayer.push({
					eventCategory: "WP_menu",
					eventAction: "menu interaction",
					eventLabel: "menu open",
					eventValue: void 0,
					eventNonInteraction: !1,
					event: "eventPush"
				}), document.querySelector("#content").ontouchmove = function(e) {
					e.preventDefault()
				};
				for (var e = 0; e < this.hideOnOpenElements.length; e++) TweenMax.to(this.hideOnOpenElements[e], .2, {
					autoAlpha: 0
				})
			}
		}, {
			key: "hide",
			value: function() {
				this.showing = !1, this.move(0), dataLayer.push({
					eventCategory: "WP_menu",
					eventAction: "menu interaction",
					eventLabel: "menu close",
					eventValue: void 0,
					eventNonInteraction: !1,
					event: "eventPush"
				}), this.hideSubcategories(), document.querySelector("#content").ontouchmove = null;
				for (var e = 0; e < this.hideOnOpenElements.length; e++) TweenMax.to(this.hideOnOpenElements[e], .2, {
					autoAlpha: 1
				})
			}
		}, {
			key: "move",
			value: function(e) {
				var t = {
					ease: Strong.easeOut,
					x: e,
					roundProps: "x"
				};
				TweenMax.to(this.element, .6, t);
				for (var i = 0; i < this.pushoverElements.length; i++) {
					var n = this.pushoverElements[i];
					t = {
						ease: Strong.easeOut
					}, 0 === e && (t.clearProps = "x");
					var r = n.getAttribute("data-push-prop") ? n.getAttribute("data-push-prop") : "x";
					t[r] = e, t.roundProps = r, TweenMax.to(n, .6, t)
				}
			}
		}, {
			key: "toggleShowHide",
			value: function() {
				this.showing ? this.hide() : this.show()
			}
		}, {
			key: "onCloseHandler",
			value: function(e) {
				this.hideSearchResults(), this.hideKeyWords(), this.showCategories()
			}
		}, {
			key: "onLoaderSelectHandler",
			value: function(e) {
				this.showSubcategories()
			}
		}, {
			key: "onInputChange",
			value: function(e) {
				if (SearchController.keywordData && SearchController.articlesData) {
					if (e.preventDefault(), this.oReq && this.oReq.abort(), this.searchInput.value.length < 1) return this.keywordResultsEl.innerHTML = "", this.showCategories(), this.hideSearchResults(), void this.hideKeyWords();
					if (this.hideSearchResults(), this.hideCategories(), this.showKeyWords(), this.onKeywordRequestComplete(SearchController.searchKeywords(this.searchInput.value)), 13 !== e.keyCode) return !1;
					this.selectKeyword(this.searchInput.value)
				} else console.log("search results not loaded.")
			}
		}, {
			key: "onKeywordRequestComplete",
			value: function(e) {
				if (this.keywordResultsEl.style.opacity = 1, this.keywordResultsEl.innerHTML = "", 0 < e.length)
					for (var t = 0; t < e.length; t++) {
						var i = document.createElement("a");
						i.setAttribute("href", "#"), i.setAttribute("data-id", e[t].id), i.setAttribute("data-type", e[t].type), i.classList.add("keywordResult"), i.innerHTML = e[t].value, i.addEventListener("click", this.onKeywordSelectHandler.bind(this)), this.keywordResultsEl.appendChild(i)
					} else this.keywordResultsEl.innerHTML = '<span class="keywordResult noResults">No Results</span>'
			}
		}, {
			key: "onKeywordSelectHandler",
			value: function(e) {
				e.preventDefault(), this.selectKeyword(e.target.text)
			}
		}, {
			key: "selectKeyword",
			value: function(e) {
				this.hideKeyWords(), this.hideCategories(), this.showSearchResults(), this.searchInput.value = e, this.onSearchRequestComplete(SearchController.searchArticles(this.searchInput.value))
			}
		}, {
			key: "onSearchRequestComplete",
			value: function(e) {
				if (this.searchResultsEl.innerHTML = "", this.searchResultsEl.scrollTo(0, 0), 0 < e.length)
					for (var t = 0; t < e.length; t++) this.searchResultsEl.appendChild(this.createSearchResult(e[t]));
				else this.searchResultsEl.innerHTML = '<span class="keywordResult noResults">No Results</span>'
			}
		}, {
			key: "createSearchResult",
			value: function(e) {
				var t = document.createElement("div");
				t.classList.add("searchResult");
				var i = document.createElement("a");
				i.setAttribute("href", "/story/" + e.slug), t.appendChild(i);
				var n = document.createElement("img");
				if (n.setAttribute("src", e.image + "?w=400"), i.appendChild(n), e.featuredProfile) {
					var r = document.createElement("div");
					r.classList.add("artist"), r.innerHTML = e.featuredProfile.name, i.appendChild(r)
				}
				var s = document.createElement("div");
				return s.classList.add("title"), s.innerHTML = e.title, i.appendChild(s), t
			}
		}, {
			key: "showCategories",
			value: function() {
				"none" == this.categoriesWrapperEl.style.display && (this.searchInput.value = "", app.header.showMenuButton(), this.closeButton.style.display = "none", this.categoriesTitleEl.style.display = "block", this.categoriesWrapperEl.style.display = "block")
			}
		}, {
			key: "hideCategories",
			value: function() {
				app.header.hideMenuButton(), this.closeButton.style.display = "block", this.categoriesTitleEl.style.display = "none", this.categoriesWrapperEl.style.display = "none"
			}
		}, {
			key: "showKeyWords",
			value: function() {
				this.keywordResultsEl.style.display = "block"
			}
		}, {
			key: "hideKeyWords",
			value: function() {
				"block" == this.keywordResultsEl.style.display && (this.keywordResultsEl.style.display = "none")
			}
		}, {
			key: "showSearchResults",
			value: function() {
				this.searchResultsEl.style.display = "block"
			}
		}, {
			key: "hideSearchResults",
			value: function() {
				this.searchResultsEl.innerHTML = "", this.searchResultsEl.style.display = "none"
			}
		}, {
			key: "showSubcategories",
			value: function() {
				var e = this.secondaryLinks.querySelector(".mask").clientHeight;
				this.feedLoader.buttonEl.style.display = "none", TweenMax.to(this.secondaryLinks, 1, {
					ease: Power2.easeOut,
					height: e
				})
			}
		}, {
			key: "hideSubcategories",
			value: function() {
				this.feedLoader.buttonEl.style.display = "block", TweenMax.to(this.secondaryLinks, 1, {
					ease: Power2.easeOut,
					height: 0
				})
			}
		}]), i
	}(),
	VimeoPlayer = function(e) {
		function i(e) {
			_classCallCheck(this, i);
			var t = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, e));
			return t.playing, t.player = new Vimeo.Player(e), t
		}
		return _inherits(i, View), _createClass(i, [{
			key: "togglePlay",
			value: function() {
				return this.playing ? (this.pause(), !1) : (this.play(), !0)
			}
		}, {
			key: "load",
			value: function() {
				this.player.loadVideo()
			}
		}, {
			key: "play",
			value: function() {
				this.playing = !0, this.player.play()
			}
		}, {
			key: "pause",
			value: function() {
				this.playing = !1, this.player.pause()
			}
		}]), i
	}(),
	MixcloudPlayer = function(e) {
		function n(e) {
			_classCallCheck(this, n);
			var t = _possibleConstructorReturn(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e));
			t.ready = !1, t.playing = !1, t.widgetEl = e.querySelector("iframe"), t.widget = Mixcloud.PlayerWidget(t.widgetEl);
			var i = t;
			return t.widget.ready.then(function() {
				i.ready = !0
			}), t
		}
		return _inherits(n, View), _createClass(n, [{
			key: "togglePlay",
			value: function() {
				this.playing ? this.pause() : this.play()
			}
		}, {
			key: "play",
			value: function() {
				this.ready && (this.playing = !0, this.widget.play(), TweenMax.to(this.widgetEl, 1, {
					y: -this.widgetEl.clientHeight,
					ease: Strong.easeOut
				}))
			}
		}, {
			key: "pause",
			value: function() {
				this.ready && (this.playing = !1, this.widget.pause())
			}
		}, {
			key: "layout",
			value: function() {}
		}]), n
	}(),
	AudioPlayer = function(e) {
		function i(e) {
			_classCallCheck(this, i);
			var t = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, e));
			return t.isPlaying, t.isActive, t.stepper, t.activeAudio, t.dismissTimeout, t.dismissAfter = 7e3, t.dismissScroll = 500, t.scrollWhenPaused, t.el = e, t.audio = e.querySelector("audio"), t.sourceEl = e.querySelector("source"), t.timerEl = e.querySelector(".audioPlayerModule__timer"), t.titleEl = e.querySelector(".audioPlayerModule__title"), t.pauseEl = e.querySelector(".audioPlayerModule__pause"), t.audio.addEventListener("loadedmetadata", t.onLoaded.bind(t)), t.audio.addEventListener("play", t.step.bind(t)), t.audio.addEventListener("pause", function() {
				window.cancelAnimationFrame(t.stepper)
			}), t.audio.addEventListener("ended", t.onComplete.bind(t)), t.el.addEventListener("click", t.onToggleHandler.bind(t)), t.onScrollDismiss = t.onScrollHandler.bind(t), t
		}
		return _inherits(i, View), _createClass(i, [{
			key: "onMouseIn",
			value: function() {
				this.tl && this.tl.kill(), this.tl = new TimelineMax, this.tl.to(this.el, .7, {
					ease: Elastic.easeOut.config(1.7, 1.5),
					width: 380,
					x: "-50%"
				}).to(this.timerEl, .15, {
					x: "-50%",
					y: "-40px",
					opacity: 0
				}, "-=0.7").to(this.pauseEl, .15, {
					x: 0,
					y: "0%",
					opacity: 1
				}, "-=0.65").to(this.titleEl, .15, {
					x: "-50%",
					y: "-50%",
					opacity: 1
				}, "-=0.65")
			}
		}, {
			key: "onMouseOut",
			value: function() {
				this.tl && this.tl.kill(), TweenMax.set(this.titleEl, {
					x: "-50%",
					y: "40px",
					opacity: 0,
					overwrite: "all"
				}), TweenMax.set(this.pauseEl, {
					x: 0,
					y: "40px",
					opacity: 0,
					overwrite: "all"
				}), this.tl = new TimelineMax, this.tl.to(this.el, .5, {
					ease: Elastic.easeOut.config(1.7, 1.5),
					width: 60,
					x: "-50%"
				}).to(this.timerEl, .15, {
					x: "-50%",
					y: "-50%",
					opacity: 1
				}, "-=0.35")
			}
		}, {
			key: "open",
			value: function() {
				var e = this;
				TweenMax.to(this.el, 1, {
					ease: Elastic.easeOut,
					scale: 1,
					opacity: 1,
					onComplete: function() {
						TweenMax.set(e.el, {
							x: "-50%"
						}), isTouch() || (e.el.addEventListener("mouseenter", e.onMouseIn.bind(e)), e.el.addEventListener("mouseleave", e.onMouseOut.bind(e)))
					}
				})
			}
		}, {
			key: "close",
			value: function() {
				isTouch() || (this.el.removeEventListener("mouseenter", this.onMouseIn.bind(this)), this.el.removeEventListener("mouseleave", this.onMouseOut.bind(this))), TweenMax.to(this.el, 1, {
					ease: Elastic.easeOut,
					scale: .1,
					opacity: 0
				})
			}
		}, {
			key: "clearDismissListeners",
			value: function() {
				window.removeEventListener("scroll", this.onScrollDismiss, !1), window.clearTimeout(this.dismissTimeout), this.dismissTimeout = void 0
			}
		}, {
			key: "dismiss",
			value: function() {
				this.close(), this.isActive = !1, this.activeAudio.callback()
			}
		}, {
			key: "load",
			value: function(e) {
				this.isActive ? (this.close(), this.clearDismissListeners(), this.activeAudio.callback()) : this.isActive = !0, this.activeAudio = e, this.titleEl.innerHTML = e.title, this.sourceEl.src = e.src, this.audio.load()
			}
		}, {
			key: "onScrollHandler",
			value: function(e) {
				this.scrollWhenPaused;
				var t = this.scrollWhenPaused + this.dismissScroll,
					i = this.scrollWhenPaused - this.dismissScroll;
				(window.pageYOffset > t || window.pageYOffset < i) && (this.clearDismissListeners(), this.dismiss(), this.scrollWhenPaused = void 0)
			}
		}, {
			key: "onLoaded",
			value: function() {
				this.open(), this.play()
			}
		}, {
			key: "onToggleHandler",
			value: function() {
				this.isPlaying ? (this.pause(), this.scrollWhenPaused = window.pageYOffset, window.addEventListener("scroll", this.onScrollDismiss, !1), this.dismissTimeout = window.setTimeout(this.dismiss.bind(this), this.dismissAfter)) : (this.play(), this.clearDismissListeners())
			}
		}, {
			key: "play",
			value: function() {
				__snowplow__("trackStructEvent", "article", "click_play", "video/audio"), this.isPlaying = !0, this.el.classList.add("audioPlayerModule--is-playing"), this.audio.play()
			}
		}, {
			key: "pause",
			value: function() {
				this.isPlaying = !1, this.el.classList.remove("audioPlayerModule--is-playing"), this.audio.pause()
			}
		}, {
			key: "step",
			value: function() {
				this.stepper = requestAnimationFrame(this.step.bind(this)), this.audio.currentTime && (this.timerEl.innerHTML = this.formatTime(this.audio.duration - this.audio.currentTime))
			}
		}, {
			key: "formatTime",
			value: function(e) {
				if (!isNaN(e)) {
					var t = Math.floor(e / 60);
					return "-" + (t = 10 <= t ? t : "0" + t) + ":" + (e = 10 <= (e = Math.floor(e % 60)) ? e : "0" + e)
				}
			}
		}, {
			key: "onComplete",
			value: function() {
				this.pause(), this.dismiss()
			}
		}]), i
	}(),
	RelatedArticlesModule = function(e) {
		function t(e) {
			return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e))
		}
		return _inherits(t, CarouselModule), t
	}(),
	TextModule = function(e) {
		function t(e) {
			return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e))
		}
		return _inherits(t, View), t
	}(),
	SlideshowModule = function(e) {
		function i(e) {
			_classCallCheck(this, i);
			var t = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, e));
			return t.MODE = "fade", t.SIZE = t.element.getAttribute("data-size"), t.SLIDESHOW_DELAY = 4e3, t.CAPTION_BOTTOM_MARGIN = 20, t.hoverArrowsEnabled = !0, t.arrowsShowing = !0, t.slidesWrapperEl = t.element.querySelector(".slides"), t.slidesContainerEl = t.element.querySelector(".slidesContainer"), t.slidesEl = t.element.querySelectorAll(".slide"), t.videoPlayers = t.element.querySelectorAll(".videoSlideshowPlayer"), t.controlBarEl = t.element.querySelector(".controlBar"), t.slidesContainerEl.addEventListener("mouseenter", t.slidesOverHandler.bind(t)), t.slidesContainerEl.addEventListener("mouseleave", t.slidesOutHandler.bind(t)), t.slidesContainerEl.addEventListener("mousemove", t.mouseMoveHandler.bind(t)), t.hasVideo = 0 < t.videoPlayers.length, t.controlBarEl && (t.captionsUnderneath = t.controlBarEl.classList.contains("underneath"), t.playButtonEl = t.controlBarEl.querySelector(".playButton"), t.pauseButtonEl = t.controlBarEl.querySelector(".pauseButton"), t.playButtonEl && (t.playButtonEl.addEventListener("click", t.playHandler.bind(t)), t.pauseButtonEl.addEventListener("click", t.pauseHandler.bind(t))), t.slideCaptionListEl = t.element.querySelectorAll(".slideCaption"), t.tallestCaptionEl = t.getTallestCaption()), t.nextButtonEl = t.element.querySelector(".nextButton"), t.nextButtonEl.addEventListener("click", t.nextHandler.bind(t)), t.previousButtonEl = t.element.querySelector(".previousButton"), t.previousButtonEl.addEventListener("click", t.previousHandler.bind(t)), t.hasVideo || (t.nextButtonEl.addEventListener("mouseenter", t.arrowOverHandler.bind(t)), t.nextButtonEl.addEventListener("mouseleave", t.arrowOutHandler.bind(t)), t.previousButtonEl.addEventListener("mouseenter", t.arrowOverHandler.bind(t)), t.previousButtonEl.addEventListener("mouseleave", t.arrowOutHandler.bind(t))), t.currentIndex = 0, t.totalSlides = t.slidesEl.length, t.interval, t.overArrows, t.hideArrowsFunc = t.hideArrows.bind(t), t.totalSlides < 2 && (t.playButtonEl.style.display = "none", t.nextButtonEl.style.display = "none", t.previousButtonEl.style.display = "none"), "fade" == t.MODE && t.setupFade(), t
		}
		return _inherits(i, View), _createClass(i, [{
			key: "layout",
			value: function() {
				this.tallestCaptionEl && this.captionsUnderneath && (this.tallestCaptionEl.lastDisplay = this.tallestCaptionEl.style.display, this.tallestCaptionEl.style.display = "block", this.controlBarEl.style.height = getSize(this.tallestCaptionEl).height + this.CAPTION_BOTTOM_MARGIN + "px", this.tallestCaptionEl.style.display = this.tallestCaptionEl.lastDisplay), this.hoverArrowsEnabled = app.innerWidth > app.bps["tablet-portrait-upper-boundary"] && !this.hasVideo, this.hoverArrowsEnabled || this.arrowsShowing ? this.hoverArrowsEnabled && this.arrowsShowing && this.hideArrows() : this.showArrows()
			}
		}, {
			key: "setupFade",
			value: function() {
				for (var e = 0; e < this.slidesEl.length; e++) {
					var t = this.slidesEl[e];
					0 < e ? t.style.opacity = 0 : t.style.zIndex = 1
				}
			}
		}, {
			key: "mouseMoveHandler",
			value: function(e) {
				TweenMax.killDelayedCallsTo(this.hideArrowsFunc), this.showArrows(), TweenMax.delayedCall(2, this.hideArrowsFunc)
			}
		}, {
			key: "slidesOverHandler",
			value: function(e) {
				this.hoverArrowsEnabled && this.showArrows()
			}
		}, {
			key: "slidesOutHandler",
			value: function(e) {
				this.hoverArrowsEnabled && this.hideArrows()
			}
		}, {
			key: "showArrows",
			value: function() {
				this.arrowsShowing || (this.arrowsShowing = !0, TweenMax.to(this.nextButtonEl, .2, {
					opacity: 1
				}), TweenMax.to(this.previousButtonEl, .2, {
					opacity: 1
				}))
			}
		}, {
			key: "hideArrows",
			value: function() {
				this.arrowsShowing && !this.overArrows && this.hoverArrowsEnabled && (this.arrowsShowing = !1, TweenMax.to(this.nextButtonEl, .2, {
					opacity: 0
				}), TweenMax.to(this.previousButtonEl, .2, {
					opacity: 0
				}))
			}
		}, {
			key: "playHandler",
			value: function(e) {
				this.play()
			}
		}, {
			key: "pauseHandler",
			value: function(e) {
				this.pause()
			}
		}, {
			key: "arrowOverHandler",
			value: function() {
				this.overArrows = !0
			}
		}, {
			key: "arrowOutHandler",
			value: function() {
				this.overArrows = !1
			}
		}, {
			key: "nextHandler",
			value: function(e) {
				this.pause(), this.next()
			}
		}, {
			key: "previousHandler",
			value: function(e) {
				this.pause(), this.previous()
			}
		}, {
			key: "play",
			value: function() {
				this.playButtonEl && (this.playButtonEl.style.visibility = "hidden", this.pauseButtonEl.style.visibility = "visible", this.interval = setInterval(this.next.bind(this), this.SLIDESHOW_DELAY))
			}
		}, {
			key: "pause",
			value: function() {
				this.pauseButtonEl && (this.playButtonEl.style.visibility = "visible", this.pauseButtonEl.style.visibility = "hidden", clearInterval(this.interval))
			}
		}, {
			key: "next",
			value: function() {
				var e = this.currentIndex + 1 > this.totalSlides - 1 ? 0 : this.currentIndex + 1;
				this.gotoIndex(e)
			}
		}, {
			key: "previous",
			value: function() {
				var e = this.currentIndex - 1 < 0 ? this.totalSlides - 1 : this.currentIndex - 1;
				this.gotoIndex(e)
			}
		}, {
			key: "gotoIndex",
			value: function(e, t) {
				this.dispatchEvent({
					type: "pauseAllVideos"
				}), "fade" == this.MODE && (this.fadeOutCurrentSlide(t), this.setSlideCaption(e), this.currentIndex = e, this.fadeInCurrentSlide(t))
			}
		}, {
			key: "setSlideCaption",
			value: function(e) {
				this.slideCaptionListEl && 0 < this.slideCaptionListEl.length && (this.slideCaptionListEl[this.currentIndex].style.display = "none", this.slideCaptionListEl[e].style.display = "block", "" === this.slideCaptionListEl[e].innerHTML ? this.controlBarEl.style.backgroundColor = "rgba(0,0,0,0)" : this.controlBarEl.style.backgroundColor = "rgba(0,0,0,0.4)")
			}
		}, {
			key: "getTallestCaption",
			value: function() {
				if (this.slideCaptionListEl) {
					for (var e, t, i = 0, n = 0, r = 0; r < this.slideCaptionListEl.length; r++)(t = this.slideCaptionListEl[r]).lastDisplay = t.style.display, t.style.display = "block", i < (n = getSize(t).height) && (i = n, e = t), t.style.display = t.lastDisplay;
					return e
				}
			}
		}, {
			key: "fadeOutCurrentSlide",
			value: function() {
				var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 1,
					t = this.slidesEl[this.currentIndex];
				TweenMax.to(t, e, {
					opacity: 0,
					onComplete: function() {
						t.style.zIndex = 0
					}
				})
			}
		}, {
			key: "fadeInCurrentSlide",
			value: function() {
				var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 1,
					t = this.slidesEl[this.currentIndex];
				t.style.zIndex = 1, TweenMax.to(t, e, {
					opacity: 1
				})
			}
		}]), i
	}(),
	ImageModule = function(e) {
		function i(e) {
			_classCallCheck(this, i);
			var t = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, e));
			return t.imageFullscreenUrl = e.getAttribute("data-imageFullscreen"), t.imageEl = e.querySelector("img"), t.imageFullscreenUrl && (t.imageEl.style.cursor = "pointer", t.imageEl.addEventListener("click", t.onSelectHandler.bind(t))), t.loadRequested, t
		}
		return _inherits(i, View), _createClass(i, [{
			key: "onSelectHandler",
			value: function(e) {
				this.dispatchEvent({
					type: "openTheaterMode",
					url: this.imageFullscreenUrl
				})
			}
		}, {
			key: "layout",
			value: function() {}
		}, {
			key: "animate",
			value: function() {}
		}, {
			key: "onScroll",
			value: function(e) {
				!this.loadRequested && getOffset(this.element).top < app.innerHeight + 500 && (this.loadRequested = !0, preloadImages(this.element.querySelectorAll("img"), this.onImageProgress.bind(this)))
			}
		}, {
			key: "onImageProgress",
			value: function(e, t, i) {
				TweenMax.set(i, {
					opacity: 0
				}), TweenMax.to(i, 1, {
					opacity: 1
				}), app.resizeHandler()
			}
		}]), i
	}(),
	TheaterModeModule = function(e) {
		function n(e) {
			_classCallCheck(this, n);
			var t = _possibleConstructorReturn(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e));
			t.showing = !1, t.slideContainerEl = t.element.querySelector(".slidesContainer"), t.slideMaskEl = t.element.querySelector(".slideMask"), t.closeButtonEl = t.element.querySelector(".closeButton"), t.imagesEl = t.element.querySelectorAll("img"), t.slideMaskEl.addEventListener("click", t.hide.bind(t)), t.closeButtonEl.addEventListener("click", t.hide.bind(t)), t.hoverSpeed = 1e3;
			for (var i = 0; i < t.imagesEl.length; i++) t.imagesEl[i].positionY = 0;
			return t.pause(), t
		}
		return _inherits(n, SlideshowModule), _createClass(n, [{
			key: "layout",
			value: function() {
				for (var e = app.innerWidth / app.innerHeight, t = 0; t < this.imagesEl.length; t++) {
					if (e < this.imagesEl[t].getAttribute("data-width") / this.imagesEl[t].getAttribute("data-height")) {
						this.imagesEl[t].classList.add("landscape");
						var i = getSize(this.imagesEl[t]).width;
						TweenMax.set(this.imagesEl[t], {
							x: -(i - app.innerWidth) / 2
						})
					} else this.imagesEl[t].classList.remove("landscape"), TweenMax.set(this.imagesEl[t], {
						clearProps: "x"
					})
				}
			}
		}, {
			key: "animate",
			value: function() {
				if (this.showing)
					for (var e = 0; e < this.imagesEl.length; e++) this.imagesEl[e].positionY += (this.getHoverY(this.imagesEl[e]) - this.imagesEl[e].positionY) / this.hoverSpeed, TweenMax.set(this.imagesEl[e], {
						y: this.imagesEl[e].positionY
					})
			}
		}, {
			key: "show",
			value: function() {
				_get(n.prototype.__proto__ || Object.getPrototypeOf(n.prototype), "show", this).call(this), document.body.style.overflow = "hidden", TweenMax.to(this, 1, {
					hoverSpeed: 10
				}), window.app.header.hideMenuButton(), window.app.header.tint(16777215), app.innerWidth < app.bps["phone-upper-boundary"] && window.app.header.hide(), this.enableKeyPress()
			}
		}, {
			key: "hide",
			value: function() {
				_get(n.prototype.__proto__ || Object.getPrototypeOf(n.prototype), "hide", this).call(this), document.body.style.overflow = "visible", TweenMax.killTweensOf(this), app.header.showMenuButton(), app.header.revertTint(), this.hoverSpeed = 1e3, this.disableKeyPress()
			}
		}, {
			key: "enableKeyPress",
			value: function() {
				this.disableKeyPress(), window.addEventListener("keydown", this.onKeyPressHandler.bind(this))
			}
		}, {
			key: "disableKeyPress",
			value: function() {
				window.removeEventListener("keydown", this.onKeyPressHandler.bind(this))
			}
		}, {
			key: "onKeyPressHandler",
			value: function(e) {
				"37" == e.keyCode ? this.previous() : "39" == e.keyCode && this.next()
			}
		}, {
			key: "gotoByUrl",
			value: function(e) {
				for (var t = 0, i = 0; i < this.imagesEl.length; i++) getStrippedPath(this.imagesEl[i].getAttribute("data-src")) === getStrippedPath(e) && (t = i);
				for (this.imagesEl[t].loadRequested || (this.imagesEl[t].loadRequested = !0, preloadImages([this.imagesEl[t]], null, this.onSelectedImageLoadComplete.bind(this, this.imagesEl[t]))), i = 0; i < this.imagesEl.length; i++) this.imagesEl[i].loadRequested || (this.imagesEl[i].loadRequested = !0, preloadImages([this.imagesEl[i]], null, this.onImageLoadComplete.bind(this, this.imagesEl[i])));
				this.gotoIndex(t, 0), this.layout()
			}
		}, {
			key: "onSelectedImageLoadComplete",
			value: function(e) {
				TweenMax.set(e, {
					opacity: 0
				}), TweenMax.to(e, 1, {
					opacity: 1
				}), this.layout()
			}
		}, {
			key: "onImageLoadComplete",
			value: function(e) {
				this.layout()
			}
		}, {
			key: "getHoverY",
			value: function(e) {
				var t = e.height,
					i = t - app.innerHeight,
					n = app.innerHeight / 4,
					r = (app.mousePosition.y - n) / (app.innerHeight - 2 * n);
				return r = Math.max(0, Math.min(1, r)), t < app.innerHeight ? (app.innerHeight - t) / 2 : r * -i
			}
		}]), n
	}(),
	GalleryModule = function(e) {
		function o(e) {
			_classCallCheck(this, o);
			var t = _possibleConstructorReturn(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this, e));
			t.gutter = 20, t.loadRequested = !1, t.columns = parseInt(t.element.getAttribute("data-columns")), t.galleryItems = t.element.querySelectorAll(".masonry .galleryItem"), t.masonryEl = t.element.querySelector(".masonry"), t.masonryEl && (t.masonry = new Masonry(t.masonryEl, {
				itemSelector: ".galleryItem",
				gutter: t.gutter,
				transitionDuration: 0
			}));
			for (var i = 0; i < t.galleryItems.length; i++) {
				var n = t.galleryItems[i],
					r = n.querySelector("img");
				if (r && "A" != r.parentElement.nodeName) {
					var s = r.getAttribute("data-imageFullscreen");
					s && (n.style.cursor = "pointer", n.addEventListener("click", t.onImageSelectHandler.bind(t, s)))
				}
			}
			return t
		}
		return _inherits(o, View), _createClass(o, [{
			key: "onImageSelectHandler",
			value: function(e) {
				this.dispatchEvent({
					type: "openTheaterMode",
					url: e
				})
			}
		}, {
			key: "layout",
			value: function() {
				for (var e = 0, t = 0; t < this.galleryItems.length; t++) {
					var i = this.galleryItems[t].getAttribute("data-width");
					app.innerWidth < app.bps["tablet-portrait-upper-boundary"] && (i = "1/1");
					var n = i.split("/")[0],
						r = i.split("/")[1],
						s = (this.masonryEl.clientWidth - this.gutter * (r - 1)) / r;
					e = n * s + (n - 1) * this.gutter, this.galleryItems[t].style.width = e + "px"
				}
				this.masonry && (s = (this.masonryEl.clientWidth - 5 * this.gutter) / 6, this.masonry.options.columnWidth = s, this.masonry.layout())
			}
		}, {
			key: "onScroll",
			value: function(e) {
				!this.loadRequested && getOffset(this.element).top < app.innerHeight + 500 && (this.loadRequested = !0, preloadImages(this.element.querySelectorAll("img"), this.layout.bind(this)))
			}
		}]), o
	}(),
	VideoModule = function(e) {
		function n(e) {
			_classCallCheck(this, n);
			var t = _possibleConstructorReturn(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e));
			t.loadRequested = !1, window.ytCallbacks || (window.ytCallbacks = []), window.ytCallbacks.push(t.ytPlayerAPIReady), t.videoFrameWrapper = e.querySelector(".videoFrameWrapper"), t.vimeoMainEmbedEl = e.querySelector("iframe.mainVimeo"), t.playButtonEl = e.querySelector(".playButton"), t.closeButtonEl = e.querySelector(".closeButton"), t.youtubePlayerWrapper = t.element.querySelector(".youtubePlayer"), t.vimeoPreviewEmbedEl = t.element.querySelector("iframe.preview");
			var i = t.videoFrameWrapper.getAttribute("data-isCinemaMode");
			return t.isCinemaMode = "1" == i, t.closeButtonEl && t.closeButtonEl.addEventListener("click", t.closeHandler.bind(t)), t.previewImageEl = e.querySelector(".previewImage"), t.previewImageEl && t.showPlayButton(), t
		}
		return _inherits(n, View), _createClass(n, [{
			key: "onClickHandler",
			value: function(e) {
				!isTouch() && this.isCinemaMode && this.enterCinemaMode(), this.showPlayer()
			}
		}, {
			key: "onScroll",
			value: function(e) {
				!this.loadRequested && getOffset(this.element).top < 2 * app.innerHeight && this.load()
			}
		}, {
			key: "load",
			value: function() {
				if (!this.loadRequested) {
					this.loadRequested = !0;
					for (var e, t = this.element.querySelectorAll("iframe"), i = 0; i < t.length; i++) e = t[i].getAttribute("data-src"), t[i].setAttribute("src", e);
					this.vimeoMainEmbedEl && (this.vimeoMainPlayer = new VimeoPlayer(this.vimeoMainEmbedEl), this.videoFrameWrapper.addEventListener("click", this.onClickHandler.bind(this))), this.vimeoPreviewEmbedEl && (this.vimeoPreviewPlayer = new VimeoPlayer(this.vimeoPreviewEmbedEl), this.vimeoMainPlayer && (this.showPlayButton(), this.vimeoMainPlayer.hide()))
				}
			}
		}, {
			key: "showPlayer",
			value: function() {
				this.hidePlayButton(), this.vimeoMainPlayer && (__snowplow__("trackStructEvent", "article", "click_play", "video/audio"), this.vimeoMainPlayer.play(), this.vimeoMainPlayer.show()), this.youtubePlayerWrapper && (__snowplow__("trackStructEvent", "article", "click_play", "video/audio"), this.youtubePlayerWrapper.style.display = "block", this.youtubeMainPlayer.playVideo()), this.vimeoPreviewPlayer && this.vimeoPreviewPlayer.hide(), this.previewImageEl && (this.previewImageEl.style.display = "none")
			}
		}, {
			key: "hidePlayer",
			value: function() {
				this.showPlayButton(), this.pause(), this.vimeoMainPlayer && this.vimeoMainPlayer.hide(), this.youtubePlayerWrapper && (this.youtubePlayerWrapper.style.display = "none"), this.vimeoPreviewPlayer && this.vimeoPreviewPlayer.show(), this.previewImageEl && (this.previewImageEl.style.display = "block")
			}
		}, {
			key: "showPlayButton",
			value: function() {
				this.playButtonEl && (this.playButtonEl.style.display = "block")
			}
		}, {
			key: "hidePlayButton",
			value: function() {
				this.playButtonEl && (this.playButtonEl.style.display = "none")
			}
		}, {
			key: "pause",
			value: function() {
				this.vimeoMainPlayer && this.vimeoMainPlayer.pause(), this.youtubePlayerWrapper && this.youtubeMainPlayer.pauseVideo()
			}
		}, {
			key: "closeHandler",
			value: function(e) {
				this.leaveCinemaMode()
			}
		}, {
			key: "enterCinemaMode",
			value: function() {
				this.element.classList.add("cinemaMode"), document.body.classList.add("noScroll"), window.app.header.hideMenuButton()
			}
		}, {
			key: "leaveCinemaMode",
			value: function() {
				this.element.classList.remove("cinemaMode"), document.body.classList.remove("noScroll"), window.app.header.showMenuButton(), this.hidePlayer()
			}
		}, {
			key: "youtubeAPIReady",
			value: function() {
				if (this.youtubePlayerWrapper) new YT.Player(this.youtubePlayerWrapper, {
					videoId: this.youtubePlayerWrapper.getAttribute("data-videoId"),
					events: {
						onReady: this.playerReady.bind(this)
					}
				})
			}
		}, {
			key: "playerReady",
			value: function(e) {
				this.youtubeMainPlayer = e.target, this.showPlayButton(), this.youtubePlayerWrapper.style.display = "none", this.videoFrameWrapper.addEventListener("click", this.onClickHandler.bind(this))
			}
		}]), n
	}(),
	ChapterIndicator = function(e) {
		function s(e) {
			_classCallCheck(this, s);
			var t = _possibleConstructorReturn(this, (s.__proto__ || Object.getPrototypeOf(s)).call(this, e));
			t.chapterIndicatorItems = t.element.querySelectorAll("li"), t.currentChapterIndex, t.showing = !1, t.scrollTween;
			for (var i = 0; i < t.chapterIndicatorItems.length; i++) {
				var n = t.chapterIndicatorItems[i],
					r = n.getAttribute("data-id");
				n.element = document.body.querySelector("#entry-" + r)
			}
			return t.menuEl = t.element.querySelector(".menu"), t.menuAnimationContainerEl = t.element.querySelector(".animationContainer"), t.prevButtonEl = t.element.querySelector(".chapterPreviousButton"), t.nextButtonEl = t.element.querySelector(".chapterNextButton"), t.chapterMenuModule = document.querySelector(".chapterMenuModule"), t.chapterMenuModule && (t.menuEl.style.cursor = "pointer", t.menuEl.addEventListener("mouseenter", t.onMenuMouseOver.bind(t)), t.menuEl.addEventListener("mouseleave", t.onMenuMouseOut.bind(t)), t.menuEl.addEventListener("click", t.onMenuClickHandler.bind(t))), t.prevButtonEl.addEventListener("click", t.onPreviousChapterHandler.bind(t)), t.nextButtonEl.addEventListener("click", t.onNextChapterHandler.bind(t)), t
		}
		return _inherits(s, View), _createClass(s, [{
			key: "layout",
			value: function() {
				_get(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "layout", this).call(this)
			}
		}, {
			key: "show",
			value: function() {
				TweenMax.to(this.element, .45, {
					autoAlpha: 1
				}), this.showing = !0, this.menuEl.style.pointerEvents = "auto"
			}
		}, {
			key: "hide",
			value: function() {
				TweenMax.to(this.element, .25, {
					autoAlpha: 0
				}), this.showing = !1, this.menuEl.style.pointerEvents = "none"
			}
		}, {
			key: "onScroll",
			value: function(e) {
				var t = getOffset(app.currentSection.relatedArticlesModule.element).top - app.innerHeight;
				if (this.showing && t < 0 || app.scrollTop < app.innerHeight ? this.hide() : !this.showing && 0 < t && this.show(), !this.isActiveScroll()) {
					for (var i = -1, n = 0; n < this.chapterIndicatorItems.length; n++) {
						getOffset(this.chapterIndicatorItems[n].element).top < app.innerHeight && (i = n)
					}
					this.gotoChapter(i)
				}
			}
		}, {
			key: "onMenuMouseOver",
			value: function(e) {
				TweenMax.to(this.menuAnimationContainerEl, .7, {
					ease: Strong.easeOut,
					y: -47
				})
			}
		}, {
			key: "onMenuMouseOut",
			value: function(e) {
				TweenMax.to(this.menuAnimationContainerEl, .7, {
					ease: Strong.easeOut,
					y: 0
				})
			}
		}, {
			key: "onMenuClickHandler",
			value: function(e) {
				var t = getPosition(this.chapterMenuModule).top;
				TweenMax.to(window, 1.5, {
					scrollTo: t,
					ease: Strong.easeOut
				})
			}
		}, {
			key: "onPreviousChapterHandler",
			value: function(e) {
				-1 < this.currentChapterIndex && this.gotoChapter(this.currentChapterIndex - 1, !0)
			}
		}, {
			key: "onNextChapterHandler",
			value: function(e) {
				this.currentChapterIndex < this.chapterIndicatorItems.length - 1 && this.gotoChapter(this.currentChapterIndex + 1, !0)
			}
		}, {
			key: "isActiveScroll",
			value: function() {
				return this.scrollTween && this.scrollTween.isActive()
			}
		}, {
			key: "getChapterIndexBySlug",
			value: function(e) {
				for (var t = 0; t < this.chapterIndicatorItems.length; t++) {
					if (this.chapterIndicatorItems[t].getAttribute("data-slug") == e) return t
				}
				return null
			}
		}, {
			key: "gotoChapter",
			value: function(e, t) {
				if (!(e === this.currentChapterIndex || e > this.chapterIndicatorItems.length - 1 || e < -1)) {
					this.currentChapterIndex = e, this.currentChapterIndex < 0 ? this.prevButtonEl.classList.add("disabled") : this.prevButtonEl.classList.remove("disabled"), this.currentChapterIndex >= this.chapterIndicatorItems.length - 1 ? this.nextButtonEl.classList.add("disabled") : this.nextButtonEl.classList.remove("disabled");
					var i = app.innerHeight;
					if (-1 < e) {
						var n = this.chapterIndicatorItems[e].getAttribute("data-id");
						i = getPosition(document.querySelector("#entry-" + n)).top
					}
					t && (this.scrollTween = TweenMax.to(window, 1.5, {
						scrollTo: {
							y: i,
							autoKill: !1
						},
						ease: Strong.easeOut,
						overwrite: !0
					}));
					for (var r = 0; r < this.chapterIndicatorItems.length; r++) this.chapterIndicatorItems[r].style.display = "none";
					if (-1 < this.currentChapterIndex) {
						var s = this.chapterIndicatorItems[this.currentChapterIndex];
						s.style.display = "block";
						var o = "#" + s.getAttribute("data-slug");
						history.pushState({}, "", o)
					} else history.pushState({}, "", " ")
				}
			}
		}]), s
	}(),
	ChapterModule = function(e) {
		function t() {
			return _classCallCheck(this, t), _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
		}
		return _inherits(t, View), t
	}(),
	SoundbyteModule = function(e) {
		function n(e, t) {
			_classCallCheck(this, n);
			var i = _possibleConstructorReturn(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e));
			return i.element = e, i.src = i.element.getAttribute("data-src-mp3"), i.title = i.element.getAttribute("data-title"), i.buttonEl = e.querySelector("button"), i.buttonEl.addEventListener("click", i.onTrigger.bind(i)), i.player = t, i
		}
		return _inherits(n, View), _createClass(n, [{
			key: "callback",
			value: function() {
				this.active = !1, this.element.classList.remove("active")
			}
		}, {
			key: "onTrigger",
			value: function() {
				if (!this.active && this.src) {
					var e = this.src.slice(this.src.lastIndexOf("/") + 1, this.src.length);
					dataLayer.push({
						eventCategory: "WP_audio",
						eventAction: "audio interaction",
						eventLabel: "audio started: " + e,
						eventValue: void 0,
						eventNonInteraction: !1,
						event: "eventPush"
					}), this.active = !0, this.element.classList.add("active"), this.player.load(this)
				}
			}
		}]), n
	}(),
	SeriesModule = function(e) {
		function r(e) {
			_classCallCheck(this, r);
			var t = _possibleConstructorReturn(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, e));
			t.feedCards = new FeedCards(t.element);
			for (var i = t.element.querySelectorAll(".feedCard a.wrapper"), n = 0; n < i.length; n++) {
				i[n].addEventListener("click", function(e) {
					dataLayer.push({
						eventCategory: "WP_engagement",
						eventAction: "click more from",
						eventLabel: "WePresent | " + this.querySelector("span").innerHTML,
						eventValue: void 0,
						eventNonInteraction: !1,
						event: "eventPush"
					})
				})
			}
			return preloadImages(t.element.querySelectorAll("img")), t
		}
		return _inherits(r, View), _createClass(r, [{
			key: "layout",
			value: function() {
				this.feedCards.setHeadingHeights()
			}
		}]), r
	}(),
	EmbeddableModule = function(e) {
		function s(e) {
			_classCallCheck(this, s);
			var t = _possibleConstructorReturn(this, (s.__proto__ || Object.getPrototypeOf(s)).call(this, e)),
				i = e.querySelector("iframe");
			if (i) {
				var n = i.getAttribute("data-src");
				i.setAttribute("src", n)
			}
			var r = e.querySelector("script");
			if (r) {
				n = r.getAttribute("data-src");
				r.setAttribute("src", n)
			}
			return t
		}
		return _inherits(s, View), s
	}(),
	DockedShareMenu = function(e) {
		function i(e) {
			_classCallCheck(this, i);
			var t = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, e));
			return t.showing = !1, t.tracked, t.element.addEventListener("mouseover", t.onOverHandler.bind(t)), t.element.addEventListener("mouseout", t.onOutHandler.bind(t)), t.maskEl = t.element.querySelector(".mask"), t.animateContainerEl = t.element.querySelector(".animateContainer"), t
		}
		return _inherits(i, View), _createClass(i, [{
			key: "layout",
			value: function() {}
		}, {
			key: "show",
			value: function() {
				this.showing = !0, this.element.style.visibility = "visible", TweenMax.to(this.element, .2, {
					opacity: 1
				}), this.tracked || __snowplow__("trackStructEvent", "article", "show", "share", "side_bar")
			}
		}, {
			key: "hide",
			value: function() {
				this.showing = !1;
				var e = this;
				TweenMax.to(this.element, .2, {
					opacity: 0,
					onComplete: function() {
						e.element.style.visibility = "hidden"
					}
				})
			}
		}, {
			key: "onOverHandler",
			value: function(e) {
				TweenMax.to(this.animateContainerEl, .5, {
					ease: Strong.easeOut,
					y: -38
				})
			}
		}, {
			key: "onOutHandler",
			value: function(e) {
				TweenMax.to(this.animateContainerEl, .5, {
					ease: Strong.easeOut,
					y: 0
				})
			}
		}]), i
	}(),
	ScrollRevealModule = function(e) {
		function i(e) {
			_classCallCheck(this, i);
			var t = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, e));
			return t.reveal = anime({
				targets: e.querySelector("polygon"),
				points: [{
					value: "0,0 0,100 100,100 100,0"
				}, {
					value: "0,20 0,100 100,100 100,0"
				}, {
					value: "0,20 0,100 100,100 100,40"
				}, {
					value: "0,60 0,100 100,100 100,40"
				}, {
					value: "0,60 0,100 100,100 100,80"
				}, {
					value: "0,100 0,100 100,100 100,80"
				}, {
					value: "0,100 0,100 100,100 100,100"
				}],
				easing: "easeInQuad",
				duration: 1e4,
				autoplay: !1
			}), t.vpoffset = window.outerHeight / 2, t.mobileBreakpoint = 600, t.viewportWidth = window.outerWidth, window.addEventListener("scroll", t.seekAnimation.bind(t)), window.addEventListener("resize", t.debounce(function() {
				t.getOffset()
			}, 250)), t
		}
		return _inherits(i, View), _createClass(i, [{
			key: "debounce",
			value: function(n, r, s) {
				var o;
				return function() {
					var e = this,
						t = arguments,
						i = s && !o;
					clearTimeout(o), o = setTimeout(function() {
						o = null, s || n.apply(e, t)
					}, r), i && n.apply(e, t)
				}
			}
		}, {
			key: "getOffset",
			value: function() {
				this.vpoffset = app.innerHeight / 2, this.viewportWidth = app.outerWidth
			}
		}, {
			key: "seekAnimation",
			value: function() {
				if (!(this.viewportWidth < this.mobileBreakpoint) && this.element.getBoundingClientRect().top <= this.vpoffset && this.element.getBoundingClientRect().top >= this.vpoffset - this.element.getBoundingClientRect().height) {
					var e = this.element.getBoundingClientRect().height - 100,
						t = 100 - 100 * (this.element.getBoundingClientRect().top + e - this.vpoffset) / e;
					this.reveal.seek(this.reveal.duration * (t / 100))
				}
			}
		}]), i
	}(),
	NewsletterModule = function(e) {
		function i(e) {
			_classCallCheck(this, i);
			var t = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, e));
			return t.form = e.querySelector("form"), t.form.addEventListener("submit", t.submitHandler.bind(t)), t
		}
		return _inherits(i, View), _createClass(i, [{
			key: "submitHandler",
			value: function(e) {
				e.preventDefault(), ServiceController.addNewsletterSubscriber(this.form.querySelector(".email").value, this.submitComplete.bind(this))
			}
		}, {
			key: "submitComplete",
			value: function(e) {
				this.element.querySelector(".subscribeResult").innerHTML = e.msg
			}
		}]), i
	}(),
	ChapterMenuModule = function(e) {
		function o(e) {
			_classCallCheck(this, o);
			var t = _possibleConstructorReturn(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this, e));
			t.links = t.element.querySelectorAll(".menuItem"), t.image = t.element.querySelector(".imageLayout .image img"), t.lastImageSrc;
			for (var i = t.onLinkClickHandler.bind(t), n = t.onLinkOverHandler.bind(t), r = t.onLinkOutHandler.bind(t), s = 0; s < t.links.length; s++) t.links[s].addEventListener("mouseenter", n), t.links[s].addEventListener("mouseleave", r), t.links[s].addEventListener("click", i);
			return t
		}
		return _inherits(o, View), _createClass(o, [{
			key: "onLinkClickHandler",
			value: function(e) {
				e.preventDefault();
				var t = e.target.closest(".menuItem").getAttribute("data-id"),
					i = getPosition(document.querySelector("#entry-" + t)).top;
				TweenMax.to(window, 1.5, {
					scrollTo: i,
					ease: Strong.easeOut
				})
			}
		}, {
			key: "onLinkOverHandler",
			value: function(e) {
				if (this.image) {
					var t = e.target.querySelector("a");
					this.lastImageSrc = this.image.getAttribute("src"), this.image.setAttribute("src", t.getAttribute("data-image"))
				}
			}
		}, {
			key: "onLinkOutHandler",
			value: function(e) {
				this.lastImageSrc && this.image.setAttribute("src", this.lastImageSrc)
			}
		}]), o
	}(),
	ReadMoreModule = function(e) {
		function i(e) {
			_classCallCheck(this, i);
			var t = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, e));
			return t.readMore = t.element.querySelector(".readMoreButton"), t.buttonEl = t.element.querySelector(".readMoreButton a"), t.buttonEl.addEventListener("click", t.onButtonClick.bind(t)), t.maskEl = t.element.querySelector(".mask"), t.open = !1, t.gradientStrength = 1, t.gradColor1 = getComputedStyle(t.element.querySelector(".module")).backgroundColor, t.gradColor2 = t.gradColor1.replace(")", ", 0)").replace("rgb", "rgba"), t.updateGradient(), t.element.style.backgroundColor = t.gradColor1, t
		}
		return _inherits(i, View), _createClass(i, [{
			key: "onButtonClick",
			value: function(e) {
				e.preventDefault(), this.open ? this.collapse() : this.expand()
			}
		}, {
			key: "updateGradient",
			value: function() {
				var e = 60 * this.gradientStrength,
					t = 100 * this.gradientStrength;
				this.readMore.style.backgroundImage = "linear-gradient(to top, " + this.gradColor1 + " " + e + "%," + this.gradColor2 + " " + t + "%)"
			}
		}, {
			key: "expand",
			value: function() {
				var e = this;
				this.open = !0;
				var t = this.getCollapsedHeight();
				this.buttonEl.innerHTML = this.buttonEl.getAttribute("data-collapse-text"), this.maskEl.style.height = "auto";
				var i = this.maskEl.clientHeight;
				this.maskEl.style.height = t + "px", TweenMax.to(this.maskEl, 1, {
					height: i,
					ease: Power2.easeInOut,
					onComplete: function() {
						e.maskEl.style.height = "auto"
					}
				}), TweenMax.to(this, 1, {
					gradientStrength: 0,
					onUpdate: this.updateGradient,
					onUpdateScope: this
				})
			}
		}, {
			key: "collapse",
			value: function() {
				this.open = !1;
				var e = this.getCollapsedHeight();
				this.buttonEl.innerHTML = this.buttonEl.getAttribute("data-expand-text"), TweenMax.to(this.maskEl, 1, {
					height: e,
					ease: Power2.easeInOut
				}), TweenMax.to(window, 1, {
					scrollTo: this.element.offsetTop + app.innerHeight,
					ease: Power2.easeInOut
				}), TweenMax.to(this, 1, {
					gradientStrength: 1,
					onUpdate: this.updateGradient,
					onUpdateScope: this
				})
			}
		}, {
			key: "getCollapsedHeight",
			value: function() {
				return this.element.getAttribute("data-collapsed-height") / 100 * app.innerHeight
			}
		}]), i
	}(),
	LayeredImageGalleryModule = function(e) {
		function i(e) {
			_classCallCheck(this, i);
			var t = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, e));
			return t.layers = [], t.isRendering = !1, t.galleryEl = t.element.querySelector(".gallery"), t.layeredImagesEl = t.element.querySelectorAll(".imageList .layeredImage"), t.imagesEl = t.element.querySelectorAll(".imageList .layeredImage img"), t.dummyEl = t.element.querySelector(".dummyHeight"), t.messiness = parseFloat(t.element.dataset.messiness) / 10, t.scrollEaseAmount = parseFloat(t.element.dataset.scroll_ease_amount) / 10 * 19 + 1, t.layerCount = parseInt(t.element.dataset.layer_count), t.autoPlaySpeed = parseFloat(t.element.dataset.auto_play_speed) / 10 * 3, t.interactive = "true" === t.element.dataset.interactive, t.dummyHeight = 0, t.targetProgress = 0, t.spacing = 0, t.fullWidth = 0, t.dragProgress = 0, t.lastDragClientX = 0, t.imageHeight, t.imagesLoaded, t.interactive ? (t.galleryEl.style.position = "static", t.galleryEl.classList.add("draggable")) : t.galleryEl.style.position = "sticky", t.interactive && (isTouch() ? (t.element.addEventListener("touchstart", t.touchStartHandler.bind(t)), t.element.addEventListener("touchmove", t.touchMoveHandler.bind(t)), window.addEventListener("touchend", t.touchEndHandler.bind(t))) : (t.element.addEventListener("mousedown", t.mouseDownHandler.bind(t)), t.element.addEventListener("mousemove", t.mouseMoveHandler.bind(t)), window.addEventListener("mouseup", t.mouseUpHandler.bind(t)))), t.createLayers(), t
		}
		return _inherits(i, View), _createClass(i, [{
			key: "createLayers",
			value: function() {
				for (var i = this, e = this.layers.length - 1; - 1 < e; e--) this.layers[e].destroy(), this.layers.splice(e, 1);
				var n = [],
					r = [],
					s = [];
				this.layeredImagesEl.forEach(function(e, t) {
					3 == i.layerCount && t % 7 == 0 && 0 != t ? n.push(e) : 1 < i.layerCount && t % 4 == 0 && 0 != t ? r.push(e) : s.push(e)
				}), this.layout(), this.layers = [new GalleryLayer(this, n, {
					y: -60,
					x: 0,
					startScale: .9,
					endScale: .5
				}), new GalleryLayer(this, r, {
					y: 60,
					x: this.spacing / 2,
					startScale: .9,
					endScale: 1
				}), new GalleryLayer(this, s, {
					y: 0,
					x: 0,
					startScale: 1,
					endScale: 1.2
				})], this.layout()
			}
		}, {
			key: "layout",
			value: function() {
				_get(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "layout", this).call(this), this.imageHeight = .6 * app.innerHeight, this.spacing = 2 * this.imageHeight, this.dummyHeight = this.dummyEl.clientHeight;
				for (var e = 0; e < this.layers.length; e++) this.layers[e].layout(), this.fullWidth = Math.max(this.layers[e].fullWidth, this.fullWidth);
				this.interactive || (this.dummyEl.style.height = this.fullWidth + "px")
			}
		}, {
			key: "mouseDownHandler",
			value: function(e) {
				this.dragging = !0, this.lastDragClientX = e.clientX
			}
		}, {
			key: "touchStartHandler",
			value: function(e) {
				this.dragging = !0, this.lastDragClientX = e.changedTouches[0].clientX
			}
		}, {
			key: "mouseMoveHandler",
			value: function(e) {
				this.dragging && (this.updateDrag(3 * (this.lastDragClientX - e.clientX)), this.lastDragClientX = e.clientX)
			}
		}, {
			key: "touchMoveHandler",
			value: function(e) {
				this.dragging && (this.updateDrag(3 * (this.lastDragClientX - e.changedTouches[0].clientX)), this.lastDragClientX = e.changedTouches[0].clientX)
			}
		}, {
			key: "mouseUpHandler",
			value: function() {
				this.dragging = !1
			}
		}, {
			key: "touchEndHandler",
			value: function() {
				this.dragging = !1
			}
		}, {
			key: "onScroll",
			value: function() {
				this.onUpdate()
			}
		}, {
			key: "onUpdate",
			value: function() {
				var e = void 0,
					t = void 0,
					i = app.scrollTop - this.element.offsetTop;
				this.interactive ? (e = this.fullWidth, t = this.dragProgress) : (e = this.fullWidth + app.innerHeight, t = i), t = t.clamp(0, e), this.targetProgress = t / e;
				var n = i > -app.innerHeight && i < this.dummyHeight + app.innerHeight;
				n && !this.imagesLoaded && (this.imagesLoaded = !0, preloadImages(this.imagesEl, this.layout.bind(this))), n && !this.isRendering ? this.isRendering = !0 : !n && this.isRendering && (this.isRendering = !1)
			}
		}, {
			key: "updateDrag",
			value: function(e) {
				this.dragProgress += e, this.dragProgress = this.dragProgress.clamp(0, this.fullWidth), this.onUpdate()
			}
		}, {
			key: "animate",
			value: function() {
				if (this.isRendering) {
					this.interactive && this.updateDrag(this.autoPlaySpeed);
					for (var e = 0; e < this.layers.length; e++) this.layers[e].animate()
				}
			}
		}]), i
	}(),
	GalleryLayer = function() {
		function r(e, t, i) {
			var n = this;
			_classCallCheck(this, r), this.galleryModule = e, this.params = i, this.currentProgress = this.galleryModule.targetProgress, this.easing = i.easing, this.layeredImageContainerEl = document.createElement("div"), this.layeredImageContainerEl.classList.add("layeredImages"), e.galleryEl.appendChild(this.layeredImageContainerEl), this.images = Array.from(t).map(function(e) {
				var t = e;
				return t.dataset.random1 = Math.random(), t.dataset.random2 = Math.random(), t.dataset.random3 = Math.random(), n.layeredImageContainerEl.appendChild(t), t
			}), this.fullWidth = 0
		}
		return _createClass(r, [{
			key: "layout",
			value: function() {
				var e = this.galleryModule.spacing / 2 * this.galleryModule.messiness,
					t = .4 * app.innerHeight * this.galleryModule.messiness;
				this.fullWidth = this.galleryModule.interactive ? app.innerWidth / 2 : app.innerWidth, this.layeredImageContainerEl.style.top = app.innerHeight / 2 - this.galleryModule.imageHeight / 2 + this.params.y + "px", this.layeredImageContainerEl.style.left = this.params.x + "px";
				for (var i = 0; i < this.images.length; i++) {
					var n = this.images[i],
						r = this.galleryModule.imageHeight / n.dataset.ar,
						s = this.params.startScale + (this.params.endScale - this.params.startScale) * this.galleryModule.messiness;
					n.style.height = this.galleryModule.imageHeight + "px", n.style.width = r + "px", n.style.left = this.fullWidth + (n.dataset.random2 * e - e / 2) + "px", n.style.top = n.dataset.random3 * t - t / 2 + "px", TweenMax.set(n, {
						scale: s
					}), i < this.images.length - 1 && (this.fullWidth += this.galleryModule.spacing), r
				}
			}
		}, {
			key: "animate",
			value: function() {
				this.currentProgress += (this.galleryModule.targetProgress - this.currentProgress) / this.galleryModule.scrollEaseAmount, TweenMax.set(this.layeredImageContainerEl, {
					x: -this.fullWidth * this.currentProgress,
					force3D: !0
				})
			}
		}, {
			key: "destroy",
			value: function() {
				this.galleryModule.galleryEl.removeChild(this.layeredImageContainerEl)
			}
		}]), r
	}(),
	YuriSuzuki = function(e) {
		function i(e) {
			_classCallCheck(this, i);
			var t = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, e));
			return t.soundEnabled = !1, t
		}
		return _inherits(i, View), _createClass(i, [{
			key: "initialize",
			value: function(e) {
				var i = this;
				this.element = e, this.audioEls = this.element.querySelectorAll(".sounds audio"), this.svgButtonEls = this.element.querySelectorAll(".hit-areas path"), this.svgButtonEls.forEach(function(e, t) {
					isTouch() ? e.addEventListener("touchstart", function() {
						i.soundOver(t)
					}) : e.addEventListener("mouseover", function() {
						i.soundOver(t)
					})
				}), this.playButtonEl = this.element.querySelector(".soundbyteModule__playButton"), this.playButtonEl.addEventListener("click", function() {
					i.playButtonEl.classList.add("hover-lock"), i.toggleSound()
				}), this.playButtonEl.addEventListener("mouseenter", function() {
					i.playButtonEl.classList.add("hover")
				}), this.playButtonEl.addEventListener("mouseleave", function() {
					i.playButtonEl.classList.remove("hover-lock"), i.playButtonEl.classList.remove("hover")
				})
			}
		}, {
			key: "soundOver",
			value: function(e) {
				var t = Array.from(this.audioEls)[e];
				!1 === this.soundEnabled || t.playing || (this.pauseAll(), t.playing = !0, t.onended = function() {
					t.playing = !1
				}, t.currentTime = 0, t.play())
			}
		}, {
			key: "toggleSound",
			value: function() {
				this.soundEnabled = !this.soundEnabled, this.soundEnabled ? this.playButtonEl.classList.add("active") : this.playButtonEl.classList.remove("active")
			}
		}, {
			key: "pauseAll",
			value: function() {
				var n = this;
				this.svgButtonEls.forEach(function(e, t) {
					var i = Array.from(n.audioEls)[t];
					i.playing = !1, i.pause()
				})
			}
		}]), i
	}();
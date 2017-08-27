/*
 * jQuery Orbit Plugin 1.3.0
 * www.ZURB.com/playground
 * Copyright 2010, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

(function (c) {
    var g = {
        defaults: {
            animation: "horizontal-push",
            animationSpeed: 600,
            timer: !0,
            advanceSpeed: 4E3,
            pauseOnHover: !1,
            startClockOnMouseOut: !1,
            startClockOnMouseOutAfter: 1E3,
            directionalNav: !0,
            captions: !0,
            captionAnimation: "fade",
            captionAnimationSpeed: 600,
            bullets: !1,
            bulletThumbs: !1,
            bulletThumbLocation: "",
            afterSlideChange: c.noop,
            centerBullets: !0
        },
        activeSlide: 0,
        numberSlides: 0,
        orbitWidth: null,
        orbitHeight: null,
        locked: null,
        timerRunning: null,
        degrees: 0,
        wrapperHTML: '<div class="orbit-wrapper" />',
        timerHTML: '<div class="timer"><span class="mask"><span class="rotator"></span></span><span class="pause"></span></div>',
        captionHTML: '<div class="orbit-caption"></div>',
        directionalNavHTML: '<div class="slider-nav"><span class="right">Right</span><span class="left">Left</span></div>',
        bulletHTML: '<ul class="orbit-bullets"></ul>',
        init: function (a, b) {
            var d, e = 0, f = this;
            this.clickTimer = c.proxy(this.clickTimer, this);
            this.addBullet = c.proxy(this.addBullet, this);
            this.resetAndUnlock = c.proxy(this.resetAndUnlock, this);
            this.stopClock = c.proxy(this.stopClock, this);
            this.startTimerAfterMouseLeave = c.proxy(this.startTimerAfterMouseLeave,
                this);
            this.clearClockMouseLeaveTimer = c.proxy(this.clearClockMouseLeaveTimer, this);
            this.rotateTimer = c.proxy(this.rotateTimer, this);
            this.options = c.extend({}, this.defaults, b);
            if ("false" === this.options.timer)this.options.timer = !1;
            if ("false" === this.options.captions)this.options.captions = !1;
            if ("false" === this.options.directionalNav)this.options.directionalNav = !1;
            this.$element = c(a);
            this.$wrapper = this.$element.wrap(this.wrapperHTML).parent();
            this.$slides = this.$element.children("img, a, div");
            this.$element.bind("orbit.next",
                function () {
                    f.shift("next")
                });
            this.$element.bind("orbit.prev", function () {
                f.shift("prev")
            });
            this.$element.bind("orbit.goto", function (a, b) {
                f.shift(b)
            });
            this.$element.bind("orbit.start", function () {
                f.startClock()
            });
            this.$element.bind("orbit.stop", function () {
                f.stopClock()
            });
            d = this.$slides.filter("img");
            0 === d.length ? this.loaded() : d.bind("imageready", function () {
                e += 1;
                e === d.length && f.loaded()
            })
        },
        loaded: function () {
            this.$element.addClass("orbit").width("1px").height("1px");
            this.setDimentionsFromLargestSlide();
            this.updateOptionsIfOnlyOneSlide();
            this.setupFirstSlide();
            this.options.timer && (this.setupTimer(), this.startClock());
            this.options.captions && this.setupCaptions();
            this.options.directionalNav && this.setupDirectionalNav();
            this.options.bullets && (this.setupBulletNav(), this.setActiveBullet())
        },
        currentSlide: function () {
            return this.$slides.eq(this.activeSlide)
        },
        setDimentionsFromLargestSlide: function () {
            var a = this;
            this.$slides.each(function () {
                var b = c(this), d = b.width(), b = b.height();
                if (d > a.$element.width())a.$element.add(a.$wrapper).width(d),
                    a.orbitWidth = a.$element.width();
                if (b > a.$element.height())a.$element.add(a.$wrapper).height(b), a.orbitHeight = a.$element.height();
                a.numberSlides += 1
            })
        },
        lock: function () {
            this.locked = !0
        },
        unlock: function () {
            this.locked = !1
        },
        updateOptionsIfOnlyOneSlide: function () {
            if (1 === this.$slides.length)this.options.directionalNav = !1, this.options.timer = !1, this.options.bullets = !1
        },
        setupFirstSlide: function () {
            var a = this;
            this.$slides.first().css({"z-index": 3}).fadeIn(function () {
                a.$slides.css({display: "block"})
            })
        },
        startClock: function () {
            var a =
                this;
            if (!this.options.timer)return !1;
            this.$timer.is(":hidden") ? this.clock = setInterval(function () {
                a.$element.trigger("orbit.next")
            }, this.options.advanceSpeed) : (this.timerRunning = !0, this.$pause.removeClass("active"), this.clock = setInterval(this.rotateTimer, this.options.advanceSpeed / 180))
        },
        rotateTimer: function () {
            var a = "rotate(" + this.degrees + "deg)";
            this.degrees += 2;
            this.$rotator.css({"-webkit-transform": a, "-moz-transform": a, "-o-transform": a});
            180 < this.degrees && (this.$rotator.addClass("move"), this.$mask.addClass("move"));
            if (360 < this.degrees)this.$rotator.removeClass("move"), this.$mask.removeClass("move"), this.degrees = 0, this.$element.trigger("orbit.next")
        },
        stopClock: function () {
            if (this.options.timer)this.timerRunning = !1, clearInterval(this.clock), this.$pause.addClass("active"); else return !1
        },
        setupTimer: function () {
            this.$timer = c(this.timerHTML);
            this.$wrapper.append(this.$timer);
            this.$rotator = this.$timer.find(".rotator");
            this.$mask = this.$timer.find(".mask");
            this.$pause = this.$timer.find(".pause");
            this.$timer.click(this.clickTimer);
            this.options.startClockOnMouseOut && (this.$wrapper.mouseleave(this.startTimerAfterMouseLeave), this.$wrapper.mouseenter(this.clearClockMouseLeaveTimer));
            this.options.pauseOnHover && this.$wrapper.mouseenter(this.stopClock)
        },
        startTimerAfterMouseLeave: function () {
            var a = this;
            this.outTimer = setTimeout(function () {
                a.timerRunning || a.startClock()
            }, this.options.startClockOnMouseOutAfter)
        },
        clearClockMouseLeaveTimer: function () {
            clearTimeout(this.outTimer)
        },
        clickTimer: function () {
            this.timerRunning ? this.stopClock() : this.startClock()
        },
        setupCaptions: function () {
            this.$caption = c(this.captionHTML);
            this.$wrapper.append(this.$caption);
            this.setCaption()
        },
        setCaption: function () {
            var a = this.currentSlide().attr("data-caption"), b;
            if (!this.options.captions)return !1;
            if (a)switch (b = c(a).html(), this.$caption.attr("id", a).html(b), this.options.captionAnimation) {
                case "none":
                    this.$caption.show();
                    break;
                case "fade":
                    this.$caption.fadeIn(this.options.captionAnimationSpeed);
                    break;
                case "slideOpen":
                    this.$caption.slideDown(this.options.captionAnimationSpeed)
            } else switch (this.options.captionAnimation) {
                case "none":
                    this.$caption.hide();
                    break;
                case "fade":
                    this.$caption.fadeOut(this.options.captionAnimationSpeed);
                    break;
                case "slideOpen":
                    this.$caption.slideUp(this.options.captionAnimationSpeed)
            }
        },
        setupDirectionalNav: function () {
            var a = this;
            this.$wrapper.append(this.directionalNavHTML);
            this.$wrapper.find(".left").click(function () {
                a.stopClock();
                a.$element.trigger("orbit.prev")
            });
            this.$wrapper.find(".right").click(function () {
                a.stopClock();
                a.$element.trigger("orbit.next")
            })
        },
        setupBulletNav: function () {
            this.$bullets = c(this.bulletHTML);
            this.$wrapper.append(this.$bullets);
            this.$slides.each(this.addBullet);
            this.options.centerBullets && this.$bullets.css("margin-left", -this.$bullets.width() / 2)
        },
        addBullet: function (a, b) {
            var d = c("<li>" + (a + 1) + "</li>"), e, f = this;
            this.options.bulletThumbs && (e = c(b).attr("data-thumb")) && d.addClass("has-thumb").css({background: "url(" + this.options.bulletThumbLocation + e + ") no-repeat"});
            this.$bullets.append(d);
            d.data("index", a);
            d.click(function () {
                f.stopClock();
                f.$element.trigger("orbit.goto", [d.data("index")])
            })
        },
        setActiveBullet: function () {
            if (this.options.bullets)this.$bullets.find("li").removeClass("active").eq(this.activeSlide).addClass("active");
            else return !1
        },
        resetAndUnlock: function () {
            this.$slides.eq(this.prevActiveSlide).css({"z-index": 1});
            this.unlock();
            this.options.afterSlideChange.call(this, this.$slides.eq(this.prevActiveSlide), this.$slides.eq(this.activeSlide))
        },
        shift: function (a) {
            var b = a;
            this.prevActiveSlide = this.activeSlide;
            if (this.prevActiveSlide == b)return !1;
            if ("1" == this.$slides.length)return !1;
            if (!this.locked) {
                this.lock();
                if ("next" == a) {
                    if (this.activeSlide++, this.activeSlide == this.numberSlides)this.activeSlide = 0
                } else if ("prev" == a) {
                    if (this.activeSlide--,
                        0 > this.activeSlide)this.activeSlide = this.numberSlides - 1
                } else this.activeSlide = a, this.prevActiveSlide < this.activeSlide ? b = "next" : this.prevActiveSlide > this.activeSlide && (b = "prev");
                this.setActiveBullet();
                this.$slides.eq(this.prevActiveSlide).css({"z-index": 2});
                "fade" == this.options.animation && this.$slides.eq(this.activeSlide).css({
                    opacity: 0,
                    "z-index": 3
                }).animate({opacity: 1}, this.options.animationSpeed, this.resetAndUnlock);
                "horizontal-slide" == this.options.animation && ("next" == b && this.$slides.eq(this.activeSlide).css({
                    left: this.orbitWidth,
                    "z-index": 3
                }).animate({left: 0}, this.options.animationSpeed, this.resetAndUnlock), "prev" == b && this.$slides.eq(this.activeSlide).css({
                    left: -this.orbitWidth,
                    "z-index": 3
                }).animate({left: 0}, this.options.animationSpeed, this.resetAndUnlock));
                "vertical-slide" == this.options.animation && ("prev" == b && this.$slides.eq(this.activeSlide).css({
                    top: this.orbitHeight,
                    "z-index": 3
                }).animate({top: 0}, this.options.animationSpeed, this.resetAndUnlock), "next" == b && this.$slides.eq(this.activeSlide).css({
                    top: -this.orbitHeight,
                    "z-index": 3
                }).animate({top: 0},
                    this.options.animationSpeed, this.resetAndUnlock));
                "horizontal-push" == this.options.animation && ("next" == b && (this.$slides.eq(this.activeSlide).css({
                    left: this.orbitWidth,
                    "z-index": 3
                }).animate({left: 0}, this.options.animationSpeed, this.resetAndUnlock), this.$slides.eq(this.prevActiveSlide).animate({left: -this.orbitWidth}, this.options.animationSpeed)), "prev" == b && (this.$slides.eq(this.activeSlide).css({
                    left: -this.orbitWidth,
                    "z-index": 3
                }).animate({left: 0}, this.options.animationSpeed, this.resetAndUnlock), this.$slides.eq(this.prevActiveSlide).animate({left: this.orbitWidth},
                    this.options.animationSpeed)));
                "vertical-push" == this.options.animation && ("next" == b && (this.$slides.eq(this.activeSlide).css({
                    top: -this.orbitHeight,
                    "z-index": 3
                }).animate({top: 0}, this.options.animationSpeed, this.resetAndUnlock), this.$slides.eq(this.prevActiveSlide).animate({top: this.orbitHeight}, this.options.animationSpeed)), "prev" == b && (this.$slides.eq(this.activeSlide).css({
                    top: this.orbitHeight,
                    "z-index": 3
                }).animate({top: 0}, this.options.animationSpeed, this.resetAndUnlock), this.$slides.eq(this.prevActiveSlide).animate({top: -this.orbitHeight},
                    this.options.animationSpeed)));
                this.setCaption()
            }
        }
    };
    c.fn.orbit = function (a) {
        return this.each(function () {
            c.extend({}, g).init(this, a)
        })
    }
})(jQuery);
(function (c) {
    function g(a, d) {
        var e = c(a);
        e.bind("load.imageready", function () {
            d.apply(a, arguments);
            e.unbind("load.imageready")
        })
    }

    var a = {};
    c.event.special.imageready = {
        setup: function (b) {
            a = b || a
        }, add: function (b) {
            var d = c(this), e;
            1 === this.nodeType && "img" === this.tagName.toLowerCase() && "" !== this.src && (a.forceLoad ? (e = d.attr("src"), d.attr("src", ""), g(this, b.handler), d.attr("src", e)) : this.complete || 4 === this.readyState ? b.handler.apply(this, arguments) : g(this, b.handler))
        }, teardown: function () {
            c(this).unbind(".imageready")
        }
    }
})(jQuery);
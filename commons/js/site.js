/* GNB */
(function () {
	var AccessibleNav = function () {
		this.status = false;
		this.anchor = [];
	};

	AccessibleNav.prototype = {
		initialize: function () {
			var that = this;
			that.hook = jQuery(that.options.hook);
			that.listParent = that.options.listParent;
			that._map();

			that.anchor
				.on("focus", function () {
					that._focus.apply(that, [this, "focus"]);

				})
				.on("focusout", function () {
					that.status = false;
					setTimeout(function () {
						if (that.status === false) {
							that._blur();
						}
					}, 12);
				})
				.on("focusin", function () {
					that.status = true;

				})
				.on("mouseenter", function () {
					that._focus.apply(that, [this, "mouseover"]);

				});

			that.hook.on("mouseleave", function () {
				jQuery(this)
					.find(that.listParent)
					.removeClass(that.options.mouseoverClass);
				that.hook.removeClass(that.options.selectClass);
				that.hook.parent().parent().removeClass('over')
			});
		},
		_map: function () {
			var that = this;

			that.hook.find("a").each(function () {
				that.anchor = jQuery.merge(jQuery(this), that.anchor);
			});
		},
		_focus: function (el, type) {

			var that = this,
				_class =
				type === "focus" ?
				that.options.focusClass :
				that.options.mouseoverClass;

			jQuery(el).closest(that.hook).addClass(that.options.selectClass);
			jQuery(el).closest(that.hook).parent().parent().addClass(_class)

			jQuery(el)
				.closest(that.listParent)
				.addClass(_class)
				.siblings()
				.removeClass(_class);

		},
		_blur: function () {
			var that = this;

			that.hook
				.removeClass(that.options.selectClass)
				.find(that.listParent)
				.removeClass(that.options.focusClass);
		},
	};

	var gnb = new AccessibleNav();

	return {
		load: function () {
			var that = this;
			jQuery(window).on("load", function () {
				gnb.options = {
					hook: ".nav-menu",
					listParent: ".nav-item",
					selectClass: "selected",
					focusClass: "focus",
					mouseoverClass: "over",
				};

				gnb.initialize();
			});
		},
	};
})().load();

$(function () {
	m_gnb();
	skipContents();

	var swiper = new Swiper(".main-visual", {
		effect: "fade",
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},

	});

	
	$('.btn-top').on('click', function (e) {
		e.preventDefault();
		
		$('html, body').stop().animate({
			scrollTop : 0
		}, 500)
	})

	window.addEventListener('scroll', function () {
		if (this.pageYOffset > window.innerHeight / 2) {
			$('.quick-menu').addClass('fixed')
		} else {
			$('.quick-menu').removeClass('fixed')
		}
	});


	$.exists = function (selector) {
		return $(selector).length > 0;
	};


	$('.btn-menu').on('click', function () {
		if ($(this).hasClass('open')) {
			$('.btn-menu').removeClass('open')
			$('.m-nav').stop().fadeOut();
			$('.m-nav-container').stop().animate({
				right: '-100%'
			})
		} else {

			$('.m-nav').fadeIn();
			$('.m-nav-container').stop().animate({
				right: 0
			})
			$('.btn-menu').addClass('open')
		}
	});
});

function m_gnb() {
	$(".btn-m-gnb-open").click(function (e) {
		e.preventDefault();

		if ($(this).hasClass("open")) {
			$(this).parent().removeClass("open");
			$(this).removeClass("open");
			$(".m-gnb").animate({
					right: -320,
				},
				200
			);
			$(".m-sub-nav").slideUp(300);
		} else {
			$(this).parent().addClass("open");
			$(this).addClass("open");
			$(".m-gnb").animate({
					right: 0,
				},
				200
			);
		}
	});

	$(".m-nav-menu > li ").click(function () {
		$(".m-nav-menu > li ").removeClass("selected");
		$(".m-sub-nav").hide();
		$(this).children(".m-sub-nav").show();
		$(this).addClass("selected");
	});

	$('.m-nav-menu > li:first-child').addClass('selected')

	$('.m-nav .btn-close').on('click', function () {
		$('.m-nav .m-nav-container').stop().animate({
			right: '-100%'
		}, 300, function () {
			$('.m-nav').stop().fadeOut(300)
		})

	});

	let sub_depth_len = $('.sub-depth').length;

	if (sub_depth_len == 2) {
		$('.sub-lnb').addClass('type2')
	} else if (sub_depth_len == 3) {
		$('.sub-lnb').addClass('type3')
	}
	$(".sub-depth .current").on("mouseenter focusin", function (e) {
		e.preventDefault();
		$(this).parent().find("ul").stop().slideDown(200);
		$(this).parent().addClass("on");
	});
	$(".sub-depth").on("mouseleave", function () {
		if ($(this).hasClass("on")) {
			$(this).find("ul").stop().slideUp(200);
			$(this).removeClass("on");
		}
	});
}

function skipContents() {
	$(".skiptoContent").focusin(function () {
		$(this).animate({
				top: 0,
				height: 50,
				opacity: 1,
			},
			0
		);
	});
	$(".skiptoContent").focusout(function () {
		$(this).animate({
				top: -50,
				height: 0,
				opacity: 0,
			},
			150
		);
	});
}

function tabs() {
	$(".tab-top li").click(function (e) {
		e.preventDefault();
		var thisIndex = $(this).parent().find("li").index(this);
		$(this)
			.parent()
			.parent()
			.parent()
			.find("div.tab-cnt")
			.removeClass("on");

		$(this).parent().find("li").removeClass("on");
		$(this)
			.parent()
			.parent()
			.parent()
			.find("div.tab-cnt")
			.eq(thisIndex)
			.addClass("on");
		$(this).addClass("on");
		return false;
	});
}
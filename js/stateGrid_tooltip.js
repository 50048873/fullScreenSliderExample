//自定弹出提示
(function($) { 
	/*
		title: boolean（选传）,
		text: string（必传），
		btns: [
			{ 
				href: 'midAutumn.html',
				text: '按钮一',
				click: function(e) { 
					e.preventDefault();
					alert('按钮一');
				}
			},
			{ 
				href: 'down.html',
				text: '按钮二',
				click: function(e) { 
					e.preventDefault();
					window.location.href = 'winRecord.html';
				}
			}
		]

	*/
	SgTooltip.defaults = { 
		title: '提示',
		text: ''
	};

	function SgTooltip(opts) { 
		this.opts = $.extend({}, SgTooltip.defaults, opts);
		//this.title = this.opts.title;
		
		this.init();
		this.show();
		this.btnClick();
		this.remove();
	}

	SgTooltip.prototype.init = function() { 
		var btns_dom;
		
		if ($.isArray(this.opts.btns)) { 
			var btns = this.opts.btns;
			var len = btns.length;
			var arr = [];
			for (var i = 0; i < len; i++) { 
				arr.push('<a href="' + btns[i].href + '">' + btns[i].text + '</a>');
			}
			btns_dom = '<div class="btns" id="sg_btns">' + arr.join('') + '</div>';
		} else { 
			btns_dom = '';
		}

		this.$html = $('<div class="mask" id="sg_tooltip">' + 
						'<section class="popupLayer_container">' +
							'<div class="popupLayer">' +
								'<h3>' + this.opts.title + '<img id="sg_close" src="img/close.png" alt="tu"></h3>' +
								'<div class="pl_con">' +
									'<img class="left" src="img/c-1.png" alt="tu">' +
									'<img class="right" src="img/c-1.png" alt="tu">' +
									'<div class="tooltip_text">' + this.opts.text + '</div>' + 
									btns_dom +
								'</div>' +
							'</div>' +
						'</section>' +
					'</div>');

	};

	SgTooltip.prototype.show = function() { 
		this.$html.appendTo($('body')).show();
	};

	SgTooltip.prototype.btnClick = function() { 
		if ($.isArray(this.opts.btns)) { 
			var btns = this.opts.btns;
			$('#sg_btns a').click(function(e) { 
				var index = $(this).index();
				btns[index].click(e);
			});
		}
	};

	SgTooltip.prototype.remove = function() { 
		$('#sg_close').click(function() { 
			$('#sg_tooltip').remove();
		});
	};

	//扩展jQuery工具方法
	$.sgTooltip = function(opts) { 
		new SgTooltip(opts);
	};
})(jQuery);
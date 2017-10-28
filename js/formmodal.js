+function ($) {
	"use strict";

	//FormModal 定义
	var FormModal = function (element, options) {
		this.$element = $(element);
		this.super = this.$element.data('bs.modal');
		this.options = options;

		this.$element.on('click.submit.formmodal', 
			'[data-form="submit"]', $.proxy(this.submit, this));
		this.$element.on('click.reset.formmodal', 
			'[data-form="reset"]', $.proxy(this.reset, this));
		this.$element.on('click.cancel.formmodal', 
			'[data-form="cancel"]', $.proxy(this.cancel, this));

		var that = this;

		this.$element.on("show.bs.modal", function (e) {
			that.$element.trigger(e = $.Event('show.bs.formmodal'));
			if (e.isDefaultPrevented()) return;
		});
		this.$element.on("shown.bs.modal", function (e) {
			that.$form = that.$element.find('form');
			that.$element.trigger(e = $.Event('shown.bs.formmodal'));
			if (e.isDefaultPrevented()) return;
		});
		this.$element.on("hide.bs.modal", function (e) {
			that.$element.trigger(e = $.Event('hide.bs.formmodal'));
			if (e.isDefaultPrevented()) return;
		});
		this.$element.on("hidden.bs.modal", function (e) {
			that.$element.trigger(e = $.Event('hidden.bs.formmodal'));
			if (e.isDefaultPrevented()) return;
		});
	}

	//默认设置
	FormModal.DEFAULTS = {
		cacheForm: false,
		closeAfterCancel: true
	}

	//反转弹窗状态
	FormModal.prototype.toggle = function (_relatedTarget) {
		return this[!this.super.isShown ? 'show' : 'hide'](_relatedTarget)
	}
	//打开弹窗
	FormModal.prototype.show = function (_relatedTarget) {
		this.super.show(_relatedTarget);
	}
	//关闭弹窗
	FormModal.prototype.hide = function (e) {
		if (e) e.preventDefault();
		this.super.hide();
	}
	//单机“确认”按钮的行为
	FormModal.prototype.submit = function (e) {
		if (e) e.preventDefault();

		this.$element.trigger(e = $Event('beforeSubmit.bs.formmodal'));

		if (e.isDefaultPrevented()) return;

		this.$form.submit();

		this.$element.trigger(e = $.Event('afterSubmit.bs.formmodal'));

		if (e.isDefaultPrevented()) return;
	}
	//单击“重置”按钮的行为
	FormModal.prototype.reset = function (e) {
		if (e) e.preventDefault();
		var resetAction = function() {
			this.$element.trigger(e = $.Event('beforeReset.bs.formmodal'));

			if (e.isDefaultPrevented()) return;

			this.$form.each(function () {
				this.reset();
			});

			this.$element.trigger(e = $.Event('afterReset.bs.formmodal'));

			if (e.isDefaultPrevented()) return;
 		}
 		if (this.super.isShown) return resetAction.call(this);

 		this.$element.one("shown.bs.formmodal", $.proxy(resetAction, this));
 		this.show();
	}
	//单击“取消”按钮的行为
	FormModal.prototype.cancel = function (e) {
		if (e) e.preventDefault();

		var e = $.Event('cancel.bs.formmodal');
		this.$element.trigger(e);

		if (e.isDefaultPrevented()) return;
		if (this.options.closeAfterCancel) {
			this.hide(e);
		}
	}

	//formmodal插件定义
	var old = $.fn.formmodal;

	$.fn.formmodal = function (option, _relatedTarget) {
		return this.each(function () {
			var $this = $(this);
			var options = $.extend({}, FormModal.DEFAULTS, $this.data(),
				typeof option == 'object' && option);

			var data = options.cacheForm && $this.data('bs.formmodal');

			options.show = false;
			if (!options.cacheForm) {
				$this.data('bs.modal', null);
			}

			$this.modal(options, _relatedTarget);

			if (!data) $this.data('bs.formmodal', 
				(data = new FormModal(this, options)));

			if (typeof option == 'string') {
				data[option](_relatedTarget);
			}
			else {
				data.show(_relatedTarget);
			}
		});
	}

	$.fn.formmodal.Constructor = FormModal;

	//formmodal防冲突
	$.fn.formmodal.noConflict = function () {
		$.fn.formmodal = old;
		return this;
	}

	//formmodal DATA-API
	$(document).on('click.bs.formmodal.data-api', 
		'[data-toggle="formmodal"]', function (e) {

			var $this = $(this);
			var href = $this.attr('href');
			var $target = $($this.attr('data-target') ||
				(href && href.replace(/.*(?=#[^\s]+$)/, '')));

			var option = $target.data('formmodal') ? 'toggle' : $.extend({
				remote: !/#/.test(href) && href }, $target.data(), $this.data());

			e.preventDefault();
			$target
				.formmodal(option, this)
				.one('hide', function () {
					$this.is(':visible') && $this.focus();
				});
	});
}(jQuery);
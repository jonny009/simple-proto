(function ($) {
    var SimpleProto = function (options) {
        var defaults = {
                prefix: 'sp',
                templateRoot: '',
                scriptRoot: '',
                styleRoot: ''
            },
            settings = $.extend({}, defaults, options),
            att = {
                pre: 'data-' + settings.prefix + '-app',
                simple: settings.prefix + '-app'
            },
            $element = $(document).find('[' + att.pre + '], [' + att.simple + ']');
        this.app = {
            elem: $element,
            controller: ($element.attr(att.pre) || $element.attr(att.simple)) + '.js',
            stylesheet: ($element.attr(att.pre) || $element.attr(att.simple)) + '.css',
        };
        this.prefix = settings.prefix;
        this.templateRoot = settings.templateRoot;
        this.scriptRoot = settings.scriptRoot;
        this.styleRoot = settings.styleRoot;
        this.templates = {};
        this.log = function () {
            var i,
                a = {};
            if (console && console.info) {
                console.info((arguments.length === 1) ? arguments[0] : arguments);
            } else {
                return false;
            }
        };
    };
    SimpleProto.prototype.fetchTemplates = function (obj) {
        if (typeof obj !== 'object' || !obj.elem || !obj.url) {
            return false;
        }
        $.ajax({
            method: 'GET',
            url: obj.url,
            success: function (data) {
                obj.elem.replaceWith(data);
            },
            error: function (err) {
                if (err.status === 404) {
                    this.log('Template file at "' + obj.url + '" not found');
                }
            }.bind(this)
        });
    };
    SimpleProto.prototype.setTemplates = function () {
        var a = this.app.elem.find('[data-' + this.prefix + '-template], [' + this.prefix + '-template]'),
            i;
        $.each(a, function (i) {
            this.templates[i] = {
                elem: $(a[i]),
                url: this.templateRoot + ($(a[i]).attr('data-' + this.prefix + '-template') || $(a[i]).attr(this.prefix + '-template'))+ '.html'
            };
            this.fetchTemplates(this.templates[i]);
        }.bind(this));
    };
    SimpleProto.prototype.setController = function () {
        var scriptUrl = this.scriptRoot + this.app.controller;
        $.getScript(scriptUrl);
    };
    SimpleProto.prototype.setStyle = function () {
        var styleLink = this.styleRoot + this.app.stylesheet;
            styleTemplate = '<link rel="stylesheet" href="' + styleLink + '">';
        this.app.elem.prepend(styleTemplate);
    };
    SimpleProto.prototype.build = function () {
        $.ajaxSetup({
            cache:true
        });
        this.setTemplates();
        this.setController();
        this.setStyle();
    };
    SimpleProto.prototype.report = function () {
        return {
            wrapper: this.app.elem,
            controller: this.app.controller,
            stylesheet: this.app.stylesheet,
            templates: this.templates,
            prefix: this.prefix
        };
    };
    $.createPrototype = function (pre) {
        return new SimpleProto(pre);
    };
}(jQuery));

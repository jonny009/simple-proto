(function ($) {
    var SimpleProto = function (prefix) {
            this.app = {
                elem: $(document).find('[data-' + prefix + '-app], [' + prefix + '-app]'),
                controller: ($(document).find('[data-' + prefix + '-app], [' + prefix + '-app]').attr('data-' + prefix + '-app') || $(document).find('[data-' + prefix + '-app], [' + prefix + '-app]').attr(prefix + '-app')) + '.js'
            };
            this.prefix = prefix;
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
    SimpleProto.prototype.setTemplates = function (noFetch) {
        var a = this.app.elem.find('[data-' + this.prefix + '-template], [' + this.prefix + '-template]'),
            i;
        $.each(a, function (i) {
            this.templates[i] = {
                elem: $(a[i]),
                url: $(a[i]).attr('data-' + this.prefix + '-template') || $(a[i]).attr(this.prefix + '-template')
            };
            if (!noFetch) {
                this.fetchTemplates(this.templates[i]);
            }
        }.bind(this));
    };
    SimpleProto.prototype.setController = function () {
        var scriptUrl = 'scripts/' + this.app.controller;
        $.getScript(scriptUrl);
    };
    SimpleProto.prototype.build = function () {
        $.ajaxSetup({
            cache:true
        });
        this.setTemplates();
        this.setController();
    };
    SimpleProto.prototype.report = function () {
        return {
            wrapper: this.app.elem,
            controller: this.app.controller,
            templates: this.templates,
            prefix: this.prefix
        };
    };
    $.createPrototype = function (pre) {
        return new SimpleProto(pre);
    };
}(jQuery));

require(['form', 'upload'], function (Form, Upload) {
    var _bindevent = Form.events.bindevent;
    Form.events.bindevent = function (form) {
        _bindevent.apply(this, [form]);

        if ($("#croppertpl").length == 0) {
            var allowAttr = [
                'aspectRatio', 'autoCropArea', 'cropBoxMovable', 'cropBoxResizable', 'minCropBoxWidth', 'minCropBoxHeight', 'minContainerWidth', 'minContainerHeight',
                'minCanvasHeight', 'minCanvasWidth', 'croppedWidth', 'croppedHeight', 'croppedMinWidth', 'croppedMinHeight', 'croppedMaxWidth', 'croppedMaxHeight', 'fillColor',
                'containerMinHeight', 'containerMaxHeight', 'customWidthHeight', 'customAspectRatio'
            ];
            String.prototype.toLineCase = function () {
                return this.replace(/[A-Z]/g, function (match) {
                    return "-" + match.toLowerCase();
                });
            };

            var btnAttr = [];
            $.each(allowAttr, function (i, j) {
                btnAttr.push('data-' + j.toLineCase() + '="<%=data.' + j + '%>"');
            });

            var btn = '<button class="btn btn-success btn-cropper btn-xs" data-input-id="<%=data.inputId%>" ' + btnAttr.join(" ") + ' style="position:absolute;top:10px;right:15px;">裁剪</button>';

            var insertBtn = function () {
                return arguments[0].replace(arguments[2], btn + arguments[2]);
            };
            $("<script type='text/html' id='croppertpl'>" + Upload.config.previewtpl.replace(/<li(.*?)>(.*?)<\/li>/, insertBtn) + "</script>").appendTo("body");
        }

        $(".plupload[data-preview-id],.faupload[data-preview-id]").each(function () {
            var preview_id = $(this).data("preview-id");
            var previewObj = $("#" + preview_id);
            var tpl = previewObj.length > 0 ? previewObj.data("template") : '';
            if (!tpl) {
                if (!$(this).hasClass("cropper")) {
                    $(this).addClass("cropper");
                }
                previewObj.data("template", "croppertpl");
            }
        });

        //图片裁剪
        $(document).off('click', '.btn-cropper').on('click', '.btn-cropper', function () {
            var image = $(this).closest("li").find('.thumbnail').data('url');
            var input = $("#" + $(this).data("input-id"));
            var url = image;
            var data = $(this).data();
            var params = [];
            $.each(allowAttr, function (i, j) {
                if (typeof data[j] !== 'undefined' && data[j] !== '') {
                    params.push(j + '=' + data[j]);
                }
            });
            try {
                var parentWin = (parent ? parent : window);
                parentWin.Fast.api.open('/addons/cropper/index/cropper?url=' + image + (params.length > 0 ? '&' + params.join('&') : ''), '裁剪', {
                    callback: function (data) {
                        if (typeof data !== 'undefined') {
                            var arr = data.dataURI.split(','), mime = arr[0].match(/:(.*?);/)[1],
                                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                            while (n--) {
                                u8arr[n] = bstr.charCodeAt(n);
                            }
                            var urlArr = url.split('.');
                            var suffix = 'png';
                            url = urlArr.join('');
                            var filename = url.substr(url.lastIndexOf('/') + 1);
                            var exp = new RegExp("\\." + suffix + "$", "i");
                            filename = exp.test(filename) ? filename : filename + "." + suffix;
                            var file = new File([u8arr], filename, {type: mime});
                            Upload.api.send(file, function (data) {
                                input.val(input.val().replace(image, data.url)).trigger("change");
                            }, function (data) {
                            });
                        }
                    },
                    area: [Math.min(parentWin.$(parentWin.window).width(), Config.cropper.dialogWidth) + "px", Math.min(parentWin.$(parentWin.window).height(), Config.cropper.dialogHeight) + "px"],
                });
            } catch (e) {
                console.error(e);
            }
            return false;
        });
    }
});

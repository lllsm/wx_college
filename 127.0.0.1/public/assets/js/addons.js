define([], function () {
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

require.config({
    paths: {
        'tinymce': '../addons/tinymce/js/tinymce/tinymce.min'
    },
});
require(['form', 'upload'], function (Form, Upload) {
    var _bindevent = Form.events.bindevent;
    Form.events.bindevent = function (form) {
        _bindevent.apply(this, [form]);
        try {
            //绑定summernote事件
            if ($(".tinymce,.editor", form).size() > 0) {
                require(['tinymce'], function () {
                    var init = {
                        selector: ".tinymce,.editor",//容器可以是id也可以是class
                        language: 'zh_CN',//语言
                        theme: 'silver',//主体默认主题
                        plugins: ['advlist link image lists charmap hr anchor pagebreak searchreplace wordcount visualblocks visualchars code insertdatetime nonbreaking save table contextmenu directionality help autolink autosave print preview spellchecker fullscreen media emoticons template paste textcolor'],//所含插件
                        content_style : '',//编辑器样式只对编辑器试图有效不会提交到html中
                        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons | spellchecker help',//工具栏
                        file_picker_types: 'image,media',//文件上传支持类型：file,image,media
                        //图像上传处理
                        convert_urls:false,//关闭url自动检测
                        images_upload_handler: function (blobInfo, success, failure) {
                            Upload.api.send(blobInfo.blob(), function (data) {
                                var url = Fast.api.cdnurl(data.url);
                                success( url);
                                return;
                            },function (data,ret) {
                                Layer && Layer.closeAll('dialog');
                                failure(ret.msg);
                                return;
                            });
                        },
                        image_default_size:{width:'100%',height:''},//图片添加成功后的默认宽高 格式：{width:"",height:''} 允许是百分比或像素
                        media_default_size:{width:'100%',height:''},//音/视频添加成功后的默认宽高 格式：{width:"",height:''} 允许是百分比或像素
                        browser_spellcheck: true,//浏览器检查拼写
                        spellchecker_callback: function(method, text, success, failure) {
                            var words = text.match(this.getWordCharPattern());
                            if (method == "spellcheck") {
                                var suggestions = {};
                                for (var i = 0; i < words.length; i++) {
                                    suggestions[words[i]] = ["First", "Second"];
                                }
                                success(suggestions);
                            }
                        },
                        setup:function (editor) {
                            editor.on('change',function () {
                                editor.save();
                                $(editor.getElement()).trigger("input");
                            });
                        }
                    };
                    if(false){
                        //文件上传处理
                        init.file_picker_callback = function(callback, value, meta) {
                            //为不同插件指定文件类型
                            switch(meta.filetype){
                                case 'image':
                                    filetype='image/*';
                                    break;
                                case 'media':
                                    filetype='audio/*,video/*';
                                    break;
                                case 'file':
                                default:
                            }

                            //模拟出一个input用于添加本地文件
                            var input = document.createElement('input');
                            input.setAttribute('type', 'file');
                            input.setAttribute('accept', filetype);
                            input.click();
                            input.onchange = function() {
                                Upload.api.send(this.files[0], function (data) {
                                    var url = Fast.api.cdnurl(data.url);
                                    callback(url);
                                    return;
                                },function (data,ret) {
                                    Layer && Layer.closeAll('dialog');
                                    alert(ret.msg);
                                    return;
                                });
                            };
                        };
                    }
                    tinymce.init(init);
                    $(document).on("click", ":button[type=submit],input[type=submit]", function () {
                        tinymce.triggerSave();
                    });
                });
            }
        } catch (e) {

        }

    };
});

});
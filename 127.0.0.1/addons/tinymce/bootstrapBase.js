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
                        language: '{language}',//语言
                        theme: 'silver',//主体默认主题
                        plugins: ['{plugins}'],//所含插件
                        content_style : '{content_style}',//编辑器样式只对编辑器试图有效不会提交到html中
                        toolbar: '{toolbar}',//工具栏
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
                        image_default_size:'{image_default_size}',//图片添加成功后的默认宽高 格式：{width:"",height:''} 允许是百分比或像素
                        media_default_size:'{media_default_size}',//音/视频添加成功后的默认宽高 格式：{width:"",height:''} 允许是百分比或像素
                        browser_spellcheck: '{browser_spellcheck}',//浏览器检查拼写
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
                    if('{up_video}'){
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
                    $(document).on("click", "{subDom}", function () {
                        tinymce.triggerSave();
                    });
                });
            }
        } catch (e) {

        }

    };
});

<?php

namespace addons\tinymce;

use app\common\library\Menu;
use think\Addons;

/**
 * 插件
 */
class Tinymce extends Addons
{


    /**
     * 插件安装方法
     * @return bool
     */
    public function install()
    {
        //根据配置文件生成插件所需文件
        $this->setTinymce();
        return true;
    }

    /**
     * 插件卸载方法
     * @return bool
     */
    public function uninstall()
    {

        return true;
    }

    /**
     * 插件启用方法
     * @return bool
     */
    public function enable()
    {
        //根据配置文件生成插件所需文件
        $this->setTinymce();
        return true;
    }

    /**
     * 插件禁用方法
     * @return bool
     */
    public function disable()
    {

        return true;
    }

    /**
     * 清除缓存钩子方法
     * @return mixed
     */
    public function wipecacheAfter($param)
    {
        $info = $this->getInfo();
        if ($info['state'] == 0) {
            //如未开启插件直接返回
            return true;
        }
        $config = $this->getConfig();
        $configBase = include(__DIR__ . '/configBase.php');
        if ($config == $configBase) {
            //如配置未变更直接返回
            return true;
        }
        //重新启用插件以应用变更的配置
        \think\addons\Service::enable($this->getName(), 0);
        //\think\Cache::rm('__menu__');
        return true;
    }

    /**
     * 初始化tinymce插件文件
     */
    public function setTinymce()
    {
        //基础tinymce插件必须有不可配置
        $mustPlugins = [
            'advlist',// '高级列表'
            'link', // '链接'
            'image',// '图片'
            'lists',// '列表'
            'charmap',
            'hr',//'水平分割线'
            'anchor',//'描点'
            'pagebreak',//'分页符',
            'searchreplace',
            'wordcount',
            'visualblocks',
            'visualchars',
            'code',//'代码'
            'insertdatetime',
            'nonbreaking',
            'save',//'保存',
            'table',//'表格',
            'contextmenu',
            'directionality',
            'help',//'帮助'
        ];
        //所有可配置的tinymce插件
        $allConfigPlugins = [
            'autolink',//'自动识别创建超链接',
            'autosave',// '自动保存',
            'print',//'打印',
            'preview',// '预览',
            'spellchecker',//'拼写检查',
            'fullscreen',//'全屏',
            'media',//'媒体',
            'emoticons',//'表情',
            'template',//'模板',
            'paste',//'粘贴',
            'textcolor',//'文字颜色',
        ];
        //tinymce工具栏默认配置项
        $baseToolbar = 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons | spellchecker help';
        $config = $this->getConfig();
        $jsContent = file_get_contents(__DIR__ . '/bootstrapBase.js');
        $jsContent = str_replace("{language}", $config['language'], $jsContent);
        if (!empty($config['plugins'])) {
            $plugins = array_merge($mustPlugins, explode(',', $config['plugins']));
        } else {
            $plugins = $mustPlugins;
        }
        $jsContent = str_replace("{plugins}", implode(' ', $plugins), $jsContent);
        if (in_array('spellchecker', $plugins)) {
            $jsContent = str_replace("'{browser_spellcheck}'", 'true', $jsContent);
        } else {
            $jsContent = str_replace("'{browser_spellcheck}'", 'false', $jsContent);
        }
        if ($config['toolbar']) {
            $arr = array_diff($allConfigPlugins, $plugins);
            foreach ($arr as $value) {
                $this->baseToolbar = str_replace($value, '', $baseToolbar);
            }
            $jsContent = str_replace("{toolbar}", $baseToolbar, $jsContent);
        } else {
            $jsContent = str_replace("'{toolbar}'", 'false', $jsContent);
        }
        if ($config['image_default_size']) {
            $jsContent = str_replace("'{image_default_size}'", $config['image_default_size'], $jsContent);
        }else{
            $jsContent = str_replace("'{image_default_size}'", '{}', $jsContent);
        }
        if ($config['media_default_size']) {
            $jsContent = str_replace("'{media_default_size}'", $config['media_default_size'], $jsContent);
        }else{
            $jsContent = str_replace("'{media_default_size}'",'{}', $jsContent);
        }
        $jsContent = str_replace("{subDom}", $config['subDom'], $jsContent);
        $jsContent = str_replace("{content_style}", $config['content_style'], $jsContent);
        if($config['up_video']){
            $jsContent = str_replace("'{up_video}'", 'true', $jsContent);
        }else{
            $jsContent = str_replace("'{up_video}'", 'false', $jsContent);
        }
        file_put_contents(__DIR__ . '/bootstrap.js', $jsContent);
        //将本次配置写入配置记录文件
        file_put_contents(__DIR__ . '/configBase.php', '<?php return ' . var_export($config, true) . ';');
        return true;
    }

}

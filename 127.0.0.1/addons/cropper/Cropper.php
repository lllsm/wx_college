<?php

namespace addons\cropper;

use think\Addons;

/**
 * 图片裁剪插件
 */
class Cropper extends Addons
{

    /**
     * 插件安装方法
     * @return bool
     */
    public function install()
    {
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
     * @param $params
     */
    public function configInit(&$params)
    {
        $config = $this->getConfig();
        $params['cropper'] = ['dialogWidth' => $config['dialogWidth'] ?? 880, 'dialogHeight' => $config['dialogHeight'] ?? 600];
    }
}

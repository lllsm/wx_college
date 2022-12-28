<?php

namespace app\admin\model;

use think\Model;
use traits\model\SoftDelete;

class Classfile extends Model
{

    use SoftDelete;

    

    // 表名
    protected $name = 'classfile';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'integer';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
    protected $deleteTime = 'deletetime';

    // 追加属性
    protected $append = [
        'checkstate_text',
        'status_text',
        'state_text'
    ];
    

    protected static function init()
    {
        self::afterInsert(function ($row) {
            $pk = $row->getPk();
            $row->getQuery()->where($pk, $row[$pk])->update(['weigh' => $row[$pk]]);
        });
    }

    
    public function getCheckstateList()
    {
        return ['A' => __('Checkstate a'), 'B' => __('Checkstate b'), 'C' => __('Checkstate c')];
    }

    public function getStatusList()
    {
        return ['normal' => __('Normal'), 'hidden' => __('Hidden')];
    }

    public function getStateList()
    {
        return ['0' => __('State 0'), '1' => __('State 1'), '2' => __('State 2')];
    }


    public function getCheckstateTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['checkstate']) ? $data['checkstate'] : '');
        $list = $this->getCheckstateList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getStatusTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['status']) ? $data['status'] : '');
        $list = $this->getStatusList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getStateTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['state']) ? $data['state'] : '');
        $list = $this->getStateList();
        return isset($list[$value]) ? $list[$value] : '';
    }




    public function user()
    {
        return $this->belongsTo('User', 'user_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }


    public function collegeclass()
    {
        return $this->belongsTo('Collegeclass', 'collegeclass_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }
}

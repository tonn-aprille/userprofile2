<?php
$xpdo_meta_map['up2TypeProfile'] = array(
    'package'    => 'userprofile2',
    'version'    => '1.1',
    'table'      => 'up2_type_profile',
    'extends'    => 'xPDOSimpleObject',
    'fields'     =>
        array(
            'name'        => null,
            'description' => null,
            'default'     => 0,
            'active'      => 1,
            'rank'        => 0,
        ),
    'fieldMeta'  =>
        array(
            'name'        =>
                array(
                    'dbtype'    => 'varchar',
                    'precision' => '100',
                    'phptype'   => 'string',
                    'null'      => false,
                ),
            'description' =>
                array(
                    'dbtype'  => 'text',
                    'phptype' => 'string',
                    'null'    => true,
                ),
            'default'     =>
                array(
                    'dbtype'    => 'tinyint',
                    'precision' => '1',
                    'phptype'   => 'integer',
                    'null'      => true,
                    'default'   => 0,
                ),
            'active'      =>
                array(
                    'dbtype'    => 'tinyint',
                    'precision' => '1',
                    'phptype'   => 'integer',
                    'null'      => true,
                    'default'   => 1,
                ),
            'rank'        =>
                array(
                    'dbtype'     => 'tinyint',
                    'precision'  => '1',
                    'attributes' => 'unsigned',
                    'phptype'    => 'integer',
                    'null'       => true,
                    'default'    => 0,
                ),
        ),
    'aggregates' =>
        array(
            'Tabs' =>
                array(
                    'class'       => 'up2Tabs',
                    'local'       => 'id',
                    'foreign'     => 'type',
                    'owner'       => 'local',
                    'cardinality' => 'many',
                ),
        ),
);

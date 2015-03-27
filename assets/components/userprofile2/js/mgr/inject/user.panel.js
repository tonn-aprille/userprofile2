userprofile2.panel.User = function(config) {
    config = config || {};
    Ext.apply(config,{
        id: 'userprofile2-panel-user'
        ,border: false
        ,baseCls: 'modx-formpanel'
        ,layout: 'anchor'

        ,listeners: {
            setup: {fn:this.setup,scope:this}

            ,afterRender: function(thisForm, options){
                var uf = Ext.getCmp('modx-panel-user');

                uf.addListener('beforeSubmit', function() {
                    this.beforeSubmit(uf);
                }, this);
            }
        }

        ,items: [{
            html: '<p>'+_('up2_tab_intro')+'</p>'
            ,border: false
            ,bodyCssClass: 'panel-desc'
        }, {
            layout: 'column'
            ,border: false
            ,bodyCssClass: 'tab-panel-wrapper '
            ,style: 'padding: 15px;'
            ,items: this.getItems(config)
        }]
    });
    userprofile2.panel.User.superclass.constructor.call(this,config);

};
Ext.extend(userprofile2.panel.User,MODx.Panel, {

    beforeSubmit: function(o) {
        var d = '';
        var f = Ext.getCmp('modx-panel-user').getForm();
        if(f.id) {
            d = Ext.util.JSON.encode($('#'+f.id).serializeJSON().up2);
        }

        MODx.Ajax.request({
            url: userprofile2.config.connector_url
            ,params: {
                action: 'mgr/profile/update'
                ,id: userprofile2.config.user
                ,data: d
            }
        });
    }

    ,getTabs: function(config) {
        var tabsItems = [];
        var tabs = {
            xtype: 'modx-tabs',
            autoHeight: true,
            deferredRender: false,
            forceLayout: true,
            id: 'up2-extended-tabs',
            width: '99%',
            bodyStyle: 'padding: 10px 10px 10px 0px;',
            border: true,
            defaults: {
                border: false,
                autoHeight: true,
                bodyStyle: 'padding: 5px 8px 5px 5px;',
                layout: 'form',
                deferredRender: false,
                forceLayout: true
            },
            items: tabsItems,
            style: 'padding: 15px 25px 15px 15px;'
        };

        var tf = userprofile2.config.tabsfields;
        if((!tf) || (typeof tf!== 'object')) return tabs;

        for (keyTab in tf) {
            var tab = tf[keyTab];
            if((!tab) || (typeof tab!== 'object')) {continue;}

            var fields = tab['fields'];
            if((!fields) || (typeof fields!== 'object')) {continue;}

            var tabNameIn = tab['name_in'];
            var tabNameOut = tab['name_out'];
            var tabDescription = tab['description'];
            var tabFields = [];

            for (keyField in fields) {

                var item = fields[keyField];
                if((!item) || (typeof item!== 'object')) {continue;}

                var field = {
                    xtype: item['type_in'],
                    name: 'up2[' + tabNameOut + '][' + item['name_out'] + ']',
                    id: 'up2-extended-field-' + item['name_out'],
                    fieldLabel: item['name_in'],
                    disabled: !item['editable'],
                    allowBlank: item['required'],
                    ctCls: 'up2_' + item['type_in'],
                    anchor: '100%',

                    //value: data[v] || data[tab][v],

                };
                tabFields.push(field);
            }
            if(typeof tabFields!== 'object') {continue;}

            tabsItems.push({
                title: tabNameIn,
                items: tabFields,
                id: tabNameOut
            });
        }

        console.log(tabsItems);

        return tabs;
    }

    ,getItems: function(config) {
        var items = [];

        items.push(
            {
                columnWidth: .3,
                xtype: 'panel',

                border: false,
                layout: 'form',
                labelAlign: 'top',
                preventRender: true,
                items: [
                    {
                        xtype: 'fieldset',
                        title: _('up_fieldset_avatar'),
                        layoutConfig: {
                            labelAlign: 'top'
                        },
                        layout: 'column',
                        items: [
                            {
                                columnWidth: 1,
                                xtype: 'panel',
                                border: false,
                                layout: 'form',
                                labelAlign: 'top',
                                preventRender: true,
                                items: [
                                    {
                                        //xtype: 'up-combo-browser',
                                        fieldLabel: _('up_avatar'),
                                        name: 'photo',
                                        anchor: '100%',
                                        id: 'up-combo-browser',
                                        //value: config.profile.photo || ''
                                    },
                                    //avatar
                                ]

                            }
                        ]
                    }, {
                        xtype: 'fieldset',
                        title: _('up_fieldset_info'),
                        layoutConfig: {
                            labelAlign: 'top'
                        },
                        layout: 'column',
                        items: [
                            {
                                columnWidth: 1,
                                xtype: 'panel',
                                border: false,
                                layout: 'form',
                                labelAlign: 'top',
                                preventRender: true,
                                items: [
                                    {
                                        xtype: 'hidden',
                                        name: 'up2[real][type_id]',
                                        //value: userprofile.config.extSetting.id
                                    },
                                    {
                                        xtype: 'textarea',
                                        name: 'up2[real][description]',
                                        //value: data.description || '',
                                        description: _('up2_description_help'),
                                        fieldLabel: _('up2_description'),
                                        anchor: '100%',
                                        //height: 126,
                                        enableKeyEvents: true,
                                        //listeners: listeners
                                    },
                                    {
                                        xtype: 'textarea',
                                        name: 'up2[real][introtext]',
                                        //value: data.introtext || '',
                                        description: _('up2_introtext_help'),
                                        fieldLabel: _('up2_introtext'),
                                        anchor: '100%',
                                        height: 126,
                                        enableKeyEvents: true,
                                        //listeners: listeners
                                    }
                                ]

                            }
                        ]

                    }
                ]
            },
            {
                columnWidth: .7,
                xtype: 'panel',
                border: false,
                layout: 'form',
                labelAlign: 'left',
                preventRender: true,
                items: this.getTabs(config)
            }
        );

        return items;
    }

});
Ext.reg('userprofile2-panel-user',userprofile2.panel.User);
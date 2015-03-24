<?php
class up2TypeFildUpdateProcessor extends modObjectUpdateProcessor {
	public $classKey = 'up2TypeFild';
	public $languageTopics = array('userprofile2');
	public $permission = 'up2setting_save';

	/** {@inheritDoc} */
	public function initialize() {
		if (!$this->modx->hasPermission($this->permission)) {
			return $this->modx->lexicon('access_denied');
		}

		return parent::initialize();
	}
	/** {@inheritDoc} */
	public function beforeSet() {
		if ($this->modx->getObject('up2TypeFild',array('name' => $this->getProperty('name'), 'id:!=' => $this->getProperty('id') ))) {
			$this->modx->error->addField('name', $this->modx->lexicon('vp_err_ae'));
		}

		return parent::beforeSet();
	}

}
return 'up2TypeFildUpdateProcessor';
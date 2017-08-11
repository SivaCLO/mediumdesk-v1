const ready = require('document-ready');

const header = '<header class="heading u-clearfix heading--borderedBottom" id="mediumdesk"><div class="u-clearfix"><div class="heading-content u-floatLeft"><span class="heading-title">MediumDesk</span></div></div></header>';

const startPage = `
  <li class="list-item u-paddingTop30 u-paddingBottom35 u-flexCenter u-xs-flexWrap js-username">
    <div class="u-flex1 u-flexCenter u-marginRight10 u-xs-paddingBottom15">
      <div class="u-flex1">
        <div class="u-fontWeightBold u-maxWidth450 u-breakWord">Start page</div>
        <div class="u-fontSize14 u-textColorNormal u-maxWidth400">
          Open MediumDesk to exactly where you want to be.
        </div>
      </div>
    </div>
    <div class="u-flex0">
      <select class="button list list--short list--choice">
        <option value="Home" selected="">Home</option>
        <option value="New">New Story</option>
      </select>
    </div>
  </li>`;

const settingsList = `
  <ul class="list list--bordered u-marginBottom0 u-marginBottom50">
  ${startPage}
  </ul>`;

ready(function() {
  document.querySelector('.settings header').insertAdjacentHTML('beforebegin', header);
  document.querySelector('#mediumdesk').insertAdjacentHTML('afterend', settingsList);
});

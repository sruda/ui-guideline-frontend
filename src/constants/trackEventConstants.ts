/* 
Structure:
  <location>: {
    <action><Element>: '<LOCATION>::<ACTION><ELEMENT>'
  }
*/

const trackEvents = {
  location: {
    change: '@@router/LOCATION_CHANGE',
  },
  navbar: {
    clickComponentOption: 'NAVBAR::CLICK_COMPONENT_OPTION',
    clickRefSystemOption: 'NAVBAR::CLICK_REF_SYSTEM_OPTION',
    clickSubscribeOption: 'NAVBAR::CLICK_SUBSCRIBE_OPTION',
  },
  componentList: {
    clickComponentCard: 'COMPONENT_LIST::CLICK_COMPONENT_CARD',
    keyPressSearchInput: 'COMPONENT_LIST::KEYPRESS_SEARCH_INPUT',
  },
  componentListNoResult: {
    clickSuggestComponentBtn: 'COMPONENT_LIST_NO_RESULT::CLICK_SUGGEST_COMPONENT_BTN',
  },
  suggestionForm: {
    clickUploadImageLink: 'SUGGESTION_FORM::CLICK_UPLOAD_IMAGE_LINK',
    clickSendSuggestionBtn: 'SUGGESTION_FORM::CLICK_SEND_SUGGESTION_BTN',
  },
  componentDetailModal: {
    clickRefSystemItem: 'COMPONENT_DETAIL_MODAL::CLICK_REF_SYSTEM_ITEM',
    clickSiblingItem: 'COMPONENT_DETAIL_MODAL::CLICK_SIBLING_ITEM',
  },
  refSystemList: {
    clickRefSystemCard: 'REF_SYSTEM_LIST::CLICK_REF_SYSTEM_CARD',
  },
  faceRating: {
    clickRating: 'FACE_RATING::CLICK_RATING',
  },
  footer: {
    clickSubscribeOption: 'FOOTER::CLICK_SUBSCRIBE_OPTION',
  },
};

export default trackEvents;

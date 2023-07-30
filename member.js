function skillsMember() {
    if (document.getElementsByClassName('js-profile-editable-area').length > 0) {
        // Path: .github/member.js
        const skills = document.getElementsByClassName('js-profile-editable-area')[0].getElementsByClassName('js-profile-editable-additions')[0].getElementsByClassName('js-profile-editable-addition')[0].getElementsByClassName('js-profile-editable-addition-field')[0].getElementsByClassName('js-profile-editable-addition-input')[0].value;
        return skills;
    }
}
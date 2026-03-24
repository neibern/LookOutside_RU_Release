
//add Delete as a symbol just above 'OK'
//this replaces - and þ in names but whatever nobody uses them.
Window_NameInput.LATIN1[79]="DEL"
Window_NameInput.LATIN2[79]="DEL"

Window_NameInput.prototype.isDelete = function() {
    return this._index === 79;
};

oldWindowNameInputCharacter= Window_NameInput.prototype.character
Window_NameInput.prototype.character = function() {
	if (this.isDelete()) 
	{
		return ""
	}
    return oldWindowNameInputCharacter.call(this)
};

oldWindowNameInputProcessOk=Window_NameInput.prototype.processOk
Window_NameInput.prototype.processOk = function() {
	if (this.isDelete())
	{
		this.processBack()
		return;
	}
    oldWindowNameInputProcessOk.call(this);
};


// add the backspace key functionality to name input
Input.keyMapper[8]="backspace"

oldNameInputWindowProcessHandling=Window_NameInput.prototype.processHandling
Window_NameInput.prototype.processHandling = function() {
	oldNameInputWindowProcessHandling.call(this)
    if (this.isOpen() && this.active) {
        if (Input.isRepeated("backspace")) {
            this.processBack();
        }
    }
};
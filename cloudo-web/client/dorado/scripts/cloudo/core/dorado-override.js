/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 14-3-31
 * Time: 上午10:51
 * To change this template use File | Settings | File Templates.
 */
(function () {
    dorado.widget.Control.prototype.onBlur = function () {
        this._focused = false;
        if (!this._destroyed) {
            if (this.doOnBlur) {
                this.doOnBlur();
            }
            $fly(this.getDom()).removeClass(this._className + "-focused");
            this.fireEvent("onBlur", this);
        }
    }

})();